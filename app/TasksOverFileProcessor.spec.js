import TasksOverFileProcessor from './TasksOverFileProcessor'
import RemoveBeginningTask from './tasks/remove-beginning'
import RemoveLastTask from './tasks/remove-last'
import RemoveEachTask from './tasks/remove-each'
import Reverse from './tasks/reverse'
import GetBeginningTask from './tasks/get-beginning'
import GetLastTask from './tasks/get-last'
import GetEachTask from './tasks/get-each'

describe('TasksOverFileProcessor', () => {
  const fs = {};
  const FILE_IN = 'ficheros/testfile.txt';
  const FILE_OUT = 'ficheros/testfile-out.txt';
  let processor;
  let fsReadSpy;
  let fsWriteSpy;

  beforeEach(() => {
    fs.readFileSync = () => {
      return Buffer.from('12345678901ABCDEFGHIJK1234567890');
    };
    fs.writeFileSync = () => {
    };
    processor = new TasksOverFileProcessor(fs);
    fsReadSpy = sinon.spy(fs, 'readFileSync');
    fsWriteSpy = sinon.spy(fs, 'writeFileSync');
  });

  it('should read file into a buffer', () => {
    processor.execute(FILE_IN, FILE_OUT, []);

    expect(fsReadSpy.calledWith(FILE_IN)).equal(true);
  });

  it('should write file from the buffer', () => {
    processor.execute(FILE_IN, FILE_OUT, []);

    expect(fsWriteSpy.firstCall.args[0]).equal(FILE_OUT);
  });

  it('should remove the first X bytes', () => {
    const tasks = [
      new RemoveBeginningTask(11)
    ];

    processor.execute(FILE_IN, FILE_OUT, tasks);

    expect(fsWriteSpy.firstCall.args[1].toString()).to.equal('ABCDEFGHIJK1234567890');
  });

  it('should remove the last Y bytes', () => {
    const tasks = [
      new RemoveLastTask(10),
    ];

    processor.execute(FILE_IN, '', tasks);

    expect(fsWriteSpy.firstCall.args[1].toString()).to.equal('12345678901ABCDEFGHIJK');
  });

  it('should remove each X byte', () => {
    const tasks = [
      new RemoveEachTask(3)
    ];

    processor.execute(FILE_IN, '', tasks);

    expect(fsWriteSpy.firstCall.args[1].toString('utf8')).to.equal('12457801BCEFHIK1346790');
  });

  it('should reverse', () => {
    const tasks = [
      new Reverse()
    ];

    processor.execute(FILE_IN, '', tasks);

    expect(fsWriteSpy.firstCall.args[1].toString('utf8')).to.equal('0987654321KJIHGFEDCBA10987654321');
  });

  it('should get the first X bytes', () => {
    const tasks = [
      new GetBeginningTask(11)
    ];

    processor.execute(FILE_IN, FILE_OUT, tasks);

    expect(fsWriteSpy.firstCall.args[1].toString()).to.equal('12345678901');
  });

  it('should get the last Y bytes', () => {
    const tasks = [
      new GetLastTask(11),
    ];

    processor.execute(FILE_IN, '', tasks);

    expect(fsWriteSpy.firstCall.args[1].toString()).to.equal('K1234567890');
  });

  it('should get the each X element', () => {
    const tasks = [
      new GetEachTask(3)
    ];

    processor.execute(FILE_IN, '', tasks);

    expect(fsWriteSpy.firstCall.args[1].toString('utf8')).to.equal('369ADGJ258');
  });

});
