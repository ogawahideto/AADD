// ページ読み込み後に実行
document.addEventListener('DOMContentLoaded', function() {
    // タイムラインを初期化
    initTimeline();
    
    // クイズを初期化
    initQuiz();
});

// タイムラインのデータ
const timelineData = [
    {
        date: '1956年11月',
        title: '第1次南極観測隊',
        content: '樺太犬（カラフト犬）15頭が南極へ。タロとジロも含まれていた。南極での犬ぞりの移動や物資輸送に欠かせない存在だった。'
    },
    {
        date: '1958年2月',
        title: '緊急撤退',
        content: '悪天候により観測隊は基地から緊急撤退することに。輸送能力の限界から、犬たちを連れ帰ることができず、鎖に繋いだまま置き去りにせざるを得なかった。'
    },
    {
        date: '1958年2月〜1959年1月',
        title: '極限の中での生存',
        content: 'タロとジロはどうにか鎖を外し、マイナス30度の極寒と暗黒の冬を生き延びた。他の犬たちは生存できなかった。'
    },
    {
        date: '1959年1月14日',
        title: '奇跡の再会',
        content: '第2次南極観測隊が基地に戻ると、タロとジロが生きて迎えてくれた。世界的な驚きとなり、「南極の奇跡」と呼ばれた。'
    },
    {
        date: '1959年5月',
        title: '英雄の帰国',
        content: 'タロとジロは日本へ帰国。国民的英雄として大歓迎を受けた。不可能を可能にした生命の強さの象徴となった。'
    }
];

// タイムラインの初期化
function initTimeline() {
    const timelineContainer = document.getElementById('timeline');
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const timelineContent = document.createElement('div');
        timelineContent.className = 'timeline-content';
        
        const title = document.createElement('h3');
        title.textContent = item.title;
        
        const content = document.createElement('p');
        content.textContent = item.content;
        
        const date = document.createElement('div');
        date.className = 'timeline-date';
        date.textContent = item.date;
        
        timelineContent.appendChild(title);
        timelineContent.appendChild(content);
        timelineItem.appendChild(timelineContent);
        timelineItem.appendChild(date);
        
        // アニメーション用の遅延を設定
        timelineItem.style.opacity = '0';
        timelineItem.style.transform = 'translateY(20px)';
        timelineItem.style.transition = `all 0.5s ease ${index * 0.2}s`;
        
        timelineContainer.appendChild(timelineItem);
    });
    
    // スクロール時のアニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// クイズのデータ
const quizData = [
    {
        question: 'あなたは南極で鎖から解放されました。最初にすべきことは？',
        options: [
            '他の犬たちも助ける',
            'シェルター（避難所）を探す',
            '食料を探す',
            '人間が戻るのを待つ'
        ],
        correct: 1,
        feedback: {
            correct: '正解！タロとジロは基地の建物の下を掘って避難所にしていたと考えられています。極寒の南極で最初に必要なのは風や寒さをしのげる場所です。',
            incorrect: '南極の厳しい環境では、まず風や寒さをしのげる場所が必要です。タロとジロは基地の建物の下を掘って避難所にしていたと考えられています。'
        }
    },
    {
        question: '極寒の南極で食料を得るには？',
        options: [
            '残された食料を探す',
            'アザラシや海鳥を狩る',
            '魚を捕まえる',
            'すべて正解'
        ],
        correct: 3,
        feedback: {
            correct: '正解！タロとジロは複数の食料源を利用したと考えられています。残された食料、狩り、魚など、あらゆる手段で栄養を得ていました。',
            incorrect: '実際には、タロとジロはすべての方法を使って食料を得ていたと考えられています。残された食料だけでなく、アザラシや海鳥の狩り、魚なども利用したでしょう。'
        }
    },
    {
        question: '南極の冬の暗黒期（太陽が昇らない期間）は約どのくらい？',
        options: [
            '1か月',
            '2〜3か月',
            '半年近く',
            '1年中'
        ],
        correct: 2,
        feedback: {
            correct: '正解！南極の冬には太陽が地平線上に昇らない「極夜」の期間が半年近く続きます。タロとジロはこの暗黒期も乗り越えました。',
            incorrect: '南極の冬には太陽が地平線上に昇らない「極夜」の期間が半年近く続きます。タロとジロはこの暗闇の中でも生き抜きました。'
        }
    }
];

// クイズの初期化
function initQuiz() {
    let currentQuestion = 0;
    const quizContainer = document.getElementById('survival-quiz');
    
    function renderQuestion() {
        const question = quizData[currentQuestion];
        
        quizContainer.innerHTML = `
            <div class="quiz-question">${question.question}</div>
            <div class="quiz-options">
                ${question.options.map((option, index) => 
                    `<div class="quiz-option" data-index="${index}">${option}</div>`
                ).join('')}
            </div>
            <div class="quiz-feedback"></div>
            <div class="quiz-navigation">
                <button class="quiz-button prev" ${currentQuestion === 0 ? 'disabled' : ''}>前の質問</button>
                <button class="quiz-button next" disabled>次の質問</button>
            </div>
        `;
        
        // オプション選択のイベントリスナー
        const options = quizContainer.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                const selectedIndex = parseInt(this.dataset.index);
                
                // 選択済みのスタイルをクリア
                options.forEach(opt => opt.classList.remove('selected'));
                
                // 選択したオプションにスタイルを適用
                this.classList.add('selected');
                
                // フィードバックを表示
                const feedbackEl = quizContainer.querySelector('.quiz-feedback');
                feedbackEl.innerHTML = selectedIndex === question.correct ? 
                    question.feedback.correct : 
                    question.feedback.incorrect;
                
                feedbackEl.className = `quiz-feedback ${selectedIndex === question.correct ? 'correct' : 'incorrect'}`;
                feedbackEl.style.opacity = 1;
                
                // 「次へ」ボタンを有効化
                quizContainer.querySelector('.quiz-button.next').disabled = false;
            });
        });
        
        // ナビゲーションボタンのイベントリスナー
        quizContainer.querySelector('.quiz-button.prev').addEventListener('click', function() {
            if (currentQuestion > 0) {
                currentQuestion--;
                renderQuestion();
            }
        });
        
        quizContainer.querySelector('.quiz-button.next').addEventListener('click', function() {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                renderQuestion();
            } else {
                // クイズ終了時のメッセージ
                quizContainer.innerHTML = `
                    <div class="quiz-question">生存テスト完了！</div>
                    <p>タロとジロが示したように、極限状況では知恵と適応力が生死を分けます。</p>
                    <p>彼らの生存は単なる奇跡ではなく、カラフト犬の驚異的な適応能力と生命力の証明でした。</p>
                    <div class="quiz-navigation">
                        <button class="quiz-button restart">もう一度チャレンジ</button>
                    </div>
                `;
                
                quizContainer.querySelector('.quiz-button.restart').addEventListener('click', function() {
                    currentQuestion = 0;
                    renderQuestion();
                });
            }
        });
    }
    
    // 最初の質問を表示
    renderQuestion();
}