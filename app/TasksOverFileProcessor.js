class TasksOverFileProcessor {

    constructor(fs) {
        this.fs = fs;
    }

    execute(filein, fileout, filediscarded, tasks) {
        const fileContents = this.fs.readFileSync(filein);

        const result = tasks.reduce((content, task) => task.execute(content), fileContents);

        this.fs.writeFileSync(fileout, result);
        this.fs.writeFileSync(filediscarded, []);
    }
}

module.exports = TasksOverFileProcessor;