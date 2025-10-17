// Минимальная логика секретной страницы
document.addEventListener('DOMContentLoaded', function() {
    const secretButton = document.getElementById('secretButton');
    const secretMessage = document.getElementById('secretMessage');
    
    const messages = [
        "123123",
        "hello. world"
    ];
    
    secretButton.addEventListener('click', function() {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        secretMessage.textContent = randomMessage;
        
        this.style.backgroundColor = '#ff0000';
        this.style.color = '#ffffff';
        
        setTimeout(() => {
            this.style.backgroundColor = '';
            this.style.color = '';
        }, 1000);
    });
});