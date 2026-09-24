(function(){
  "use strict";

  /* ---------------- nav ---------------- */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  window.addEventListener('scroll', function(){
    if(!nav) return;
    if(window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });

  if(toggle && mobileMenu){
    toggle.addEventListener('click', function(){
      var open = mobileMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mobileMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  /* ---------------- reveal on scroll ---------------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------------- signature ring (draws on scroll, hand marks time-of-day sections) ---------------- */
  var ring = document.querySelector('.signature-ring');
  if(ring){
    var progressCircle = ring.querySelector('.progress');
    var hand = ring.querySelector('.hand');
    var radius = 28;
    var circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = circumference;
    var sections = Array.from(document.querySelectorAll('[data-hour]'));

    function updateRing(){
      var doc = document.documentElement;
      var scrolled = doc.scrollTop || document.body.scrollTop;
      var height = (doc.scrollHeight - doc.clientHeight) || 1;
      var pct = Math.min(1, Math.max(0, scrolled / height));
      progressCircle.style.strokeDashoffset = circumference * (1 - pct);
      ring.classList.toggle('show', scrolled > 60);

      // find current section's hour to rotate the hand (7am..3pm mapped across 0-360)
      var currentHour = 7;
      sections.forEach(function(sec){
        var rect = sec.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.6){
          currentHour = parseFloat(sec.getAttribute('data-hour'));
        }
      });
      var deg = ((currentHour - 6) / 12) * 360;
      hand.style.transform = 'rotate(' + deg + 'deg)';
    }
    var ticking = false;
    window.addEventListener('scroll', function(){
      if(!ticking){
        requestAnimationFrame(function(){ updateRing(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    updateRing();
  }

  /* ---------------- whisper particles (fixed background layer) ---------------- */
  (function particles(){
    if(reduceMotion) return;
    var canvas = document.querySelector('.env-layer canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w, h, pts = [];
    function resize(){
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    function seed(){
      pts = [];
      var count = Math.round((w * h) / 90000);
      for(var i=0;i<count;i++){
        pts.push({
          x: Math.random()*w, y: Math.random()*h,
          r: 0.6 + Math.random()*1.4,
          vy: 0.06 + Math.random()*0.12,
          o: 0.08 + Math.random()*0.14
        });
      }
    }
    function draw(){
      ctx.clearRect(0,0,w,h);
      pts.forEach(function(p){
        p.y -= p.vy;
        if(p.y < -4){ p.y = h + 4; p.x = Math.random()*w; }
        ctx.beginPath();
        ctx.fillStyle = 'rgba(125,186,60,' + p.o + ')';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', function(){ resize(); seed(); });
    resize(); seed(); draw();
  })();

  /* ---------------- hero: scroll-scrubbed video with static fallback ---------------- */
  (function hero(){
    var heroScroll = document.querySelector('.hero-scroll');
    var mediaWrap = document.querySelector('.hero-media');
    var loading = document.querySelector('.hero-loading');
    var bands = Array.from(document.querySelectorAll('.hero-band'));
    if(!heroScroll || !mediaWrap) return;

    function showBandsByScroll(){
      var rect = heroScroll.getBoundingClientRect();
      var total = heroScroll.offsetHeight - window.innerHeight;
      var scrolled = Math.min(Math.max(-rect.top, 0), total);
      var pct = total > 0 ? scrolled / total : 0;
      bands.forEach(function(band){
        var start = parseFloat(band.getAttribute('data-start'));
        var end = parseFloat(band.getAttribute('data-end'));
        var active = pct >= start && pct < end;
        if(pct >= 0.98 && band.classList.contains('settle')) active = true;
        band.classList.toggle('active', active);
      });
      return pct;
    }

    var isSmall = window.matchMedia('(max-width: 767px)').matches;
    var saveData = (navigator.connection && navigator.connection.saveData) || false;
    var isFile = window.location.protocol === 'file:';

    function staticFallback(){
      var img = document.createElement('img');
      img.src = 'assets/img/hero-end.jpg';
      img.alt = 'Iced matcha poured over ice on a green marble counter';
      mediaWrap.appendChild(img);
      if(loading) loading.classList.add('hidden');
    }

    if(reduceMotion || isSmall || saveData || isFile){
      staticFallback();
      window.addEventListener('scroll', showBandsByScroll, { passive:true });
      showBandsByScroll();
      return;
    }

    var video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.poster = 'assets/img/hero-poster.jpg';

    fetch('assets/hero.mp4')
      .then(function(res){
        if(!res.ok) throw new Error('no video');
        return res.blob();
      })
      .then(function(blob){
        var url = URL.createObjectURL(blob);
        video.src = url;
        mediaWrap.appendChild(video);

        var seeking = false;
        var targetTime = 0;
        var duration = 0;

        video.addEventListener('loadedmetadata', function(){
          duration = video.duration || 6;
          if(loading) loading.classList.add('hidden');
        });

        function seekLoop(){
          if(!seeking && Math.abs(video.currentTime - targetTime) > 0.02){
            seeking = true;
            video.currentTime = targetTime;
          }
          requestAnimationFrame(seekLoop);
        }
        video.addEventListener('seeked', function(){ seeking = false; });
        requestAnimationFrame(seekLoop);

        var displayed = 0;
        function rafLoop(){
          var pct = showBandsByScroll();
          var raw = pct * duration;
          displayed += (raw - displayed) * 0.14;
          targetTime = Math.min(Math.max(displayed, 0), duration - 0.05);
          requestAnimationFrame(rafLoop);
        }
        requestAnimationFrame(rafLoop);
      })
      .catch(function(){
        staticFallback();
        window.addEventListener('scroll', showBandsByScroll, { passive:true });
        showBandsByScroll();
      });
  })();

  /* ---------------- interactive clock drink-picker ---------------- */
  (function clockPicker(){
    var clock = document.querySelector('.clock');
    var hand = document.querySelector('.clock .hand');
    if(!clock || !hand) return;
    var readout = document.querySelector('.picker-result .hour-readout');
    var title = document.querySelector('.picker-result h3');
    var desc = document.querySelector('.picker-result p');

    var pairings = [
      { from: 7, to: 10, hour: '7-10AM', title: 'Morning coffee + a fresh sandwich.', desc: 'Start the day the way regulars do.' },
      { from: 10, to: 13, hour: '10-1PM', title: 'Iced matcha + a salad.', desc: 'Bright, cold, and enough to carry you to lunch.' },
      { from: 13, to: 16, hour: '1-4PM', title: 'Hot tea + a slice of cake.', desc: 'The slow-down hour. Take the window seat.' },
      { from: 16, to: 19, hour: '4-7PM', title: 'Cold drink + a bowl of soup.', desc: 'Warm inside, cool in hand. Perfect trade.' }
    ];

    function pairingFor(hour){
      for(var i=0;i<pairings.length;i++){
        if(hour >= pairings[i].from && hour < pairings[i].to) return pairings[i];
      }
      return pairings[0];
    }

    function setHour(hour){
      hour = Math.max(7, Math.min(18.99, hour));
      var deg = ((hour - 7) / 12) * 360;
      hand.style.transform = 'translateX(-50%) rotate(' + deg + 'deg)';
      var p = pairingFor(hour);
      if(readout) readout.textContent = p.hour;
      if(title) title.textContent = p.title;
      if(desc) desc.textContent = p.desc;
    }

    function angleFromEvent(clientX, clientY){
      var rect = clock.getBoundingClientRect();
      var cx = rect.left + rect.width/2;
      var cy = rect.top + rect.height/2;
      var dx = clientX - cx;
      var dy = clientY - cy;
      var deg = Math.atan2(dx, -dy) * (180/Math.PI);
      if(deg < 0) deg += 360;
      var hour = 7 + (deg/360) * 12;
      return hour;
    }

    var dragging = false;
    function start(e){ dragging = true; move(e); }
    function move(e){
      if(!dragging) return;
      var point = e.touches ? e.touches[0] : e;
      setHour(angleFromEvent(point.clientX, point.clientY));
      e.preventDefault();
    }
    function end(){ dragging = false; }

    hand.addEventListener('mousedown', start);
    clock.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);

    hand.addEventListener('touchstart', start, { passive:false });
    clock.addEventListener('touchstart', start, { passive:false });
    window.addEventListener('touchmove', move, { passive:false });
    window.addEventListener('touchend', end);

    // init at current-ish hour
    var now = new Date().getHours();
    setHour(now >= 7 && now < 19 ? now : 9);
  })();

})();
