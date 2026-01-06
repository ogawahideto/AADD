// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', function() {
    // ダークモード切り替え
    const themeButton = document.getElementById('theme-button');
    themeButton.addEventListener('click', toggleTheme);

    // 旅の再生ボタン
    const playJourneyButton = document.getElementById('play-journey');
    playJourneyButton.addEventListener('click', animateJourney);

    // クイズ機能の初期化
    initQuiz();
});

// テーマ切り替え機能
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDarkMode = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkMode', isDarkMode);
}

// 保存されたテーマ設定を適用
function applyStoredTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
    }
}
applyStoredTheme();

// 南極への旅をアニメーション化
function animateJourney() {
    const route = document.getElementById('route-path');
    const endMarker = document.querySelector('.marker.end');
    const playButton = document.getElementById('play-journey');
    
    // ボタンを一時的に無効化
    playButton.disabled = true;
    playButton.innerText = '旅の途中...';
    
    // ルートのアニメーション
    route.style.width = '75%';
    
    // アニメーション完了後の処理
    setTimeout(() => {
        endMarker.style.opacity = '1';
        playButton.innerText = '到着しました！';
        
        // ボタンを再度有効化
        setTimeout(() => {
            playButton.disabled = false;
            playButton.innerText = '旅を再体験する';
            // アニメーションをリセット
            resetJourneyAnimation();
        }, 2000);
    }, 2000);
}

// 旅のアニメーションをリセット
function resetJourneyAnimation() {
    const route = document.getElementById('route-path');
    const endMarker = document.querySelector('.marker.end');
    
    route.style.transition = 'none';
    route.style.width = '0';
    endMarker.style.opacity = '0';
    
    // 強制的にレイアウトを再計算させる
    route.offsetWidth;
    
    // トランジションを元に戻す
    route.style.transition = 'width 2s ease-in-out';
}

// クイズ機能
function initQuiz() {
    // クイズの質問と回答
    const questions = [
        {
            question: '荻田泰永が南極点到達を果たしたのは何年何月何日ですか？',
            options: ['2017年12月25日', '2018年1月6日', '2018年2月14日', '2019年1月1日'],
            answer: 1,
            explanation: '荻田泰永は2018年1月6日に南極点への到達を達成しました。'
        },
        {
            question: '荻田泰永の南極点までの徒歩旅行はおよそ何キロメートルでしたか？',
            options: ['約500km', '約800km', '約1,130km', '約1,500km'],
            answer: 2,
            explanation: '荻田泰永は約1,130kmの距離を徒歩で踏破しました。'
        },
        {
            question: '荻田泰永の南極点への旅にかかった日数は？',
            options: ['30日間', '54日間', '78日間', '90日間'],
            answer: 1,
            explanation: '荻田泰永は54日間かけて南極点に到達しました。'
        },
        {
            question: '荻田泰永は南極点到達の際、どのような方法で挑戦しましたか？',
            options: ['チームでの挑戦', '犬ぞりを使用', '無補給・単独徒歩', '機械的補助を使用'],
            answer: 2,
            explanation: '荻田泰永は無補給・単独徒歩という最も厳しい方法で南極点に到達しました。'
        }
    ];
    
    let currentQuestionIndex = 0;
    let score = 0;
    
    // 要素の参照を取得
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const correctAnswerText = document.getElementById('correct-answer');
    const nextButton = document.getElementById('next-button');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    
    // 合計問題数を表示
    totalQuestionsElement.textContent = questions.length;
    
    // 最初の質問を表示
    showQuestion(currentQuestionIndex);
    
    // 次の質問ボタンのイベントリスナー
    nextButton.addEventListener('click', function() {
        // 結果表示をクリア
        resultContainer.classList.add('hidden');
        
        // 次の質問へ
        currentQuestionIndex++;
        
        // まだ質問が残っている場合
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            // クイズ終了時の処理
            questionText.textContent = `クイズ終了！あなたのスコア: ${score}/${questions.length}`;
            optionsContainer.innerHTML = '';
            nextButton.disabled = true;
            nextButton.textContent = '終了';
            
            // 成績に応じたメッセージ
            let message = '';
            if (score === questions.length) {
                message = '完璧！あなたは南極の専門家です！';
            } else if (score >= questions.length / 2) {
                message = '素晴らしい！南極についての知識が豊富です。';
            } else {
                message = '南極についてもっと学べる機会です。もう一度挑戦してみましょう！';
            }
            
            resultText.textContent = message;
            resultContainer.classList.remove('hidden');
            
            // クイズをリセットするオプション
            setTimeout(() => {
                currentQuestionIndex = 0;
                score = 0;
                showQuestion(0);
                nextButton.disabled = false;
                nextButton.textContent = '次の質問';
            }, 5000);
        }
    });
    
    // 質問を表示する関数
    function showQuestion(index) {
        const question = questions[index];
        questionText.textContent = question.question;
        
        // 選択肢をクリアして新しい選択肢を表示
        optionsContainer.innerHTML = '';
        
        // 現在の質問番号を更新
        currentQuestionElement.textContent = index + 1;
        
        // 選択肢を追加
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            
            // 選択肢クリック時の処理
            optionElement.addEventListener('click', function() {
                // 他の選択肢の選択状態をクリア
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected', 'correct', 'incorrect');
                });
                
                // 選択した選択肢をハイライト
                optionElement.classList.add('selected');
                
                // 正誤判定
                if (i === question.answer) {
                    optionElement.classList.add('correct');
                    resultText.textContent = '正解！';
                    resultContainer.className = 'correct';
                    score++;
                } else {
                    optionElement.classList.add('incorrect');
                    // 正解を表示
                    document.querySelectorAll('.option')[question.answer].classList.add('correct');
                    resultText.textContent = '不正解...';
                    resultContainer.className = 'incorrect';
                }
                
                // 説明を表示
                correctAnswerText.textContent = question.explanation;
                resultContainer.classList.remove('hidden');
                
                // すべての選択肢をクリック不可に
                document.querySelectorAll('.option').forEach(opt => {
                    opt.style.pointerEvents = 'none';
                });
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        // 選択肢を再びクリック可能に
        document.querySelectorAll('.option').forEach(opt => {
            opt.style.pointerEvents = 'auto';
        });
    }
}