from flask import Flask, request, jsonify
import os, google.generativeai as genai

app = Flask(__name__)

# Grab the key from an environment variable (never hard‑code!).
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")  # free‑tier model

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    gemini_resp = model.generate_content(user_msg)
    return jsonify({"reply": gemini_resp.text})

if __name__ == "__main__":
    # Render injects PORT; default to 8080 for local runs
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
