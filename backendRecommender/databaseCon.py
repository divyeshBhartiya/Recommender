import mysql.connector

class Database:

    def __init__(self):
        self.connection = mysql.connector.connect(user='root', password='dbUser', host='127.0.0.1', database='recommenderData', use_pure=False)
        self.cursor = self.connection.cursor()


    def insert(self, query):
        try:
            self.cursor.execute(query)
            self.connection.commit()
        except:
            self.connection.rollback()


    def selectAll(self):
        data = []
        users = []
        items = []
        ratings = []

        self.cursor.execute("SELECT rating, Users_idUsers, Recipe_idRecipe from rating;")
        rows = self.cursor.fetchall()

        for r in rows:
            ratings.append(r[0])
            users.append(r[1])
            items.append(r[2])

        data.append(users)
        data.append(items)
        data.append(ratings)

        return data

    def getNames(self, iid):
        self.cursor.execute("SELECT recipeName FROM recipe WHERE idRecipe = " + str(iid) + ";")
        rows = self.cursor.fetchall()
        return rows[0]

    def insertUser(self, uid):
        self.cursor.execute("INSERT INTO recommenderdata.users (idFirebase) VALUES (" + str(uid) + ");")
        self.cursor.execute("INSERT INTO recommenderdata.rating (rating, Users_idUsers, Recipe_idRecipe) VALUES (3, (SELECT users.idUsers FROM recommenderdata.users WHERE users.idFirebase =" + str(uid) + "), 5);")
        self.connection.commit()
        return "User Created"

    def getUser(self, uid):
        self.cursor.execute("SELECT idUsers FROM recommenderdata.users WHERE idFirebase = " + str(uid) + ";")
        rows = self.cursor.fetchall()
        return rows[0]

    def rateItem(self, itemName, ratedValue, uid ):
        itemName = itemName.replace('%20', ' ')
        self.cursor.execute("Insert INTO recommenderdata.rating (rating, Users_idUsers, Recipe_idRecipe) VALUES ("+ str(ratedValue) +", "+ str(uid) +", (SELECT idRecipe FROM recommenderdata.recipe WHERE recipeName =\'" + itemName + "\'));")
        self.connection.commit()
        return "Recipe Rated"