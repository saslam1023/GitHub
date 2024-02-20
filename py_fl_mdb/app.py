from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['admin_dashboard']
collection = db['users']

# Routes
@app.route('/')
def index():
    # Retrieve all users from the database
    users = collection.find()
    return render_template('index.html', users=users)

@app.route('/add_user', methods=['POST'])
def add_user():
    # Get form data
    username = request.form['username']
    email = request.form['email']

    # Insert new user into the database
    new_user = {'username': username, 'email': email}
    collection.insert_one(new_user)

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
