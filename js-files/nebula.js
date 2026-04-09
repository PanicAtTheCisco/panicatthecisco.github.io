document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 0;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
        [80, 40, 140],   // deep purple
        [20, 60, 120],   // deep blue
        [40, 100, 120],  // teal-blue
        [100, 30, 80],   // dark magenta
        [255, 86, 124],  // plasma pink
        [250, 201, 53],  // dark yellow
        [2, 48, 32],     // dark green
    ];

    const CLUSTER_COUNT = 3;
    const LAYERS = 6;        // layers per cluster, more = denser cloud
    const BLOBS_PER_LAYER = 12;  // blobs per layer

    class Blob {
        constructor(cx, cy, spread, color) {
            this.reset(cx, cy, spread, color);
        }

        reset(cx, cy, spread, color) {
            this.x = cx + (Math.random() - 0.5) * spread * 2;
            this.y = cy + (Math.random() - 0.5) * spread * 2;
            this.radius = Math.random() * 80 + 40;
            this.color = color;
            this.opacity = Math.random() * 0.04 + 0.01;
            this.speedX = (Math.random() - 0.5) * 0.08;
            this.speedY = (Math.random() - 0.5) * 0.08;
            this.pulseSpeed = Math.random() * 0.003 + 0.001;
            this.pulseOffset = Math.random() * Math.PI * 2;
        }

        draw(frame) {
            const pulse = Math.sin(frame * this.pulseSpeed + this.pulseOffset) * 0.01;
            const opacity = Math.max(0, this.opacity + pulse);
            const [r, g, b] = this.color;

            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );
            gradient.addColorStop(0, `rgba(${r},${g},${b},${opacity})`);
            gradient.addColorStop(0.5, `rgba(${r},${g},${b},${opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        update(cx, cy, spread) {
            this.x += this.speedX;
            this.y += this.speedY;

            // softly drift back toward cluster center if too far
            const dx = cx - this.x;
            const dy = cy - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > spread * 1.5) {
                this.x += dx * 0.001;
                this.y += dy * 0.001;
            }
        }
    }

    const clusters = Array.from({ length: CLUSTER_COUNT }, () => {
        const cx = Math.random() * canvas.width;
        const cy = Math.random() * canvas.height;
        const spread = Math.random() * 180 + 120;
        const blobs = [];

        for (let l = 0; l < LAYERS; l++) {
            // change color on each layer to add more variance in the colors of each nebula, but not too much
            color = colors[Math.floor(Math.random() * colors.length)];
            for (let b = 0; b < BLOBS_PER_LAYER; b++) {
                blobs.push(new Blob(cx, cy, spread * (l / LAYERS + 0.3), color));
            }
        }

        return { cx, cy, spread, blobs };
    });

    let frame = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        clusters.forEach(cluster => {
            cluster.blobs.forEach(blob => {
                blob.update(cluster.cx, cluster.cy, cluster.spread);
                blob.draw(frame);
            });
        });

        frame++;
        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});