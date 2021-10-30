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
};

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
  return originalUrl.charAt(originalUrl.lastIndexOf("?") + 1) == "D";
}

function getRandomUrl(side, pattern) {
  var originalUrl = window.location.href;
  var url = originalUrl.substr(0, originalUrl.lastIndexOf("?"));
  var query = originalUrl.substr(originalUrl.lastIndexOf("?"));
  var newQuery;

  if (query.indexOf("R") == -1) {
    if (side == 1) {
      newQuery = query.substr(0, 6) + "R0" + pattern + DEFAULT_PATTERN + query.substr(6);
    } else {
      query.substr(0, 6) + "R" + DEFAULT_PATTERN + "0" + pattern + query.substr(6);
    }
  } else {
    if (side == 1) {
      newQuery = query.substr(0, 6) + "R0" + pattern + query.substr(15);
    } else {
      newQuery = query.substr(0, 15) + "0" + pattern + query.substr(23);
    }
  }
  console.log(newQuery);
  return url + newQuery;
}
