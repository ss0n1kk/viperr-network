// Минимальная логика навигации
document.addEventListener('DOMContentLoaded', function() {
    // Показываем имя текущего пользователя
    const currentUser = localStorage.getItem('viperrNetworkCurrentUser');
    const userElement = document.getElementById('currentUser');
    
    if (currentUser && userElement) {
        userElement.textContent = currentUser;
        
        // Показываем скрытую иконку только для admin
        if (currentUser === 'admin') {
            const hiddenIcon = document.getElementById('hiddenIcon');
            if (hiddenIcon) {
                hiddenIcon.style.display = 'flex';
            }
        }
    }
});