document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // SLIDESHOW FUNCTIONALITY
    // ======================
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let slideInterval;

    function showSlides(n) {
        // Handle index overflow/underflow
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;
        
        // Hide all slides
        slides.forEach(slide => slide.style.display = 'none');
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active-dot'));
        
        // Show current slide and activate corresponding dot
        slides[slideIndex].style.display = 'block';
        dots[slideIndex].classList.add('active-dot');
    }

    function nextSlide() {
        slideIndex++;
        showSlides(slideIndex);
        resetInterval();
    }

    function prevSlide() {
        slideIndex--;
        showSlides(slideIndex);
        resetInterval();
    }

    function currentSlide(n) {
        slideIndex = n;
        showSlides(slideIndex);
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Initialize slideshow
    function initSlideshow() {
        showSlides(slideIndex);
        slideInterval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        const slideshow = document.querySelector('.slideshow-container');
        slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slideshow.addEventListener('mouseleave', resetInterval);
    }
    // ======================
        // FULLSCREEN IMAGE VIEW
        // ======================
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImage");
        const captionText = document.querySelector(".modal-caption");
        const closeModal = document.querySelector(".close-modal");

        // Make slides clickable
        slides.forEach(slide => {
            slide.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.querySelector('img').src;
                captionText.innerHTML = this.querySelector('img').alt;
            });
        });

        // Close modal
        closeModal.addEventListener('click', function() {
            modal.style.display = "none";
        });

        // Close when clicking outside image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });

        // Close with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && modal.style.display === "block") {
                modal.style.display = "none";
            }
        });

    // Button controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot controls
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index));
    });

    initSlideshow();

    // ======================
    // CHARACTER & SCROLL LOGIC
    // ======================
    const character = document.getElementById('character');
    const scroll = document.getElementById('scroll');
    const message = document.getElementById('message');
    let isOpen = false;

    character.addEventListener('click', function() {
        if (!isOpen) {
            // Log to console when opening scroll
            console.log("Love Yourz 18 !!");
            console.log("%c🎯", "font-size: 24px; color: red;");
            
            // Animate scroll opening
            scroll.style.transform = 'translateY(50px) scaleY(1.2)';
            character.style.transform = 'translateX(-50%) translateY(20px)';
            
            // Show message after slight delay
            setTimeout(() => {
                message.style.opacity = '1';
            }, 500);
            
            isOpen = true;
        } else {
            // Animate scroll closing
            scroll.style.transform = 'translateY(0) scaleY(1)';
            character.style.transform = 'translateX(-50%) translateY(0)';
            message.style.opacity = '0';
            
            isOpen = false;
        }
    });

// Alternative if you prefer generated emojis
const emojis = ["🌸", "💮", "🏵️", "🌺", "🌼"];
const container = document.querySelector('.slow-life-container');

emojis.forEach((emoji, index) => {
    const carnation = document.createElement('div');
    carnation.className = 'floating-carnation';
    carnation.textContent = emoji;
    carnation.style.left = Math.random() * 90 + '%';
    carnation.style.top = Math.random() * 90 + '%';
    carnation.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
    carnation.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(carnation);
});
// Player Elements
const playlistContainer = document.querySelector('.playlist-container');
const playlistTracks = document.querySelector('.playlist-tracks');
const miniPlayerTrigger = document.querySelector('.mini-player-trigger');
const plPlayBtn = document.getElementById('pl-play');
const plNextBtn = document.getElementById('pl-next');
const plPrevBtn = document.getElementById('pl-prev');
const audioPlayer = new Audio();

let currentTrackIndex = 0;
let isPlaying = false;
let playlist = [];

// Fetch playlist from db.json
async function fetchPlaylist() {
  try {
    const response = await fetch('db.json');
    const data = await response.json();
    playlist = data.playlist;
    renderPlaylist();
  } catch (error) {
    console.error("Error loading playlist:", error);
    // Fallback playlist if db.json fails to load
    playlist = [
      {
        id: 1,
        title: "Ordinary",
        artist: "Alex Warren",
        cover: "assets/Ordinary.jpg",
        src: "music/ordinary-alexwarren.mp3",
        duration: "3:05"
      },
      {
        id: 2,
        title: "Love Yourz",
        artist: "J. Cole",
        cover: "assets/J.cole.jpg",
        src: "music/love-yourz.mp3",
        duration: "3:31"
      }
    ];
    renderPlaylist();
  }
}

// Render Playlist
function renderPlaylist() {
  playlistTracks.innerHTML = '';
  playlist.forEach((track, index) => {
    const trackElement = document.createElement('div');
    trackElement.className = `playlist-track ${index === currentTrackIndex ? 'active' : ''}`;
    trackElement.innerHTML = `
      <div class="playlist-track-cover">
        <img src="${track.cover}" alt="${track.title}">
      </div>
      <div class="playlist-track-info">
        <div class="playlist-track-title">${track.title}</div>
        <div class="playlist-track-artist">${track.artist}</div>
      </div>
    `;
    trackElement.addEventListener('click', () => playTrack(index));
    playlistTracks.appendChild(trackElement);
  });
}

// Play Track
function playTrack(index) {
  currentTrackIndex = index;
  const track = playlist[currentTrackIndex];
  audioPlayer.src = track.src;
  audioPlayer.play()
    .then(() => {
      isPlaying = true;
      plPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
      renderPlaylist();
    })
    .catch(error => {
      console.error("Playback failed:", error);
      // Show error to user if needed
    });
}

// Toggle Play/Pause
function togglePlay() {
  if (audioPlayer.paused) {
    if (audioPlayer.src === "") {
      playTrack(0); // Start playing first track if none is loaded
    } else {
      audioPlayer.play()
        .then(() => {
          isPlaying = true;
          plPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
    }
  } else {
    audioPlayer.pause();
    isPlaying = false;
    plPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

// Next Track
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playTrack(currentTrackIndex);
}

// Previous Track
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  playTrack(currentTrackIndex);
}

// Toggle Playlist Visibility
function togglePlaylist() {
  playlistContainer.classList.toggle('visible');
}

// Event Listeners
miniPlayerTrigger.addEventListener('click', togglePlaylist);
plPlayBtn.addEventListener('click', togglePlay);
plNextBtn.addEventListener('click', nextTrack);
plPrevBtn.addEventListener('click', prevTrack);

// Initialize
audioPlayer.volume = 0.7;
fetchPlaylist();

// Auto-play next track
audioPlayer.addEventListener('ended', nextTrack);

// Close playlist when clicking outside
document.addEventListener('click', (e) => {
  if (!playlistContainer.contains(e.target) && !miniPlayerTrigger.contains(e.target)) {
    playlistContainer.classList.remove('visible');
  }
});
});