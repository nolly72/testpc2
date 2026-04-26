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
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        // Цвета AREA-ZONE: Голубой и Фиолетовый
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

// Генерируем 70 частиц
for (let i = 0; i < 70; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// --- 2. ЛОГИКА AREA-AI ASSISTANT ---
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');

function toggleChat() {
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
        if (chatBody.innerHTML === "") {
            addMessage("Добро пожаловать в AREA-ZONE! Я твой цифровой помощник. Чем могу быть полезен?", 'bot');
        }
    }
}

function askAI(id) {
    const btns = document.querySelectorAll('.chat-footer button');
    const userMessage = btns[id-1].innerText;
    
    addMessage(userMessage, 'user');

    let response = "";
    switch(id) {
        case 1:
            response = "В данный момент свободно 14 мест в Standard и 2 в VIP PRO. Рекомендую бронировать прямо сейчас!";
            break;
        case 2:
            response = "У нас мощные акции: 'Утренний Скилл' (скидка 30% до 12:00) и пакет 'Ночной Кат' (энергетик в подарок)!";
            break;
        case 3:
            response = "Наше железо — это топ: RTX 4090, процессоры i9-14900K, мониторы 360Hz и полная периферия Logitech G Pro.";
            break;
        case 4:
            response = "Для бронирования места позвони нам по номеру или напиши в наш Telegram. Мы работаем 24/7!";
            break;
        default:
            response = "Свяжись с администратором AREA-ZONE для уточнения информации.";
    }

    setTimeout(() => {
        addMessage(response, 'bot');
    }, 600);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.style.margin = '10px 0';
    msgDiv.style.padding = '12px 16px';
    msgDiv.style.borderRadius = '15px';
    msgDiv.style.fontSize = '0.9rem';
    msgDiv.style.fontWeight = '700'; // Жирный премиальный текст
    msgDiv.style.maxWidth = '85%';
    msgDiv.style.animation = 'fadeIn 0.3s ease forwards';

    if (sender === 'user') {
        msgDiv.style.background = 'rgba(255,255,255,0.05)';
        msgDiv.style.borderRight = '4px solid #fff';
        msgDiv.style.alignSelf = 'flex-end';
        msgDiv.style.color = '#fff';
        msgDiv.innerHTML = `<small style="opacity: 0.5; font-size: 0.6rem;">ТЫ:</small><br>${text}`;
    } else {
        msgDiv.style.background = 'rgba(0, 243, 255, 0.1)';
        msgDiv.style.borderLeft = '4px solid #00f3ff';
        msgDiv.style.alignSelf = 'flex-start';
        msgDiv.style.color = '#eee';
        msgDiv.innerHTML = `<small style="color: #00f3ff; font-weight: 900; font-size: 0.6rem;">AREA-AI:</small><br>${text}`;
    }

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- 3. ПЛАВНЫЙ СКРОЛЛ И ЭФФЕКТЫ ---
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

// Анимация появления контента при прокрутке
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.price-card, .menu-card, .about-flex').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = '0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    scrollObserver.observe(el);
});
