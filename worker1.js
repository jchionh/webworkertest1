// everything in this file will be excuted as a seperate thread

// use the event listener API to recieve a on message event
self.addEventListener('message', function (e) {

    // read off the input values posted to the worker
    var id = e.data.id;

    // parse int just in case
    var var1 = parseInt(e.data.var1, 10);
    var var2 = parseInt(e.data.var2, 10);

    // perform our computation to get the result
    var result = var1 + var2;

    // once we get the result, post the results back to the main thread
    self.postMessage({id: id, var1: var1, var2: var2, result: result});

}, false);