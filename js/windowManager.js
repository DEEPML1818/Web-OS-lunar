let activeZIndex = 100;

function initWindowManager() {
    const windows = document.querySelectorAll('.os-window');

    windows.forEach((win) => {
        const header = win.querySelector('.window-header');
        let isDragging = false;
        let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

        header.addEventListener('pointerdown', (e) => {
            // Bring clicked window to top stack
            activeZIndex++;
            win.style.zIndex = activeZIndex;

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = win.offsetLeft;
            initialTop = win.offsetTop;
            header.setPointerCapture(e.pointerId);
        });

        header.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            win.style.left = `${initialLeft + dx}px`;
            win.style.top = `${initialTop + dy}px`;
        });

        header.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            header.releasePointerCapture(e.pointerId);
        });
    });
}

function openWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    win.style.display = 'flex';
    activeZIndex++;
    win.style.zIndex = activeZIndex;
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) win.style.display = 'none';
}

function minimizeWindow(id) {
    closeWindow(id);
}

document.addEventListener('DOMContentLoaded', initWindowManager);