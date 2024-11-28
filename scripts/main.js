// Simula gráficos con Chart.js
document.addEventListener("DOMContentLoaded", () => {
    const ctx1 = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: [10, 20, 30, 40],
            datasets: [{
                label: 'Data',
                data: [10, 20, 15, 25],
                borderColor: 'rgba(255,255,255,0.7)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                }
            }
        }
    });

    // Reloj dinámico
    function updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('time').textContent = time;
    }
    setInterval(updateClock, 1000);
    updateClock();
});
