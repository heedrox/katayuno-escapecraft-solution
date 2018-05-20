const toBuffer = Buffer.from;
const toArray = Array.from;
const getEachX = x => (value, index) => (index + 1) % x === 0;

class GetEachTask {
  constructor(num) {
    this.num = num;
  }

  execute(fileContents) {
    const fileDataArray = toArray(fileContents.values());
    const getElements = getEachX(this.num);

    return toBuffer(fileDataArray.filter(getElements));
  }
}

module.exports = GetEachTask;