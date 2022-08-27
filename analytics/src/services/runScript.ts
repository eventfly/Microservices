const {spawn} = require('child_process');


const runPythonScript = (events : any, participantTickets : any) => {
    console.log("running py script... ")

    let dataToSend : any;
    const python = spawn('python3', ['../recommender.py', events, participantTickets]);

    python.stdout.on('data', function (data : any) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });

    python.on('close', (code : any) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log(`${dataToSend}`)
    });
}

export { runPythonScript }