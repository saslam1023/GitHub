from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__, template_folder='templates')

# Retrieve MongoDB connection string from environment variables
MONGODB_URI = os.getenv('MONGODB_URI')

# Connect to MongoDB
client = MongoClient(MONGODB_URI)
#db = client.get_default_database()
#users = db['user']
db = client['users']


# Define routes
@app.route('/')
def index():
    users = db.user.find()
    return render_template('index.html', users=users)

@app.route('/add_user', methods=['POST'])
def add_user():
    name = request.form['name']
    email = request.form['email']
    db.user.insert_one({'name': name, 'email': email})
    return redirect(url_for('index'))

@app.route('/modify_user/<user_id>', methods=['POST'])
def modify_user(user_id):
    new_name = request.form['name']
    new_email = request.form['email']
    db.user.update_one({'_id': ObjectId(user_id)}, {'$set': {'name': new_name, 'email': new_email}})
    return redirect(url_for('index'))

@app.route('/delete_user/<user_id>', methods=['POST'])
def delete_user(user_id):
    db.user.delete_one({'_id': ObjectId(user_id)})
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)

