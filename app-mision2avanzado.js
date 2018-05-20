const TasksOverFileProcessor = require('./app/TasksOverFileProcessor');
const TasksOverFileAccumulator = require('./app/TasksOverFileAccumulator');
const RemoveBeginning = require('./app/tasks/remove-beginning');
const RemoveEach = require('./app/tasks/remove-each');
const RemoveLast = require('./app/tasks/remove-last');
const GetBeginning = require('./app/tasks/get-beginning');
const GetEach = require('./app/tasks/get-each');
const GetLast = require('./app/tasks/get-last');
const Reverse = require('./app/tasks/reverse');
const fs = require('fs');

const FILE_IN = 'ficheros/CPE1704TKS.txt';
const FILE_INTER = 'ficheros/CPE1704TKS-2avanzado_interm_result.txt';
const FILE_OUT = 'ficheros/CPE1704TKS-2avanzado__result.jpg';

new TasksOverFileAccumulator(fs).execute(FILE_IN, FILE_INTER, [
  new RemoveBeginning(100),
  new RemoveLast(100),
  new RemoveEach(3),
  new Reverse()
], [
  new GetBeginning(100),
  new GetLast(100),
  new GetEach(3),
], [0, 2, 1]);

new TasksOverFileProcessor(fs).execute(FILE_INTER, FILE_OUT, [
  new RemoveBeginning(900),
  new RemoveLast(900),
  new RemoveEach(3),
  new Reverse()
]);
