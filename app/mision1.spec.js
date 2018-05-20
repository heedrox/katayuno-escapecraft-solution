import Mision1 from './mision1'
import RemoveBeginningTask from './tasks/remove-beginning'
import RemoveLastTask from './tasks/remove-last'

describe("Katayuno Mission 1", () => {
    const fs = {};
    const FILE_IN = 'ficheros/testfile.txt';
    const FILE_OUT = 'ficheros/testfile-out.txt';

    beforeEach(() => {
      fs.readFileSync = () => { return Buffer.from('12345678901ABCDEFGHIJK1234567890'); }
      fs.writeFileSync = () => { }
    });

    it("should read file into a buffer", () => {
        const mision = new Mision1(fs);
        const fsReadSpy = sinon.spy(fs, "readFileSync");

        mision.execute(FILE_IN, FILE_OUT, []);

        expect(fsReadSpy.calledWith(FILE_IN)).equal(true);
    });

  it("should write file from the buffer", () => {
    const mision = new Mision1(fs);
    const fsWriteSpy = sinon.spy(fs, "writeFileSync");


    mision.execute(FILE_IN, FILE_OUT, []);

    expect(fsWriteSpy.firstCall.args[0]).equal(FILE_OUT);
  });

    it('should remove the first X bytes', () => {
      const mision = new Mision1(fs);
      const tasks = [
        new RemoveBeginningTask(11)
      ];
      const fsWriteSpy = sinon.spy(fs, "writeFileSync");

      mision.execute(FILE_IN, FILE_OUT, tasks);

      expect(fsWriteSpy.firstCall.args[1].toString()).to.equal('ABCDEFGHIJK1234567890');
    });

  it('should remove the last Y bytes', () => {
    const mision = new Mision1(fs);
    const tasks = [
      new RemoveLastTask(10),
    ];
    const fsWriteSpy = sinon.spy(fs, "writeFileSync");

    const result = mision.execute(FILE_IN, '', tasks);

    expect(fsWriteSpy.firstCall.args[1].toString()).to.equal('12345678901ABCDEFGHIJK');
  });


});
