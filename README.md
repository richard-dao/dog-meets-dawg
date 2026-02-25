# Inspiration
That one movie where the dogs meet. You know what I'm talking about right? With the Cavaliers? Oh the movie is literally called "Puppy Love"

# What it does
It's Hinge for Dogs.

# How we built it

React-Native frontend AWS backend:

- Two APIs: WebSocket API and REST API
- Lambda functions for both APIs
- Messages are published to AWS SNS with a broadcaster lambda function subscriber
- DB: DynamoDB
# Challenges we ran into
- Learning a whole lot of new technologies and tech stacks in a short amount of time
# Accomplishments that we're proud of
- We built a whole login/authentication system from scratch instead of using a pre-built solution (we probably should have used a pre-built solution LMAO)
- Overengineered the WebSocket real-time messaging to incorporate a AWS SNS publisher/subscriber model
# What we learned
- React-Native
- AWS: API Gateway, Lambda, DynamoDB, SNS
- WebSocket protocols
- Authentication protocols
# What's next for Dog Meets Dawg
- Adding the ability to save images into a AWS S3 bucket to work as a CDN
# Built With
- amazon-sns
- amazon-web-services
- api-gateway
- dynamodb
- lambda
- react-native
- rest-api
- websockets
# Try it out
 GitHub Repo
 [dog-meets-dawg.tech](dog-meets-dawg.tech)
