fao.classes.MySync = function(){
  this.workerPool = google.gears.factory.create('beta.workerpool');
  this.workerPool.onmessage = function(a, b, message) {
//    alert('Received message from worker ' + message.sender + ': \n' + message.body);
    fao.doms.textout.innerHTML = message.body.text;

  };
  this.syncDataWorkerId = this.workerPool.createWorkerFromUrl('/javascripts/fao/sync_data_worker.js');
  this.authenticityWorkerId = this.workerPool.createWorkerFromUrl('/javascripts/fao/authenticity_token_worker.js');
  this.workerPool.sendMessage(["3..2..", 1, {syncWorkerId: this.syncDataWorkerId}], this.authenticityWorkerId);
};
