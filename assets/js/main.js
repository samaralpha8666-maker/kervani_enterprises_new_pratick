// mobile nav
  const burger = document.getElementById('burgerBtn');
  const panel = document.getElementById('mobilePanel');
  burger.addEventListener('click', () => panel.classList.toggle('open'));
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => panel.classList.remove('open')));

  // inject corner brackets into every .frame
  document.querySelectorAll('.frame').forEach(el => {
    ['tl','tr','bl','br'].forEach(c => {
      const s = document.createElement('span');
      s.className = 'corner ' + c;
      el.appendChild(s);
    });
  });

  // reveal on scroll
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // count-up stats
  const counters = document.querySelectorAll('.num[data-count]');
  const counted = new Set();
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted.has(e.target)) {
        counted.add(e.target);
        const target = parseInt(e.target.dataset.count, 10);
        const dur = 1200;
        const start = performance.now();
        function tick(now){
          const p = Math.min((now-start)/dur, 1);
          e.target.textContent = Math.floor(p*target) + (p===1 ? '+' : '');
          if(p<1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    });
  }, {threshold:0.4});
  counters.forEach(c => cObs.observe(c));