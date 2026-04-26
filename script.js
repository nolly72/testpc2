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
        // Цвета темы: Голубой и Фиолетовый
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

// Создаем 70 частиц для глубины фона
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

// --- 2. ЛОГИКА AI-АССИСТЕНТА ---
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');

function toggleChat() {
    // Переключаем видимость окна
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
        // Если чат пустой, добавляем приветствие
        if (chatBody.innerHTML === "") {
            addMessage("Привет! Я NEO-AI. Выбери любой вопрос ниже, и я помогу тебе!", 'bot');
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
            response = "Прямо сейчас свободно 12 мест в Standard и 2 в VIP PRO. Поспеши!";
            break;
        case 2:
            response = "У нас акция: 3 часа + 1 в подарок до 16:00! А именинникам скидка 50%.";
            break;
        case 3:
            response = "В VIP PRO: RTX 4090 Rog Strix, i9-14900K и девайсы Logitech G Pro Superlight 2.";
            break;
        case 4:
            response = "Ночной пакет (22:00 - 08:00) всего 900₽ в Standard. Энергетик в подарок!";
            break;
        default:
            response = "Свяжись с нашим админом для уточнения деталей.";
    }

    // Имитация печатания
    setTimeout(() => {
        addMessage(response, 'bot');
    }, 600);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.style.margin = '10px 0';
    msgDiv.style.padding = '12px';
    msgDiv.style.borderRadius = '12px';
    msgDiv.style.fontSize = '0.85rem';
    msgDiv.style.fontWeight = '700'; // Делаем текст в чате жирным и читаемым
    msgDiv.style.maxWidth = '85%';
    msgDiv.style.animation = 'fadeIn 0.3s ease forwards';

    if (sender === 'user') {
        msgDiv.style.background = 'rgba(255,255,255,0.05)';
        msgDiv.style.borderRight = '3px solid #fff';
        msgDiv.style.alignSelf = 'flex-end';
        msgDiv.style.color = '#fff';
        msgDiv.innerHTML = `<small style="opacity: 0.5;">ТЫ:</small><br>${text}`;
    } else {
        msgDiv.style.background = 'rgba(0, 243, 255, 0.1)';
        msgDiv.style.borderLeft = '3px solid #00f3ff';
        msgDiv.style.alignSelf = 'flex-start';
        msgDiv.style.color = '#eee';
        msgDiv.innerHTML = `<small style="color: #00f3ff;">NEO-AI:</small><br>${text}`;
    }

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- 3. ПЛАВНЫЙ СКРОЛЛ ПО КЛИКУ ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Оставляем место для шапки
                behavior: 'smooth'
            });
        }
    });
});

// Добавляем эффект появления элементов при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.price-card, .menu-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = '0.6s ease-out';
    observer.observe(el);
});
