class GetBeginningTask {
  constructor(num) {
    this.num = num;
  }

  execute(fileContents) {
    return fileContents.slice(0,this.num);
  }
}

module.exports = GetBeginningTask;