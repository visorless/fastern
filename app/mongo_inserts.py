import random


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

for i in range(5):
    first = random.choice(first_name)
    middle = random.choice(middle_i)
    last = random.choice(last_name)
    print('a random name: ', first, middle, last)
    struc = random.choice(email_struc)
    domain = random.choice(domains) + '.com'
    email = ''
    if struc == 1:
        email = first + '.' + last + '@' + domain
    if struc == 2:
        email = first + '.'+ middle + '.' + last + '@' + domain
    else:
        email = first + '.'+ last[0] + '@' + domain
    print('    ', email)





# db.inventory.insertMany([
#     {"i_number": 1, "name": "allen wrench" },
#     {"i_number": 2, "name": "gerbil feeder"},
#     {"i_number": 3, "name": "toilet seat"},
#     {"i_number": 4, "name": "electric heater"}
# ])
