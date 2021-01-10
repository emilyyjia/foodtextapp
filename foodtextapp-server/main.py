import os
from twilio.rest import Client


# Account Sid and Auth Token from twilio.com/console
# Set as enviroment variables, See http://twil.io/secure

# class WantPerson(object):
#     def __init__(self, item_type, phone):
#         self.item_type = item_type
#         self.phone = phone

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
everyone = {} # key: item_type, value: array of phone numbers 

def want_sign_up(item_type, phone):
    if item_type in everyone:
        everyone[item_type].append(phone)
    else:
        everyone[item_type] = [phone]
    return True

def food_available(item, item_type, quantity, location, time):
    success = True
    if item_type in everyone:
        for phone in everyone[item_type]:
            text = "There are {0} {1} available at {2} at {3}".format(quantity, item, location, time)
            print(text)
            if not send_text(text, phone):
                success = False

    return success
    

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

##    EXAMPLE JSON API RESPONSE
##    {
##      "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
##      "api_version": "2010-04-01",
##      "body": text,
##      "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
##      "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
##      "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
##      "direction": "outbound-api",
##      "error_code": null,
##      "error_message": null,
##      "from": "+15017122661", #change number here
##      "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
##      "num_media": "0",
##      "num_segments": "1",
##      "price": null,
##      "price_unit": null,
##      "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
##      "status": "sent",
##      "subresource_uris": {
##        "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
##      },
##      "to": phone,
##      "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
##    }

if __name__ == "__main__":
    want_sign_up("veggies", "+17787082738")
    food_available("potatoes", "veggies", 3, "the pool", "2pm")

#class Supplier(object):
#   def __init__(self, item, item_type, location):
#        self.item_type = item_type
#        self.item = item
#        self.location = location
