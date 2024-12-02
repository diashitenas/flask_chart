document.addEventListener('DOMContentLoaded', () => {
    // Menunggu hingga seluruh dokumen HTML selesai dimuat sebelum menjalankan fungsi ini.
    fetch('/data') // Mengirim permintaan jaringan ke endpoint '/data' untuk mengambil data dari server.
        .then(response => response.json()) // Mengonversi respon yang diterima dari server menjadi format JSON.
        .then(data => { // Setelah data JSON diterima, cetak data ke konsol untuk tujuan debugging.
            console.log(data); // Membuat array `labels` dengan memetakan setiap entri ke waktu yang diformat dari timestamp.
            const labels = data.map(entry => {
                const date = new Date(entry.timestamp);
                return date instanceof Date && !isNaN(date) ? date.toLocaleTimeString() : 'Invalid Date';
            });
            // Membuat array `temperatures` dengan memetakan setiap entri ke nilai suhu.
            const temperatures = data.map(entry => entry.temperature);
            // Mendapatkan konteks 2D dari elemen canvas dengan id 'temperatureChart'.
            const ctx = document.getElementById('temperatureChart').getContext('2d');
            // Membuat grafik garis menggunakan Chart.js.
            new Chart(ctx, {
                type: 'line', // Menentukan tipe grafik sebagai garis.
                data: {
                    labels: labels, // Label sumbu x berasal dari array `labels` yang dibuat sebelumnya.
                    datasets: [{
                        label: 'Suhu (°C)', // Label untuk dataset suhu.
                        data: temperatures, // Data suhu untuk sumbu y berasal dari array `temperatures`.
                        borderColor: 'rgba(75, 192, 192, 1)', // Warna garis grafik.
                        borderWidth: 1 // Ketebalan garis grafik.
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Memulai sumbu y dari nol.
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
        // Menangani kesalahan yang terjadi saat permintaan data, dan mencetak pesan kesalahan ke konsol.
});