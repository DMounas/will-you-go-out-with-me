/* ========================================================
   WILL YOU GO OUT WITH ME - LOGIC & MOBILE INTERACTIONS
   ======================================================== */

(() => {
  // --- 1. URL Parameters & Customization ---
  const urlParams = new URLSearchParams(window.location.search);
  const recipientName = urlParams.get('to') || 'Pritishmita';
  const senderName = urlParams.get('from') || 'dmounas';
  const customPhone = urlParams.get('phone') || '919395240600'; // Debangshu / dmounas phone

  // Inject Names into DOM
  document.querySelectorAll('.recipient-name').forEach(el => el.textContent = recipientName);
  document.querySelectorAll('.sender-sig').forEach(el => el.textContent = `${senderName} 💖`);
  const hostVal = document.querySelector('.ticket-row:last-child .t-val');
  if (hostVal) hostVal.textContent = `${senderName} 🥰`;

  // --- 2. Web Audio 8-bit Sound Synthesizer ---
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.12, volume = 0.15) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  function playClick() {
    initAudio();
    playTone(520, 'square', 0.08, 0.1);
  }

  function playSadBoop() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.28);
    } catch (e) {}
  }

  function playVictoryFanfare() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    const notes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.14 }, // G5
      { f: 1046.50, d: 0.35 } // C6
    ];
    let time = audioCtx.currentTime;
    notes.forEach((note) => {
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(note.f, time);
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(time);
        osc.stop(time + note.d);
        time += note.d * 0.85;
      } catch (e) {}
    });
  }

  function playLockSound() {
    initAudio();
    playTone(440, 'triangle', 0.08, 0.15);
    setTimeout(() => playTone(880, 'sine', 0.2, 0.15), 90);
  }

  // Sound Button Toggle
  const soundBtn = document.getElementById('sound-btn');
  const soundIcon = document.getElementById('sound-icon');
  soundBtn.addEventListener('click', () => {
    initAudio();
    soundEnabled = !soundEnabled;
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    if (soundEnabled) playClick();
  });

  // Haptic feedback for mobile
  function vibrate(pattern = [25]) {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }

  // --- 3. Screen Navigation Manager ---
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // --- 4. Screen 1: The Evasive "No" Button ---
  const noMessages = [
    "Are you sure? 🥺",
    "Babe please... 🥹",
    "I'm gonna cry.. 😭",
    "Heart broken </3 💔",
    "Don't do this to me! 😿",
    "Look how big YES is getting! 👀",
    "Resistance is futile, say YES! 💖",
    "You literally can't say no! 🥰"
  ];

  const sadGifs = [
    'assets/images/sad0.gif',
    'assets/images/sad1.gif',
    'assets/images/sad2.gif',
    'assets/images/sad3.gif',
    'assets/images/sad4.gif'
  ];

  let noClickCount = 0;
  let yesScale = 1;
  let noScale = 1;

  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const microcopy = document.getElementById('no-microcopy');
  const proposalGif = document.getElementById('proposal-gif');

  function handleNoAction(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    initAudio();
    playSadBoop();
    vibrate([30, 25, 30]);

    // Update microcopy
    const msg = noMessages[noClickCount % noMessages.length];
    microcopy.textContent = msg;
    microcopy.style.animation = 'none';
    void microcopy.offsetWidth; // trigger reflow
    microcopy.style.animation = 'shake 0.3s ease';

    // Update GIF to increasingly sadder version
    proposalGif.src = sadGifs[noClickCount % sadGifs.length];

    // Scale Yes up and No down
    yesScale += 0.28;
    noScale = Math.max(0.35, noScale - 0.12);

    btnYes.style.transform = `scale(${yesScale})`;
    btnNo.style.transform = `scale(${noScale})`;

    // Mobile evasion: after 2 attempts, dodge slightly on screen
    if (noClickCount >= 2) {
      const offsetX = (Math.random() - 0.5) * 80;
      const offsetY = (Math.random() - 0.5) * 40;
      btnNo.style.transform = `scale(${noScale}) translate(${offsetX}px, ${offsetY}px)`;
    }

    noClickCount++;
  }

  btnNo.addEventListener('click', handleNoAction);
  btnNo.addEventListener('touchstart', handleNoAction, { passive: false });

  // Yes button handler
  btnYes.addEventListener('click', () => {
    initAudio();
    playVictoryFanfare();
    vibrate([40, 40, 80, 40, 120]);
    launchConfetti();
    showScreen('screen-yay');
  });

  // --- 5. Screen 2: Yay -> Plan Date ---
  const btnContinuePlan = document.getElementById('btn-continue-plan');
  btnContinuePlan.addEventListener('click', () => {
    playClick();
    vibrate();
    showScreen('screen-date');
  });

  // --- 6. Screen 3: Date Picker Logic ---
  const datePicker = document.getElementById('date-picker');
  const formattedDateText = document.getElementById('formatted-date-text');
  const btnContinueActivity = document.getElementById('btn-continue-activity');
  const quickPills = document.querySelectorAll('.quick-pill');

  let selectedDateObj = null;

  // Set min date to today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  datePicker.min = `${yyyy}-${mm}-${dd}`;

  function formatDateFriendly(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function applyDate(date) {
    selectedDateObj = date;
    const dateStr = date.toISOString().split('T')[0];
    datePicker.value = dateStr;
    formattedDateText.textContent = formatDateFriendly(date);
    btnContinueActivity.removeAttribute('disabled');
  }

  datePicker.addEventListener('change', () => {
    if (datePicker.value) {
      initAudio();
      playClick();
      vibrate();
      const [y, m, d] = datePicker.value.split('-').map(Number);
      const chosen = new Date(y, m - 1, d);
      quickPills.forEach(p => p.classList.remove('selected'));
      applyDate(chosen);
    }
  });

  // Quick pick pills
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      initAudio();
      playClick();
      vibrate();
      quickPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');

      const daysVal = pill.getAttribute('data-days');
      const target = new Date();

      if (daysVal === '0') {
        // Today
      } else if (daysVal === '1') {
        target.setDate(target.getDate() + 1);
      } else if (daysVal === 'weekend') {
        const dayOfWeek = target.getDay(); // 0 is Sun, 6 is Sat
        const diff = (6 - dayOfWeek + 7) % 7 || 7;
        target.setDate(target.getDate() + diff);
      } else if (daysVal === 'next-sat') {
        const dayOfWeek = target.getDay();
        const diff = ((6 - dayOfWeek + 7) % 7 || 7) + 7;
        target.setDate(target.getDate() + diff);
      }

      applyDate(target);
    });
  });

  // Auto-select upcoming weekend by default for immediate convenience
  const defaultSat = new Date();
  const dayOfWeek = defaultSat.getDay();
  const diffToSat = (6 - dayOfWeek + 7) % 7 || 1;
  defaultSat.setDate(defaultSat.getDate() + diffToSat);
  applyDate(defaultSat);

  btnContinueActivity.addEventListener('click', () => {
    playClick();
    vibrate();
    showScreen('screen-activity');
  });

  // --- 7. Screen 4: Activity Selector ---
  const activityCards = document.querySelectorAll('.activity-card');
  const btnLockIn = document.getElementById('btn-lock-in');
  const customWishInput = document.getElementById('custom-wish');
  const selectedActivities = new Set(['Café & Chai Date']); // default

  // Highlight initial default
  activityCards.forEach(card => {
    if (card.getAttribute('data-activity') === 'Café & Chai Date') {
      card.classList.add('selected');
    }
  });
  btnLockIn.removeAttribute('disabled');

  activityCards.forEach(card => {
    card.addEventListener('click', () => {
      initAudio();
      playClick();
      vibrate();
      const activity = card.getAttribute('data-activity');
      if (selectedActivities.has(activity)) {
        selectedActivities.delete(activity);
        card.classList.remove('selected');
      } else {
        selectedActivities.add(activity);
        card.classList.add('selected');
      }

      if (selectedActivities.size > 0) {
        btnLockIn.removeAttribute('disabled');
      } else {
        btnLockIn.setAttribute('disabled', 'true');
      }
    });
  });

  // Lock It In Click
  btnLockIn.addEventListener('click', () => {
    initAudio();
    playLockSound();
    playVictoryFanfare();
    vibrate([50, 40, 100, 40, 150]);
    launchConfetti(80);

    // Populate Ticket Data
    const formattedDate = selectedDateObj ? formatDateFriendly(selectedDateObj) : 'Soon ❤️';
    const activityList = Array.from(selectedActivities).join(' + ');
    const customWish = customWishInput.value.trim();

    document.getElementById('ticket-date-val').textContent = formattedDate;
    document.getElementById('ticket-activity-val').textContent = activityList;

    const noteRow = document.getElementById('ticket-note-row');
    const noteVal = document.getElementById('ticket-note-val');
    if (customWish) {
      noteVal.textContent = `"${customWish}"`;
      noteRow.style.display = 'flex';
    } else {
      noteRow.style.display = 'none';
    }

    // Configure WhatsApp Button
    const waBtn = document.getElementById('btn-whatsapp-share');
    let waText = `Hey ${senderName}! 🥰 I said YES to our date! 💖\n\n📅 Date: ${formattedDate}\n🎀 Activity: ${activityList}`;
    if (customWish) {
      waText += `\n✨ Special Wish: "${customWish}"`;
    }
    waText += `\n\nI can't wait! xoxo 💕`;

    const encodedMsg = encodeURIComponent(waText);
    const waBase = customPhone ? `https://wa.me/${customPhone}` : `https://api.whatsapp.com/send`;
    waBtn.href = `${waBase}?text=${encodedMsg}`;

    showScreen('screen-confirmed');
  });

  // --- 8. Screen 5: Love Note Modal ---
  const letterModal = document.getElementById('letter-modal');
  const btnOpenLetter = document.getElementById('btn-open-letter');
  const btnCloseLetter = document.getElementById('btn-close-letter');
  const btnDismissLetter = document.getElementById('btn-dismiss-letter');

  function openLetter() {
    initAudio();
    playTone(660, 'sine', 0.2, 0.12);
    vibrate();
    letterModal.classList.add('open');
  }

  function closeLetter() {
    initAudio();
    playClick();
    letterModal.classList.remove('open');
  }

  btnOpenLetter.addEventListener('click', openLetter);
  btnCloseLetter.addEventListener('click', closeLetter);
  btnDismissLetter.addEventListener('click', closeLetter);
  letterModal.addEventListener('click', (e) => {
    if (e.target === letterModal) closeLetter();
  });

  // --- 9. Mobile Confetti & Floating Hearts FX ---
  const canvas = document.getElementById('fx-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor(x, y, isHeart = false) {
      this.x = x || Math.random() * width;
      this.y = y || -20;
      this.isHeart = isHeart || Math.random() < 0.35;
      this.size = this.isHeart ? Math.random() * 12 + 10 : Math.random() * 8 + 4;
      this.speedX = (Math.random() - 0.5) * 3;
      this.speedY = Math.random() * 2.5 + 1.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.08;
      this.colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166', '#ffffff', '#ff0054'];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.opacity = 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotSpeed;
      if (this.y > height + 20) {
        this.y = -20;
        this.x = Math.random() * width;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.isHeart) {
        // Draw pixel heart
        ctx.font = `${this.size}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💖', 0, 0);
      } else {
        // Draw pixel confetti square
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      }
      ctx.restore();
    }
  }

  function launchConfetti(count = 50) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(width / 2 + (Math.random() - 0.5) * 120, height * 0.45, true));
    }
  }

  // Passive ambient floating hearts
  for (let i = 0; i < 18; i++) {
    particles.push(new Particle(Math.random() * width, Math.random() * height, true));
  }

  function animateFX() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    // Keep particle list from exploding
    if (particles.length > 90) {
      particles.splice(0, particles.length - 90);
    }
    requestAnimationFrame(animateFX);
  }

  requestAnimationFrame(animateFX);
})();
