// 現在の状態を管理するための変数
let currentFactIndex = 0;
const factCount = 5; // ファクトカードの総数

// カルーセルのドット作成
function createDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    for (let i = 0; i < factCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            showFact(i);
        });
        dotsContainer.appendChild(dot);
    }
}

// ファクトカードの表示
function showFact(index) {
    // 全てのカードを非アクティブにする
    document.querySelectorAll('.fact-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // 全てのドットを非アクティブにする
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });
    
    // 選択されたカードとドットをアクティブにする
    document.querySelectorAll('.fact-card')[index].classList.add('active');
    document.querySelectorAll('.dot')[index].classList.add('active');
    
    // 現在のインデックスを更新
    currentFactIndex = index;
}

// 次のファクトを表示
function showNextFact() {
    let nextIndex = currentFactIndex + 1;
    if (nextIndex >= factCount) {
        nextIndex = 0; // 最後の場合は最初に戻る
    }
    showFact(nextIndex);
}

// 前のファクトを表示
function showPrevFact() {
    let prevIndex = currentFactIndex - 1;
    if (prevIndex < 0) {
        prevIndex = factCount - 1; // 最初の場合は最後に移動
    }
    showFact(prevIndex);
}

// カルーセルのナビゲーションボタンにイベントリスナーを追加
function setupCarouselControls() {
    document.querySelector('.next-btn').addEventListener('click', showNextFact);
    document.querySelector('.prev-btn').addEventListener('click', showPrevFact);
}

// ダークモード切替の実装
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // ユーザーのシステム設定に基づいて初期テーマを設定
    if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', 'dark');
        }
    });
}

// スクロールアニメーションの設定
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1 // 要素の10%が表示されたらアニメーションを開始
    });
    
    // 各セクションに対してObserverを設定
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ページ読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    setupCarouselControls();
    setupThemeToggle();
    
    // IntersectionObserverがサポートされている場合のみスクロールアニメーションを設定
    if ('IntersectionObserver' in window) {
        setupScrollAnimations();
    }
    
    // キーボードでのカルーセル操作
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            showNextFact();
        } else if (e.key === 'ArrowLeft') {
            showPrevFact();
        }
    });
    
    // 自動スライド（オプション）- 5秒ごとに次のファクトへ
    // setInterval(showNextFact, 8000);
});

// 星空の小惑星を動的に追加
function createStarField() {
    const starField = document.querySelector('.star-field');
    
    // ランダムな星を作成
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
        star.style.position = 'absolute';
        starField.appendChild(star);
    }
}

// ページ読み込み完了時に星空を作成
window.addEventListener('load', createStarField);