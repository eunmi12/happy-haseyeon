/** 브라우저당 1일 1회 조회수 기록 (KST 기준) */
(function () {
  function kstDate() {
    const t = new Date(Date.now() + 9 * 60 * 60 * 1000);
    return t.toISOString().slice(0, 10);
  }

  function alreadyTracked(key) {
    try {
      return localStorage.getItem(key) === '1';
    } catch {
      return false;
    }
  }

  function markTracked(key) {
    try {
      localStorage.setItem(key, '1');
    } catch {
      /* ignore */
    }
  }

  function base() {
    if (typeof apiUrl === 'function') return apiUrl('/api/views');
    return '/api/views';
  }

  window.trackPageView = function trackPageView(payload) {
    const date = kstDate();
    let storageKey = '';
    let body = null;

    if (payload && payload.page === 'home') {
      storageKey = 'pv:home:' + date;
      body = { page: 'home' };
    } else if (payload && payload.post_id) {
      const id = Number(payload.post_id);
      if (!id) return;
      storageKey = 'pv:post:' + id + ':' + date;
      body = { post_id: id };
    } else {
      return;
    }

    if (alreadyTracked(storageKey)) return;
    markTracked(storageKey);

    try {
      const json = JSON.stringify(body);
      if (navigator.sendBeacon) {
        const blob = new Blob([json], { type: 'application/json' });
        if (navigator.sendBeacon(base(), blob)) return;
      }
      fetch(base(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json,
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* ignore */
    }
  };
})();
