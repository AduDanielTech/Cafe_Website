import sys
import json
from password import password
# Retrieve the passed JSON string
json_string = sys.argv[1]
my_object = json.loads(json_string)

# Convert the JSON string back to an object
message = my_object['message']
email = my_object['email']
topic = my_object['subject']



from email.message import EmailMessage
import ssl
import smtplib

email_sender = 'adudaniel097@gmail.com'
email_password = password
email_receiver = email

subject = topic
body = message
try:    
    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())
    print('Email sent successfully')    
except Exception as e:
    print("An error occurred:", str(e), file=sys.stderr)
    sys.exit(1)

