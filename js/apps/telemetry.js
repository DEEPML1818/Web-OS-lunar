const landingSites = [
    {
        name: "Apollo 11 — Tranquility Base",
        coords: "0.67408° N, 23.47297° E",
        desc: "First crewed landing site. Deployed Passive Seismic Experiment Package and Laser Ranging Retroreflector."
    },
    {
        name: "Artemis III — South Pole Rim",
        coords: "89.9° S, 0.0° E",
        desc: "Target site for subsurface water-ice prospecting and solar radiation telemetry in permanently shadowed regions."
    },
    {
        name: "Chang'e 5 — Oceanus Procellarum",
        coords: "43.0586° N, 51.9161° W",
        desc: "Lunar sample return mission investigating young volcanic basalt formations."
    }
];

function initTelemetry() {
    const container = document.getElementById('telemetry-content');
    if (!container) return;

    container.innerHTML = landingSites.map(site => `
    <div class="telemetry-card">
      <h4>📍 ${site.name}</h4>
      <div class="coords">${site.coords}</div>
      <div class="desc">${site.desc}</div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', initTelemetry);