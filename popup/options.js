const input_area = document.getElementById("input_random_pattern");

async function import_lane_ticket() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: parseDOM,
    })
    .then(function (r) {
      var resultArray = r[0].result.split(/\r\n|\r|\n/g);
      var array_input_area = input_area.value.split(/\r\n|\r|\n/g);
      resultArray.forEach((element) => {
        if (checkValidPattern(element) && !array_input_area.includes(element)) {
          input_area.value = input_area.value + element + "\n";
        }
      });
    });
}
function parseDOM() {
  return document.body.outerText;
}

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

document.getElementById("import_ticket_button").addEventListener("click", import_lane_ticket);

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
    input_area.value = result_text;
  }, 10);
});
