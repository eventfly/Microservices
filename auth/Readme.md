# Auth

### Service structure:

Startup Routine: src/index.ts
Entry Point: src/app.ts
Models: src/models/
Routes: src/routes/
Middlewares: src/middlewares/


***

### API Endpoints


##### /api/auth/users/currentuser

###### Purpose: Decrypt the jwt sent with the request header, and return an error if the token is invalid or expired.

###### Request Format: 

```
headers: {
    'Authorization' : `${jwt}`
}
```

##### Response Format:

###### Status Codes:
    1. 440 : Session Expired
    2. 401 : Unauthorized
    3. 200 : OK

###### Data:

```
{
    currentUser: {
        //All related info about account (All types of account)
    }
}
```

##### /api/auth/users/signin

Purpose: User signin

###### Request Format:

```
body : {
    'email' : string
    'password' : string
}
```

##### Response Format:

###### Status Codes:
    1. 400 : Bad Request Error
    2. 200 : Succesful Login

In case of a 400, please check response.data.errors to find more specific details about the errors.

The error should be in the following format:

```
errors: [
    {
        message: Description of the error
        field:  Which field the error corresponds to
    },
    {
        ...
    }
]
```

Please implement error management with this in mind.


##### /api/auth/users/signup
###### ALERT: Removed, use POST localhost:3004/api/participant/ instead. Details to be added soon in Participants/Readme.md

Purpose: User signup

###### Request Format:

```
body : {
    'email' : string
    'password' : string
}
```

##### Response Format:

###### Status Codes:
    1. 400 : Bad Request Error
    2. 201 : Succesful Signup

##### /api/auth/org/signin

###### S ame as /api/auth/users/signin


### Models:
##### 1. Organizer

This stores info of both Organizer account and Staff account.

Role should be properly set in the role.

```
OrgSchema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    ref_id: {
        //Foreign key to corresponding document in Org service database
        type: String,
        required: true
    }
}
```

##### 2. Participant
