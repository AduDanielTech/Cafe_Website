import sys
import os
from dotenv import load_dotenv
import json
import ssl
import smtplib
from email.message import EmailMessage

# Load environment variables from .env file
load_dotenv()
print('hiiiiii')
# Retrieve the passed JSON string
json_string = sys.argv[1]
my_object = json.loads(json_string)

# Get environment variables
email_sender = os.environ.get('EMAIL_SENDER')
email_password = os.environ.get('EMAIL_PASSWORD')
email_receiver = my_object['email']
subject = my_object['subject']
body = my_object['message']


print(os.environ.get('EMAIL_SENDER'))
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

  