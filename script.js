/* Jenson Packing — interactions */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Close menu after clicking a link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Quote form: lightweight validation + mailto fallback
  var form = document.getElementById("quoteForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !message) {
        if (note) {
          note.textContent = "Please complete Name, a valid Email and Message.";
          note.classList.remove("ok");
        }
        return;
      }

      var subject = "Packaging Inquiry: " + (data.get("product") || "General");
      var body =
        "Name: " + name + "\n" +
        "Company: " + (data.get("company") || "") + "\n" +
        "WhatsApp: " + (data.get("phone") || "") + "\n" +
        "Product: " + (data.get("product") || "") + "\n\n" +
        message;

      // Open email client with the inquiry pre-filled
      window.location.href =
        "mailto:info@jensonpacking.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      if (note) {
        note.textContent = "Thanks! Your email app should open with the inquiry ready to send.";
        note.classList.add("ok");
      }
      form.reset();
    });
  }
})();
