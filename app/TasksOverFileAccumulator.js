const buffersConcat = require('./lib/buffers-concat');

class TasksOverFileAccumulator {

  constructor(fs) {
    this.fs = fs;
  }

  execute(filein, fileout, tasksReduce, tasksAccumulate, orders) {
    const fileContents = this.fs.readFileSync(filein);

    const buffers = [];
    tasksReduce.reduce((content, task, index) => {
      const accumulatePartialResult = tasksAccumulate[index].execute(content);
      buffers.push(accumulatePartialResult);
      return task.execute(content);
    }, fileContents);


    const orderedBuffers = orders ? orders.map(position => buffers[position]) : buffers;
    const result = buffersConcat(orderedBuffers);

    this.fs.writeFileSync(fileout, result);
  }
}

module.exports = TasksOverFileAccumulator;