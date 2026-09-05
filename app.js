// Đọc tên khách từ ?to= / ?ten= / ?guest= / ?id=
function getGuestName() {
  const p = new URLSearchParams(location.search);
  const raw = p.get("to") || p.get("ten") || p.get("guest") || p.get("id") || "";
  const name = raw.trim().replace(/\+/g, " ");
  return name ? decodeURIComponent(name) : "";
}

function fillStatic() {
  document.getElementById("schoolLine").textContent = CONFIG.school;
  document.getElementById("heroNote").textContent = CONFIG.heroNote;
  document.getElementById("eventDateText").textContent = "📅 " + CONFIG.eventDateText;
  document.getElementById("timeText").textContent = CONFIG.eventDateText;
  document.getElementById("roomText").textContent = CONFIG.room;
  document.getElementById("addressText").textContent = CONFIG.address;
  document.getElementById("mapsBtn").href = CONFIG.mapsUrl;
  document.getElementById("fabMaps").href = CONFIG.mapsUrl;
  document.getElementById("phoneText").textContent = CONFIG.phone;
  document.getElementById("phoneLink").href = CONFIG.phoneHref;
  document.getElementById("callBtn").href = CONFIG.phoneHref;
  document.getElementById("fabCall").href = CONFIG.phoneHref;
  document.getElementById("zaloBtn").href = CONFIG.zaloUrl;

  const guest = getGuestName();
  if (guest) {
    document.getElementById("guestName").textContent = guest;
    document.getElementById("fName").value = guest;
  }
  const hint = document.getElementById("sheetHint");
  hint.textContent = CONFIG.googleScriptUrl
    ? "Form đang kết nối Google Sheet ✔"
    : "Chế độ demo: chưa gắn Google Sheet (làm theo SHEET_SETUP.md để bật lưu thật).";
}

function startCountdown() {
  const target = new Date(CONFIG.eventDateISO).getTime();
  const d = document.getElementById("cdD"),
    h = document.getElementById("cdH"),
    m = document.getElementById("cdM"),
    s = document.getElementById("cdS");
  if (isNaN(target)) { d.textContent = h.textContent = m.textContent = s.textContent = "--"; return; }
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) { d.textContent = "0"; h.textContent = "0"; m.textContent = "0"; s.textContent = "0"; return; }
    d.textContent = Math.floor(diff / 864e5);
    h.textContent = Math.floor(diff / 36e5) % 24;
    m.textContent = Math.floor(diff / 6e4) % 60;
    s.textContent = Math.floor(diff / 1e3) % 60;
  }
  tick(); setInterval(tick, 1000);
}

async function submitRSVP(e) {
  e.preventDefault();
  const msg = document.getElementById("formMsg");
  const btn = document.getElementById("submitBtn");
  const data = {
    name: document.getElementById("fName").value.trim(),
    attend: document.getElementById("fAttend").value,
    count: Number(document.getElementById("fCount").value || 1),
    wish: document.getElementById("fWish").value.trim(),
    guestParam: getGuestName(),
    pageUrl: location.href,
    userAgent: navigator.userAgent,
  };
  if (!data.name) { msg.className = "form-msg err"; msg.textContent = "Vui lòng nhập tên."; return; }
  btn.disabled = true; btn.textContent = "Đang gửi...";
  msg.className = "form-msg"; msg.textContent = "";

  // Chưa cấu hình Sheet -> lưu demo local
  if (!CONFIG.googleScriptUrl) {
    await new Promise(r => setTimeout(r, 600));
    const key = "rsvp-demo";
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.push({ ...data, time: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(arr));
    msg.className = "form-msg ok";
    msg.textContent = `Cảm ơn ${data.name}! (Demo) Hân sẽ bật lưu Google Sheet sau nhé 💗`;
    btn.disabled = false; btn.textContent = "Gửi xác nhận";
    return;
  }

  try {
    // Dùng text/plain để tránh preflight CORS với Apps Script
    await fetch(CONFIG.googleScriptUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
    msg.className = "form-msg ok";
    msg.textContent = `Cảm ơn ${data.name}! Hân đã nhận xác nhận 💗`;
    document.getElementById("fWish").value = "";
  } catch (err) {
    msg.className = "form-msg err";
    msg.textContent = "Gửi lỗi mạng, bạn thử lại hoặc nhắn Zalo cho Hân nhé.";
  } finally {
    btn.disabled = false; btn.textContent = "Gửi xác nhận";
  }
}

fillStatic();
startCountdown();
document.getElementById("rsvpForm").addEventListener("submit", submitRSVP);

/* Confetti nhẹ tự code (không thư viện) */
let confettiOn = true, parts = [];
function initConfetti() {
  const c = document.getElementById("confetti");
  const ctx = c.getContext("2d");
  function resize() { c.width = innerWidth; c.height = innerHeight; }
  resize(); addEventListener("resize", resize);
  const colors = ["#ec5f8c", "#ffb3c7", "#ffd9a0", "#fff3e0", "#ff8fab"];
  for (let i = 0; i < 70; i++) parts.push({
    x: Math.random() * innerWidth, y: Math.random() * -innerHeight,
    w: 5 + Math.random() * 6, h: 8 + Math.random() * 8,
    vy: 1 + Math.random() * 2, vx: -1 + Math.random() * 2,
    r: Math.random() * Math.PI, vr: -.05 + Math.random() * .1,
    col: colors[i % colors.length],
  });
  (function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, c.width, c.height);
    if (!confettiOn) return;
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.r += p.vr;
      if (p.y > innerHeight + 20) { p.y = -20; p.x = Math.random() * innerWidth; }
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.col; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
  })();
  document.getElementById("confettiBtn").onclick = () => { confettiOn = !confettiOn; };
}
initConfetti();

/* Nhạc nền: cần file music.mp3 cùng thư mục */
(function initMusic() {
  const audio = document.getElementById("bgm");
  const btn = document.getElementById("musicBtn");
  let playing = false;
  btn.onclick = async () => {
    try {
      if (!playing) { await audio.play(); playing = true; btn.textContent = "⏸ Tắt nhạc"; }
      else { audio.pause(); playing = false; btn.textContent = "🎵 Bật nhạc"; }
    } catch (e) {
      alert("Chưa có file music.mp3. Bạn gửi nhạc cho mình, mình gắn vào nhé.");
    }
  };
  audio.addEventListener("error", () => { if (playing) { playing = false; btn.textContent = "🎵 Bật nhạc"; } });
})();
