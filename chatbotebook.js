(function () {
  const style = document.createElement('style');
style.innerHTML = `
  #n8n-chat-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background-color: #3EC0F2;
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
    color: white;
    background: linear-gradient(135deg, #2A3A80, #3EC0F2);

    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
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
  margin-left: 0;
  color: #333;
}

  .n8n-user {
    background: #e0e7ff;
    align-self: flex-end;
  }

  .n8n-bot {
    background: #dcfce7;
    align-self: flex-start;
    text-align: left;
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

  #n8n-chat-header {
    padding: 32px 20px 24px;
    height: auto;
    margin-top: 30px;
    box-sizing: border-box;
  }

  #n8n-chat-header h4 {
    font-size: 20px;
  }

  #n8n-chat-header button {
    font-size: 28px;
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
}
/* Hiệu ứng ba chấm đang gõ */
.n8n-typing {
  display: inline-block;
  font-size: 16px;
  background: #dcfce7;
  border-radius: 18px;
  padding: 10px 14px;
  max-width: 75%;
  align-self: flex-start;
}

.n8n-typing span {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 2px;
  background-color: #4ade80;
  border-radius: 50%;
  animation: typing-bounce 1.4s infinite ease-in-out;
}

.n8n-typing span:nth-child(2) {
  animation-delay: 0.2s;
}
.n8n-typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing-bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
  } 
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
  align-self: flex-start;
}

.bubble {
  background-color: #f0f0f0;
  padding: 10px 12px;
  border-radius: 15px;
  max-width: 80%;
  word-wrap: break-word;
}
#n8n-suggest-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 16px;
  background: #fff;
  border-top: 1px solid #eee;
}

.n8n-suggest {
  padding: 6px 12px;
  background-color: #f0fdf4;
  border: 1px solid #4ade80;
  color: #166534;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.n8n-suggest:hover {
  background-color: #bbf7d0;
}
#n8n-chat-footer {
  font-size: 13px;
  text-align: center;
  padding: 8px 12px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
}
#n8n-chat-input {
  display: flex;
  align-items: center;
  padding: 8px;
  border-top: 1px solid #ccc;
}

#n8n-input-menu {
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
}


`;
  document.head.appendChild(style);

  // Tạo button chat
  const chatBtn = document.createElement('button');
  chatBtn.id = 'n8n-chat-button';
  chatBtn.innerHTML = '📗';
  document.body.appendChild(chatBtn);

  // Tạo container chat
  const chatContainer = document.createElement('div');
  chatContainer.id = 'n8n-chat-container';
  chatContainer.innerHTML = `
    <div id="n8n-chat-header">
      <h4>
        <img src="https://chatbot-test-teal-ten.vercel.app/091778.jpg" alt="Avatar" style="width: 30px; height: 30px; border-radius: 50%;" />
        <span style="color: white;">Khả Như từ Tramdoc</span>
      </h4>
      <button id="n8n-chat-close">×</button>
    </div>
    <div id="n8n-chat-messages"></div>
    <div id="n8n-suggest-buttons">
      <button class="n8n-suggest">📚 Thông tin danh sách các đầu sách mới</button>
      <button class="n8n-suggest">💵 Thông tin chi tiết về giá của sách</button>
      <button class="n8n-suggest">🔥 Thông tin Danh sách các đầu sách khuyến mãi</button>
    </div>
    <div id="n8n-chat-input-container">
      <span id="n8n-input-menu">☰</span>
      <input id="n8n-chat-input" type="text" placeholder="Nhập tin nhắn..." />
      <button id="n8n-chat-send">➤</button>
    </div>
    <div id="n8n-chat-footer">
      Top 5 Global Social Data Platforms of 2024
      <a href="https://thealita.com/" target="_blank" style="text-decoration: none;">
        <span style="color: #10b981; font-weight: bold;">Powered by Alita</span>
      </a>
    </div>
  `;
  document.body.appendChild(chatContainer);
 setupSuggestButtons();
  // Encode & format text (chuyển link, xuống dòng)
  function formatText(text) {
    const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return escaped
      .replace(/(https?:\/\/[^\s]+)/g, '<br><a href="$1" target="_blank">$1</a>')
      .replace(/\n/g, '<br>');
  }

  // Tạo message user
  function createUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'n8n-msg n8n-user';
    div.innerHTML = formatText(text);
    document.getElementById('n8n-chat-messages').appendChild(div);
  }

  // Tạo message bot
  function createBotMessage(text) {
    const div = document.createElement('div');
    div.className = 'n8n-msg n8n-bot';
    div.innerHTML = formatText(text);
    document.getElementById('n8n-chat-messages').appendChild(div);
  }

  // Lấy IP user
  async function getUserIP() {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  }
function setupSuggestButtons() {
  const suggestButtons = document.querySelectorAll('.n8n-suggest');
  suggestButtons.forEach(btn => {
    btn.onclick = () => {
      const input = document.getElementById('n8n-chat-input');
      input.value = btn.textContent.trim();
      document.getElementById('n8n-chat-send').click();
    };
  });
}

  // Load lịch sử chat
async function loadChatHistory(userId) {
  try {
    const res = await fetch(
      `https://csgfylapdqpygbukgwgr.supabase.co/rest/v1/n8n_chat_histories_ebook?session_id=eq.${encodeURIComponent(userId)}&order=id.asc`,
      {
        headers: {
          apikey: 'your_api_key',
          Authorization: 'your_bearer_token'
        }
      }
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    // Nếu không có lịch sử, giữ nguyên lời chào (đã hiện sẵn)
    if (!Array.isArray(data) || data.length === 0) return;

    const msgBox = document.getElementById('n8n-chat-messages');
    msgBox.innerHTML = ''; // Chỉ xóa lời chào nếu có lịch sử

    data.forEach(msg => {
      const type = msg.message?.type;
      const content = msg.message?.content || '';

      if (type === 'human') {
        const match = content.match(/-tin nhắn:"([^"]+)"/);
        createUserMessage(match ? match[1] : content);
      } else if (type === 'ai') {
        createBotMessage(content);
      }
    });

    // Gắn event cho nút gợi ý
    document.querySelectorAll('.n8n-suggest').forEach(btn => {
      btn.onclick = () => {
        const input = document.getElementById('n8n-chat-input');
        input.value = btn.textContent.trim();
        document.getElementById('n8n-chat-send').click();
      };
    });

    setTimeout(() => {
      msgBox.scrollTop = msgBox.scrollHeight;
    }, 50);
  } catch (error) {
    console.error('Load chat history error:', error);
  }
}


  let greetingSent = false;

  // Bật chat
  chatBtn.onclick = async () => {
    chatContainer.style.display = 'flex';

    if (!greetingSent) {
      createBotMessage(`Em là Khả Như – chuyên viên tư vấn Trạm Đọc. Anh/chị cần hỗ trợ nội dung nào, có thể chọn nhanh bên dưới ạ.`);
      greetingSent = true;
    }

    const userId = await getUserIP();
    await loadChatHistory(userId);
  };

  // Đóng chat
  document.getElementById('n8n-chat-close').onclick = () => {
    chatContainer.style.display = 'none';
  };

  // Gửi tin nhắn
  document.getElementById('n8n-chat-send').onclick = async () => {
    const input = document.getElementById('n8n-chat-input');
    const text = input.value.trim();
    if (!text) return;

    createUserMessage(text);
    input.value = '';
    const msgBox = document.getElementById('n8n-chat-messages');
    msgBox.scrollTop = msgBox.scrollHeight;

    // Ẩn gợi ý
    document.getElementById('n8n-suggest-buttons').style.display = 'none';

    // Hiện typing indicator
    const typingElem = document.createElement('div');
    typingElem.id = 'n8n-typing-indicator';
    typingElem.className = 'n8n-msg n8n-typing';
    typingElem.innerHTML = `<span></span><span></span><span></span>`;
    msgBox.appendChild(typingElem);
    msgBox.scrollTop = msgBox.scrollHeight;

    try {
      const res = await fetch('https://n8n.thuhoai-academy.com/webhook/chatbotebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      document.getElementById('n8n-typing-indicator')?.remove();
      createBotMessage(data.reply);
      msgBox.scrollTop = msgBox.scrollHeight;
    } catch {
      document.getElementById('n8n-typing-indicator')?.remove();
      createBotMessage('Bot: Lỗi kết nối máy chủ');
      msgBox.scrollTop = msgBox.scrollHeight;
    }
  };

  // Nhấn enter gửi tin nhắn
  document.getElementById('n8n-chat-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.getElementById('n8n-chat-send').click();
    }
  });

  // Hiện/ẩn nút gợi ý
  document.getElementById('n8n-input-menu').addEventListener('click', () => {
    const suggestButtons = document.getElementById('n8n-suggest-buttons');
    suggestButtons.style.display = (suggestButtons.style.display === 'flex') ? 'none' : 'flex';
  });
})();
