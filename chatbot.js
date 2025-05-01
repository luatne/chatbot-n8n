(function () {
  const style = document.createElement('style');
  style.innerHTML = `
    #n8n-chat-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background-color: #4f46e5;
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-size: 28px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: transform 0.2s ease;
      z-index: 9999;
    }

    #n8n-chat-button:hover {
      transform: scale(1.05);
    }

    #n8n-chat-container {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 340px;
      max-height: 500px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      overflow: hidden;
      display: none;
      flex-direction: column;
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    #n8n-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      font-family: 'Segoe UI', sans-serif;
      font-size: 14px;
      background: #f9fafb;
    }

    .n8n-msg {
      margin-bottom: 12px;
      padding: 10px 14px;
      border-radius: 12px;
      max-width: 80%;
      line-height: 1.4;
    }

    .n8n-user {
      background-color: #e0e7ff;
      align-self: flex-end;
      text-align: right;
      margin-left: auto;
    }

    .n8n-bot {
      background-color: #dcfce7;
      align-self: flex-start;
      text-align: left;
      margin-right: auto;
    }

    #n8n-chat-input-container {
      display: flex;
      border-top: 1px solid #ddd;
      padding: 10px;
      background: white;
    }

    #n8n-chat-input {
      flex: 1;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 14px;
      outline: none;
    }

    #n8n-chat-send {
      background: #4f46e5;
      color: white;
      border: none;
      margin-left: 8px;
      padding: 0 16px;
      border-radius: 8px;
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
    <div id="n8n-chat-messages" style="display: flex; flex-direction: column;"></div>
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
