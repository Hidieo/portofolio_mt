// Latar: jejak gelombang ala osiloskop, dipakai sebagai kedalaman untuk efek kaca
(function () {
  var c = document.getElementById('trace'),
      x = c.getContext('2d'),
      t = 0,
      w,
      h;
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function size() {
    var d = devicePixelRatio || 1;
    w = c.width = innerWidth * d;
    h = c.height = innerHeight * d;
  }

  function draw() {
    x.clearRect(0, 0, w, h);

    // Garis grid 10 x 10
    x.strokeStyle = 'rgba(143,211,196,.05)';
    x.lineWidth = 1;
    for (var i = 1; i < 10; i++) {
      x.beginPath();
      x.moveTo(0, h * i / 10);
      x.lineTo(w, h * i / 10);
      x.stroke();

      x.beginPath();
      x.moveTo(w * i / 10, 0);
      x.lineTo(w * i / 10, h);
      x.stroke();
    }

    // Dua gelombang: [posisi y, amplitudo, frekuensi, kecepatan, opasitas]
    [
      [.38, .9, .012, 1, .35],
      [.62, .5, .02, 1.6, .18]
    ].forEach(function (p) {
      x.beginPath();
      x.lineWidth = 2 * (devicePixelRatio || 1);
      x.strokeStyle = 'rgba(143,211,196,' + p[4] + ')';

      for (var px = 0; px <= w; px += 4) {
        var y = h * p[0]
          + Math.sin(px * p[2] / (devicePixelRatio || 1) + t * p[3]) * h * .07 * p[1]
          + Math.sin(px * .003 + t * .4) * h * .03;

        px ? x.lineTo(px, y) : x.moveTo(px, y);
      }

      x.stroke();
    });

    t += .012;
    if (!still) requestAnimationFrame(draw);
  }

  size();
  draw();

  addEventListener('resize', function () {
    size();
    if (still) draw();
  });
})();


// Form kontak: buka draf email di aplikasi email pengunjung
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  var n = this.name.value,
      m = this.email.value,
      msg = this.message.value;
  var body = msg + '\n\nSalam,\n' + n + '\n' + m;

  location.href = 'mailto:deorizn@gmail.com'
    + '?subject=' + encodeURIComponent('Pesan dari ' + n)
    + '&body=' + encodeURIComponent(body);

  document.getElementById('note').textContent = 'Draf email dibuka. Kirim dari aplikasi email Anda.';
});


// Judul hero muncul kata demi kata
(function () {
  var h = document.querySelector('h1');
  if (!h) return;

  h.setAttribute('aria-label', h.textContent);
  h.innerHTML = h.textContent
    .split(' ')
    .map(function (w, i) {
      return '<span class="w" aria-hidden="true" style="--i:' + i + '">' + w + '</span>';
    })
    .join(' ');
})();


// Kilau kaca mengikuti kursor
document.addEventListener('pointermove', function (e) {
  var g = e.target.closest && e.target.closest('.glass');
  if (!g) return;

  var r = g.getBoundingClientRect();
  g.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  g.style.setProperty('--my', (e.clientY - r.top) + 'px');
});


// Kartu profil miring mengikuti kursor (hanya perangkat dengan mouse)
(function () {
  var p = document.querySelector('.profile');
  if (!p || !matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches) return;

  p.addEventListener('pointermove', function (e) {
    var r = p.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - .5,
        y = (e.clientY - r.top) / r.height - .5;

    p.style.setProperty('--ry', (x * 10) + 'deg');
    p.style.setProperty('--rx', (-y * 10) + 'deg');
  });

  p.addEventListener('pointerleave', function () {
    p.style.setProperty('--rx', '0deg');
    p.style.setProperty('--ry', '0deg');
  });
})();


// Progres scroll dan menu aktif
(function () {
  var bar = document.querySelector('.progress');

  addEventListener('scroll', function () {
    var m = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', m > 0 ? scrollY / m : 0);
  }, { passive: true });

  var links = document.querySelectorAll('nav a');

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (en.isIntersecting) {
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  document.querySelectorAll('.sec').forEach(function (s) {
    io.observe(s);
  });
})();
