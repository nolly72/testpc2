// --- 1. АНИМИРОВАННЫЙ НЕОНОВЫЙ ФОН ---
const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 60;

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
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        // Розовый и голубой неон
        this.color = Math.random() > 0.8 ? '#00f3ff' : '#ff00ff';
        this.alpha = Math.random() * 0.5 + 0.1;
        this.blinkSpeed = Math.random() * 0.02;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha += this.blinkSpeed;
        if (this.alpha > 0.8 || this.alpha < 0.1) this.blinkSpeed *= -1;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 20; // Усиленное свечение
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.fillStyle = 'rgba(5, 5, 8, 0.15)'; // Глубокий след
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
createParticles();
animate();

// --- 2. ЛОГИКА NEO-AI АССИСТЕНТА ---
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');

function toggleChat() {
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
}

function askAI(id) {
    let response = "";
    // Берем текст из кнопок нового HTML
    const userQuestion = document.querySelector(`.ai-btns button:nth-child(${id})`).innerText;
    addMessage(userQuestion, 'user');

    switch(id) {
        case 1:
            response = "ПРЯМО СЕЙЧАС СВОБОДНО 5 ПК В СТАНДАРТЕ И 2 В VIP-ЗОНЕ. УСПЕЙ ЗАБРОНИРОВАТЬ!";
            break;
        case 2:
            response = "ДАРИМ +3 ЧАСА К ЛЮБОМУ ПАКЕТУ В ДЕНЬ РОЖДЕНИЯ ПРИ ПРЕДЪЯВЛЕНИИ ПАСПОРТА!";
            break;
        case 3:
            response = "VIP ЭТО: RTX 4090 FOUNDERS + I9-13900K. МОНИТОРЫ 240 ГЦ. ПОЛНЫЙ ГЕЙМИНГ.";
            break;
        case 4:
            response = "НОЧНОЙ ПАКЕТ С 22:00 ДО 10:00 ВСЕГО ЗА 1300₽ В VIP-ЗОНЕ. ЭНЕРГЕТИК В ПОДАРОК!";
            break;
        case 5:
            response = "ДА, КОНЕЧНО! У НАС УДОБНЫЕ USB-ХАБЫ НА КАЖДОМ СТОЛЕ ДЛЯ ТВОИХ ДЕВАЙСОВ.";
            break;
    }

    setTimeout(() => {
        addMessage(response, 'bot');
    }, 600);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.style.margin = '15px 0';
    msgDiv.style.padding = '15px';
    msgDiv.style.borderRadius = '20px';
    msgDiv.style.fontSize = '0.85rem';
    msgDiv.style.fontWeight = '900'; // Жирный шрифт
    msgDiv.style.textTransform = 'uppercase';

    if (sender === 'user') {
        msgDiv.style.background = 'rgba(0, 243, 255, 0.1)';
        msgDiv.style.borderRight = '4px solid #00f3ff';
        msgDiv.style.textAlign = 'right';
        msgDiv.innerText = text;
    } else {
        msgDiv.style.background = 'rgba(255, 0, 255, 0.1)';
        msgDiv.style.borderLeft = '4px solid #ff00ff';
        msgDiv.innerText = "NEO-AI: " + text;
    }

    chatBody.appendChild(msgDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
}

// --- 3. ПЛАВНЫЕ ЭФФЕКТЫ ПРИ СКРОЛЛЕ ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Анимируем и секции, и отдельные карточки для крутого эффекта
document.querySelectorAll('section, .glass-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
    observer.observe(el);
});

// Плавный скролл для навигации
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 90,
            behavior: 'smooth'
        });
    });
});
