import Mision1 from './mision1'
import RemoveBeginningTask from './tasks/remove-beginning'
import RemoveLastTask from './tasks/remove-last'
import RemoveEachTask from './tasks/remove-each'
import Reverse from './tasks/reverse'

describe('Katayuno Mission 1', () => {
  const fs = {};
  const FILE_IN = 'ficheros/testfile.txt';
  const FILE_OUT = 'ficheros/testfile-out.txt';
  let mision;
  let fsReadSpy;
  let fsWriteSpy;

  beforeEach(() => {
    fs.readFileSync = () => {
      return Buffer.from('12345678901ABCDEFGHIJK1234567890');
    }
    fs.writeFileSync = () => {
    };
    mision = new Mision1(fs);
    fsReadSpy = sinon.spy(fs, 'readFileSync');
    fsWriteSpy = sinon.spy(fs, 'writeFileSync');
  });

  it('should read file into a buffer', () => {
    mision.execute(FILE_IN, FILE_OUT, []);

    expect(fsReadSpy.calledWith(FILE_IN)).equal(true);
  });

  it('should write file from the buffer', () => {
    mision.execute(FILE_IN, FILE_OUT, []);

    expect(fsWriteSpy.firstCall.args[0]).equal(FILE_OUT);
  });

  it('should remove the first X bytes', () => {
    const tasks = [
      new RemoveBeginningTask(11)
    ];

    mision.execute(FILE_IN, FILE_OUT, tasks);

    expect(fsWriteSpy.firstCall.args[1].toString()).to.equal('ABCDEFGHIJK1234567890');
  });

  it('should remove the last Y bytes', () => {
    const tasks = [
      new RemoveLastTask(10),
    ];

    mision.execute(FILE_IN, '', tasks);

    expect(fsWriteSpy.firstCall.args[1].toString()).to.equal('12345678901ABCDEFGHIJK');
  });

  it('should remove each X byte', () => {
    const tasks = [
      new RemoveEachTask(3)
    ];

    mision.execute(FILE_IN, '', tasks);

    expect(fsWriteSpy.firstCall.args[1].toString('utf8')).to.equal('12457801BCEFHIK1346790');
  });

  it('should reverse', () => {
    const tasks = [
      new Reverse()
    ];

    mision.execute(FILE_IN, '', tasks);

    expect(fsWriteSpy.firstCall.args[1].toString('utf8')).to.equal('0987654321KJIHGFEDCBA10987654321');
  });

});
