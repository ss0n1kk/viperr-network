// Минимальная логика галереи
document.addEventListener('DOMContentLoaded', function() {
    const photos = [
        { src: "images/photo1.jpg", category: "friends", title: "С друзьями" },
        { src: "images/photo2.jpg", category: "family", title: "Семья" },
        { src: "images/photo3.jpg", category: "personal", title: "Личное" },
        { src: "images/photo4.jpg", category: "friends", title: "Вечеринка" },
        { src: "images/photo5.jpg", category: "family", title: "Отдых" },
        { src: "images/photo6.jpg", category: "personal", title: "Путешествие" },
        { src: "images/photo7.jpg", category: "friends", title: "Концерт" },
        { src: "images/photo8.jpg", category: "family", title: "Праздник" },
        { src: "images/photo9.jpg", category: "personal", title: "Творчество" },
        { src: "images/photo10.jpg", category: "friends", title: "Студия" },
        { src: "images/photo11.jpg", category: "family", title: "Встреча" },
        { src: "images/photo12.jpg", category: "personal", title: "Размышления" }
    ];

    // Показываем все фото
    showPhotos('all');

    // Настраиваем фильтры
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Обновляем активную кнопку
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Показываем отфильтрованные фото
            showPhotos(filter);
        });
    });

    function showPhotos(category) {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';
        
        const filteredPhotos = category === 'all' ? photos : photos.filter(photo => photo.category === category);
        
        filteredPhotos.forEach(photo => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${photo.src}" alt="${photo.title}">
                <p>${photo.title}</p>
            `;
            gallery.appendChild(item);
        });
    }
});