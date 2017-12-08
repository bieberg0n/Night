from flask import Flask, send_file  # , redirect, abort
from gevent.wsgi import WSGIServer


app = Flask(__name__)


@app.route('/', methods=['GET'])
def night():
    return send_file('static/night.html')


WSGIServer(('', 8080), app).serve_forever()
