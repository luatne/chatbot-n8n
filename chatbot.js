(function () {
  const style = document.createElement('style');
style.innerHTML = `
  #n8n-chat-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    font-size: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 9999;
    padding: 0;
    overflow: hidden;
  }

  #n8n-chat-container {
    position: fixed;
    bottom: 90px;
    right: 24px;
    width: 400px;
    height: 500px;
    max-height: 600px;
    display: none;
    flex-direction: column;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    overflow: hidden;
    z-index: 9999;
    font-family: 'Segoe UI', sans-serif;
  }

  #n8n-chat-header {
    background: #0C0140;
    color: white;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #n8n-chat-header h4 {
    margin: 0;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  #n8n-chat-header button {
    background: transparent;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }

  #n8n-chat-messages {
    flex: 1;
    padding: 16px;
    background: #f3f4f6;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .n8n-msg {
    padding: 10px 14px;
    border-radius: 18px;
    max-width: 75%;
    font-size: 14px;
    line-height: 1.5;
    white-space: normal;
    word-wrap: break-word;
  }

  .n8n-user {
    background: #e0e7ff;
    align-self: flex-end;
  }

  .n8n-bot {
    background: #dcfce7;
    align-self: flex-start;
  }

  #n8n-chat-input-container {
    display: flex;
    padding: 10px;
    background: white;
    border-top: 1px solid #ddd;
    align-items: center;
  }

  #n8n-chat-input {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 8px 14px;
    font-size: 14px;
    outline: none;
  }

  #n8n-chat-button img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  #n8n-chat-send {
    background: none;
    border: none;
    font-size: 20px;
    color: #2563eb;
    margin-left: 8px;
    cursor: pointer;
  }

  .n8n-msg a {
    color: #2563eb;
    text-decoration: underline;
    word-break: break-all;
  }

  /* ---- RESPONSIVE CHO MOBILE ---- */
@media (max-width: 600px) {
  #n8n-chat-container {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    right: 0;
    border-radius: 0;
    max-height: none;
  }

  #n8n-chat-messages {
    padding: 12px;
  }

  #n8n-chat-input-container {
    padding: 8px;
  }

  #n8n-chat-input {
    font-size: 16px;
    padding: 10px 16px;
  }

  .n8n-msg {
    font-size: 15px;
  }

  #n8n-chat-header {
    padding: 24px 20px;
    height: 72px;
  }

  #n8n-chat-header h4 {
    font-size: 20px;
  }

  #n8n-chat-header button {
    font-size: 28px;
  }
}
`;
  document.head.appendChild(style);

  const chatBtn = document.createElement('button');
  chatBtn.id = 'n8n-chat-button';
  chatBtn.innerHTML = '<img src="https://chatbot-n8n-mmd6.vercel.app/alitalogo.png" alt="Chat" />';
  document.body.appendChild(chatBtn);

  const chatContainer = document.createElement('div');
  chatContainer.id = 'n8n-chat-container';
  chatContainer.innerHTML = `
    <div id="n8n-chat-header">
      <h4>Chatbot Alita</h4>
      <button id="n8n-chat-close">×</button>
    </div>
    <div id="n8n-chat-messages"></div>
    <div id="n8n-chat-input-container">
      <input id="n8n-chat-input" type="text" placeholder="Nhập tin nhắn..." />
      <button id="n8n-chat-send">➤</button>
    </div>
  `;
  document.body.appendChild(chatContainer);

  let greetingSent = false;

  chatBtn.onclick = () => {
    chatContainer.style.display = 'flex';
    const msgBox = document.getElementById('n8n-chat-messages');
    if (!greetingSent) {
      msgBox.innerHTML += `<div class="n8n-msg n8n-bot">Em chào anh/chị, em là Alita, chuyên viên tư vấn của theAlita. Anh/chị cho em hỏi tên mình để tiện xưng hô nhé ạ?</div>`;
      msgBox.scrollTop = msgBox.scrollHeight;
      greetingSent = true;
    }
  };

  document.getElementById('n8n-chat-close').onclick = () => {
    chatContainer.style.display = 'none';
    document.getElementById('n8n-chat-messages').innerHTML = '';
    greetingSent = false;
  };

  document.getElementById('n8n-chat-send').onclick = async function () {
    const input = document.getElementById('n8n-chat-input');
    const text = input.value.trim();
    if (!text) return;

    const msgBox = document.getElementById('n8n-chat-messages');
    msgBox.innerHTML += `<div class="n8n-msg n8n-user">${text}</div>`;
    input.value = '';
    msgBox.scrollTop = msgBox.scrollHeight;

    try {
      const res = await fetch('https://n8n.thuhoai-academy.com/webhook/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();

      const formattedReply = data.reply
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>')
        .replace(/\n/g, '<br>');

      msgBox.innerHTML += `<div class="n8n-msg n8n-bot">${formattedReply}</div>`;
      msgBox.scrollTop = msgBox.scrollHeight;
    } catch (err) {
      msgBox.innerHTML += `<div class="n8n-msg n8n-bot">Bot: Lỗi kết nối máy chủ</div>`;
      msgBox.scrollTop = msgBox.scrollHeight;
    }
  };
  document.getElementById('n8n-chat-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // Ngăn xuống dòng
    document.getElementById('n8n-chat-send').click(); // Giả lập click nút gửi
  }
});

})();
