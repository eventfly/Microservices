# Microservices Monorepo

## Installation
1. Download and install Docker/Docket Desktop
2. Clone the repo `git clone github.com/eventfly/Microservices.git`
3. Run `cd Microservices`
4. Run `docker compose build`
5. After build, run `docker compose up`


## Docker PORT Mapping
```
3000 - Auth Service
3001 - Org Service
3002 - Events Service
3003 - Newsfeed Service
3004 - Participant Service
3005 - Payment Service
```

## API Endpoints
### AUTH Service
```
/api/auth/
         /users/currentuser    GET
         /users/signin         POST
         /org/signin           POST
         /org/currentuser      GET
```

### Event Service
```
/api/event/
          /:id                  GET
          /:id                  PUT
          /:id/role             POST
          /:id/role             DELETE
          /:id/assign-staff     PUT
          /:id/remove-staff     POST
          /staff/:eventId       GET
          /all                  GET
          /:id/feedbacks        GET
          
```

### ORG Service
```
/api/org/
        /:staffId             GET
        /:id/profile          GET
```

### PARTICIPANT Service
```
/api/participant/:userId/tickets        GET
/api/participant/order                  POST
/api/participant                        POST
/api/participant/:id/tickets            GET
/api/participant/checkin                PUT
/api/participant/:id/events             GET
/api/participant/:id/edit               PUT
/api/participant/:id/profile            GET
/api/participant/search?query=          GET
/api/participant/event/:id              GET (Get event profile)
/api/participant/:id/orders             GET (Get all orders under a participant)
/api/participant/order/:id              GET (Get order info by order_id)
/api/participant/feedback               POST
/api/participant/event/:id/feedbacks    GET
```

### NEWSFEED Service

```
/api/newsfeed/:eventId/post             POST (Add Post)
/api/newsfeed/post/:postId/comment      POST (Add Comment)
/api/newsfeed/:eventId/post             GET  (Get all posts under an event)
/api/newsfeed/post/:postId/comment      GET  (Get all comments under a post)
/api/newsfeed/feed                      GET  (Get newsfeed)
/api/newsfeed/post/:postId              GET  (Get post data)
/api/newsfeed/:id/events                GET  (Get all events of an user)
/api/newsfeed/edit-like                 PUT  (Like/Unlike a post)
/api/newsfeed/post/:id/answer           PUT  (Answer a quiz/ Vote on a poll)
/api/newsfeed/post/:id                  DELETE (Delete a post)
```

### PAYMENT Service
```
/api/payment/participant                POST
/api/payment/org                        POST

```
