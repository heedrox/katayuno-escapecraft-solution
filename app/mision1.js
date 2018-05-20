
export default class Mision1 {

    constructor(fs) {
        this.fs = fs;
    }

    execute(file) {
        return this.fs.readFileSync(file);
    }
}

