import Mision1 from './mision1'
import RemoveBeginningTask from './tasks/remove-beginning'
import RemoveLastTask from './tasks/remove-last'

describe("Katayuno", () => {
    const fs = {};

    beforeEach(() => {
      fs.readFileSync = () => { return Buffer.from('12345678901ABCDEFGHIJK1234567890'); }
    });

    it("should read file into a buffer", () => {
        const mision = new Mision1(fs);
        const fsSpy = sinon.spy(fs, "readFileSync");

        mision.execute('ficheros/testfile.txt', []);

        expect(fsSpy.calledWith('ficheros/testfile.txt')).equal(true);
    });

    it('should remove the first X bytes', () => {
      const mision = new Mision1(fs);
      const tasks = [
        new RemoveBeginningTask(11)
      ];

      const result = mision.execute('ficheros/testfile.txt', tasks);

      expect(result.toString('utf8')).to.equal('ABCDEFGHIJK1234567890');
    });

  it('should remove the last Y bytes', () => {
    const mision = new Mision1(fs);
    const tasks = [
      new RemoveLastTask(10),
    ];

    const result = mision.execute('ficheros/testfile.txt', tasks);

    expect(result.toString('utf8')).to.equal('12345678901ABCDEFGHIJK');
  });

  
});
