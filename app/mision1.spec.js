import Mision1 from './mision1'

describe("Katayuno", () => {
    const fs = {};

    beforeEach(() => {
      fs.readFileSync = () => { return Buffer.from('12345678901ABCDEFGHIJK1234567890'); }
    });

    it("should read file into a buffer", () => {
        const mision = new Mision1(fs);
        const fsSpy = sinon.spy(fs, "readFileSync");

        mision.execute('ficheros/testfile.txt');

        expect(fsSpy.calledWith('ficheros/testfile.txt')).equal(true);
    });

    it('should remove the first X bytes and the last Y bytes', () => {
      const mision = new Mision1(fs);

      const result = mision.execute('ficheros/testfile.txt', 11, 10);

      expect(result.toString('utf8')).to.equal('ABCDEFGHIJK');
    });


});
