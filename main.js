// when the workers post back the results via the postMessage API
// they will call this function to update the DOM with the results
// computed
function workerResultHandler(e) {
    // read the results to local
    // do not really need to do this, but just for readibility
    // and debugging
    var id = e.data.id;
    var result = e.data.result;
    var var1 = e.data.var1;
    var var2 = e.data.var2;

    // jQuery fnd the div and set the text
    var resultDiv = $('<div/>');
    resultDiv.text('[' + id + '] recv result: ' + var1 + ' + ' + var2 + ' = ' + result + ' timestamp: ' + new Date().toUTCString());
    $('#output_area').append(resultDiv);
}

// this is the main entry to the javascript
function mainInit() {

    // let's spawn 6 workers!
    var workers = [];
    for (var i = 0; i < 6; ++i) {
        var worker = new Worker('worker1.js');        
        worker.addEventListener('message', workerResultHandler ,false);
        workers.push(worker);
    }
    
    // now give them a task to do, perform, an addition
    for (var j = 0; j < 6; ++j) {
        
        // randomize the input vars
        var var1 = Math.floor(Math.random() * 100);
        var var2 = Math.floor(Math.random() * 100);
        
        // record the input on the DOM
        $('#input_' + j).text('[' + j + '] sending work: ' + var1 + ' + ' + var2 + ' timestamp: ' + new Date().toUTCString());
        
        // post the vars to the respective worker for them to perform the computation
        workers[j].postMessage({id: j, var1: var1, var2: var2});
    }
}