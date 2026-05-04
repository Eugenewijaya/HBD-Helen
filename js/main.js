// --- Audio Elements ---
const bgMusic = document.getElementById('bgMusic');
const sfxPop = document.getElementById('sfx-pop');
const sfxWrong = document.getElementById('sfx-wrong');
const sfxTada = document.getElementById('sfx-tada');

function playSfx(audioElement) {
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play().catch(e => console.log("SFX autoplay prevented:", e));
    }
}

// --- 1. Background Emojis Animation ---
const emojis = ['💖', '🎀', '✨', '🎂', '🌸', '🥺', '🥰', '🎈', '🎁'];
const bgContainer = document.getElementById('floating-bg');

function createEmoji() {
    const el = document.createElement('div');
    el.className = 'floating-element text-2xl absolute';
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (Math.random() * 5 + 5) + 's'; // 5s - 10s
    el.style.fontSize = (Math.random() * 20 + 15) + 'px';
    bgContainer.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 10000);
}
setInterval(createEmoji, 800); // create new emoji every 800ms

// --- 2. Navigation Helper ---
function nextSection(currentId, nextId) {
    playSfx(sfxPop); // Play pop sound on section transition
    document.getElementById(currentId).classList.replace('section-visible', 'section-hidden');
    setTimeout(() => {
        document.getElementById(nextId).classList.replace('section-hidden', 'section-visible');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500); // Wait for fade out
}

// --- 3. First Interaction (Open Gift & Play Music) ---
function openGift() {
    playSfx(sfxPop);
    // Play music (Must be triggered by user click to bypass browser blocks)
    bgMusic.volume = 0.5; // Set volume to 50% so it's not too loud
    bgMusic.play().catch(e => console.log("Audio autoplay prevented."));
    
    // Go to popup
    nextSection('sec-1', 'sec-popup');
    
    // Add lots of confetti emojis temporarily
    for(let i=0; i<40; i++) setTimeout(createEmoji, i*50);
}

// --- 4. Quiz Logic ---
let wrongAttempts = 0;

function wrongAnswer(qNum) {
    playSfx(sfxWrong);
    wrongAttempts++;
    if (wrongAttempts >= 3) {
        // Menghukum kalau sudah salah 3 kali
        showModal('error', 'Salah Mulu Nih 😤', 'Hadeh salah mulu, ketahuan nih ga fokus! Liat noh yang bener yang mana!');
        const correctBtn = document.getElementById('correct-' + qNum);
        correctBtn.innerText = "Nih klik yg ini donggg! 🥺👇";
        correctBtn.classList.add('animate-bounce', 'ring-4', 'ring-pink-500');
    } else {
        showModal('warning', 'Ups, Salah! 🙄', "Coba baca lagi pakai hati! (" + wrongAttempts + "/3 kali salah)");
    }
}

function nextQuiz(currentStep) {
    playSfx(sfxTada); // Play success sound for correct answer
    wrongAttempts = 0; // Reset setiap kali ganti pertanyaan
    
    if (currentStep < 3) {
        document.getElementById('quiz-' + currentStep).classList.add('hidden');
        document.getElementById('quiz-' + (currentStep + 1)).classList.remove('hidden');
    } else {
        nextSection('sec-quiz', 'sec-prank');
        setupPrankButton();
    }
}

function updateSliderText() {
    const val = parseInt(document.getElementById('sayang-slider').value);
    const textEl = document.getElementById('slider-text');
    
    if (val <= 30) {
        textEl.innerText = "Masa cuma segini? Parah ih 😭";
        textEl.style.transform = "scale(0.9)";
    } else if (val <= 50) {
        textEl.innerText = "Pelit amat, tambahin lagi! 😤";
        textEl.style.transform = "scale(1)";
    } else if (val <= 80) {
        textEl.innerText = "Lumayan, tapi masa kalah sama diskon Shopee? 🧐";
        textEl.style.transform = "scale(1.1)";
    } else {
        textEl.innerText = "Nah ini baru bener! Sayang mentok poll! 🥰🚀";
        textEl.style.transform = "scale(1.2)";
    }
}

function submitSlider() {
    const val = document.getElementById('sayang-slider').value;
    if (val < 100) {
        playSfx(sfxWrong);
        showModal('error', 'Masa Cuma Segini? 😡', 'Belum 100%! Geser mentok kanan dong ayanggg! Masa sayang sama aku setengah-setengah?');
    } else {
        nextQuiz(3);
    }
}

// --- 5. Prank Button Logic ---
let prankClicks = 0;
const btnPrank = document.getElementById('btn-prank');
const prankContainer = document.getElementById('prank-container');
const prankText = document.getElementById('prank-text');

function setupPrankButton() {
    btnPrank.onclick = function(e) {
        playSfx(sfxPop);
        prankClicks++;
        
        if (prankClicks === 1) {
            prankText.innerText = "Yee meleset! 😝 Ga kena!";
            moveButton();
        } else if (prankClicks === 2) {
            prankText.innerText = "Kalo dapet, nanti dikasih seblak. Ayo coba lagi! 🏃💨";
            moveButton();
        } else {
            // Success on 3rd click
            playSfx(sfxTada);
            prankText.innerText = "Hadeh kasian, yaudah yuk lanjut! 🤣";
            btnPrank.style.transform = 'translate(0, 0)'; // reset position softly
            btnPrank.innerText = "Beneran Lanjut ✨";
            btnPrank.classList.add('animate-pulse');
            
            // Change onclick to proceed
            btnPrank.onclick = function() {
                nextSection('sec-prank', 'sec-greeting');
            };
        }
    };
    
    // Add touchmove prevention on the button itself just in case
    btnPrank.addEventListener('touchstart', function(e) {
        if(prankClicks < 2) {
            e.preventDefault(); // prevent touch tap if it's moving
            btnPrank.onclick();
        }
    }, {passive: false});
}

function moveButton() {
    // Kita buat loncatannya lebih jauh (lebih agresif ngindarnya)
    const maxX = (prankContainer.clientWidth / 2) - 80;
    const maxY = (prankContainer.clientHeight / 2) - 40;
    
    // Mengambil area terluar supaya gesernya kerasa jauh
    const randomX = (Math.random() > 0.5 ? 1 : -1) * (maxX * 0.6 + Math.random() * (maxX * 0.4));
    const randomY = (Math.random() > 0.5 ? 1 : -1) * (maxY * 0.6 + Math.random() * (maxY * 0.4));
    
    btnPrank.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// --- 6. Wiggling Prayer Logic ---
let prayerTaps = 0;
const prayerBox = document.getElementById('prayer-box');
const prayerCover = document.getElementById('prayer-cover');
const prayerContent = document.getElementById('prayer-content');
const btnGallery = document.getElementById('btn-gallery');

function tapPrayer() {
    if (prayerTaps >= 3) return; // Already opened
    
    playSfx(sfxPop);
    prayerTaps++;
    
    // Add a little pop effect on tap
    prayerBox.style.transform = 'scale(0.95)';
    setTimeout(() => prayerBox.style.transform = 'scale(1)', 100);

    if (prayerTaps === 1) {
        prayerCover.querySelector('span').innerText = "2 tap lagi sayang...";
    } else if (prayerTaps === 2) {
        prayerCover.querySelector('span').innerText = "1 tap terakhir!";
    } else if (prayerTaps === 3) {
        // Open it!
        playSfx(sfxTada);
        prayerBox.classList.remove('animate-wiggle');
        prayerBox.classList.add('scale-105', 'bg-white');
        prayerBox.classList.remove('bg-gradient-to-r', 'text-white');
        prayerBox.classList.add('text-gray-800', 'border-2', 'border-pink-300');
        
        prayerCover.style.opacity = '0';
        setTimeout(() => {
            prayerCover.style.display = 'none';
            prayerContent.style.opacity = '1';
        }, 300);

        // Show gallery button
        btnGallery.classList.remove('hidden');
        setTimeout(() => btnGallery.classList.remove('opacity-0'), 100);
        
        // Spawn emojis
        for(let i=0; i<20; i++) setTimeout(createEmoji, i*100);
    }
}

// --- 7. Custom Modal Logic ---
function showModal(type, title, desc) {
    const modal = document.getElementById('custom-modal');
    const modalContent = document.getElementById('modal-content');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    modalTitle.innerText = title;
    modalDesc.innerText = desc;

    if (type === 'error') {
        modalIcon.innerHTML = '👎';
    } else if (type === 'warning') {
        modalIcon.innerHTML = '🤔';
    } else if (type === 'success') {
        modalIcon.innerHTML = '🎉';
    }

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-90');
    modalContent.classList.add('scale-100');
}

function closeModal() {
    playSfx(sfxPop);
    const modal = document.getElementById('custom-modal');
    const modalContent = document.getElementById('modal-content');
    
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-90');
    modal.classList.add('opacity-0', 'pointer-events-none');
}
