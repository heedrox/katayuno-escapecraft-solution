import TasksOverFileProcessor from './TasksOverFileProcessor'
const fs = require('fs');

describe("TasksOverFileProcessor Integration", () => {

    beforeEach(() => {
    });

    it("should read and write the file", () => {
        const mision = new TasksOverFileProcessor(fs);

        mision.execute('ficheros/testfile.txt', 'ficheros/testfile-out.txt', []);

        const bufferOut = fs.readFileSync('ficheros/testfile-out.txt');
        expect(bufferOut.toString('utf8')).equal('1234567890ABCDEFGHIJK1234567890');
    });

});
