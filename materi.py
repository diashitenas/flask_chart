# Jalankan MongoDB shell
mongo

# Buat database dan koleksi baru
use temperatureDB
db.createCollection("sensorData")

db.sensorData.insertMany([
  { timestamp: ISODate("2024-10-27T07:31:30Z"), temperature: 20.5 },
  { timestamp: ISODate("2024-10-27T08:31:30Z"), temperature: 21.0 },
  { timestamp: ISODate("2024-10-27T09:31:30Z"), temperature: 21.5 }
  // Tambahkan lebih banyak data sesuai kebutuhan
])

pip install Flask pymongo