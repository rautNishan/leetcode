module.exports = () => {
  const ans: number[] = [];
  for (let i = 0; i < 1000000; i++) {
    if (i % 2 == 0) {
      ans.push(i);
    }
  }
  return ans
};
