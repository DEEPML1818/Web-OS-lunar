document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cli-input');
    const log = document.getElementById('cli-log');

    if (!input || !log) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();

            log.innerHTML += `<div><span class="prompt">artemis@gateway:~$</span> ${escapeHTML(input.value)}</div>`;
            input.value = '';

            executeCommand(command, log);

            const contentArea = log.parentElement;
            contentArea.scrollTop = contentArea.scrollHeight;
        }
    });
});

function executeCommand(cmd, log) {
    switch (cmd) {
        case 'help':
            log.innerHTML += `
        <div style="color: var(--text-muted); margin: 4px 0 8px 0;">
          Available System Commands:<br>
          &nbsp;&nbsp;<b style="color:var(--text-main)">status</b>&nbsp;&nbsp;&nbsp;&nbsp;- Output orbital link latency & satellite telemetry<br>
          &nbsp;&nbsp;<b style="color:var(--text-main)">apod</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Fetch daily astronomy data from NASA REST API<br>
          &nbsp;&nbsp;<b style="color:var(--text-main)">telemetry</b> - Open landing site telemetry logs<br>
          &nbsp;&nbsp;<b style="color:var(--text-main)">clear</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal screen
        </div>`;
            break;

        case 'status':
            log.innerHTML += `
        <div style="color: var(--accent-cyan); margin-bottom: 6px;">
          [SYS_LINK] Connection: ONLINE | Bandwidth: 1.2 Gbps<br>
          [ORBIT] Gateway Alt: 1,420 km | Latency: 1.28s<br>
          [LRO] Elevation Sensor: ACTIVE
        </div>`;
            break;

        case 'telemetry':
            openWindow('win-telemetry');
            log.innerHTML += `<div>Opened Site Telemetry module.</div>`;
            break;

        case 'apod':
            log.innerHTML += `<div>[NASA REST API] Fetching APOD dataset...</div>`;
            fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
                .then((res) => res.json())
                .then((data) => {
                    log.innerHTML += `
            <div style="border-left: 2px solid var(--accent-green); padding-left: 8px; margin: 6px 0;">
              <b style="color: #fff;">${escapeHTML(data.title)}</b> (${data.date})<br>
              <span style="color: var(--text-muted); font-size: 0.75rem;">${escapeHTML(data.explanation.slice(0, 160))}...</span>
            </div>`;
                    const contentArea = log.parentElement;
                    contentArea.scrollTop = contentArea.scrollHeight;
                })
                .catch(() => {
                    log.innerHTML += `<div style="color: #ff6b6b;">[ERR] Unable to reach NASA REST endpoint.</div>`;
                });
            break;

        case 'clear':
            log.innerHTML = '';
            break;

        default:
            if (cmd !== '') {
                log.innerHTML += `<div style="color: var(--text-muted);">Command '${escapeHTML(cmd)}' not recognized. Type 'help'.</div>`;
            }
            break;
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}