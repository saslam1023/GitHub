from flask import Flask, render_template
import json

app = Flask(__name__)

# JSON file path
JSON_FILE = 'data.json'

# Read data from JSON file
def read_data():
    try:
        with open(JSON_FILE, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        data = []
    return data

# Route for rendering index.html with JSON data
@app.route('/')
def index():
    data = read_data()
    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
