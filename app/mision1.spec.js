import Mision1 from './mision1'

describe("Katayuno", () => {
    const fs = {};

    beforeEach(() => {
      fs.readFileSync = () => { return Buffer.from('12345678901ABCDEFGHIJK12345678901'); }
    });

    it("should read file into a buffer", () => {
        const mision = new Mision1(fs);
        const fsSpy = sinon.spy(fs, "readFileSync");

        const result = mision.execute('ficheros/testfile.txt');

        expect(result.toString('utf8')).to.equal('12345678901ABCDEFGHIJK12345678901');
        expect(fsSpy.calledWith('ficheros/testfile.txt')).equal(true);
    });

    it('should remove the first 100 bytes', () => {
      const mision = new Mision1(fs);
      const fsSpy = sinon.spy(fs, "readFileSync");

    });
});
