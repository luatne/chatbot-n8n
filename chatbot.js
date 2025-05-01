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
    }

    #n8n-chat-container {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 400px;
      height: 500px;
      max-height: 600px;
      display: none; /* Changed from none to flex to allow for initial message setup, though it will be set back to none immediately unless opened. Better to keep it 'none' and set to 'flex' in the click handler. Reverting this comment. */
      flex-direction: column;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      overflow: hidden;
      z-index: 9999;
      font-family: 'Segoe UI', sans-serif;
    }

    #n8n-chat-header {
      background: #2563eb;
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
      line-height: 1.4;
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

    #n8n-chat-send {
      background: none;
      border: none;
      font-size: 20px;
      color: #2563eb;
      margin-left: 8px;
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
    <div id="n8n-chat-header">
      <h4>🤖 Chatbot n8n</h4>
      <button id="n8n-chat-close">×</button>
    </div>
    <div id="n8n-chat-messages"></div>
    <div id="n8n-chat-input-container">
      <input id="n8n-chat-input" type="text" placeholder="Nhập tin nhắn..." />
      <button id="n8n-chat-send">➤</button>
    </div>
  `;
  document.body.appendChild(chatContainer);

  // --- Thêm biến cờ để kiểm tra xem tin nhắn chào đã gửi chưa ---
  let greetingSent = false;

  chatBtn.onclick = () => {
    chatContainer.style.display = 'flex';

    // --- Thêm đoạn code gửi tin nhắn chào ở đây ---
    const msgBox = document.getElementById('n8n-chat-messages');
    // Kiểm tra nếu tin nhắn chào chưa được gửi
    if (!greetingSent) {
        msgBox.innerHTML += `<div class="n8n-msg n8n-bot">Em chào anh/chị, em là Alita, chuyên viên tư vấn của theAlita. Anh/chị cho em hỏi tên mình để tiện xưng hô nhé ạ?</div>`; // Nội dung tin nhắn chào
        msgBox.scrollTop = msgBox.scrollHeight; // Cuộn xuống cuối tin nhắn
        greetingSent = true; // Đặt cờ là đã gửi
    }
    // ----------------------------------------------
  };

  document.getElementById('n8n-chat-close').onclick = () => {
    chatContainer.style.display = 'none';
    // --- Reset cờ khi đóng hộp thoại nếu muốn chào lại mỗi lần mở ---
    // greetingSent = false; // Bỏ comment dòng này nếu muốn chào lại mỗi lần mở
    // --- Hoặc xóa hết tin nhắn khi đóng để bắt đầu lại ---
    document.getElementById('n8n-chat-messages').innerHTML = '';
    greetingSent = false; // Reset cờ khi xóa tin nhắn
    // ---------------------------------------------------
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
      msgBox.innerHTML += `<div class="n8n-msg n8n-bot">${data.reply}</div>`;
      msgBox.scrollTop = msgBox.scrollHeight;
    } catch (err) {
      msgBox.innerHTML += `<div class="n8n-msg n8n-bot">Bot: Lỗi kết nối máy chủ</div>`;
      msgBox.scrollTop = msgBox.scrollHeight; // Scroll even on error
    }
  };
})();
