from __future__ import annotations

import hmac
import os
import subprocess
import sys
import tempfile
from pathlib import Path

VOICE_LAB_DIR = Path(__file__).resolve().parents[3] / "XTTS-VoiceLab"
if not VOICE_LAB_DIR.is_dir():
    raise RuntimeError(
        "XTTS-VoiceLab não encontrado. Coloque os dois repositórios lado a lado."
    )
sys.path.insert(0, str(VOICE_LAB_DIR))

import imageio_ffmpeg
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_file

from src.audio_processor import prepare_references
from src.tts_engine import XTTSVoiceEngine

INPUT_DIR = VOICE_LAB_DIR / "input"
VOICE_DIR = VOICE_LAB_DIR / "voices" / "default"
OUTPUT_DIR = VOICE_LAB_DIR / "output"

load_dotenv(VOICE_LAB_DIR / ".env")
API_KEY = os.getenv("XTTS_API_KEY", "")
PORT = int(os.getenv("XTTS_API_PORT", "8765"))

app = Flask(__name__)
engine = XTTSVoiceEngine()
references = None


def load_voice_references():
    global references
    if references is not None:
        return references

    files = [
        path for path in INPUT_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in {".mp3", ".wav", ".m4a", ".flac", ".ogg"}
    ]
    if len(files) != 1:
        raise RuntimeError("Coloque exatamente um áudio de referência na pasta input/.")

    references = prepare_references(files[0], VOICE_DIR)
    return references


def authorized() -> bool:
    supplied = request.headers.get("Authorization", "")
    return bool(API_KEY) and hmac.compare_digest(supplied, f"Bearer {API_KEY}")


@app.get("/health")
def health():
    return jsonify({"status": "online", "engine": "XTTS-v2"})


@app.post("/synthesize")
def synthesize():
    if not authorized():
        return jsonify({"error": "Não autorizado."}), 401

    payload = request.get_json(silent=True) or {}
    text = str(payload.get("text", "")).strip()
    language = str(payload.get("language", "pt"))

    if not text:
        return jsonify({"error": "O texto está vazio."}), 400
    if len(text) > 500:
        return jsonify({"error": "O limite é de 500 caracteres."}), 413
    if language != "pt":
        return jsonify({"error": "Este serviço está configurado para português."}), 400

    try:
        voice_references = load_voice_references()
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        wav_path = engine.synthesize(
            text=text,
            references=voice_references,
            output_directory=OUTPUT_DIR,
            language=language,
        )

        with tempfile.NamedTemporaryFile(suffix=".ogg", delete=False) as temporary:
            ogg_path = Path(temporary.name)

        try:
            result = subprocess.run(
                [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-hide_banner", "-loglevel", "error",
                 "-i", str(wav_path), "-c:a", "libopus", "-b:a", "96k",
                 "-ar", "48000", "-ac", "2", "-f", "ogg", str(ogg_path)],
                capture_output=True, text=True, check=False,
            )
            if result.returncode != 0:
                raise RuntimeError(result.stderr[-500:] or "Falha ao converter áudio para OGG/Opus.")

            return send_file(ogg_path, mimetype="audio/ogg", download_name="mensagem.ogg")
        finally:
            ogg_path.unlink(missing_ok=True)

    except Exception as error:
        app.logger.exception("Falha na síntese de voz")
        return jsonify({"error": str(error)}), 500


if __name__ == "__main__":
    if not API_KEY:
        raise RuntimeError("Defina XTTS_API_KEY no arquivo .env do XTTS-VoiceLab.")
    INPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    app.run(host="127.0.0.1", port=PORT, threaded=False)
