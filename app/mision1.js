
export default class Mision1 {

    constructor(fs) {
        this.fs = fs;
    }

    execute(file, tasks) {
        const fileContents = this.fs.readFileSync(file);

        return tasks.reduce((content, task) => task.execute(content), fileContents);
    }
}

