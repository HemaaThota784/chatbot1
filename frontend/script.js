const chatBox = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

send.addEventListener("click", async () => {
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage("You", msg);
  input.value = "";

  try {
    const res = await fetch("https://chatbot1-tskq.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    if (!res.ok) {
      appendMessage("Gemini", `❌ Error: ${res.status} ${res.statusText}`);
      return;
    }

    const data = await res.json();
    if (data.reply) {
      appendMessage("Gemini", data.reply);
    } else {
      appendMessage("Gemini", "❌ No reply received.");
    }
  } catch (error) {
    appendMessage("Gemini", `❌ Network error: ${error.message}`);
  }
});

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.textContent = `${sender}: ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
