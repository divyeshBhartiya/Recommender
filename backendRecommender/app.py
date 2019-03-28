from flask import Flask
from flask_cors import CORS
import json
from Recommender import getRecommendedItems
import databaseCon

app = Flask(__name__)
CORS(app)

#CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/predictions/<int:uid>", strict_slashes = False)
def predictions(uid):
    return json.dumps(getRecommendedItems(uid), indent=2)

@app.route("/createUser/<string:uid>", strict_slashes = False)
def createUser(uid):
    con = databaseCon.Database()
    return con.insertUser(uid)

@app.route("/getUser/<string:uid>", strict_slashes = False)
def getUser(uid):
    con = databaseCon.Database()
    return json.dumps(con.getUser(uid), indent=2)

@app.route("/rateItem/<string:itemName>/<int:ratedValue>/<int:uid>", strict_slashes = False)
def rateItem(itemName, ratedValue, uid):
    con = databaseCon.Database()
    return con.rateItem(itemName, ratedValue, uid)

if __name__=='__main__':
    app.run(debug=True)