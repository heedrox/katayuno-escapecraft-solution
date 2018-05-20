const TasksOverFileProcessor = require('./app/TasksOverFileProcessor');
const RemoveBeginning = require('./app/tasks/remove-beginning');
const RemoveEach = require('./app/tasks/remove-each');
const RemoveLast = require('./app/tasks/remove-last');
const Reverse = require('./app/tasks/reverse');
const fs = require('fs');

const FILE_IN = 'ficheros/CPE1704TKS-2.txt';
const FILE_OUT = 'ficheros/CPE1704TKS-2_result.jpg';
const FILE_DISCARDED = 'ficheros/CPE1704TKS-2_discarded.jpg';


new TasksOverFileProcessor(fs).execute(FILE_IN, FILE_OUT, FILE_DISCARDED, [
  new RemoveBeginning(900),
  new RemoveLast(900),
  new RemoveEach(3),
  new Reverse()
]);
