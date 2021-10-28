window.onload = function () {
  chrome.storage.local.get("RandomPattern", function (items) {
    if (items.RandomPattern != null) {
      document.body.appendChild(document.createElement("br"));
      document.body.appendChild(document.createElement("br"));
      var label = document.createTextNode("適用したい配置を選択して下さい");
      document.body.appendChild(label);
      document.body.appendChild(document.createElement("br"));

      var array = items.RandomPattern.split("\n");
      array.forEach((element) => {
        if (checkValidPattern(element)) {
          let btn = document.createElement("button");
          btn.innerHTML = element;
          btn.onclick = function () {
            window.location.replace(
              getRandomUrl(window.location.href, element)
            );
          };
          btn.style.marginRight = "6px";
          document.body.appendChild(btn);
        }
      });
    }
  });
};

function checkValidPattern(pattern) {
  // 7文字丁度でなければfalse
  if (pattern.length != 7) return false;

  // 1-7までそれぞれ丁度1回ずつ使われていなければfalse
  for (var i = 1; i <= 7; i++) {
    if ((pattern.match(i, "g") || []).length != 1) return false;
  }
  return true;
}

function getRandomUrl(originalUrl, pattern1) {
  console.log("getRandomUrl" + originalUrl);
  var url = originalUrl.substr(0, originalUrl.lastIndexOf("?"));
  var query = originalUrl.substr(originalUrl.lastIndexOf("?"));
  var newQuery;

  if (query.indexOf("R") == -1) {
    newQuery =
      query.substr(0, 6) + "R0" + pattern1 + "01234567" + query.substr(6);
  } else {
    newQuery = query.substr(0, 6) + "R0" + pattern1 + query.substr(15);
  }
  console.log(newQuery);
  return url + newQuery;
}
