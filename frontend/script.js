const chat   = document.getElementById("chat");
const input  = document.getElementById("input");
const sendBt = document.getElementById("send");

sendBt.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;
  append("You", text);
  input.value = "";

  const res  = await fetch("https://YOUR-BACKEND.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });
  const data = await res.json();
  append("Bot", data.reply);
});

function append(sender, msg) {
  const div = document.createElement("div");
  div.textContent = `${sender}: ${msg}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
