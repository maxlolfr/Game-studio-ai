"""Generate an image with Gemini without exposing the API key to GitHub Pages."""
import base64
import json
import os
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

key = os.environ["GEMINI_API_KEY"]
prompt = os.environ["MALO_PROMPT"].strip()
if not prompt:
    raise SystemExit("Empty prompt")
model = "gemini-2.5-flash-image"
url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
payload = {
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]},
}
req = Request(
    url,
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json", "x-goog-api-key": key},
)
try:
    with urlopen(req, timeout=120) as response:
        result = json.load(response)
except HTTPError as exc:
    # Never print response body: some provider errors may contain sensitive metadata.
    raise SystemExit(f"Gemini request failed (HTTP {exc.code}); check model access, quota and billing") from None
parts = result.get("candidates", [{}])[0].get("content", {}).get("parts", [])
for part in parts:
    inline = part.get("inlineData", part.get("inline_data", {}))
    if inline.get("data") and inline.get("mimeType", inline.get("mime_type", "")).startswith("image/"):
        output = Path("output/malo-image.png")
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_bytes(base64.b64decode(inline["data"]))
        print(f"Image generated: {output}")
        break
else:
    raise SystemExit("Gemini did not return an image; check model access and prompt.")
