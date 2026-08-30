import os

from flask import Flask, jsonify

app = Flask(__name__)

MESSAGE = os.environ.get("APP_MESSAGE", "Hello from Run App!")


@app.get("/")
def index():
    return f"<h1>{MESSAGE}</h1><p>Served by Flask on Run App.</p>"


@app.get("/health")
def health():
    return jsonify(status="ok")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
