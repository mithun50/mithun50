from flask import Flask, render_template, request, redirect, url_for, send_file
from threading import Thread

app = Flask(__name__)

# Dummy credentials (replace with actual login mechanism)
USERNAME = "admin"
PASSWORD = "@mithun#"

# Function to read the contents of db.txt
def read_db_content():
    with open('DB/db.txt', 'r') as file:
        return file.read()

# Route to display the login page
@app.route('/')
def login():
    return render_template('login.html')

# Route to handle login form submission
@app.route('/login', methods=['POST'])
def do_login():
    username = request.form['username']
    password = request.form['password']
    
    if username == USERNAME and password == PASSWORD:
        return redirect(url_for('show_db'))
    else:
        return render_template('login.html', error=True)

# Route to display the contents of db.txt after successful login
@app.route('/db')
def show_db():
    db_content = read_db_content()
    return render_template('display_db.html', db_content=db_content)

# Route to download the db.txt file
@app.route('/download')
def download_db():
    return send_file('DB/db.txt', as_attachment=True)

def run():
    app.run(host='0.0.0.0', port=8080)

def keep_alive():  
    t = Thread(target=run)
    t.start()
