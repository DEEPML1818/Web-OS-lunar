function initClock() {
    const clockEl = document.getElementById('system-clock');

    function update() {
        if (clockEl) {
            const now = new Date();
            clockEl.innerText = now.toUTCString().slice(17, 25) + ' UTC';
        }
    }

    setInterval(update, 1000);
    update();
}

document.addEventListener('DOMContentLoaded', initClock);