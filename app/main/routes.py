from flask import (render_template, redirect, url_for, flash, request, jsonify)
from app.main import bp
from app import mongo
from datetime import datetime
import random

import json
from bson import ObjectId, errors

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        elif isinstance(o,  datetime):
            return o.strftime("%m/%d/%Y, %H:%M:%S")
        return json.JSONEncoder.default(self, o)

@bp.route('/')
@bp.route('/chat')
@bp.route('/customers')
@bp.route('/inventory')
def landing():

    user = 'Thor Odinson'
    return render_template('index.html', title='FASTER/\/',
                           user=user)


@bp.route('/get_inventory')
def get_inventory():
    if 'range' in request.args:
        range = request.args['range']
        range = range.split('-')
        print(range)
        inventory = list(
            mongo.db.inventory.find(
                {'i_number': {'$gt': int(range[0]), '$lte': int(range[1])}}
            )
        )
    else:
        inventory = list(mongo.db.inventory.find({}))
    max = mongo.db.inventory.find().count()
    print(mongo.db.inventory.find(
        {'i_number': {'$gt': int(range[0]), '$lte': int(range[1])}}
    ).count())
    return {
        'success': True,
        'payload': JSONEncoder().encode(inventory),
        'max': max
    }


@bp.route('/change_inventory/<item_id>')
def change_inventory(item_id):
    if 'increase' in request.args:
        increase = request.args['increase']
        inventory = mongo.db.inventory.update(
                {'_id': ObjectId(item_id)},
                { '$inc': {'qty': int(increase)}}
            )


    return {
        'success': True,
        'payload': JSONEncoder().encode(inventory),

    }

@bp.route('/add_inventory', methods=['POST'])
def add_inventory():
    json_data = request.get_json()
    i_number = mongo.db.inventory.find().count() + 1
    inventory = mongo.db.inventory.insert({
        "i_number": i_number,
        "name": json_data['name'],
        "serial_num": json_data['serial_num'],
        "qty": json_data['qty']
    })
    return {
        'success': True,
        'payload': JSONEncoder().encode(inventory)
    }

@bp.route('/remove_inventory/<item_id>')
def remove_inventory(item_id):
    print('removing')
    try:
        print('trying to remove')
        result = mongo.db.inventory.delete_one({ "_id" : ObjectId(item_id) })
        print('removed!')
    except errors.InvalidId as e:
        return {
            'success': False,
        }
    if result.deleted_count > 0:
        return {
            'success': True,
        }
    else:
        return {
            'success': False,
        }

@bp.route('/get_customers')
def get_customers():
    customers = list(mongo.db.customers.find())
    return {
        'success': True,
        'payload': JSONEncoder().encode(customers)
    }

@bp.route('/add_customer', methods=['POST'])
def add_customer():
    json_data = request.get_json()
    customers = mongo.db.customers.insert({
        "firstname": json_data['firstName'],
        "middle_i": json_data['middleName'],
        "lastname": json_data['lastName'],
        "email": json_data['email'],
        "created": datetime.now()
    })
    return {
        'success': True,
        'payload': JSONEncoder().encode(customers)
    }

@bp.route('/remove_customer/<cust_id>')
def remove_customers(cust_id):
    print('removing')
    try:
        print('trying to remove')
        result = mongo.db.customers.delete_one({ "_id" : ObjectId(cust_id) })
        print('removed!')
    except errors.InvalidId as e:
        return {
            'success': False,
        }
    if result.deleted_count > 0:
        return {
            'success': True,
        }
    else:
        return {
            'success': False,
        }

@bp.route('/get_users')
def get_users():
    users = list(mongo.db.users.find())
    return {
        'success': True,
        'payload': JSONEncoder().encode(users)
    }

@bp.route('/data_entry_customers')
def data_entry_customers():
    first_name = ['Warren', 'Lawrence', 'Jon', 'Jamie', 'Harley',
    'Robbie', 'Bobby', 'Benjamin', 'Ben', 'Jake',
    'Kyle', 'Kye', 'Eugene', 'Jonah', 'Farhan',
    'Matthew', 'Julian', 'Johnny', 'Herbert', 'Thomas',
    'Charley', 'Maisy', 'Josie', 'Fifi', 'Lana',
    'Louisa', 'Jane', 'Joan', 'Loni', 'Patricia',
    'Hana', 'Libby', 'Morgan', 'Emilie', 'Summer',
    'Abby', 'Lachlan', 'Amanda', 'Harriet', 'Mandi']

    last_name = ['Oliver', 'Lyons', 'Richardson', 'Schultz', 'Stone'
    'Padilla', 'Dawson', 'Walker', 'Caldwell', 'Patterson',
    'Farmer', 'Phillips', 'Hammond', 'Stuart', 'Leon',
    'Ferguson', 'Hubbard', 'Porter', 'Calderon', 'George',
    'Richards', 'Woods', 'Morgan', 'Mason', 'Vaughn',
    'Fraser', 'Lee', 'Nichols', 'Lawson', 'Love',
    'Stevens', 'Patel', 'Solis', 'Grant', 'Fields',
    'Zimmerman', 'Bailey', 'Webster', 'Carpenter', 'Wilkerson']

    middle_i = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                'Y', 'Z']

    domains = ['gmail', 'hotmail', 'aol', 'yahoo', 'fastern']
    email_struc = [1, 2, 3]

    cust = []

    for i in range(100):
        first = random.choice(first_name)
        middle = random.choice(middle_i)
        last = random.choice(last_name)
        #print('a random name: ', first, middle, last)
        struc = random.choice(email_struc)
        domain = random.choice(domains) + '.com'
        email = ''
        if struc == 1:
            email = first + '.' + last + '@' + domain
        if struc == 2:
            email = first + '.'+ middle + '.' + last + '@' + domain
        else:
            email = first + '.'+ last[0] + '@' + domain
        #print('    ', email)
        cust.append({
            "firstname": first,
            "middle_i": middle,
            "lastname": last,
            "email": email,
            "created": datetime.now()
        })
    print(cust)
    mongo.db.customers.insert_many(cust)

    return {
        'success': True,
        'payload': JSONEncoder().encode(cust)
    }


@bp.route('/data_entry_inventory')
def data_entry_inventory():
    adjective = ['Wandering', 'Poised', 'Direful', 'Determined',
                 'Abhorrent', 'Disastrous', 'Entire', 'Suitable',
                 'Critical', 'Scattered', 'Cautious', 'Stiff',
                 'Mute', 'Deafening', 'Shallow', 'Snobbish',
                 'Curly', 'Moaning', 'Sweet', 'Dizzy',
                 'Quixotic', 'Bent', 'Impartial', 'Graceful',
                 'Unequaled', 'Motionless', 'Volatile', 'Elite',
                 'Clever', 'Warm', 'Aboriginal', 'Sudden',
                 'Tested', 'Macabre', 'Temporary', 'Frequent',
                 'Successful', 'Smooth', 'Shiny', 'Grotesque']
    color = ['Red', 'Orange', 'Yellow', 'Green', 'Blue',
             'Purple', 'Brown', 'Magenta', 'Tan', 'Cyan',
             'Lime', 'Maroon', 'Navy', 'Black', 'White',
             'Silver', 'Lime', 'Teal', 'Indigo', 'Violet']
    noun = ['Bottle', 'Outlet', 'Chair', 'Duck', 'Glasses',
            'Machine', 'Screw', 'Perfume', 'Bowl', 'Couch',
            'Car', 'Brush', 'Desk', 'Drill', 'Light',
            'Thermometer', 'Pants', 'Sandal', 'Lamp', 'Television',
            'Door', 'Slipper', 'Clamp', 'Toilet', 'Card',
            'Doll', 'Key', 'Purse', 'Mirror', 'Wagon',
            'Glass', 'Watch', 'Table', 'Pen', 'Bracelet',
            'Computer', 'Pencil', 'Soap', 'Clock', 'Book']
    inv = []
    names = []
    count = 1
    while True:
        adj = random.choice(adjective)
        col = random.choice(color)
        nun = random.choice(noun)
        lst = [adj, col, nun]
        item = '{0} {1} {2}'.format(adj, col, nun)
        # print(item)
        serial_num = '{0}{1}{2}{3}{4}-{5}'.format(adj[0],
                                           col[0],
                                           nun[0],
                                           str(len(''.join(lst))),
                                           str(random.randint(10, 99)),
                                           col[0:3].upper()
                                           )

        # print(serial_num)
        qty = random.randint(0, 10000)
        # print(qty)
        if item not in names:
            inv.append({
                "i_number": count,
                "name": item,
                "serial_num": serial_num,
                "qty": qty
            })
            names.append(item)
            if count < 1000:
                count = count + 1
            else:
                print('breaking')
                break
    print('inserting')
    mongo.db.inventory.insert_many(inv)

    return {
        'success': True,
        'payload': JSONEncoder().encode(inv)
    }
