// Минимальная логика плеера
document.addEventListener('DOMContentLoaded', function() {
    const tracks = [
        { title: "Intro", duration: "1:23", file: "music/intro.mp3", cover: "images/track1.jpg" },
        { title: "Damage", duration: "3:45", file: "music/damage.mp3", cover: "images/track2.jpg" },
        { title: "No Regrets", duration: "3:12", file: "music/noregrets.mp3", cover: "images/track3.jpg" },
        { title: "Street Lights", duration: "4:01", file: "music/streetlights.mp3", cover: "images/track4.jpg" },
        { title: "Viperr's Anthem", duration: "3:33", file: "music/anthem.mp3", cover: "images/track5.jpg" },
        { title: "Outro", duration: "1:45", file: "music/outro.mp3", cover: "images/track6.jpg" }
    ];

    const audioPlayer = document.getElementById('audioPlayer');
    const volumeSlider = document.getElementById('volumeSlider');
    const tracksContainer = document.getElementById('tracksContainer');

    // Показываем треки
    showTracks();

    // Настраиваем громкость
    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = this.value / 100;
    });

    function showTracks() {
        tracksContainer.innerHTML = '';
        
        tracks.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'track-item';
            trackElement.innerHTML = `
                <img src="${track.cover}" alt="${track.title}" class="track-cover">
                <div class="track-info">
                    <div class="track-title">${index + 1}. ${track.title}</div>
                    <div class="track-duration">${track.duration}</div>
                </div>
            `;
            
            trackElement.addEventListener('click', () => {
                playTrack(track.file);
            });
            
            tracksContainer.appendChild(trackElement);
        });
    }

    function playTrack(trackFile) {
        audioPlayer.src = trackFile;
        audioPlayer.play();
    }
});