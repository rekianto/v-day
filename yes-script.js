let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()
    spawnHearts(60)

    const music = document.getElementById('bg-music')
    const toggleBtn = document.getElementById('music-toggle')

    if (music) {
        music.volume = 0.3
        music.play().then(() => {
            musicPlaying = true
            if (toggleBtn) toggleBtn.textContent = '🔊'
        }).catch(() => {})
    }
})

/* ================= CONFETTI ================= */

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 15000
    const animationEnd = Date.now() + duration

    // 🎉 Initial romantic burst
    confetti({
        particleCount: 180,
        spread: 110,
        origin: { x: 0.5, y: 0.4 },
        colors
    })

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
            clearInterval(interval)
            return
        }

        // Semakin mendekati akhir → semakin sedikit
        const progress = timeLeft / duration
        const particleCount = Math.floor(50 * progress)

        confetti({
            particleCount: particleCount,
            spread: 70,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors,
            ticks: 200,
            gravity: 1
        })

    }, 250)
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
