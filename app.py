from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Koneksi ke database MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client.temperatureDB
collection = db['sensorData']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    # Mengambil data dari MongoDB dan menyiapkannya untuk dikirim ke frontend
    cursor = collection.find({}, {'_id': 0})
    data_list = list(cursor)
    return jsonify(data_list)

if __name__ == '__main__':
    app.run(debug=True, port=8123)