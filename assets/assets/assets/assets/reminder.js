(() => {
  const name = (localStorage.getItem("levelup_student_name") || "").trim();

  // If student jumps straight into a tool without registering
  if (!name) {
    // comment this out if you prefer to allow direct access
    window.location.href = "../index.html";
    return;
  }

  const bar = document.createElement("div");
  bar.setAttribute("style", `
    position: fixed;
    left: 12px; right: 12px; bottom: 12px;
    z-index: 99999;
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,.18);
    background: rgba(10,12,24,.92);
    color: rgba(255,255,255,.92);
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    box-shadow: 0 18px 50px rgba(0,0,0,.45);
    backdrop-filter: blur(8px);
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
  `);

  bar.innerHTML = `
    <div style="display:flex; gap:10px; align-items:center;">
      <div style="font-size:22px;">📸</div>
      <div>
        <div style="font-weight:1000; line-height:1.1;">You can do it, ${escapeHtml(name)}!!!</div>
        <div style="opacity:.82; font-size:13px; margin-top:3px;">
          <strong>Don’t forget to screenshot and email Mr B</strong> for PBS points ⭐
        </div>
      </div>
    </div>
    <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; justify-content:flex-end;">
      <button id="luHide" type="button" style="
        cursor:pointer; font-weight:1000;
        padding:10px 12px; border-radius:14px;
        border:1px solid rgba(255,255,255,.16);
        background: rgba(255,255,255,.08);
        color: rgba(255,255,255,.92);
      ">Hide</button>
      <button id="luDone" type="button" style="
        cursor:pointer; font-weight:1000;
        padding:10px 12px; border-radius:14px;
        border:1px solid rgba(24,231,168,.35);
        background: linear-gradient(135deg, rgba(24,231,168,.95), rgba(124,92,255,.85));
        color:#071016;
      ">✅ Screenshot done</button>
    </div>
  `;

  document.body.appendChild(bar);

  bar.querySelector("#luHide").addEventListener("click", () => bar.remove());

  bar.querySelector("#luDone").addEventListener("click", () => {
    bar.innerHTML = `
      <div style="display:flex; gap:10px; align-items:center;">
        <div style="font-size:22px;">🏆</div>
        <div>
          <div style="font-weight:1000; line-height:1.1;">Nice work, ${escapeHtml(name)}!</div>
          <div style="opacity:.82; font-size:13px; margin-top:3px;">
            PBS points time ⭐ Don’t forget to email Mr B.
          </div>
        </div>
      </div>
      <button id="luClose" type="button" style="
        cursor:pointer; font-weight:1000;
        padding:10px 12px; border-radius:14px;
        border:1px solid rgba(255,255,255,.16);
        background: rgba(255,255,255,.08);
        color: rgba(255,255,255,.92);
      ">Close</button>
    `;
    bar.querySelector("#luClose").addEventListener("click", () => bar.remove());
  });

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
