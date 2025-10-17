// Минимальная логика авторизации
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerBtn = document.getElementById('registerBtn');
    const messageDiv = document.getElementById('loginMessage');

    // Проверяем, есть ли пользователь в localStorage
    const users = JSON.parse(localStorage.getItem('viperrNetworkUsers')) || [];
    
    // Создаем стандартного пользователя admin если его нет
    if (!users.find(user => user.login === 'admin')) {
        users.push({
            login: 'admin',
            password: 'admin'
        });
        localStorage.setItem('viperrNetworkUsers', JSON.stringify(users));
    }

    // Обработка входа
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const login = document.getElementById('loginInput').value;
        const password = document.getElementById('passwordInput').value;
        
        const user = users.find(u => u.login === login && u.password === password);
        
        if (user) {
            localStorage.setItem('viperrNetworkCurrentUser', login);
            window.location.href = 'index.html';
        } else {
            messageDiv.textContent = 'Неверный логин или пароль!';
            messageDiv.style.color = 'red';
        }
    });

    // Обработка регистрации
    registerBtn.addEventListener('click', function() {
        const login = document.getElementById('loginInput').value;
        const password = document.getElementById('passwordInput').value;
        
        if (!login || !password) {
            messageDiv.textContent = 'Логин и пароль обязательны!';
            messageDiv.style.color = 'red';
            return;
        }
        
        if (users.find(u => u.login === login)) {
            messageDiv.textContent = 'Пользователь с таким логином уже существует!';
            messageDiv.style.color = 'red';
            return;
        }
        
        users.push({ login, password });
        localStorage.setItem('viperrNetworkUsers', JSON.stringify(users));
        
        messageDiv.textContent = 'Регистрация успешна! Теперь вы можете войти.';
        messageDiv.style.color = 'green';
    });
});