import TasksOverFileProcessor from './TasksOverFileProcessor'
import RemoveBeginningTask from './tasks/remove-beginning'
import RemoveLastTask from './tasks/remove-last'
import RemoveEachTask from './tasks/remove-each'
import Reverse from './tasks/reverse'

describe('TasksOverFileProcessor', () => {
  const fs = {};
  const FILE_IN = 'ficheros/testfile.txt';
  const FILE_OUT = 'ficheros/testfile-out.txt';
  const FILE_DISCARDED = 'ficheros/testfile-discard.txt';
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

  describe('handles file reading and writing', () => {
    it('should read file into a buffer', () => {
      processor.execute(FILE_IN, FILE_OUT, FILE_DISCARDED, []);

      expect(fsReadSpy.calledWith(FILE_IN)).equal(true);
    });

    it('should write file from the buffer', () => {
      processor.execute(FILE_IN, FILE_OUT, FILE_DISCARDED, []);

      expect(fsWriteSpy.firstCall.args[0]).equal(FILE_OUT);
    });

    it('should write file to discard', () => {
      processor.execute(FILE_IN, FILE_OUT, FILE_DISCARDED, []);

      expect(fsWriteSpy.secondCall.args[0]).equal(FILE_DISCARDED);
    });
  });

  describe('does tasks that removes elements', () => {
    it('should remove the first X bytes', () => {
      const tasks = [
        new RemoveBeginningTask(11)
      ];

      processor.execute(FILE_IN, FILE_OUT, FILE_DISCARDED, tasks);

      expect(fsWriteSpy.firstCall.args[1].toString()).to.equal('ABCDEFGHIJK1234567890');
    });

    it('should remove the last Y bytes', () => {
      const tasks = [
        new RemoveLastTask(10),
      ];

      processor.execute(FILE_IN, FILE_OUT, FILE_DISCARDED, tasks);

      expect(fsWriteSpy.firstCall.args[1].toString()).to.equal('12345678901ABCDEFGHIJK');
    });

    it('should remove each X byte', () => {
      const tasks = [
        new RemoveEachTask(3)
      ];

      processor.execute(FILE_IN, FILE_OUT, FILE_DISCARDED, tasks);

      expect(fsWriteSpy.firstCall.args[1].toString('utf8')).to.equal('12457801BCEFHIK1346790');
    });
  });

  it('should reverse', () => {
    const tasks = [
      new Reverse()
    ];

    processor.execute(FILE_IN, FILE_OUT, FILE_DISCARDED, tasks);

    expect(fsWriteSpy.firstCall.args[1].toString('utf8')).to.equal('0987654321KJIHGFEDCBA10987654321');
  });


});
