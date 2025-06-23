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
