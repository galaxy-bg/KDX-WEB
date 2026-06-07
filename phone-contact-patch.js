(function () {
  var phoneHref = "tel:+905309548026";
  var phoneText = "+90 530 954 80 26";

  function makeInfoRow() {
    var row = document.createElement("div");
    row.className = "flex items-start gap-3";
    row.innerHTML =
      '<div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border mt-0.5" style="background:rgba(78,171,133,0.1);border-color:rgba(78,171,133,0.25)">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-4 h-4" style="color:#4eab85" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>' +
      "</div>" +
      '<div><p class="text-xs mb-0.5" style="color:#888888">Phone</p>' +
      '<a href="' + phoneHref + '" class="hover-green text-sm font-medium">' + phoneText + "</a></div>";
    return row;
  }

  function ensurePhone() {
    document.querySelectorAll('a[href="mailto:info@kronosdx.com"]').forEach(function (emailLink) {
      var listItem = emailLink.closest("li");
      if (listItem) {
        var list = listItem.parentElement;
        if (list && !list.querySelector('a[href="' + phoneHref + '"]')) {
          var li = document.createElement("li");
          li.innerHTML = '<a href="' + phoneHref + '" class="hover-green">' + phoneText + "</a>";
          listItem.insertAdjacentElement("afterend", li);
        }
        return;
      }

      var emailRow = emailLink.closest(".flex.items-start.gap-3");
      var container = emailRow && emailRow.parentElement;
      if (emailRow && container && !container.querySelector('a[href="' + phoneHref + '"]')) {
        emailRow.insertAdjacentElement("afterend", makeInfoRow());
      }
    });
  }

  document.addEventListener("DOMContentLoaded", ensurePhone);
  window.addEventListener("load", ensurePhone);
  setTimeout(ensurePhone, 500);
  setTimeout(ensurePhone, 1500);
})();
