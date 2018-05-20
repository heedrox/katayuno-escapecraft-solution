import TasksOverFileAccumulator from './TasksOverFileAccumulator'
import GetBeginningTask from './tasks/get-beginning'
import GetLastTask from './tasks/get-last'
import GetEachTask from './tasks/get-each'

describe('TasksOverFileAccumulator', () => {
  const fs = {};
  const FILE_IN = 'ficheros/testfile.txt';
  const FILE_OUT = 'ficheros/testfile-out.txt';
  let accumulator;
  let fsReadSpy;
  let fsWriteSpy;

  beforeEach(() => {
    fs.readFileSync = () => {
      return Buffer.from('12345678901ABCDEFGHIJK1234567890');
    };
    fs.writeFileSync = () => {
    };
    accumulator = new TasksOverFileAccumulator(fs);
    fsReadSpy = sinon.spy(fs, 'readFileSync');
    fsWriteSpy = sinon.spy(fs, 'writeFileSync');
  });

  it('should read file into a buffer', () => {
    accumulator.execute(FILE_IN, FILE_OUT, []);

    expect(fsReadSpy.calledWith(FILE_IN)).equal(true);
  });

  it('should write result file from the buffer', () => {
    accumulator.execute(FILE_IN, FILE_OUT, []);

    expect(fsWriteSpy.firstCall.args[0]).equal(FILE_OUT);
  });


  it('should accumulate the results of each task while processing in the specified order', () => {
    const tasksReduce = [
      { execute: (x) => x.slice(3) }, //4567879...
      { execute: (x) => x.slice(0,1) }, //4
    ];
    const tasksAccumulate = [
      { execute: (x) => x.slice(0,3) }, //123
      { execute: (x) => x.slice(1,2) }, //5
    ];
    const orders = [1, 0];

    accumulator.execute(FILE_IN, FILE_OUT, tasksReduce, tasksAccumulate, orders);

    expect(fsWriteSpy.firstCall.args[1].toString('utf8')).to.equal('5123');
  });

});
