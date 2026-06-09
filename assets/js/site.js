(function () {
  var content = window.KDX_CONTENT;
  var shared = content.shared;
  var lang = document.documentElement.dataset.lang || "en";
  var t = content[lang] || content.en;
  var ids = ["hakkimizda", "misyon-vizyon", "hizmetler", "partnerler", "iletisim"];
  var icons = {
    menu:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>',
    globe:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>',
    chevronLeft:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"></path></svg>',
    chevronRight:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg>',
    chevronDown:
      '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"></path></svg>',
    target:
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
    eye:
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    server:
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="8" x="2" y="2" rx="2"></rect><rect width="20" height="8" x="2" y="14" rx="2"></rect><path d="M6 6h.01M6 18h.01"></path></svg>',
    cloud:
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>',
    cpu:
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="6" height="6" x="9" y="9" rx="1"></rect><path d="M15 2v2M15 20v2M9 2v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"></path></svg>',
    compass:
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"></path></svg>',
    map:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    mail:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>',
    phone:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    external:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20"></path></svg>'
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function goTo(id) {
    var target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    document.body.classList.remove("menu-open");
  }

  function navButtons(extraClass) {
    return t.nav
      .map(function (label, index) {
        return '<button class="nav-link ' + (extraClass || "") + '" data-scroll="' + ids[index] + '">' + esc(label) + "</button>";
      })
      .join("");
  }

  function languageMenu() {
    return Object.keys(content)
      .filter(function (key) {
        return key !== "shared";
      })
      .map(function (key) {
        var item = content[key];
        return '<a href="' + item.path + '">' + item.flag + " " + item.label + "</a>";
      })
      .join("");
  }

  function header() {
    return (
      '<header class="site-header" id="site-header">' +
      '<div class="container header-inner">' +
      '<button class="brand" data-scroll="hero" aria-label="KronosDX">' +
      '<span class="brand-mark"><img src="/images/logo/kronosdx_logo_wo_txt_small.png" alt="KronosDX"></span>' +
      '<span><span class="brand-name">KronosDX</span><span class="tagline-window"><span class="tagline-track"><span>' +
      esc(t.tagline) +
      '</span><span>' +
      esc(t.tagline) +
      "</span></span></span></span></button>" +
      '<nav class="desktop-nav" aria-label="Primary">' +
      navButtons("") +
      '<div class="language"><button class="language-button" type="button" aria-label="Language">' +
      icons.globe +
      "<span>" +
      t.flag +
      " " +
      t.label +
      '</span></button><div class="language-menu">' +
      languageMenu() +
      "</div></div>" +
      '<button class="btn btn-green" data-scroll="iletisim">' +
      esc(t.cta) +
      "</button></nav>" +
      '<button class="menu-toggle" type="button" aria-label="Menu">' +
      icons.menu +
      "</button></div></header>" +
      '<div class="mobile-panel"><nav>' +
      navButtons("") +
      '<button class="btn btn-green" data-scroll="iletisim">' +
      esc(t.cta) +
      "</button>" +
      '<div class="language open"><div class="language-menu" style="position:static;opacity:1;pointer-events:auto;transform:none;box-shadow:none">' +
      languageMenu() +
      "</div></div></nav></div>"
    );
  }

  function hero() {
    var slides = t.hero
      .map(function (slide, index) {
        return (
          '<div class="hero-slide ' +
          (index === 0 ? "active" : "") +
          '" data-slide="' +
          index +
          '">' +
          '<div class="container hero-copy reveal visible">' +
          '<span class="eyebrow">' +
          esc(slide.eyebrow) +
          "</span>" +
          "<h1>" +
          esc(slide.title) +
          '<br><span>' +
          esc(slide.accent) +
          "</span></h1>" +
          "<p>" +
          esc(slide.text) +
          "</p>" +
          '<div class="hero-actions"><button class="btn btn-green" data-scroll="hizmetler">' +
          esc(slide.primary) +
          '</button><button class="btn btn-ghost" data-scroll="iletisim">' +
          esc(slide.secondary) +
          "</button></div></div></div>"
        );
      })
      .join("");
    var dots = t.hero
      .map(function (_, index) {
        return '<button class="hero-dot ' + (index === 0 ? "active" : "") + '" data-hero-dot="' + index + '" aria-label="Slide ' + (index + 1) + '"></button>';
      })
      .join("");

    return (
      '<section class="hero" id="hero">' +
      slides +
      '<button class="hero-arrow hero-prev" type="button" aria-label="Previous">' +
      icons.chevronLeft +
      "</button>" +
      '<button class="hero-arrow hero-next" type="button" aria-label="Next">' +
      icons.chevronRight +
      "</button>" +
      '<button class="scroll-down" type="button" data-scroll="hakkimizda" aria-label="Scroll down">' +
      icons.chevronDown +
      "</button>" +
      '<div class="hero-dots">' +
      dots +
      "</div></section>"
    );
  }

  function about() {
    return (
      '<section class="section" id="hakkimizda"><div class="container about-grid">' +
      '<div class="about-copy reveal"><span class="section-eyebrow">' +
      esc(t.about.eyebrow) +
      "</span><h2>" +
      esc(t.about.title) +
      ' <span>' +
      esc(t.about.accent) +
      "</span></h2>" +
      t.about.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      "</div>" +
      '<div class="stats-grid reveal">' +
      t.about.stats
        .map(function (stat) {
          return '<div class="stat-card"><span class="stat-number" data-count="' + esc(stat[0]) + '">0</span><span class="stat-label">' + esc(stat[1]) + "</span></div>";
        })
        .join("") +
      "</div></div></section>"
    );
  }

  function mission() {
    return (
      '<section class="section alt" id="misyon-vizyon"><div class="container">' +
      '<div class="section-head reveal"><h2>' +
      esc(t.mission.title) +
      '</h2><div class="accent-line"></div></div>' +
      '<div class="mission-grid">' +
      t.mission.cards
        .map(function (card, index) {
          return '<article class="mission-card reveal"><div class="icon-box">' + (index ? icons.eye : icons.target) + "</div><h3>" + esc(card.title) + "</h3><p>" + esc(card.text) + "</p></article>";
        })
        .join("") +
      "</div></div></section>"
    );
  }

  function services() {
    var serviceIcons = [icons.server, icons.cloud, icons.cpu, icons.compass];
    return (
      '<section class="section" id="hizmetler"><div class="container">' +
      '<div class="section-head reveal"><span class="section-eyebrow">' +
      esc(t.services.eyebrow) +
      "</span><h2>" +
      esc(t.services.title) +
      "</h2><p>" +
      esc(t.services.text) +
      "</p></div>" +
      '<div class="service-grid">' +
      t.services.items
        .map(function (item, index) {
          return '<article class="service-card reveal"><div class="icon-box">' + serviceIcons[index] + "</div><h3>" + esc(item[0]) + "</h3><p>" + esc(item[1]) + "</p></article>";
        })
        .join("") +
      "</div></div></section>"
    );
  }

  function partners() {
    var marqueeCards = shared.partners
      .concat(shared.partners)
      .map(function (partner) {
        return '<div class="partner-logo"><img src="' + partner[1] + '" alt="' + esc(partner[0]) + '"></div>';
      })
      .join("");
    return (
      '<section class="section alt" id="partnerler"><div class="container">' +
      '<div class="section-head reveal"><span class="section-eyebrow">' +
      esc(t.partners.eyebrow) +
      "</span><h2>" +
      esc(t.partners.title) +
      "</h2><p>" +
      esc(t.partners.text) +
      "</p></div>" +
      '<div class="partners-marquee reveal" aria-label="' +
      esc(t.partners.title) +
      '"><div class="partners-track">' +
      marqueeCards +
      "</div></div></section>"
    );
  }

  function contact() {
    var mapSrc = shared.mapsUrl + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
    return (
      '<section class="section" id="iletisim"><div class="container">' +
      '<div class="section-head reveal"><span class="section-eyebrow">' +
      esc(t.contact.eyebrow) +
      "</span><h2>" +
      esc(t.contact.title) +
      "</h2><p>" +
      esc(t.contact.text) +
      "</p></div>" +
      '<div class="contact-grid">' +
      '<div class="contact-card reveal"><div class="contact-card-inner"><h3>' +
      esc(t.contact.formTitle) +
      '</h3><form class="form-grid" action="/contact.php" method="post">' +
      '<div class="field"><label for="name">' +
      esc(t.contact.name) +
      '</label><input id="name" name="name" autocomplete="name" required></div>' +
      '<div class="field"><label for="email">' +
      esc(t.contact.email) +
      '</label><input id="email" name="email" type="email" autocomplete="email" required></div>' +
      '<div class="field"><label for="subject">' +
      esc(t.contact.subject) +
      '</label><select id="subject" name="subject" required><option value="">' +
      esc(t.contact.subject) +
      "</option>" +
      t.contact.subjects
        .map(function (subject) {
          return '<option value="' + esc(subject) + '">' + esc(subject) + "</option>";
        })
        .join("") +
      "</select></div>" +
      '<div class="field"><label for="message">' +
      esc(t.contact.message) +
      '</label><textarea id="message" name="message" required></textarea></div>' +
      '<button class="btn btn-green" type="submit">' +
      icons.mail +
      esc(t.contact.send) +
      '</button><p class="form-status" role="status" aria-live="polite"></p></form></div></div>' +
      '<div class="contact-card reveal"><div class="contact-card-inner"><h3>' +
      esc(t.contact.infoTitle) +
      '</h3><div class="info-list">' +
      infoRow(icons.map, t.contact.address, shared.addressLine1 + "<br>" + shared.addressLine2, false) +
      infoRow(icons.mail, t.contact.emailLabel, '<a href="mailto:' + shared.email + '">' + shared.email + "</a>", false) +
      infoRow(icons.phone, t.contact.phone, '<a href="' + shared.phoneHref + '">' + shared.phoneText + "</a>", false) +
      '</div></div><iframe class="map-frame" src="' +
      esc(mapSrc) +
      '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="KronosDX location"></iframe>' +
      '<a class="map-link" href="' +
      esc(shared.mapsUrl) +
      '" target="_blank" rel="noopener noreferrer">' +
      icons.map +
      esc(t.contact.map) +
      "</a></div></div></div></section>"
    );
  }

  function infoRow(icon, label, value) {
    return '<div class="info-row"><div class="icon-box" style="width:38px;height:38px;margin:0">' + icon + '</div><div><p class="info-label">' + esc(label) + '</p><p class="info-value">' + value + "</p></div></div>";
  }

  function footer() {
    return (
      '<footer class="footer"><div class="container">' +
      '<div class="footer-grid"><div><div class="footer-brand"><img src="/images/logo/kronosdx_logo_wo_txt_small.png" alt="KronosDX"><strong>KronosDX</strong></div><p>' +
      esc(t.footer.text) +
      '</p><div class="socials"><span class="social">in</span><span class="social">X</span><span class="social">IG</span><span class="social">f</span></div></div>' +
      '<div><h4>' +
      esc(t.footer.quick) +
      "</h4><ul>" +
      t.nav
        .map(function (label, index) {
          return '<li><a href="#' + ids[index] + '">' + esc(label) + "</a></li>";
        })
        .join("") +
      "</ul></div>" +
      '<div><h4>' +
      esc(t.footer.contact) +
      '</h4><ul class="footer-contact"><li><a href="mailto:' +
      shared.email +
      '"><span class="footer-contact-icon">' +
      icons.mail +
      "</span><span>" +
      shared.email +
      '</span></a></li><li><a href="' +
      shared.phoneHref +
      '"><span class="footer-contact-icon">' +
      icons.phone +
      "</span><span>" +
      shared.phoneText +
      '</span></a></li><li><a href="https://' +
      shared.website +
      '"><span class="footer-contact-icon">' +
      icons.external +
      "</span><span>" +
      shared.website +
      "</span></a></li></ul></div></div>" +
      '<div class="footer-bottom"><p>© 2026 Kronos Digital and IT Technologies. ' +
      esc(t.footer.rights) +
      "</p><p>" +
      esc(t.footer.permission) +
      "</p></div></div></footer>"
    );
  }

  function render() {
    document.title = t.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.description);
    document.getElementById("app").innerHTML = header() + hero() + about() + mission() + services() + partners() + contact() + footer();
  }

  function bind() {
    var headerEl = document.getElementById("site-header");
    var language = document.querySelector(".desktop-nav .language");
    var currentSlide = 0;
    var timer;

    function setSlide(index) {
      var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
      var dots = Array.prototype.slice.call(document.querySelectorAll(".hero-dot"));
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("active", i === currentSlide);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === currentSlide);
      });
    }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(function () {
        setSlide(currentSlide + 1);
      }, 6500);
    }

    document.addEventListener("click", function (event) {
      var scrollButton = event.target.closest("[data-scroll]");
      var langButton = event.target.closest(".language-button");
      var dot = event.target.closest("[data-hero-dot]");

      if (scrollButton) {
        goTo(scrollButton.dataset.scroll);
      }

      if (langButton && language) {
        language.classList.toggle("open");
      } else if (language && !event.target.closest(".language")) {
        language.classList.remove("open");
      }

      if (event.target.closest(".menu-toggle")) {
        document.body.classList.toggle("menu-open");
      }

      if (event.target.closest(".hero-prev")) {
        setSlide(currentSlide - 1);
        startTimer();
      }

      if (event.target.closest(".hero-next")) {
        setSlide(currentSlide + 1);
        startTimer();
      }

      if (dot) {
        setSlide(Number(dot.dataset.heroDot));
        startTimer();
      }
    });

    document.addEventListener("submit", function (event) {
      var form = event.target.closest("form.form-grid");
      if (!form) return;
      event.preventDefault();

      var status = form.querySelector(".form-status");
      var submit = form.querySelector('button[type="submit"]');
      var payload = {
        adSoyad: form.elements.name.value,
        email: form.elements.email.value,
        konu: form.elements.subject.value,
        mesaj: form.elements.message.value
      };

      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }
      if (submit) submit.disabled = true;

      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          return response.json().then(function (data) {
            if (!response.ok) throw new Error(data.error || "Message could not be sent.");
            return data;
          });
        })
        .then(function () {
          form.reset();
          if (status) {
            status.textContent = lang === "tr" ? "Mesajınız gönderildi." : lang === "bg" ? "Съобщението е изпратено." : "Your message has been sent.";
            status.classList.add("success");
          }
        })
        .catch(function (error) {
          if (status) {
            status.textContent = error.message;
            status.classList.add("error");
          }
        })
        .finally(function () {
          if (submit) submit.disabled = false;
        });
    });

    window.addEventListener("scroll", function () {
      headerEl.classList.toggle("is-scrolled", window.scrollY > 10);
    });

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              if (entry.target.classList.contains("stats-grid")) {
                animateStats(entry.target);
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll(".reveal").forEach(function (el) {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("visible");
      });
      animateStats(document);
    }

    startTimer();

    if (window.location.hash) {
      setTimeout(function () {
        goTo(window.location.hash.slice(1));
      }, 80);
    }
  }

  function animateStats(root) {
    var numbers = Array.prototype.slice.call(root.querySelectorAll(".stat-number[data-count]"));
    numbers.forEach(function (el) {
      if (el.dataset.counted === "true") return;
      el.dataset.counted = "true";

      var raw = el.dataset.count || "0";
      var target = Number(raw.replace(/[^\d.]/g, "")) || 0;
      var suffix = raw.replace(/[\d.]/g, "");
      var duration = 1200;
      var startTime = performance.now();

      function frame(now) {
        var progress = Math.min((now - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(target * eased);
        el.textContent = value + suffix;

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          el.textContent = raw;
        }
      }

      requestAnimationFrame(frame);
    });
  }

  render();
  bind();
})();
