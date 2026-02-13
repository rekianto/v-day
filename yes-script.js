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
    const duration = 6000
    const end = Date.now() + duration

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

/* ================= HEARTS ================= */

function spawnHearts(amount = 50) {
    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("div")
        heart.classList.add("flying-heart")
        heart.textContent = "💖"

        heart.style.left = Math.random() * window.innerWidth + "px"
        heart.style.bottom = "0px"
        heart.style.fontSize = (Math.random() * 25 + 18) + "px"

        document.body.appendChild(heart)

        setTimeout(() => heart.remove(), 3000)
    }
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
