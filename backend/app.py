from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    prompt = (
        "You are a medical assistant chatbot. A user will describe their symptoms, and you should reply "
        "with the most suitable medical department they should consult (e.g., Cardiology, Dermatology, Neurology, etc.). "
        "Only mention the department name and a short explanation."
        "\n\nUser symptoms: " + user_msg
    )
    gemini_resp = model.generate_content(prompt)
    return jsonify({"reply": gemini_resp.text})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
