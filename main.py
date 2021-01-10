
# class WantPerson(object):
#     def __init__(self, item_type, phone):
#         self.item_type = item_type
#         self.phone = phone

everyone = {} # key: item_type, value: array of phone numbers 

def want_sign_up(item_type, phone):
    #wp = WantPerson(item_type, phone)
    
    if item_type in everyone:
        everyone[item_type].append(phone)
    else:
        everyone[item_type] = [phone]

def food_availible(item, item_type, quantity, location, time):
    if item_type in everyone:
        for phone in everyone[item_type]:
            send_text(item + ", " + location + ", "+ time, phone)
    

def send_text(text, phone):
    #stub
    return None


#class Supplier(object):
#   def __init__(self, item, item_type, location):
#        self.item_type = item_type
#        self.item = item
#        self.location = location