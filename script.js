document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  appendMessage("focus", "Yazıyor...");

  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    document.querySelectorAll(".focus-msg").pop()?.remove(); // "Yazıyor..." mesajını sil
    appendMessage("focus", data.reply);
  } catch (error) {
    appendMessage("focus", "Bir hata oluştu: " + error);
  }
}

function appendMessage(sender, text) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = sender === "user" 
    ? "text-right"
    : "text-left focus-msg";
  div.innerHTML = `
    <div class="inline-block px-4 py-2 rounded-2xl ${sender === "user" ? "bg-blue-600" : "bg-gray-700"} max-w-[75%]">
      ${text}
    </div>
  `;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
