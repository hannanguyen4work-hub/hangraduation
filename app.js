function getGuestName() {
  const p = new URLSearchParams(location.search);
  const raw = p.get("to") || p.get("ten") || p.get("guest") || p.get("id") || "";
  try { return raw.trim().replace(/\+/g, " ") ? decodeURIComponent(raw.trim()) : ""; }
  catch { return raw.trim(); }
}

function fillStatic() {
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set("schoolLine", CONFIG.school + " · " + CONFIG.major);
  set("heroNote", CONFIG.heroNote);
  set("eventDateText", "📅 " + CONFIG.eventDateText);
  set("timeText", CONFIG.eventDateText);
  set("roomText", CONFIG.room);
  set("addressText", CONFIG.address);
  set("phoneText", CONFIG.phone);
  set("letterText", CONFIG.letter);
  const maps = CONFIG.mapsUrl;
  ["mapsBtn", "fabMaps"].forEach(id => { const a = document.getElementById(id); if (a) a.href = maps; });
  ["phoneLink", "callBtn", "fabCall"].forEach(id => {
    const a = document.getElementById(id);
    if (a) a.href = CONFIG.phoneHref;
  });
  const zalo = document.getElementById("zaloBtn");
  if (zalo) zalo.href = CONFIG.zaloUrl;

  const guest = getGuestName();
  if (guest) {
    set("guestName", guest);
    const f = document.getElementById("fName");
    if (f) f.value = guest;
  }
  const link = document.getElementById("myLink");
  if (link) link.textContent = location.href.length < 90 ? location.href : CONFIG.baseUrl + (guest ? "?to=" + encodeURIComponent(guest) : "");
  const hint = document.getElementById("sheetHint");
  if (hint) hint.textContent = CONFIG.googleScriptUrl ? "Trạng thái: đã nối Google Sheet." : "Trạng thái: chế độ demo (chưa gắn Google Sheet — xem SHEET_SETUP.md).";
}

function startCountdown() {
  const t = new Date(CONFIG.eventDateISO).getTime();
  const els = { d: cdD, h: cdH, m: cdM, s: cdS };
  if (isNaN(t)) return;
  const tick = () => {
    let diff = Math.max(0, t - Date.now());
    els.d.textContent = Math.floor(diff / 864e5);
    els.h.textContent = String(Math.floor(diff / 36e5) % 24).padStart(2, "0");
    els.m.textContent = String(Math.floor(diff / 6e4) % 60).padStart(2, "0");
    els.s.textContent = String(Math.floor(diff / 1e3) % 60).padStart(2, "0");
  };
  tick(); setInterval(tick, 1000);
}

async function submitRSVP(e) {
  e.preventDefault();
  const msg = document.getElementById("formMsg"), btn = document.getElementById("submitBtn");
  const data = {
    name: fName.value.trim(), attend: fAttend.value,
    count: Number(fCount.value || 1), wish: fWish.value.trim(),
    guestParam: getGuestName(), pageUrl: location.href,
  };
  if (!data.name) { msg.className = "form-msg err"; msg.textContent = "Vui lòng nhập tên."; return; }
  btn.disabled = true; btn.textContent = "Đang gửi..."; msg.textContent = "";
  if (!CONFIG.googleScriptUrl) {
    await new Promise(r => setTimeout(r, 500));
    const k = "rsvp-demo", arr = JSON.parse(localStorage.getItem(k) || "[]");
    arr.push({ ...data, time: new Date().toISOString() });
    localStorage.setItem(k, JSON.stringify(arr));
    msg.className = "form-msg ok"; msg.textContent = `Cảm ơn ${data.name}! Hân đã ghi nhận (demo).`;
    btn.disabled = false; btn.textContent = "Gửi xác nhận"; return;
  }
  try {
    await fetch(CONFIG.googleScriptUrl, { method: "POST", body: JSON.stringify(data) });
    msg.className = "form-msg ok"; msg.textContent = `Cảm ơn ${data.name}! Hân đã nhận xác nhận.`;
    fWish.value = "";
  } catch {
    msg.className = "form-msg err"; msg.textContent = "Lỗi mạng, bạn thử lại hoặc nhắn Zalo cho Hân nhé.";
  } finally { btn.disabled = false; btn.textContent = "Gửi xác nhận"; }
}

/* Confetti gọn, tôn trọng reduced-motion */
let confettiOn = !matchMedia("(prefers-reduced-motion: reduce)").matches;
(function confetti() {
  const c = document.getElementById("confetti"), ctx = c.getContext("2d");
  const resize = () => { c.width = innerWidth; c.height = innerHeight; };
  resize(); addEventListener("resize", resize);
  const colors = ["#d94f7e", "#f2a7c0", "#f6d9a8", "#fff3e2"];
  const ps = Array.from({ length: 60 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * -innerHeight,
    w: 5 + Math.random() * 5, h: 7 + Math.random() * 7,
    vy: 1 + Math.random() * 1.8, vx: -.6 + Math.random() * 1.2,
    r: Math.random() * 3, vr: -.04 + Math.random() * .08, col: colors[Math.random() * 4 | 0],
  }));
  (function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, c.width, c.height);
    if (!confettiOn) return;
    for (const p of ps) {
      p.x += p.vx; p.y += p.vy; p.r += p.vr;
      if (p.y > innerHeight + 20) { p.y = -20; p.x = Math.random() * innerWidth; }
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.col; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    }
  })();
  document.getElementById("confettiBtn")?.addEventListener("click", e => {
    confettiOn = !confettiOn; e.target.textContent = confettiOn ? "Bật/tắt hoa giấy" : "Bật/tắt hoa giấy";
  });
})();

/* Nhạc: cần file music.mp3 */
(function music() {
  const a = document.getElementById("bgm"), b = document.getElementById("musicBtn");
  let on = false;
  b?.addEventListener("click", async () => {
    try {
      if (!on) { await a.play(); on = true; b.textContent = "⏸"; }
      else { a.pause(); on = false; b.textContent = "♫"; }
    } catch { alert("Chưa có file music.mp3 trong thư mục web."); }
  });
})();

document.getElementById("copyLink")?.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(location.href); copyLink.textContent = "Đã chép!"; }
  catch { copyLink.textContent = "Copy tay nhé"; }
});

fillStatic(); startCountdown();
document.getElementById("rsvpForm").addEventListener("submit", submitRSVP);
