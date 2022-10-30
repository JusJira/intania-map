from flask import Flask
from flask import jsonify
from flask import request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

app = Flask(__name__)

cred = credentials.Certificate('intania-map-firebase-adminsdk-rfcmm-074c3378e5.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
doc_ref = db.collection(u'building_data').document(u'building_info')

@app.route('/', methods=["GET"])
def hello_world():
    return 'Hello World'

@app.route('/building/<string:buildname>', methods=["GET"])
def building_info(buildname):
    doc = doc_ref.get()
    if doc.exists:
        a = doc.to_dict()
        response = jsonify(a[buildname])
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        return '404'

@app.route('/tmpay', methods=["GET"])
def tmpay():
    return 'SUCCEED|YAY'
    