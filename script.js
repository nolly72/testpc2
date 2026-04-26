// --- 1. НЕОНОВЫЕ ЧАСТИЦЫ (Canvas Background) ---
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
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        // Цвета: Неоновый голубой и Маджента
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#ff00ff';
        this.alpha = Math.random() * 0.4;
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

// --- 2. ЛОГИКА AI-АССИСТЕНТА ---
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');

function toggleChat() {
    // Переключаем display между none и flex
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
    }
}

function askAI(id) {
    const btns = document.querySelectorAll('.ai-options button');
    const userMessage = btns[id-1].innerText;
    
    // Добавляем сообщение пользователя
    addMessage(userMessage, 'user');

    let response = "";
    switch(id) {
        case 1:
            response = "Прямо сейчас в зоне Standard свободно 12 ПК, в VIP PRO — 3 места. Бронируй скорее через админа!";
            break;
        case 2:
            response = "Действует акция 'Утренний скилл': с 08:00 до 12:00 скидка 30% на все зоны. Также 5-й час всегда в подарок!";
            break;
        case 3:
            response = "В VIP PRO у нас бескомпромиссная мощь: RTX 4090 Rog Strix, i9-14900K и мониторы 360Hz. Идеально для турниров.";
            break;
        case 4:
            response = "Ночной пакет (с 22:00 до 08:00) — это 10 часов игры всего за 900₽ (Standard) или 1300₽ (VIP). Напиток включен!";
            break;
        case 5:
            response = "В баре большой выбор: от импортного Monster Energy до горячей пиццы и сендвичей. Принесем прямо к твоему ПК!";
            break;
    }

    // Имитация задержки ответа
    setTimeout(() => {
        addMessage(response, 'bot');
    }, 600);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.style.margin = '12px 0';
    msgDiv.style.padding = '12px 16px';
    msgDiv.style.borderRadius = '15px';
    msgDiv.style.fontSize = '0.9rem';
    msgDiv.style.fontWeight = '600';
    msgDiv.style.maxWidth = '85%';
    msgDiv.style.animation = 'fadeIn 0.3s ease';

    if (sender === 'user') {
        msgDiv.style.background = 'rgba(255,255,255,0.05)';
        msgDiv.style.borderRight = '4px solid #fff';
        msgDiv.style.alignSelf = 'flex-end';
        msgDiv.style.color = '#fff';
        msgDiv.innerHTML = `<small style="opacity: 0.5;">Вы:</small><br>${text}`;
    } else {
        msgDiv.style.background = 'rgba(0, 243, 255, 0.1)';
        msgDiv.style.borderLeft = '4px solid #00f3ff';
        msgDiv.style.alignSelf = 'flex-start';
        msgDiv.style.color = '#eee';
        msgDiv.innerHTML = `<small style="color: #00f3ff; font-weight: 800;">NEO-AI:</small><br>${text}`;
    }

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- 3. ПЛАВНЫЙ СКРОЛЛ ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
