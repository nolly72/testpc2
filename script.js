// --- 1. НЕОНОВЫЕ ЧАСТИЦЫ ---
const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() { this.init(); }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#ff00ff';
        this.alpha = Math.random() * 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 70; i++) { particles.push(new Particle()); }

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// --- 2. ЛОГИКА AREA-AI ---
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');

function toggleChat() {
    chatWindow.style.display = (chatWindow.style.display === 'flex') ? 'none' : 'flex';
    if (chatBody.innerHTML === "") {
        addMessage("Добро пожаловать в AREA-ZONE! Чем могу помочь?", 'bot');
    }
}

function askAI(id) {
    const btns = document.querySelectorAll('.chat-footer button');
    addMessage(btns[id-1].innerText, 'user');
    let res = "";
    switch(id) {
        case 1: res = "В Standard свободно 14 мест, в VIP — 2. Бронируй скорее!"; break;
        case 2: res = "Акция 'Ночной Кат': с 22:00 до 08:00 всего за 900₽ + энергетик!"; break;
        case 3: res = "VIP: RTX 4090, i9-14900K, 360Hz. Топовый кастомный билд."; break;
        case 4: res = "Оставь заявку в форме выше или звони: +7 (999) 000-00-00."; break;
    }
    setTimeout(() => addMessage(res, 'bot'), 600);
}

function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.style.cssText = `margin:10px 0; padding:12px 16px; border-radius:15px; font-size:0.9rem; font-weight:700; max-width:85%; animation:fadeIn 0.3s ease;`;
    if (sender === 'user') {
        msg.style.cssText += `background:rgba(255,255,255,0.05); border-right:4px solid #fff; align-self:flex-end;`;
        msg.innerHTML = `<small style="opacity:0.5; font-size:0.6rem;">ТЫ:</small><br>${text}`;
    } else {
        msg.style.cssText += `background:rgba(0,243,255,0.1); border-left:4px solid #00f3ff; align-self:flex-start;`;
        msg.innerHTML = `<small style="color:#00f3ff; font-weight:900; font-size:0.6rem;">AREA-AI:</small><br>${text}`;
    }
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- 3. ОБРАБОТКА ФОРМЫ БРОНИРОВАНИЯ ---
const bookingForm = document.querySelector('.booking-form');
if(bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = bookingForm.querySelector('input[type="text"]').value;
        alert(`Спасибо, ${name}! Админ AREA-ZONE свяжется с тобой в течение 2 минут.`);
        bookingForm.reset();
    });
}

// --- 4. ПЛАВНЫЙ СКРОЛЛ И АНИМАЦИЯ ПОЯВЛЕНИЯ ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Добавил .reveal и .booking-card в список анимаций
document.querySelectorAll('.price-card, .menu-card, .about-flex, .reveal, .booking-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = '0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    scrollObserver.observe(el);
});
