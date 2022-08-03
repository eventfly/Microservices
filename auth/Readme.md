# Auth

### Service structure:

Startup Routine: src/index.ts
Entry Point: src/app.ts
Models: src/models/
Routes: src/routes/
Middlewares: src/middlewares/

***
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
