from flask import Flask, request
from twilio import twiml
import main

app = Flask(__name__)

@app.route('/sms', methods=['POST'])  #fix this?
def sms():
    number = request.form['From']
    message_body = request.form['Body']

    if message_body == 'Y' or message_body == 'y':
        ## maybe should be N, n instead for no response
        ## do something here???

    return None

if __name__ == "__main__":
    app.run()





##from flask import Flask, request, redirect
##from twilio.twiml.messaging_response import MessagingResponse

##app = Flask(__name__)
##
##@app.route("/sms", methods=['GET', 'POST'])
##def sms_reply():
##    """Respond to incoming calls with a simple text message."""
##    # Start our TwiML response
##    resp = MessagingResponse()
##
##    # Add a message
##    resp.message("The Robots are coming! Head for the hills!")
##
##    return str(resp)
##
##if __name__ == "__main__":
##    app.run(debug=True)
