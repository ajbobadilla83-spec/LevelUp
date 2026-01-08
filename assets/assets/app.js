const LevelUp = (() => {
  const NAME_KEY = "levelup_student_name";

  function getName() {
    return (localStorage.getItem(NAME_KEY) || "").trim();
  }

  function setName(name) {
    localStorage.setItem(NAME_KEY, name.trim());
  }

  function sanitizeName(name) {
    return name.replace(/[^\p{L}\p{N}\s'-]/gu, "").trim().slice(0, 30);
  }

  function requireName() {
    if (!getName()) window.location.href = "index.html";
  }

  function initIndex() {
    const form = document.getElementById("nameForm");
    const input = document.getElementById("studentName");

    const existing = getName();
    if (existing) input.value = existing;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = sanitizeName(input.value);
      if (!name) return;
      setName(name);
      window.location.href = "hub.html";
    });
  }

  function openModal({ title, text, href }) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalGo = document.getElementById("modalGo");
    const modalCancel = document.getElementById("modalCancel");

    modalTitle.textContent = title;
    modalText.textContent = text;
    modalGo.setAttribute("href", href);

    function close() {
      modal.setAttribute("aria-hidden", "true");
      modal.classList.remove("open");
      modalCancel.removeEventListener("click", close);
      modal.removeEventListener("click", onBackdrop);
      document.removeEventListener("keydown", onEsc);
    }

    function onBackdrop(e) {
      if (e.target === modal) close();
    }

    function onEsc(e) {
      if (e.key === "Escape") close();
    }

    modalCancel.addEventListener("click", close);
    modal.addEventListener("click", onBackdrop);
    document.addEventListener("keydown", onEsc);

    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("open");
  }

  function initHub() {
    requireName();

    const name = getName();
    const welcomeLine = document.getElementById("welcomeLine");
    const footerLine = document.getElementById("footerLine");
    const changeNameBtn = document.getElementById("changeNameBtn");
    const toolsGrid = document.getElementById("toolsGrid");

    welcomeLine.textContent = `You can do it, ${name}!!! 💪`;
    footerLine.textContent = `Playing as: ${name} — Don’t forget to screenshot and email Mr B for PBS points ⭐`;

    changeNameBtn.addEventListener("click", () => {
      localStorage.removeItem(NAME_KEY);
      window.location.href = "index.html";
    });

    const tools = window.LEVELUP_TOOLS || [];
    toolsGrid.innerHTML = tools.map((t, idx) => {
      return `
        <button class="tool" type="button" data-href="${t.href}" data-title="${escapeHtml(t.title)}">
          <div class="tool-emoji">${t.emoji || "⭐"}</div>
          <div class="tool-main">
            <div class="tool-title">${escapeHtml(t.title)}</div>
            <div class="tool-sub">${escapeHtml(t.subtitle || "")}</div>
          </div>
          <div class="tool-go">Start ➜</div>
        </button>
      `;
    }).join("");

    toolsGrid.querySelectorAll(".tool").forEach(btn => {
      btn.addEventListener("click", () => {
        const href = btn.getAttribute("data-href");
        const toolTitle = btn.getAttribute("data-title") || "your tool";
        openModal({
          title: `Ready, ${name}?`,
          text: `You’re about to start: ${toolTitle}. Give it your best!`,
          href
        });
      });
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  return { initIndex, initHub };
})();
