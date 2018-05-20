class GetLastTask {
  constructor(num) {
    this.num = num;
  }

  execute(fileContents) {
    return fileContents.slice(-this.num);
  }
}

module.exports = GetLastTask;