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
/api/participant/event/:id/statistics   GET (Get statistics of an event)
/api/participant                        DELETE
/api/participant/:id/feedbacks          GET (Get all feedbacks of a participant)
```

### NEWSFEED Service

```
/api/newsfeed/:eventId/post             POST (Add Post)
/api/newsfeed/post/:postId/comment      POST (Add Comment)
/api/newsfeed/:eventId/post             GET  (Get all posts under an event)
/api/newsfeed/post/:postId/comment      GET  (Get all comments under a post)
/api/newsfeed/feed?start=0&count=5      GET  (Get newsfeed)
/api/newsfeed/post/:postId              GET  (Get post data)
/api/newsfeed/:id/events                GET  (Get all events of an user)
/api/newsfeed/edit-like                 PUT  (Like/Unlike a post)
/api/newsfeed/post/:id/answer           PUT  (Answer a quiz/ Vote on a poll)
/api/newsfeed/post/:id                  DELETE (Delete a post)
/api/newsfeed/post/:id/activity         GET (Get a activity by post_id)
```

### PAYMENT Service
```
/api/payment/participant                POST
/api/payment/org                        POST

```


### ANALYTICS Service (port 3006. Run it separately.)

#### Recommendation with location
```
/api/analytics/events                   POST
request payload:
{
    "participantId": "630a3262044e45a64cb73e17",
    "participantLng": 90.4331, #participantLng means participant's location's lng
    "participantLat": 23.7619  #participantLat means participant's location's lat
},

response:{
    "events": [
        "6308f258b31c4f5574fd7c75",
        "63078e4c93391fe597df659e",
        "6307909693391fe597df65ad",
    ]
}

```


#### Recommendation without location
```
/api/analytics/events/no-loc            POST
request payload:
{
    "participantId": "630a3262044e45a64cb73e17"
},

response:{
    "events": [
        "6308f258b31c4f5574fd7c75",
        "63078e4c93391fe597df659e",
        "6307909693391fe597df65ad",
    ]
}

```

#### Search by Location
```
/api/analytics/search/location              POST

request payload:
{
    "participantId": "630a3262044e45a64cb73e17",
    "participantLng": 90.4331, #participantLng means participant provided lng (not participant's location's lng) 
    "participantLat": 23.7619  #participantLat means participant provided lat (not participant's location's lat)
},

response:{
    "events": [
        "6308f258b31c4f5574fd7c75",
        "63078e4c93391fe597df659e"
    ]
}

```


#### Search by Query
```
/api/analytics/search/query                 POST

request payload:
{
    "query": "contest concert"
},

response:{
    "events": [
        "6308f258b31c4f5574fd7c75",
        "63078e4c93391fe597df659e"
    ]
}

```