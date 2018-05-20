const Mision1 = require('./app/mision1');
const RemoveBeginning = require('./app/tasks/remove-beginning');
const RemoveEach = require('./app/tasks/remove-each');
const RemoveLast = require('./app/tasks/remove-last');
const Reverse = require('./app/tasks/reverse');
const fs = require('fs');

const FILE_IN = 'ficheros/CPE1704TKS.txt';
const FILE_OUT = 'ficheros/CPE1704TKS_result.jpg';

new Mision1(fs).execute(FILE_IN, FILE_OUT, [
  new RemoveBeginning(100),
  new RemoveLast(100),
  new RemoveEach(3),
  new Reverse()
]);
