import Mision1 from './mision1'
import RemoveBeginningTask from './tasks/remove-beginning'
import RemoveLastTask from './tasks/remove-last'
const fs = require('fs');

describe("Katayuno Mission 1 Integration", () => {

    beforeEach(() => {
    });

    it("should read and write the file", () => {
        const mision = new Mision1(fs);

        mision.execute('ficheros/testfile.txt', 'ficheros/testfile-out.txt', []);

        const bufferOut = fs.readFileSync('ficheros/testfile-out.txt');
        expect(bufferOut.toString('utf8')).equal('1234567890ABCDEFGHIJK1234567890');
    });

});
