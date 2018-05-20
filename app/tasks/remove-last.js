class RemoveTask {
  constructor(num) {
    this.num = num;
  }

  execute(fileContents) {
    return fileContents.slice(0,fileContents.length - this.num);
  }
}

module.exports = RemoveTask;