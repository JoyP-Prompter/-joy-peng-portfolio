/* ==========================================================================
   彭鈺婷 Joy Peng Personal Website - Interactive Logic & AI Sandbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Header Scroll Effect & Mobile Navigation
     -------------------------------------------------------------------------- */
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy for Nav links
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Filterable Project Showcase
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     3. Project Detail Modals
     -------------------------------------------------------------------------- */
  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewProjectBtns = document.querySelectorAll('.view-project-btn');

  const projectDetailsMap = {
    'modal-p1': {
      title: 'LiveABC 智慧英語口說與寫作對話教練',
      badge: 'EdTech 教育科技創新',
      company: '希伯崙股份有限公司 (LiveABC Group) ‧ 數位發展部',
      desc: '本專案旨在解決傳統英語學習者面對外師口說時的緊張與焦慮感。由 Joy 規劃完整的 Prompt 系統架構，讓 LLM 扮演友善、幽默且具耐心的英語對話夥伴，並融入 LiveABC 經典主題教材。',
      highlights: [
        '<strong>情境引導 Prompt (Scenario-based Prompting)</strong>：設計 20+ 種商務、旅遊與日常生活對話卡片。',
        '<strong>即時寫作與口說糾錯 (Instant Grammar Feedback)</strong>：以柔和文青風格進行建議，保留學習自信。',
        '<strong>適性化難易度調整 (Adaptive Difficulty)</strong>：依據學員回覆長度與單字量，動態切換 A2 至 C1 語速與詞彙等級。'
      ]
    },
    'modal-p2': {
      title: '希伯崙數位出版內容 RAG 智慧知識庫',
      badge: 'RAG 知識庫',
      company: '希伯崙股份有限公司 數位發展部',
      desc: '希伯崙累積數十年的優質英語教學雜誌、影音與教材文本。Joy 主導將這些資產進行切片 (Chunking)、向量化 (Embeddings) 並建立語意檢索系統，為內部編輯與產品團隊賦能。',
      highlights: [
        '<strong>高效語意搜尋 (Semantic Retrieval)</strong>：編輯只需輸入「商務會議談判用語」，系統即刻比對出歷史優質句型與範例。',
        '<strong>幻覺控制 Guardrails</strong>：限制 LLM 僅基於希伯崙權威資料庫回答，確保教學文法之 100% 精確度。',
        '<strong>研發效率提升 40%</strong>：減少人工翻閱舊雜誌與檔冊之時間，大幅提升數位教材孵化速度。'
      ]
    },
    'modal-p3': {
      title: '自動化英檢題庫生成與品質評估矩陣',
      badge: '流程自動化 Workflow',
      company: '希伯崙 AI 題庫自動化工程',
      desc: '協助教學研發與英檢出版團隊，透過格式化 Prompt 與 JSON Schema 結構化輸出，批量生成符合 GEPT / TOEIC 規格之閱讀與聽力題目。',
      highlights: [
        '<strong>幾何式 Prompt 樣板 (Structured Template)</strong>：規範題目幹、選項設定、干擾項邏輯與詳細中文解析。',
        '<strong>品質評估矩陣 (Eval Benchmark)</strong>：建立自動化打分機制，預先過濾難易度不符或語意瑕疵之題型。',
        '<strong>人機協同審核介面</strong>：AI 負責初草生成，資深編輯進行最終微調與確認。'
      ]
    },
    'modal-p4': {
      title: '希伯崙全方位 GAI 實戰培訓與 Prompt 教練計畫',
      badge: '企業 AI 賦能',
      company: '希伯崙跨部門培訓專案',
      desc: '推動公司內部 AI 工具普及與數位轉型思維。Joy 設計針對行銷、編輯、IT 與行政部門的客製化課程，並編撰內部專用《Joy\'s Prompt Toolkit 實戰手冊》。',
      highlights: [
        '<strong>超過 15 場實戰工作坊</strong>：覆蓋百位同仁，學員滿意度達 96% 以上。',
        '<strong>部門專屬應用場景解法</strong>：例如「行銷短影音腳本生成」、「英文稿件快速潤飾」與「數據自動摘要」。',
        '<strong>AI 創新文化建立</strong>：鼓勵同仁提案 AI 改善流程，打造學習型 AI Native 團隊。'
      ]
    }
  };

  viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const data = projectDetailsMap[modalId];
      if (data) {
        modalBody.innerHTML = `
          <span class="project-badge" style="margin-bottom: 12px; display:inline-block;">${data.badge}</span>
          <h2 style="font-size: 1.5rem; color: var(--primary-dark); margin-bottom: 6px;">${data.title}</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;"><i class="fa-solid fa-building"></i> ${data.company}</p>
          <p style="font-size: 0.98rem; line-height: 1.7; color: var(--text-main); margin-bottom: 20px;">${data.desc}</p>
          <h4 style="font-size: 1.05rem; color: var(--primary); margin-bottom: 12px;"><i class="fa-solid fa-star"></i> 核心亮點與規劃心法：</h4>
          <ul style="display:flex; flex-direction:column; gap:12px; font-size:0.92rem; color:var(--text-muted); padding-left:20px;">
            ${data.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        `;
        modalOverlay.classList.add('open');
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Interactive AI Sandbox (Joy's Prompt Architect)
     -------------------------------------------------------------------------- */
  const genPromptBtn = document.getElementById('generate-prompt-btn');
  const sbScenarioSelect = document.getElementById('sb-scenario');
  const sbToneSelect = document.getElementById('sb-tone');
  const sbUserInput = document.getElementById('sb-user-input');

  const pTabs = document.querySelectorAll('.p-tab');
  const pPanes = document.querySelectorAll('.p-pane');

  const codeSystemPrompt = document.getElementById('code-system-prompt');
  const flowDiagramContent = document.getElementById('flow-diagram-content');
  const aiSimChatBox = document.getElementById('ai-sim-chat-box');

  pTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pTabs.forEach(t => t.classList.remove('active'));
      pPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPaneId = `pane-${tab.getAttribute('data-ptab')}`;
      document.getElementById(targetPaneId).classList.add('active');
    });
  });

  function generateSandboxBlueprint() {
    const scenario = sbScenarioSelect.value;
    const tone = sbToneSelect.value;
    const userGoal = sbUserInput.value || '優化語言學習與英語互動體驗';

    let toneDesc = '溫和且富有文青氣息，鼓勵學習者展現好奇心';
    if (tone === 'professional') toneDesc = '嚴謹且結構化，強調精確度與資料完整性';
    if (tone === 'lively') toneDesc = '活潑幽默且富有動感，多運用表情符號與親切語調';

    // 1. System Prompt Template
    const systemPromptText = `[System Role & Identity]
You are an intelligent AI Assistant engineered by Joy Peng (AI Application Planner at Hebron / LiveABC Group).
Your mission is to execute: "${userGoal}".

[Personality & Tone Guidelines]
- Persona: ${toneDesc}
- Communication Style: Clean, elegant, fresh blue aesthetic vibe (水藍色小清新).
- Language: Traditional Chinese (繁體中文) with standard English learning context.

[Operational Workflow]
1. Receive user query or context.
2. Filter through RAG knowledge base rules.
3. Structure response with key insights, examples, and encouraging feedback.
4. Keep output engaging, concise, and structured.`;

    codeSystemPrompt.textContent = systemPromptText;

    // 2. Flow Diagram Steps
    flowDiagramContent.innerHTML = `
      <div class="flow-step">
        <div class="flow-step-num">1</div>
        <div class="flow-step-text">
          <strong>使用者需求接收 (Input Ingestion)</strong>
          <small>目標: "${userGoal.substring(0, 30)}..."</small>
        </div>
      </div>
      <div class="flow-step">
        <div class="flow-step-num">2</div>
        <div class="flow-step-text">
          <strong>Joy's Prompt 樣板注入 (Prompt Engineering)</strong>
          <small>語調設定: ${sbToneSelect.options[sbToneSelect.selectedIndex].text}</small>
        </div>
      </div>
      <div class="flow-step">
        <div class="flow-step-num">3</div>
        <div class="flow-step-text">
          <strong>希伯崙 LiveABC 知識庫比對 (RAG Filtering)</strong>
          <small>確認文法正確度、例句道地度與語意過濾</small>
        </div>
      </div>
      <div class="flow-step">
        <div class="flow-step-num">4</div>
        <div class="flow-step-text">
          <strong>人機互動輸出 (Interactive Feedback)</strong>
          <small>即時呈現擬真對話與引導動作 (CTA)</small>
        </div>
      </div>
    `;

    // 3. AI Sim Response
    let simText = '';
    if (scenario === 'english_tutor') {
      simText = `✨【LiveABC AI 英語對話教練】<br><br>
"Welcome to our cozy cafe conversation! ☕<br>
聽說你今天想聊聊商務咖啡廳的點餐技巧？別緊張，讓我們用最輕鬆的方式練習！<br><br>
👉 <strong>Try saying this:</strong><br>
<em>'Hi, I'd like a medium iced latte with oat milk, please.'</em><br><br>
💡 <strong>Joy's Note:</strong> 在道地的英語對話中，用 <em>'I'd like'</em> 比 <em>'I want'</em> 更顯客氣優雅喔！你準備好試試看下一句了嗎？"`;
    } else if (scenario === 'content_editor') {
      simText = `📚【數位出版 AI 提煉助手】<br><br>
"已為您完成文章關鍵字與文青風標題提煉：<br><br>
1. <strong>《在科技與詩意間棲居：AI 時代的語言學習新法》</strong><br>
2. <strong>《輕盈如藍天的 Prompt 哲學：希伯崙數位創新筆記》</strong><br><br>
摘要精華：結合 RAG 技術與人本思維，將原本繁複的語法練習轉化為直覺、溫暖的日常互動。"`;
    } else {
      simText = `⚙️【企業跨部門 AI 工作流助理】<br><br>
"已成功建立『Joy's GAI 工作坊範本工作流』！<br>
已將跨部門同仁的回饋歸納為三大模組：<br>
- 行銷部門：快速生成 FB / IG 雙語圖案貼文文案<br>
- 編輯部門：自動化初審與語意校對<br>
- 行政部門：會議紀錄摘要與交辦事項萃取"`;
    }

    aiSimChatBox.innerHTML = `<div class="ai-sim-msg">${simText}</div>`;

    showToast('✨ 已成功生成 Joy 的 AI 應用規劃雛型！');
  }

  if (genPromptBtn) {
    genPromptBtn.addEventListener('click', generateSandboxBlueprint);
    // Initial run
    generateSandboxBlueprint();
  }

  /* --------------------------------------------------------------------------
     5. Literary Quotes & Thought Switcher ("每日文青 AI 語錄")
     -------------------------------------------------------------------------- */
  const quotesList = [
    {
      text: "「在希伯崙數位發展部，我們每天處理許多演算法與模型。但最重要的，永遠是使用者眼神裡的點頭與喜悅。當技術變得隱形，溫暖與學習的樂趣才會展現出來。」",
      author: "—— 彭鈺婷 Joy Peng 隨筆 ‧ 2026"
    },
    {
      text: "「Prompt 工程不僅僅是撰寫指令，更是與 AI 共同創作的詩篇。精準的文字能照亮靈魂，喚醒科技背後的人文溫度。」",
      author: "—— Joy Peng《AI 應用規劃心法》"
    },
    {
      text: "「語言是通往世界的窗戶，而 Generative AI 是幫我們把窗戶擦得更明亮的陽光。讓 LiveABC 的英語學習變得無壓力、有溫度。」",
      author: "—— 彭鈺婷 ‧ 教育科技探索"
    },
    {
      text: "「水藍色的思考是平靜而深遠的。在喧囂的 AI 浪潮中，保持文青式的沉靜與專注，才能做出真正打動人心的產品。」",
      author: "—— Joy Peng 靈感筆記"
    }
  ];

  let currentQuoteIndex = 0;
  const quoteTextEl = document.getElementById('quote-text');
  const quoteAuthorEl = document.getElementById('quote-author');
  const nextQuoteBtn = document.getElementById('next-quote-btn');

  if (nextQuoteBtn) {
    nextQuoteBtn.addEventListener('click', () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotesList.length;
      const q = quotesList[currentQuoteIndex];
      
      const quoteDisplay = document.getElementById('quote-display');
      quoteDisplay.style.opacity = '0';
      quoteDisplay.style.transform = 'translateY(10px)';
      quoteDisplay.style.transition = 'all 0.3s ease';

      setTimeout(() => {
        quoteTextEl.textContent = q.text;
        quoteAuthorEl.textContent = q.author;
        quoteDisplay.style.opacity = '1';
        quoteDisplay.style.transform = 'translateY(0)';
      }, 300);
    });
  }

  /* --------------------------------------------------------------------------
     6. Interactive Virtual AI Assistant Floating Widget (AI Joy Chatbot)
     -------------------------------------------------------------------------- */
  const chatBubbleBtn = document.getElementById('chat-bubble-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const quickChips = document.querySelectorAll('.chip-btn');
  const openChatHeroBtn = document.getElementById('open-chat-hero');

  function toggleChatWindow() {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      chatInput.focus();
    }
  }

  if (chatBubbleBtn) chatBubbleBtn.addEventListener('click', toggleChatWindow);
  if (chatCloseBtn) chatCloseBtn.addEventListener('click', toggleChatWindow);
  if (openChatHeroBtn) openChatHeroBtn.addEventListener('click', () => {
    if (!chatWindow.classList.contains('open')) toggleChatWindow();
  });

  const aiKnowledgeBase = [
    {
      keywords: ['希伯崙', 'LiveABC', '部門', '職務', '工作', '誰', '彭鈺婷'],
      reply: '彭鈺婷 (Joy Peng) 目前任職於<strong>希伯崙股份有限公司 (LiveABC Group) 數位發展部</strong>，擔任 <strong>AI 應用規劃師</strong>。主要負責 Generative AI 應用落地、語言教育產品升級、RAG 智慧知識庫搭建與全公司 GAI 培訓。'
    },
    {
      keywords: ['專案', '作品', '代表作', '教育', '英檢'],
      reply: 'Joy 在希伯崙主導的代表專案包含：<br>1. <strong>LiveABC 智慧英語對話教練</strong><br>2. <strong>希伯崙數位出版內容 RAG 知識庫</strong><br>3. <strong>自動化英檢題庫生成與品質評估矩陣</strong><br>4. <strong>企業 GAI 跨部門工作坊與 Prompt 手冊</strong>。可以在網站的「代表專案」區塊查看詳情喔！'
    },
    {
      keywords: ['心法', '理念', '哲學', '風格', '文青'],
      reply: 'Joy 的核心信念是：<em>「用溫暖的科技，轉化語言學習與數位創新。」</em><br>她喜歡以水藍色小清新的文青視角來規劃 AI，主張演算法再精密也需要人文關懷與情感洞察，讓 Prompt 成為探索智慧的詩篇。'
    },
    {
      keywords: ['聯絡', '信箱', 'email', '合作', '講座', '工作坊', '諮詢'],
      reply: '歡迎透過公務信箱連繫 Joy：<br>📧 <a href="mailto:joy.peng@hebron.com.tw" style="color:var(--primary); font-weight:bold;">joy.peng@hebron.com.tw</a><br>無論是 AI 專案合作、LiveABC 教育科技交流或企業 Prompt 工作坊邀約，都非常歡迎！'
    }
  ];

  function addChatMessage(content, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isUser ? 'msg-user' : 'msg-ai'}`;
    msgDiv.innerHTML = `<div class="msg-content">${content}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function processUserChatQuery(query) {
    if (!query.trim()) return;
    addChatMessage(query, true);
    chatInput.value = '';

    // Simulate thinking delay
    setTimeout(() => {
      let matchedReply = null;
      const lowerQ = query.toLowerCase();

      for (const item of aiKnowledgeBase) {
        if (item.keywords.some(kw => lowerQ.includes(kw))) {
          matchedReply = item.reply;
          break;
        }
      }

      if (!matchedReply) {
        matchedReply = `謝謝你的提問！關於「${query}」，Joy 認為 AI 規劃的核心在於清楚的邏輯與貼心的 UX 流程。若有深入專案合作意向，歡迎透過下方表單或 Email (<a href="mailto:joy.peng@hebron.com.tw" style="color:var(--primary);">joy.peng@hebron.com.tw</a>) 與 Joy 聯繫喔！✨`;
      }

      addChatMessage(matchedReply, false);
    }, 600);
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      processUserChatQuery(chatInput.value);
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const qText = chip.getAttribute('data-q');
      processUserChatQuery(qText);
    });
  });

  /* --------------------------------------------------------------------------
     7. Contact Form Handling & Toast Notification
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      
      showToast(`✨ 感謝 ${name}！您的訊息已成功傳送給 彭鈺婷 Joy Peng。`);
      contactForm.reset();
    });
  }

  function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--primary); font-size:1.1rem;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-30px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

});
