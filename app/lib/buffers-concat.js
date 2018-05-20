const buffersConcat = (bufs) => {
  if (!Array.isArray(bufs)) {
    console.error('[ERROR] use Buffer.concat(list, [totalLength])');
    console.error('see http://nodejs.org/api/buffer.html#buffer_class_method_buffer_concat_list_totallength');
    bufs = Array.prototype.slice.call(arguments);
  }

  let length = 0, index = 0;
  const bufsToConcat = [];

  bufs.forEach(function (buf) {
    if (buf) {
      if (!Buffer.isBuffer(buf)) {
        buf = new Buffer(buf);
      }
      length += buf.length;
      bufsToConcat.push(buf);
    }
  });

  const concatBuf = new Buffer(length);

  bufsToConcat.forEach(function (buf) {
    buf.copy(concatBuf, index, 0, buf.length);
    index += buf.length;
  });


  return concatBuf;
};

module.exports = buffersConcat;
