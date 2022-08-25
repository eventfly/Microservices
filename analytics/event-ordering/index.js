const mongoose = require('mongoose')
const {spawn} = require('child_process');
const {Event} = require('./event')
const {Ticket} = require('./ticket')



const connectToParticipantDB = async () => {

    try {
        await mongoose.connect('mongodb+srv://eventfly:eventfly@cluster0.ctaklgc.mongodb.net/Participant?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        console.log('Connected to MongoDB');
    
    } catch (err) {
        console.error(err)
    }

}


const runPythonScript = (events, participantTickets) => {
    console.log("running py script... ")

    var dataToSend;
    const python = spawn('python3', ['../recommender.py', events, participantTickets]);

    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log(`${dataToSend}`)
    });
}


const fetchAllEvents = async () => {
    const events = await Event.find({})
    console.log(events.length)
    return events
}

const fetchParticipantTickets = async (id) => {
    const participantTickets = await Ticket.find({
        "participant.id": id
    })
    console.log(participantTickets.length)
    return participantTickets
}


const fetchData = async () => {
    const events = await fetchAllEvents()
    mongoose.connection.close()
    await connectToParticipantDB()
    const participantTickets = await fetchParticipantTickets('6306ddcb70f8725afab7adb0')

    runPythonScript(JSON.stringify(events), JSON.stringify(participantTickets))
}


const connectToEventDB = async () => {

    try {
        await mongoose.connect('mongodb+srv://eventfly:eventfly@cluster0.ctaklgc.mongodb.net/Event?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        console.log('Connected to MongoDB');
    
    } catch (err) {
        console.error(err)
    }

}

connectToEventDB()
fetchData()