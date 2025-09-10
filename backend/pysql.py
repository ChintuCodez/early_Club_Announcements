from flask import Flask, request, jsonify
import mysql.connector as mysql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mycon = mysql.connect(host = "localhost", user = "root", password = "0129", database = "club_announcements")
cursor = mycon.cursor()

@app.route('/add_announcement', methods = ['POST'])
def add_announcement():
    data = request.get_json()
    title = data.get('title')
    subtitle = data.get('subtitle')
    description = data.get('description')
    query = "INSERT into announcement (title, subtitle, description) VALUES (%s, %s, %s)"
    values = (title, subtitle, description)
    cursor.execute(query, values)
    mycon.commit()
    return jsonify({'message': 'Announcement added successfully'}), 201

@app.route('/get_announcements', methods = ['GET'])
def get_announcements():
    cursor.execute("SELECT * FROM announcement")
    announcements = cursor.fetchall()
    announcement_list = [{'id': row[0], 'title': row[1], 'subtitle': row[2], 'description': row[3]} for row in announcements]
    return jsonify(announcement_list), 200

@app.route('/delete_announcement/<int:announcement_id>', methods = ['DELETE'])
def delete_announcement(announcement_id):
    cursor.execute("DELETE from announcement where id = %s", (announcement_id,))
    mycon.commit()
    return jsonify({'message': 'Announcement deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)