const {spawn} = require('child_process');
// const {PythonShell} =require('python-shell');


const runScript = () =>{

    // PythonShell.run('test.py', null, function (err, result) {
    //     if (err) throw err;

    //     console.log('result: ', result.toString())
    //     console.log('finished');
    // });

    var dataToSend;
    const python = spawn('python3', ['test.py'], {shell: true});
    
    python.stdout.on('data', function (data) {
     console.log('Pipe data from python script ...');
     dataToSend = data.toString();
    });
    
    
    python.stderr.on('data', (data)=>{
        console.log(`stderr: ${data}`)
    })
    
    python.on('exit', (code) => {
        console.log(`child process close all stdio with code ${code}, ${dataToSend}`);
    });
}

runScript()