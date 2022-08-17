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
```

### ORG Service
```
/api/org/
        /:staffId             GET
```

### PARTICIPANT Service
```
/api/participant/:userId/tickets        GET
```