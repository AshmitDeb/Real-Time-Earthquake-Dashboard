from flask import Flask, request, jsonify
app = Flask(__name__)

# compute rolling magnitude average for client charting
@app.route('/avg-mag', methods=['POST'])
def avg_mag():
    mags = request.json['mags']  # list of floats
    if not mags:
        return jsonify({'avg': None})
    return jsonify({'avg': sum(mags) / len(mags)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)