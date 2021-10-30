function checkValidPattern(pattern) {
  // 7文字丁度でなければfalse
  if (pattern.length != 7) return false;

  // 1-7までそれぞれ丁度1回ずつ使われていなければfalse
  for (var i = 1; i <= 7; i++) {
    if ((pattern.match(i, "g") || []).length != 1) return false;
  }
  return true;
}
