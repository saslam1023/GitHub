from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId  # Import ObjectId

app3 = Flask(__name__)
client = MongoClient('mongodb+srv://saslam1023:2wWENVahazgLR1Zb@cluster0.snxyuyr.mongodb.net/')  # Connect to MongoDB
db = client['user']  # Use 'admin_db' database


@app3.route('/')
def index():
    users = db.user.find()  # Retrieve all users from the collection
    return render_template('index3.html', users=users)




@app3.route('/modify_user', methods=['POST'])
def modify_user():
    if request.method == 'POST':
        user_id = int(request.form['user_id'])
        new_name = request.form['name']
        new_age = int(request.form['age'])

        # Update user data (replace with actual update logic)
        for user in db:
            if db.user['_id'] == user_id:
                db.user['name'] = new_name
                db.user['age'] = new_age
                break

    return redirect('/')


if __name__ == '__main__':
    app3.run(debug=True)
