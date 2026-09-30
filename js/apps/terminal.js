document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cli-input');
    const log = document.getElementById('cli-log');

    if (!input || !log) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();

            // Echo command
            log.innerHTML += `<div><span class="prompt">artemis@gateway:~$</span> ${escapeHTML(input.value)}</div>`;
            input.value = '';

            // Execute command logic
            executeCommand(command, log);

            // Auto-scroll to bottom
            const contentArea = log.parentElement;
            contentArea.scrollTop = contentArea.scrollHeight;
        }
    });
});

function executeCommand(cmd, log) {
    switch (cmd) {
        case 'help':
            log.innerHTML += `
        <div style="color: var(--text-dim); margin: 4px 0 8px 0;">
          Available System Commands:<br>
          &nbsp;&nbsp;<b style="color:var(--text-main)">status</b>&nbsp;&nbsp;&nbsp;&nbsp;- Output link latency and satellite telemetry<br>
          &nbsp;&nbsp;<b style="color:var(--text-main)">apod</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Fetch daily metadata from NASA REST API<br>
          &nbsp;&nbsp;<b style="color:var(--text-main)">telemetry</b> - Open lunar landing site logs<br>
          &nbsp;&nbsp;<b style="color:var(--text-main)">clear</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear shell terminal screen
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
            log.innerHTML += `<div>[NASA REST API] Querying NASA APOD endpoint...</div>`;
            fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
                .then((res) => {
                    if (!res.ok) throw new Error('Network response failure');
                    return res.json();
                })
                .then((data) => {
                    log.innerHTML += `
            <div style="border-left: 2px solid var(--accent-green); padding-left: 8px; margin: 6px 0;">
              <b style="color: #fff;">${escapeHTML(data.title)}</b> (${data.date})<br>
              <span style="color: var(--text-dim); font-size: 0.75rem;">${escapeHTML(data.explanation.slice(0, 160))}...</span>
            </div>`;
                    const contentArea = log.parentElement;
                    contentArea.scrollTop = contentArea.scrollHeight;
                })
                .catch(() => {
                    log.innerHTML += `<div style="color: #ff6b6b;">[ERR] Unable to reach NASA REST service. Check network route.</div>`;
                });
            break;

        case 'clear':
            log.innerHTML = '';
            break;

        default:
            if (cmd !== '') {
                log.innerHTML += `<div style="color: var(--text-dim);">Command '${escapeHTML(cmd)}' not found. Type 'help'.</div>`;
            }
            break;
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}