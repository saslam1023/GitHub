from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
client = MongoClient('mongodb+srv://saslam1023:2wWENVahazgLR1Zb@cluster0.snxyuyr.mongodb.net/')
db = client['user']

@app.route('/')
def index():
    users = db.user.find()
    return render_template('index.html', users=users)

@app.route('/add_user', methods=['POST'])
def add_user():
    name = request.form['name']
    age = request.form['age']
    db.user.insert_one({'name': name, 'age': age})
    return redirect(url_for('index'))

@app.route('/modify_user/<user_id>', methods=['POST'])
def modify_user(user_id):
    new_name = request.form['name']
    new_age = request.form['age']
    db.user.update_one({'_id': ObjectId(user_id)}, {'$set': {'name': new_name, 'age': new_age}})
    return redirect(url_for('index'))

@app.route('/delete_user/<user_id>', methods=['POST'])
def delete_user(user_id):
    db.user.delete_one({'_id': ObjectId(user_id)})
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
