const input_area = document.getElementById("input_random_pattern");
function save() {
  var random_pettern = input_area.value;

  chrome.storage.local.set({ RandomPattern: random_pettern }, function () {});
}

function load() {
  chrome.storage.local.get("RandomPattern", function (items) {
    if (items.RandomPattern != null) {
      input_area.value = items.RandomPattern;
    }
  });
}

document.addEventListener("DOMContentLoaded", load);

document.getElementById("save_button").addEventListener("click", save);

input_area.addEventListener("paste", (event) => {
  var input_text = input_area.value;
  let clip_text = (event.clipboardData || window.clipboardData).getData("text");
  var array = clip_text.split(/\r\n|\r|\n/g);
  var paste_text = "";
  array.forEach((element) => {
    if (checkValidPattern(element)) {
      paste_text += element + "\n";
    }
  });
  setTimeout(function () {
    var result_text = input_text + paste_text;
    input_area.value = result_text.substr(0, input_area.maxLength);
  }, 10);
});
