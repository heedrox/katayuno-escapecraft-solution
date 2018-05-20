const toBuffer = Buffer.from;
const toArray = Array.from;
const removeEachX = x => (value, index) => (index + 1) % x !== 0;

class RemoveEachTask {
  constructor(num) {
    this.num = num;
  }

  execute(fileContents) {
    const fileDataArray = toArray(fileContents.values());
    const removeElements = removeEachX(this.num);

    return toBuffer(fileDataArray.filter(removeElements));
  }
}

module.exports = RemoveEachTask;