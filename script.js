const input = document.getElementById("input");
const sendButton = document.getElementById("send");
const chatBox = document.getElementById("chat");

// 🔁 Replace this with your actual backend URL from Render
const BACKEND_URL = "https://chatbot1-tskq.onrender.com/chat";

sendButton.addEventListener("click", async () => {
  const userInput = input.value.trim();
  if (!userInput) return;

  // Add user message to chat
  addMessage("You", userInput, "user");

  // Clear input
  input.value = "";

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();

    // Add bot response to chat
    addMessage("Bot", data.reply, "bot");

  } catch (error) {
    addMessage("Bot", "❌ Sorry, there was a problem connecting to the server.", "bot");
    console.error(error);
  }
});

// Helper function to add messages to chat box
function addMessage(sender, text, className) {
  const msg = document.createElement("div");
  msg.classList.add("message", className);
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll
}
