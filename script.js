// --- 1. АНИМАЦИЯ НЕОНОВЫХ ЧАСТИЦ ---
const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 50;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.init();
    }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        // Цвета частиц соответствуют переливам фона
        const colors = ['#ff00ff', '#00f3ff', '#ff851b', '#b10dc9'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random();
        this.blink = Math.random() * 0.02;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha += this.blink;
        if (this.alpha > 0.8 || this.alpha < 0.2) this.blink *= -1;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// --- 2. NEO-AI АССИСТЕНТ (БЕЗ CAPS) ---
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');

function toggleChat() {
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
}

function askAI(id) {
    // Получаем текст вопроса из кнопки
    const userQ = document.querySelector(`.ai-questions button:nth-child(${id})`).innerText;
    addMessage(userQ, 'user');

    let response = "";
    switch(id) {
        case 1:
            response = "Прямо сейчас свободно 6 компьютеров в Standard и 3 места в VIP. Можешь приходить!";
            break;
        case 2:
            response = "Для именинников у нас действует акция: +3 часа к любому пакету. Просто покажи паспорт админу.";
            break;
        case 3:
            response = "В VIP-зоне стоят RTX 4090 и процессоры i9-13900K. Это самый мощный конфиг для игры на ультра-настройках.";
            break;
        case 4:
            response = "Ночной пакет начинается в 22:00 и длится до 10:00 утра. Стоимость в VIP — 1300₽, напиток включен!";
            break;
        case 5:
            response = "Да, мы только за! На столах есть свободные порты для быстрого подключения твоих девайсов.";
            break;
    }

    setTimeout(() => {
        addMessage(response, 'bot');
    }, 600);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.style.margin = '10px 0';
    msgDiv.style.padding = '12px';
    msgDiv.style.borderRadius = '15px';
    msgDiv.style.fontSize = '0.9rem';
    msgDiv.style.fontWeight = '600';

    if (sender === 'user') {
        msgDiv.style.background = 'rgba(255, 255, 255, 0.1)';
        msgDiv.style.borderRight = '3px solid #fff';
        msgDiv.style.textAlign = 'right';
        msgDiv.innerText = text;
    } else {
        msgDiv.style.background = 'rgba(255, 65, 54, 0.1)';
        msgDiv.style.borderLeft = '3px solid #ff4136';
        msgDiv.innerText = "Ассистент: " + text;
    }

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- 3. ПЛАВНЫЙ СКРОЛЛ И ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 90,
                behavior: 'smooth'
            });
        }
    });
});

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .glass-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s ease-out';
    revealOnScroll.observe(el);
});
