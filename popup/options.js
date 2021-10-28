function save() {
  var random_pettern = document.getElementById("input_random_pattern").value;

  chrome.storage.local.set({ RandomPattern: random_pettern }, function () {});
}

function load() {
  chrome.storage.local.get("RandomPattern", function (items) {
    if (items.RandomPattern != null) {
      document.getElementById("input_random_pattern").value =
        items.RandomPattern;
    }
  });
}

document.addEventListener("DOMContentLoaded", load);

document.getElementById("save_button").addEventListener("click", save);
