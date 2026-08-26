/* AFS Commercial Systems, site behaviour. No dependencies, no build step. */
(function () {
  'use strict';

  /* ==========================================================================
     BOOKING LINK

     Paste Andrew's Google Calendar appointment schedule link between the
     quotes below. Every "Book a Demo" button on the site then points at it
     and opens it in a new tab.

     To create the link: Google Calendar, Create, Appointment schedule.
     Set the days and hours there, connect it to his calendar so it checks
     for conflicts, then use Open booking page and copy the URL.

     Leave it empty and every button falls back to the mailto link already
     written into the HTML, so the site always works.

     Example:
     var BOOKING_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ...';
     ========================================================================== */
  var BOOKING_URL = '';

  /* ---------------------------------------------------------------- Navigation */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');

  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 24) { nav.classList.add('is-stuck'); }
      else { nav.classList.remove('is-stuck'); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Highlight whichever section is currently in view. */
  var sectionLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav__links a[href^="#"]')
  );
  if (sectionLinks.length && 'IntersectionObserver' in window) {
    var targets = sectionLinks
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = sectionLinks.filter(function (a) {
          return a.getAttribute('href') === '#' + entry.target.id;
        })[0];
        if (!link) { return; }
        if (entry.isIntersecting) { link.setAttribute('aria-current', 'true'); }
        else { link.removeAttribute('aria-current'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ------------------------------------------------------------ Scroll reveals */
  var reveals = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------- Platform card stack */
  /* The pinning is pure CSS sticky. This only adds the settle: as each card is
     covered by the one below it, it eases back very slightly, so the stack
     reads as depth rather than as a flat pile. */
  var stack = document.querySelector('.stack');
  if (stack && !reduced) {
    var cards = Array.prototype.slice.call(stack.querySelectorAll('.stack__card'));
    var ticking = false;

    var settle = function () {
      ticking = false;
      for (var i = 0; i < cards.length - 1; i++) {
        var card = cards[i];
        var next = cards[i + 1];
        var height = card.offsetHeight || 1;
        var overlap = height - (next.getBoundingClientRect().top - card.getBoundingClientRect().top);
        var progress = overlap / height;
        progress = progress < 0 ? 0 : (progress > 1 ? 1 : progress);
        card.style.transform = 'scale(' + (1 - progress * 0.045).toFixed(4) + ')';
        card.style.setProperty('--dim', (progress * 0.6).toFixed(3));
      }
    };

    var onFrame = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(settle); }
    };

    window.addEventListener('scroll', onFrame, { passive: true });
    window.addEventListener('resize', onFrame);
    settle();
  }

  /* --------------------------------------------------------- Mobile sticky CTA */
  var sticky = document.querySelector('.stickybar');
  var heroCta = document.querySelector('[data-cta-hero]');
  var closer = document.querySelector('.closer');

  if (sticky && 'IntersectionObserver' in window) {
    var heroVisible = true;
    var closerVisible = false;
    var sync = function () {
      if (!heroVisible && !closerVisible) { sticky.classList.add('is-visible'); }
      else { sticky.classList.remove('is-visible'); }
    };
    if (heroCta) {
      new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; sync(); },
        { threshold: 0 }).observe(heroCta);
    } else { heroVisible = false; }
    if (closer) {
      new IntersectionObserver(function (e) { closerVisible = e[0].isIntersecting; sync(); },
        { threshold: 0.2 }).observe(closer);
    }
    sync();
  }

  /* ------------------------------------------------------------------- Booking */
  if (BOOKING_URL) {
    document.querySelectorAll('[data-book]').forEach(function (a) {
      a.href = BOOKING_URL;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  /* --------------------------------------------------------------------- Footer */
  var year = document.querySelector('[data-year]');
  if (year) { year.textContent = new Date().getFullYear(); }
})();
