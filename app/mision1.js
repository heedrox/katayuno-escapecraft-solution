
export default class Mision1 {

    constructor(fs) {
        this.fs = fs;
    }

    execute(file, bytesBeginning, bytesEnd) {
        const fileContents = this.fs.readFileSync(file);
        const slicedContents = fileContents.slice(bytesBeginning, fileContents.length - bytesEnd);
        return slicedContents;
    }
}

