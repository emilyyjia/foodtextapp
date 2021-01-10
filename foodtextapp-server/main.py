import os
from twilio.rest import Client
from google.cloud import firestore
import datetime

# Account Sid and Auth Token from twilio.com/console
# Set as enviroment variables, See http://twil.io/secure


# class Person(object):
#     def __init__(self, name, phone):
#         self.name = name
#         self.phone = phone


account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
# everyone = {}  # key: item_type, value: array of persons

db = firestore.Client()


def want_sign_up(item_type, city, name, phone):
    
    doc_ref = db.collection(u'people').document(phone)

    doc = doc_ref.get()
    #if doc.exists:
    doc_ref.set({
        u'name': name,
        u'item_type': item_type,
        u'city': city,
        u'phone': phone
        u'lastserved' : datetime.datetime.now()}, merge = True)
        #u'queue': None
##    else:
##        doc_ref.set({
##            u'name': name,
##            u'item_type': item_type,
##            u'city': city,
##            u'phone': phone
##            u'datetime' : datetime.datetime.now() 
##            u'lastserved': None
##            u'replied': 0}) #0 for replied with no, or not at all; 1 for replied with yes
            

    return True



#sorting function
def sortfun(person):
    return person['lastserved']


def food_available(name, item, item_type, city, quantity, location, time, desc):
    success = True
    queue = []
    queue_size = quantity
    docs = db.collection(u'people').where(
        u'item_type', '==', item_type).where(u'city', '==', city).stream()
    for doc in docs:
        person = doc.to_dict()
##        if len(queue) <= queue_size:
##            queue.append(person)
##        else:
##            break

        queue.append(person)
        doc.set({
            u'queue' : name+item}, merge = True)

    queue.sort(key = sortfun)

##    doc_ref = db.collection(u'queues').document(name+', '+item)
##
##    doc_ref.set({
##        u'name': name,
##        u'item' : item,
##        u'item_type': item_type,
##        u'city': city,
##        u'quantity': quantity,
##        u'location' : location,
##        u'time' : time
##        u'desc' : desc
##        u'queue' : queue}, merge = True)
    

    for i in range(queue_size):
        person = queue[i]
        text = "Hey {}! {} has a surplus of {}. There are {} available at {} at {}.\n Here's what else they have to say: \"{}\"".format(
            person['name'], name, item, quantity, location, time, desc)
        print(text)
        if send_text(text, person['phone']):
            db.collection(u'people').document(person['name']).set({u'lastserved' : datetime.datetime.now()} , merge = True) #move this to after replying mechanism figured out
##            queue.remove(person)
##            doc blah blah
        else:
            success = False




##    for person in queue:
##        text = "Hey {}! {} has a surplus of {}. There are {} available at {} at {}.\n Here's what else they have to say: \"{}\"".format(
##            person['name'], name, item, quantity, location, time, desc)
##        print(text)
##        if send_text(text, person['phone']):
##            db.collection(u'people').document(person['name']).set({u'lastserved' : datetime.datetime.now()} , merge = True) #move this to after replying mechanism figured out
##        else:
##            success = False

    return success

##def nextinline(phone):
##    person_doc = db.collection(u'people').document(phone)
##    
##    person = person_doc.to_dict()
##    queue_doc = db.collection(u'queues').document(person['queue'])
##    queue_doc.update({
##        u'capital': firestore.DELETE_FIELD
##        })
##        
##
####    for doc in docs:
####        queue_dets = doc.to_dict()
####        queue = queue_dets['queue']
####        for person in queue:
####            if person['phone'] == phone:
####                if queue_dets['quantity'] <= len(queue):
####                    nextperson = queue[queue_dets['quantity']]
####                    text = "Hey {}! {} has a surplus of {}. There are {} available at {} at {}.\n Here's what else they have to say: \"{}\"".format(
####                    nextperson['name'], queue_dets['name'], queue_dets['item'], queue_dets['quantity'], queue_dets['location'], queue_dets['time'], queue_dets['desc'])
####                    print(text)
####                    if send_text(text, nextperson['phone']):
####                        db.collection(u'people').document(nextperson['name']).set({u'lastserved' : datetime.datetime.now()} , merge = True) #move this to after replying mechanism figured out
####                    else:
####                        success = False
####
####                queue.remove(person)
####                break



def send_text(text, phone):
    client = Client(account_sid, auth_token)

    message = client.messages \
                    .create(
                        body=text,
                        from_='+16043322049',
                        to=phone
                    )

    return message.error_code == None
    # print(message.sid)

# EXAMPLE JSON API RESPONSE
# {
# "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
# "api_version": "2010-04-01",
# "body": text,
# "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
# "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
# "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
# "direction": "outbound-api",
# "error_code": null,
# "error_message": null,
# "from": "+15017122661", #change number here
# "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
# "num_media": "0",
# "num_segments": "1",
# "price": null,
# "price_unit": null,
# "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
# "status": "sent",
# "subresource_uris": {
# "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
# },
# "to": phone,
# "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
# }


if __name__ == "__main__":
    want_sign_up("veggies", "+17787082738")
    food_available("potatoes", "veggies", 3, "the pool", "2pm")

# class Supplier(object):
#   def __init__(self, item, item_type, location):
#        self.item_type = item_type
#        self.item = item
#        self.location = location
