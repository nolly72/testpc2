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
    constructor() {
        this.init();
    }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        // Цвета в стиле NEO-ARENA
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
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
    }
}

function askAI(id) {
    // Получаем текст из нажатой кнопки
    const btns = document.querySelectorAll('.ai-btns button');
    const userMessage = btns[id-1].innerText;
    
    // Добавляем сообщение пользователя
    addMessage(userMessage, 'user');

    // Логика ответов
    let response = "";
    switch(id) {
        case 1: response = "Сейчас свободно 12 мест в Standard и 3 в VIP Pro. Бронируй скорее!"; break;
        case 2: response = "Да! Каждое 5-е посещение — энергетик в подарок, а именинникам +3 часа бесплатно."; break;
        case 3: response = "В VIP Pro стоят RTX 4090, мониторы 360Hz и кресла DXRacer. Это абсолютный топ."; break;
        case 4: response = "Ночной пакет (22:00 - 08:00) стоит от 900₽. Напиток уже включен в стоимость!"; break;
        default: response = "Свяжись с администратором по телефону для уточнения деталей.";
    }

    // Имитируем «раздумья» бота
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
    
    if (sender === 'user') {
        msgDiv.style.background = 'rgba(255,255,255,0.05)';
        msgDiv.style.borderRight = '3px solid #fff';
        msgDiv.style.textAlign = 'right';
        msgDiv.innerHTML = `<span style="opacity: 0.6; font-size: 0.7rem;">Ты:</span><br>${text}`;
    } else {
        msgDiv.style.background = 'rgba(0, 243, 255, 0.1)';
        msgDiv.style.borderLeft = '3px solid #00f3ff';
        msgDiv.innerHTML = `<span style="color: #00f3ff; font-weight: bold; font-size: 0.7rem;">NEO-AI:</span><br>${text}`;
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
