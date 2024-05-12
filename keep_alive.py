from flask import Flask, render_template
from threading import Thread

app = Flask(__name__)

# Function to read the contents of db.txt
def read_db_content():
    with open('DB/db.txt', 'r') as file:
        return file.read()

# Route to display the contents of db.txt
@app.route('/')
def index():
    db_content = read_db_content()
    return render_template('display_db.html', db_content=db_content)

def run():
    app.run(host='0.0.0.0', port=8080)

def keep_alive():  
    t = Thread(target=run)
    t.start()
