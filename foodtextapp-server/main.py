import os
from twilio.rest import Client


# Account Sid and Auth Token from twilio.com/console
# Set as enviroment variables, See http://twil.io/secure

class Person(object):
    def __init__(self, name, phone):
        self.name = name
        self.phone = phone


account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
everyone = {}  # key: item_type, value: array of persons


def want_sign_up(item_type, name, phone):
    person = Person(name, phone)
    if item_type in everyone:
        everyone[item_type].append(person)
    else:
        print("here also")
        everyone[item_type] = [person]
    return True


def food_available(name, item, item_type, quantity, location, time, desc):
    success = True
    print(everyone)
    if item_type in everyone:
        for person in everyone[item_type]:
            text = "Hey {}! {} has a surplus of {}. There are {} available at {} at {}.\n Here's what else they have to say: \"{}\"".format(
                person.name, name, item, quantity, location, time, desc)
            print(text)
            if not send_text(text, person.phone):
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
