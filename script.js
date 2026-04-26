// --- НАСТРОЙКА НЕОНОВОГО ФОНА ---
const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let particles = [];
class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#ff00ff';
        this.opacity = Math.random();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// --- ЛОГИКА АССИСТЕНТА ---
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');

function toggleChat() {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
}

function askAI(id) {
    let response = "";
    switch(id) {
        case 1:
            response = "На данный момент в Standard зоне свободно 4 места, в VIP — 2. Бронируйте скорее!";
            break;
        case 2:
            response = "Да! Дарим 5 часов игры при пополнении баланса в день рождения (нужен паспорт).";
            break;
        case 3:
            response = "В VIP стоят RTX 4090 и i9-13900K. Это самый мощный конфиг в городе.";
            break;
        case 4:
            response = "Ночной пакет действует с 22:00 до 10:00. Просто выберите его в разделе тарифов.";
            break;
        case 5:
            response = "Конечно! У нас стоят кастомные USB-хабы для быстрого подключения ваших девайсов.";
            break;
    }
    
    // Создаем элемент сообщения пользователя (виртуально)
    const userMsg = document.createElement('p');
    userMsg.className = 'ai-msg';
    userMsg.style.color = '#00f3ff';
    userMsg.style.marginTop = '15px';
    userMsg.innerText = "Ответ ассистента:";
    
    const botMsg = document.createElement('p');
    botMsg.className = 'ai-res';
    botMsg.style.fontSize = '0.9rem';
    botMsg.style.background = 'rgba(255,255,255,0.05)';
    botMsg.style.padding = '10px';
    botMsg.style.borderRadius = '10px';
    botMsg.innerText = response;

    chatBody.appendChild(userMsg);
    chatBody.appendChild(botMsg);
    
    // Автопрокрутка вниз
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- ПЛАВНЫЙ СКРОЛЛ И ПОЯВЛЕНИЕ ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
