// DOM要素の取得
document.addEventListener('DOMContentLoaded', () => {
    // タイムラインの要素取得
    const timeline = document.getElementById('timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // クイズの要素取得
    const quizCards = document.querySelectorAll('.quiz-card');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizNext = document.getElementById('quiz-next');
    const currentQuestion = document.querySelector('.current-question');
    const totalQuestions = document.querySelector('.total-questions');

    // タイムライン制御用変数
    let currentIndex = 0;
    let timelineActive = false;

    // クイズ制御用変数
    let currentQuizIndex = 0;
    let quizAnswered = false;

    // タイムライン初期化
    function initTimeline() {
        timelineItems[currentIndex].classList.add('active');
        timelineActive = true;

        // 前ボタンの無効化（初期状態）
        if (currentIndex === 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        }
    }

    // タイムラインの移動
    function moveTimeline(direction) {
        // 移動中は操作を無効化
        if (!timelineActive) return;
        timelineActive = false;

        // 現在のアイテムを非アクティブに
        timelineItems[currentIndex].classList.remove('active');

        // 次のインデックスを計算
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % timelineItems.length;
        } else {
            currentIndex = (currentIndex - 1 + timelineItems.length) % timelineItems.length;
        }

        // ボタンの有効/無効状態を更新
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        
        nextBtn.style.opacity = currentIndex === timelineItems.length - 1 ? '0.5' : '1';
        nextBtn.style.cursor = currentIndex === timelineItems.length - 1 ? 'not-allowed' : 'pointer';

        // 次のアイテムをアクティブに
        setTimeout(() => {
            timelineItems[currentIndex].classList.add('active');
            timelineActive = true;
        }, 300);
    }

    // タイムラインボタンのイベントリスナー
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveTimeline('prev');
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < timelineItems.length - 1) {
            moveTimeline('next');
        }
    });

    // クイズの初期化
    function initQuiz() {
        quizCards[currentQuizIndex].classList.add('active');
        totalQuestions.textContent = quizCards.length;
        currentQuestion.textContent = currentQuizIndex + 1;
        quizNext.disabled = true;
        quizNext.style.opacity = '0.5';
        quizNext.style.cursor = 'not-allowed';
    }

    // クイズの回答選択処理
    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            // 既に回答済みの場合は処理しない
            if (quizAnswered) return;

            const isCorrect = option.dataset.correct === 'true';
            const currentCard = quizCards[currentQuizIndex];
            const explanation = currentCard.querySelector('.quiz-explanation');

            // 正解・不正解のスタイル適用
            if (isCorrect) {
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
                
                // 正解の選択肢をハイライト
                currentCard.querySelectorAll('.quiz-option').forEach(opt => {
                    if (opt.dataset.correct === 'true') {
                        opt.classList.add('correct');
                    }
                });
            }

            // 解説を表示
            explanation.classList.remove('hidden');
            
            // 次へボタンを有効化
            quizNext.disabled = false;
            quizNext.style.opacity = '1';
            quizNext.style.cursor = 'pointer';
            
            quizAnswered = true;
        });
    });

    // 次の問題へ移動
    quizNext.addEventListener('click', () => {
        if (!quizAnswered && currentQuizIndex < quizCards.length - 1) return;

        // 現在のカードを非アクティブに
        quizCards[currentQuizIndex].classList.remove('active');

        // 次の問題へ
        currentQuizIndex++;

        // 最後の問題だった場合、最初に戻る
        if (currentQuizIndex >= quizCards.length) {
            currentQuizIndex = 0;
        }

        // 次のカードをアクティブに
        quizCards[currentQuizIndex].classList.add('active');
        currentQuestion.textContent = currentQuizIndex + 1;

        // 選択肢のスタイルをリセット
        quizCards[currentQuizIndex].querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('correct', 'incorrect');
        });

        // 解説を非表示
        quizCards[currentQuizIndex].querySelector('.quiz-explanation').classList.add('hidden');

        // 次へボタンを無効化
        quizNext.disabled = true;
        quizNext.style.opacity = '0.5';
        quizNext.style.cursor = 'not-allowed';

        quizAnswered = false;
    });

    // 初期化
    initTimeline();
    initQuiz();

    // スクロールアニメーション
    function animateOnScroll() {
        const elements = document.querySelectorAll('.hero-story, .facts-section, .then-now, .legacy');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // 要素が画面内に入ったらアニメーションクラスを追加
            if (position.top < window.innerHeight - 100) {
                element.style.animation = 'fadeIn 0.8s forwards';
            }
        });
    }

    // スクロールイベント
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初期状態でもチェック
});