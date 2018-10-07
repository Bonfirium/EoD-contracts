module.exports = (size, map) => new Array(size).fill(0).map((_, index) => map(index));
