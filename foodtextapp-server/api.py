import flask
from flask import request

import main

app = flask.Flask(__name__)
app.config["DEBUG"] = True

def get_field(data, field):
    if field in data:
        return data[field]
    else:
        raise KeyError("Error: No {} field provided. Please specify an id.".format(field))

@app.route('/api/getfood', methods=['POST'])
def get_food():
    data = request.form
    print(data)
    try:
        item_type = get_field(data, 'item_type')
        phone_num = get_field(data, 'phone')
    except KeyError as ke:
        return str(ke)

    if main.want_sign_up(item_type, phone_num):
        return "success"
    else:
        return "fail"

@app.route('/api/sharefood', methods=['POST'])
def share_food():
    data = request.form
    print(data)
    try:
        item = get_field(data, 'item')
        item_type = get_field(data, 'item_type')
        quantity = int(get_field(data, 'quantity'))
        location = get_field(data, 'location')
        time = get_field(data, 'time')
    except KeyError as ke:
        return str(ke)

    if main.food_available(item, item_type, quantity, location, time):
        return "success"
    else:
        return "not everyone got the message"

app.run()
