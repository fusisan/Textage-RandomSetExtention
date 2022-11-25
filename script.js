const DEFAULT_PATTERN = "01234567";
window.onload = function () {
  chrome.storage.local.get("RandomPattern", function (items) {
    if (items.RandomPattern != null) {
      var array = items.RandomPattern.split("\n");

      document.body.appendChild(document.createElement("br"));
      document.body.appendChild(document.createElement("br"));
      document.body.appendChild(document.createTextNode("適用したい配置を選択して下さい"));
      document.body.appendChild(document.createElement("br"));

      if (checkDP()) {
        document.body.appendChild(document.createTextNode("1P:"));
      }

      createPatternButton(array, 1);

      if (checkDP()) {
        document.body.appendChild(document.createElement("br"));
        document.body.appendChild(document.createTextNode("2P:"));
        createPatternButton(array, 2);
      }
    }
  });
  setRandomPatternText();
};

function setRandomPatternText() {
  var originalUrl = window.location.href;
  var query = originalUrl.substring(originalUrl.lastIndexOf("?"));
  var spRan = query.substring(8, 15);
  var dpRan1P = spRan;
  var dpRan2P = query.substring(16, 23);

  document.body.outerHTML = document.body.outerHTML
    .replace("+RANDOM", "+RANDOM[" + spRan + "]")
    .replace("+1P RAN", "+1P RAN[" + dpRan1P + "]")
    .replace("+2P RAN", "+2P RAN[" + dpRan2P + "]");
}

function createPatternButton(array, side) {
  array.forEach((element) => {
    if (checkValidPattern(element)) {
      let btn = document.createElement("button");
      btn.innerHTML = element;
      btn.onclick = function () {
        window.location.replace(getRandomUrl(side, element));
      };
      btn.style.marginRight = "6px";
      document.body.appendChild(btn);
    }
  });
}

function checkDP() {
  var originalUrl = window.location.href;
  return originalUrl.charAt(originalUrl.lastIndexOf("?") + 1).match(/[DF]/);
}

function getRandomUrl(side, pattern) {
  var originalUrl = window.location.href;
  var url = originalUrl.substring(0, originalUrl.lastIndexOf("?"));
  var query = originalUrl.substring(originalUrl.lastIndexOf("?"));
  var newQuery;

  if (query.indexOf("R") == -1) {
    if (side == 1) {
      newQuery = query.substring(0, 6) + "R0" + pattern + DEFAULT_PATTERN + query.substring(6);
    } else {
      newQuery = query.substring(0, 6) + "R" + DEFAULT_PATTERN + "0" + pattern + query.substring(6);
    }
  } else {
    if (side == 1) {
      newQuery = query.substring(0, 6) + "R0" + pattern + query.substring(15);
    } else {
      newQuery = query.substring(0, 15) + "0" + pattern + query.substring(23);
    }
  }
  console.log(newQuery);
  return url + newQuery;
}
