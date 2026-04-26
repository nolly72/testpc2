// --- 1. АНИМИРОВАННЫЙ РОЗОВЫЙ НЕОНОВЫЙ ФОН ---
const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60; // Оптимально для производительности

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
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        // Основной цвет — розовый неон, вторичный — глубокий голубой
        this.color = Math.random() > 0.8 ? '#00f3ff' : '#ff00ff';
        this.alpha = Math.random() * 0.5 + 0.1;
        this.blinkSpeed = Math.random() * 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Эффект мерцания
        this.alpha += this.blinkSpeed;
        if (this.alpha > 0.7 || this.alpha < 0.1) this.blinkSpeed *= -1;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 15;
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
    // Очистка с небольшим шлейфом (эффект затухания)
    ctx.fillStyle = 'rgba(10, 10, 15, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

createParticles();
animate();

// --- 2. ЛОГИКА AI-АССИСТЕНТА ---
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');

function toggleChat() {
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
}

function askAI(id) {
    let response = "";
    
    // Создаем элемент вопроса пользователя
    const userQuestion = document.querySelector(`.ai-options button:nth-child(${id})`).innerText;
    addMessage(userQuestion, 'user');

    // Логика ответов
    switch(id) {
        case 1:
            response = "Прямо сейчас в Standard зоне свободно 6 мест, в VIP — 3. Успей занять!";
            break;
        case 2:
            response = "Конечно! Дарим +3 часа к любому пакету в день рождения. С днём рождения заранее!";
            break;
        case 3:
            response = "В VIP у нас зверское железо: RTX 4090 и Intel i9-13900K. Всё летает на ультрах.";
            break;
        case 4:
            response = "Ночной пакет (22:00 - 10:00) — всего 1300₽ в VIP. Напитки в подарок!";
            break;
        case 5:
            response = "Да, мы приветствуем свою периферию. На каждом месте есть удобные USB-порты.";
            break;
    }

    // Имитация задержки ответа бота
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
    
    if (sender === 'user') {
        msgDiv.style.background = 'rgba(0, 243, 255, 0.1)';
        msgDiv.style.borderLeft = '3px solid #00f3ff';
        msgDiv.style.marginLeft = '20px';
        msgDiv.innerText = "Вы: " + text;
    } else {
        msgDiv.style.background = 'rgba(255, 0, 255, 0.1)';
        msgDiv.style.borderLeft = '3px solid #ff00ff';
        msgDiv.style.marginRight = '20px';
        msgDiv.innerText = "NEO-AI: " + text;
    }

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- 3. ПЛАВНЫЕ ЭФФЕКТЫ ПРИ СКРОЛЛЕ ---
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
    observer.observe(section);
});
