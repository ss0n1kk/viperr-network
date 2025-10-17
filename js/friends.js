// Минимальная логика друзей
document.addEventListener('DOMContentLoaded', function() {
    const artists = [
        { name: "A. ZAVET", city: "Moscow", avatar: "images/zavet-avatar.jpg" },
        { name: "V. KANYE", city: "Chicago", avatar: "images/kanye-avatar.jpg" },
        { name: "B. BAHI PALPIKK", city: "Tallinn", avatar: "images/bahi-avatar.jpg" },
        { name: "A. WEBER", city: "Berlin", avatar: "images/weber-avatar.jpg" },
        { name: "DJ SMOKE", city: "London", avatar: "images/smoke-avatar.jpg" },
        { name: "MC THUNDER", city: "NYC", avatar: "images/thunder-avatar.jpg" },
        { name: "PROD. BY ICE", city: "Stockholm", avatar: "images/ice-avatar.jpg" },
        { name: "RAPTOR", city: "Warsaw", avatar: "images/raptor-avatar.jpg" },
        { name: "BEAT MAKER", city: "Paris", avatar: "images/beatmaker-avatar.jpg" },
        { name: "VOICE BOX", city: "Tokyo", avatar: "images/voicebox-avatar.jpg" }
    ];

    const currentUser = localStorage.getItem('viperrNetworkCurrentUser');
    const myFriends = JSON.parse(localStorage.getItem('viperrNetworkMyFriends')) || {};
    
    if (!myFriends[currentUser]) {
        myFriends[currentUser] = [];
    }

    // Показываем всех артистов
    showAllArtists();
    // Показываем моих друзей
    showMyFriends();
    // Настраиваем поиск
    setupSearch();

    function showAllArtists() {
        const container = document.getElementById('allArtists');
        container.innerHTML = '';
        
        artists.forEach(artist => {
            if (!myFriends[currentUser].includes(artist.name)) {
                const card = createFriendCard(artist, true);
                container.appendChild(card);
            }
        });
    }

    function showMyFriends() {
        const container = document.getElementById('myFriends');
        container.innerHTML = '';
        
        if (myFriends[currentUser].length === 0) {
            container.innerHTML = '<p>У вас пока нет друзей</p>';
            return;
        }
        
        myFriends[currentUser].forEach(friendName => {
            const artist = artists.find(a => a.name === friendName);
            if (artist) {
                const card = createFriendCard(artist, false);
                container.appendChild(card);
            }
        });
    }

    function createFriendCard(artist, isAddable) {
        const card = document.createElement('div');
        card.className = 'friend-card';
        
        card.innerHTML = `
            <img src="${artist.avatar}" alt="${artist.name}" class="friend-avatar">
            <div class="friend-name">${artist.name}</div>
            <div class="friend-city">${artist.city}</div>
            <div class="friend-actions">
                ${isAddable ? 
                    `<button class="add-friend" data-name="${artist.name}">Добавить</button>` :
                    `<button class="remove-friend" data-name="${artist.name}">Удалить</button>
                     <button class="poop-friend" data-name="${artist.name}">💩</button>`
                }
            </div>
        `;
        
        return card;
    }

    function setupSearch() {
        const searchInput = document.getElementById('friendSearch');
        const resultsContainer = document.getElementById('searchResults');
        
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            resultsContainer.innerHTML = '';
            
            if (query.trim() === '') {
                resultsContainer.style.display = 'none';
                return;
            }
            
            const filtered = artists.filter(artist => 
                artist.name.toLowerCase().includes(query)
            );
            
            if (filtered.length > 0) {
                filtered.forEach(artist => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.textContent = `${artist.name} (${artist.city})`;
                    item.addEventListener('click', () => addFriend(artist.name));
                    resultsContainer.appendChild(item);
                });
                resultsContainer.style.display = 'block';
            } else {
                resultsContainer.style.display = 'none';
            }
        });
        
        // Скрываем результаты при клике вне
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-section')) {
                resultsContainer.style.display = 'none';
            }
        });
    }

    // Обработчики событий
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-friend')) {
            const friendName = e.target.getAttribute('data-name');
            addFriend(friendName);
        }
        
        if (e.target.classList.contains('remove-friend')) {
            const friendName = e.target.getAttribute('data-name');
            removeFriend(friendName);
        }
        
        if (e.target.classList.contains('poop-friend')) {
            const friendName = e.target.getAttribute('data-name');
            alert(`Вы кинули какашку на ${friendName}! 💩`);
        }
    });

    function addFriend(friendName) {
        if (!myFriends[currentUser].includes(friendName)) {
            myFriends[currentUser].push(friendName);
            localStorage.setItem('viperrNetworkMyFriends', JSON.stringify(myFriends));
            showAllArtists();
            showMyFriends();
            alert(`${friendName} добавлен в друзья!`);
        }
    }

    function removeFriend(friendName) {
        myFriends[currentUser] = myFriends[currentUser].filter(name => name !== friendName);
        localStorage.setItem('viperrNetworkMyFriends', JSON.stringify(myFriends));
        showAllArtists();
        showMyFriends();
        alert(`${friendName} удален из друзей!`);
    }
});