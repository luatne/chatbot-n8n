(function () {
  const style = document.createElement('style');
  style.innerHTML = `
    #n8n-chat-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-size: 24px;
      cursor: pointer;
      z-index: 9999;
    }

    #n8n-chat-container {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 300px;
      max-height: 400px;
      background: white;
      border-radius: 10px;
      border: 1px solid #ccc;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      overflow: hidden;
      display: none;
      flex-direction: column;
      z-index: 9999;
    }

    #n8n-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      font-family: sans-serif;
      font-size: 14px;
    }

    .n8n-msg { margin: 8px 0; }
    .n8n-user { color: #007bff; }
    .n8n-bot { color: #28a745; }

    #n8n-chat-input-container {
      display: flex;
      border-top: 1px solid #ccc;
    }

    #n8n-chat-input {
      flex: 1;
      border: none;
      padding: 8px;
      outline: none;
      font-size: 14px;
    }

    #n8n-chat-send {
      background: #007bff;
      color: white;
      border: none;
      padding: 0 15px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const chatBtn = document.createElement('button');
  chatBtn.id = 'n8n-chat-button';
  chatBtn.textContent = '💬';
  document.body.appendChild(chatBtn);

  const chatContainer = document.createElement('div');
  chatContainer.id = 'n8n-chat-container';
  chatContainer.innerHTML = `
    <div id="n8n-chat-messages"></div>
    <div id="n8n-chat-input-container">
      <input id="n8n-chat-input" type="text" placeholder="Nhập tin nhắn..." />
      <button id="n8n-chat-send">Gửi</button>
    </div>
  `;
  document.body.appendChild(chatContainer);

  chatBtn.onclick = () => {
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
  };

  document.getElementById('n8n-chat-send').onclick = async function () {
    const input = document.getElementById('n8n-chat-input');
    const text = input.value.trim();
    if (!text) return;

    const msgBox = document.getElementById('n8n-chat-messages');
    msgBox.innerHTML += `<div class="n8n-msg n8n-user">Bạn: ${text}</div>`;
    input.value = '';
    msgBox.scrollTop = msgBox.scrollHeight;

    try {
      const res = await fetch('https://n8n.thuhoai-academy.com/webhook/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      msgBox.innerHTML += `<div class="n8n-msg n8n-bot">Bot: ${data.reply}</div>`;
      msgBox.scrollTop = msgBox.scrollHeight;
    } catch (err) {
      msgBox.innerHTML += `<div class="n8n-msg n8n-bot">Bot: Lỗi kết nối máy chủ</div>`;
    }
  };
})();
