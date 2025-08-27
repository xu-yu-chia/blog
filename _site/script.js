const viewCount = localStorage.getItem('viewCount') || Math.floor(Math.random() * 10000);  // 隨機產生 0 到 9999 的數字
document.getElementById('viewCount').textContent = parseInt(viewCount) + 1;
localStorage.setItem('viewCount', parseInt(viewCount) + 1);





// 滑鼠點擊漣漪效果
document.body.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    document.body.appendChild(ripple);

    const size = 100; // 固定漣漪大小更小
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.pageX - size / 2}px`;
    ripple.style.top = `${e.pageY - size / 2}px`;
    setTimeout(() => ripple.remove(), 400);
});



// 展開目前所在的 H2 區段（不改 tocbot 的 is-active-li）
document.addEventListener('DOMContentLoaded', function () {
  const toc = document.getElementById('toc');
  if (!toc) return;

  // 取得所有 H2 作為區段邊界（需要可改成 h1,h2 或 h2,h3）
  const h2s = Array.from(document.querySelectorAll('.post-content h2'));
  if (!h2s.length) return;

  // 確保每個標題有 id
  const slug = s => encodeURIComponent(
    (s || '').trim().toLowerCase().replace(/\s+/g, '-')
  );
  h2s.forEach(h => { if (!h.id) h.id = slug(h.textContent); });

  // map: H2 id -> 對應 TOC 的 <li>
  const idToLi = new Map();
  const tocLinks = Array.from(toc.querySelectorAll('.toc-link[href^="#"]'));
  const findLiById = (id) => {
    const a = tocLinks.find(x => decodeURIComponent(x.getAttribute('href').slice(1)) === id);
    return a ? a.closest('.toc-list-item') : null;
  };
  h2s.forEach(h => idToLi.set(h.id, findLiById(h.id)));

  // 快取每個 H2 的絕對頂端座標
  const OFFSET = 110; // 有固定頂欄就調整這個
  let sections = [];
  const recompute = () => {
    sections = h2s.map(h => ({
      id: h.id,
      top: window.scrollY + h.getBoundingClientRect().top
    }));
  };
  const expandForId = (id) => {
    // 清掉舊的展開
    toc.querySelectorAll('.toc-list-item.is-expanded-by-view').forEach(li => {
      li.classList.remove('is-expanded-by-view');
      const ul = li.querySelector(':scope > .toc-list');
      if (ul) ul.style.maxHeight = ''; // 還原
    });
    // 設定新的展開（該 H2 的 li）
    const li = idToLi.get(id);
    if (!li) return;
    li.classList.add('is-expanded-by-view');
    const ul = li.querySelector(':scope > .toc-list');
    if (ul) {
      ul.classList.remove('is-collapsed');
      ul.style.maxHeight = ul.scrollHeight + 'px';
    }
  };

  let ticking = false, current = null;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY + OFFSET;
      // 找「最後一個 top <= y」的 H2
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].top <= y) idx = i; else break;
      }
      const id = sections[idx]?.id || sections[0].id;
      if (id !== current) { current = id; expandForId(id); }
    });
  };

  recompute();
  window.addEventListener('resize', () => { recompute(); onScroll(); });
  window.addEventListener('load',   () => { recompute(); onScroll(); });
  window.addEventListener('scroll', onScroll, { passive: true });

  // 初始
  const initId = location.hash ? decodeURIComponent(location.hash.slice(1)) : h2s[0].id;
  current = initId; expandForId(initId); onScroll();
});




/*

// === 跟隨 tocbot 的 active，展開該項與祖先 ===
document.addEventListener('DOMContentLoaded', function () {
  const toc = document.getElementById('toc');
  if (!toc) return;

  const expandActiveChain = () => {
    // 讓目前 active 的每一層都展開（搭配上面的 CSS，不會亂跳）
    toc.querySelectorAll('.toc-list-item.is-active-li').forEach(li => {
      const child = li.querySelector(':scope > .toc-list');
      if (child) child.style.display = 'block';
    });
    // 讓目前項目在側欄可見，但不整個跳動
    const cur = toc.querySelector('.toc-list-item.is-active-li > .toc-link');
    if (cur) cur.scrollIntoView({ block: 'nearest' });
  };

  // 監聽 tocbot 對 class 的變更（它會切換 is-active-li）
  const mo = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        expandActiveChain();
        break;
      }
    }
  });
  mo.observe(toc, { attributes: true, subtree: true, attributeFilter: ['class'] });

  // 初始跑一次
  expandActiveChain();
});




/*
document.addEventListener('DOMContentLoaded', function() {
  // 確認 Tocbot 已渲染
  const tocListItems = document.querySelectorAll('#toc .toc-list > .toc-list-item');

  // 取得所有正文中的 H2
  const h2s = document.querySelectorAll('.post-content h2');

  // 幫每個 H2 加一個 data-h2-index，方便對應目錄
  h2s.forEach((h2, idx) => {
    h2.setAttribute('data-h2-index', idx);
  });

  // 建立 Intersection Observer，監控每個 H2 進入視窗
  let currentActive = null;
  const observer = new IntersectionObserver((entries) => {
    // 找到目前畫面最上面的 h2
    let minTop = Infinity, activeIdx = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.boundingClientRect.top >= 0 && entry.boundingClientRect.top < minTop) {
        minTop = entry.boundingClientRect.top;
        activeIdx = parseInt(entry.target.getAttribute('data-h2-index'));
      }
    });
    // 清除所有 is-active-li
    tocListItems.forEach(li => li.classList.remove('is-active-li'));
    // 設定目前 active 的目錄
    if (tocListItems[activeIdx]) {
      tocListItems[activeIdx].classList.add('is-active-li');
    }
  }, {
    root: null,
    threshold: 0, // 只要進入視窗就觸發
  });

  h2s.forEach(h2 => observer.observe(h2));
});




/*
// 監聽超連結的點擊事件
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const target = document.querySelector(link.getAttribute('href'));

        if (target) {
            event.preventDefault(); // 阻止預設行為（跳轉到目標）

            // 隱藏所有的 section
            document.querySelectorAll('main section').forEach(section => {
                section.classList.add('hidden');
            });

            // 顯示目標 section
            target.classList.remove('hidden');
            // target.scrollIntoView({ behavior: 'smooth' }); // 平滑滾動到目標區塊
        } else {
            // 如果找不到目標 section，讓瀏覽器跳轉到原本的 href
            window.location.href = link.getAttribute('href');
        }
    });
});

function showSectionFromHash() {
  let hash = window.location.hash;

  if (!hash) {
    window.location.hash = '#home'; // 沒有 hash 時跳回首頁
    return;
  }

  const targetSection = document.querySelector(hash);

  if (targetSection) {
    // 隱藏所有 section
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('hidden');
    });

    // 顯示目標 section
    targetSection.classList.remove('hidden');
  } else {
    // 如果 hash 無效，導回首頁
    window.location.hash = '#home';
  }
}

// 頁面載入時和 hash 變化時執行
window.addEventListener('DOMContentLoaded', showSectionFromHash);
window.addEventListener('hashchange', showSectionFromHash);

*/
