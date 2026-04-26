// --- 1. ЛОГИКА АССИСТЕНТА (Исправленная) ---
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');

// Функция открытия/закрытия
function toggleChat() {
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

// Функция ответов
function askAI(id) {
    // Получаем текст вопроса из нажатой кнопки
    const buttons = document.querySelectorAll('.ai-questions button');
    const userText = buttons[id-1].innerText;
    
    // Выводим сообщение пользователя
    addMessage(userText, 'user');

    let botResponse = "";
    switch(id) {
        case 1: botResponse = "Сейчас свободно 5 мест в Standard и 2 в VIP. Успей занять!"; break;
        case 2: botResponse = "Именинникам дарим +3 часа к любому пакету при показе паспорта!"; break;
        case 3: botResponse = "В VIP стоят RTX 4090 и i9-13900K. Это самый мощный конфиг в городе."; break;
        case 4: botResponse = "Ночной пакет действует с 22:00 до 10:00. В VIP — 1300₽, напиток включен."; break;
        case 5: botResponse = "Конечно! У нас на столах удобные USB-хабы для твоих мышек и наушников."; break;
    }

    // Задержка «ответа» бота для реалистичности
    setTimeout(() => {
        addMessage(botResponse, 'bot');
    }, 500);
}

function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.style.margin = '10px 0';
    msg.style.padding = '10px 15px';
    msg.style.borderRadius = '12px';
    msg.style.fontSize = '0.9rem';
    msg.style.lineHeight = '1.4';

    if (sender === 'user') {
        msg.style.background = 'rgba(0, 243, 255, 0.1)';
        msg.style.borderRight = '3px solid #00f3ff';
        msg.style.textAlign = 'right';
        msg.innerText = text;
    } else {
        msg.style.background = 'rgba(255, 65, 54, 0.1)';
        msg.style.borderLeft = '3px solid #ff4136';
        msg.innerText = "Ассистент: " + text;
    }

    chatBody.appendChild(msg);
    // Автопрокрутка вниз
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- 2. АНИМАЦИЯ НЕОНОВЫХ ЧАСТИЦ ---
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
    constructor() {
        this.init();
    }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.color = Math.random() > 0.5 ? '#ff00ff' : '#00f3ff';
        this.alpha = Math.random();
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

for (let i = 0; i < 50; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// --- 3. ПЛАВНЫЙ СКРОЛЛ К СЕКЦИЯМ ---
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
