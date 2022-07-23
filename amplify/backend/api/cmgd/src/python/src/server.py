from flask import Flask
from random import randrange

server = Flask(__name__)

@server.route('/random')
def hello():
    return str(randrange(100))

if __name__ == "__main__":
   server.run(host='0.0.0.0')