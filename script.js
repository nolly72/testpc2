// --- 1. НЕОНОВЫЕ ЧАСТИЦЫ (Canvas) ---
const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

// Подгоняем размер под окно
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
        // Цвета в стиле вашего клуба (голубой и фиолетовый)
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#7000ff';
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

// Создаем 60 частиц
for (let i = 0; i < 60; i++) {
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
    // Переключаем отображение окна
    if (chatWindow.style.display === 'flex' || chatWindow.style.display === 'block') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
        chatWindow.style.flexDirection = 'column';
    }
}

function askAI(id) {
    // Находим все кнопки в ассистенте
    const btns = document.querySelectorAll('.ai-options button');
    const userMessage = btns[id-1].innerText;

    // Добавляем сообщение пользователя в чат
    addMessage(userMessage, 'user');

    // База ответов
    let response = "";
    switch(id) {
        case 1:
            response = "Сейчас в Standard свободно 8 мест, в VIP — 2 места. Могу забронировать для тебя?";
            break;
        case 2:
            response = "У нас действует акция 3+1! А при ночном пакете — банка энергетика в подарок.";
            break;
        case 3:
            response = "VIP зона: RTX 4080, Core i9, мониторы 360Hz и премиальные кресла.";
            break;
        case 4:
            response = "Ночь в Standard стоит 900₽, в VIP — 1300₽. С 22:00 до 08:00 утра.";
            break;
        case 5:
            response = "Конечно! Напиши свой номер стола, и админ принесет меню к твоему компьютеру.";
            break;
        default:
            response = "Привет! Чем я могу помочь?";
    }

    // Имитируем "печатание" ассистента
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
    msgDiv.style.animation = 'fadeIn 0.3s ease forwards';

    if (sender === 'user') {
        msgDiv.style.background = 'rgba(255,255,255,0.05)';
        msgDiv.style.borderRight = '3px solid #fff';
        msgDiv.style.alignSelf = 'flex-end';
        msgDiv.style.marginLeft = '40px';
        msgDiv.innerHTML = `<span style="opacity: 0.5; font-size: 0.7rem;">Вы:</span><br>${text}`;
    } else {
        msgDiv.style.background = 'rgba(0, 243, 255, 0.1)';
        msgDiv.style.borderLeft = '3px solid #00f3ff';
        msgDiv.style.alignSelf = 'flex-start';
        msgDiv.style.marginRight = '40px';
        msgDiv.innerHTML = `<span style="color: #00f3ff; font-weight: bold; font-size: 0.7rem;">NEO-AI:</span><br>${text}`;
    }

    chatBody.appendChild(msgDiv);
    // Автопрокрутка вниз
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- 3. ПЛАВНЫЙ ПЕРЕХОД ПО ЯКОРЯМ ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Отступ под шапку
                behavior: 'smooth'
            });
        }
    });
});
