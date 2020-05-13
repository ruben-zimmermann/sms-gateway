# SMS Gateway for the E3372 LTE stick

The SMS gateway is a web-server that provides a REST endpoint to send SMS messages using the E3372 LTE stick.

When being plugged in, the E3372 LTE stick launches a local web-server that provides a UI to configure the LTE stick and send SMS messages.

The SMS gateway mimics the interaction between the web-interface and the web-server to send SMS messages

The gateway consists of two major components:

The web-server providing the REST endpoint simply stores any request in an outbox folder.
The actual message sending is done by a cron job that regularly checks the outbox for new messages to forward them to the E3372 LTE stick.

In case the LTE stick is not available or not connected to a network, unsent messages will remain in the outbox folder to be sent later.