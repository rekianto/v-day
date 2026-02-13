let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()
    spawnHearts(60)

    const music = document.getElementById('bg-music')
    const toggleBtn = document.getElementById('music-toggle')

    if (!music) return

    music.volume = 0.3

    // Coba autoplay
    music.play().then(() => {
        musicPlaying = true
        if (toggleBtn) toggleBtn.textContent = '🔊'
    }).catch(() => {
        // Kalau diblok browser, tunggu klik pertama
        document.addEventListener('click', () => {
            music.play().then(() => {
                musicPlaying = true
                if (toggleBtn) toggleBtn.textContent = '🔊'
            }).catch(() => {})
        }, { once: true })
    })
})

/* ================= CONFETTI ================= */

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ffffff']
    const duration = 60000
    const animationEnd = Date.now() + duration

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
            clearInterval(interval)
            return
        }

        // Makin lama makin sedikit (fade smooth)
        const progress = timeLeft / duration
        const particleCount = Math.floor(30 * progress)

        confetti({
            particleCount: particleCount,
            startVelocity: 20,   // pelan jatuhnya
            spread: 60,
            ticks: 250,
            gravity: 0.6,        // efek jatuh lembut
            scalar: 0.9,
            origin: {
                x: Math.random(), // random kiri-kanan
                y: 0              // dari atas
            },
            colors
        })

    }, 300)
}

/* ================= MUSIC ================= */

function toggleMusic() {
    const music = document.getElementById('bg-music')
    const toggleBtn = document.getElementById('music-toggle')

    if (!music) return

    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        if (toggleBtn) toggleBtn.textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        if (toggleBtn) toggleBtn.textContent = '🔊'
    }
}
