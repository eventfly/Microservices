# Org

### Service structure:

Startup Routine: src/index.ts
Models: src/models/
Routes: src/routes/
Middlewares: src/middlewares/

*** 
### Models:

##### 1. Events:

```
    EventSchema({
    name: {
        type: String,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organizer",
    },
    banner_url: {
        type: String,
        required: false
    },
    domain: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    tags: [
        {
        name: {
            type: String,
            required: false
        },     
        tagId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: false
        }   
        }
    ],
    mailList: {
        type: [String],
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: false
    },
    sub_events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: false
    }],
    ticket_price: {
        type: Number,
        required: false

    }
}
```

##### 2. Organizer

```
Organizer (
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        events: [{
            eventId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event"
            },
            imageUrl: {
                type: String,
                required: false
            },
            name: {
                type: String,
                required: true
            }
        }],
        created_at: {
            type: Date,
            default: Date.now()
        },
        role: {
            type: String,
            required: true
        }

    })
```

##### 3. Staff

```
const StaffSchema = new mongoose.Schema({
    //In TS: type: string
    //In JS: type: String

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: false
    },

    name: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        default: Math.random().toString(36).slice(-8),
        required: false
    },

    is_verified: {
        type: Boolean,
        default: false
    },

    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organizer",
    },

    events: [{
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        },
    }],

    role: {
        type: String,
        default: "staff"
    }

    //TODO: Add the roles


}
```

##### 4. Tag

```
Tag({
    name: {
        type: String,
        required: true
    }

}
```
****** 

### API Endpoints

##### Important: All requests must contain the following header:

    headers['Authorization'] = JWT_TOKEN


###### POST /api/org/event
Request Body:
```
{
        name: string (at least 5 chars) ,
        desc: string (at least 5 chars) ,
        start: string in ISODate format,
        end: string in ISODate format (end must be greater than start),
        banner_url: string (Must be a valid URL),
        type: string,
        privacy: string,
        ticket: number,
        mailList [string],
        filter: [string],
        tags: [
            {
                tagId: MongoID as string
                name: string
            }
        ]
}
```
Response:

If succesful request: statusCode = 201
else statusCode = 400

Data:
```
    {
        id: mongo _id (event ID)
        organizer: mongo _id (organizer ID)
        ...
    }
```



###### GET /api/org/event/:orgId

params: orgId

Get all the events under orgId

###### POST /api/org/tag/

Create a new tag

###### POST /api/org/staff/

Create a new staff account

###### POST /api/org/

Create a new organizer account