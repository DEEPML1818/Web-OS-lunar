function initLunar3D() {
    const container = document.getElementById('three-container');
    const canvas = document.getElementById('lunar-canvas');
    if (!container || !canvas) return;

    // Scene & Camera Configuration
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 4.2;

    // Renderer Engine
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // NASA LRO CGI Moon Kit Textures
    const textureLoader = new THREE.TextureLoader();
    const colorMap = textureLoader.load(
        'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_1k.jpg'
    );
    const bumpMap = textureLoader.load(
        'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg'
    );

    // 3D Sphere Geometry & Material Mapping
    const geometry = new THREE.SphereGeometry(1.6, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        map: colorMap,
        bumpMap: bumpMap,
        bumpScale: 0.04,
        roughness: 0.85,
        metalness: 0.1
    });

    const moonMesh = new THREE.Mesh(geometry, material);
    scene.add(moonMesh);

    // Solar Directional Light & Ambient Sky fill
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x0a0f1d, 0.4);
    scene.add(ambientLight);

    // Orbit Drag & Rotation Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        moonMesh.rotation.y += 0.0006; // Slow continuous axial spin
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Resize Listener to keep Three.js responsive on Window Drag/Resize
    const resizeObserver = new ResizeObserver(() => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
    resizeObserver.observe(container);
}

document.addEventListener('DOMContentLoaded', initLunar3D);