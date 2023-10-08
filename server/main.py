from flask import Flask, request
from flask_cors import CORS
import services
app = Flask(__name__)
app.register_blueprint(services.africaServices)

cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def route():
    return "------------------ African Countries Environmental Analysis Website ----------------------"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9823, debug=True, threaded=True, use_reloader=False)
