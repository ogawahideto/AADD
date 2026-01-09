// タイムラインのデータ
const timelineData = [
    {
        year: '1909年',
        title: '国技館の始まり',
        description: '日本初の国技館が両国・横網町に開設。日本の国技である相撲の専用施設として注目を集めた。',
        icon: '🏠'
    },
    {
        year: '1945年',
        title: '戦災による損傷',
        description: '第二次世界大戦の東京大空襲で国技館が焼失。多くの文化財や記録も失われた。',
        icon: '🔥'
    },
    {
        year: '1954年',
        title: '旧国技館の完成',
        description: 'GHQからの資金援助も受け、旧国技館が再建。収容人数約5,500人の木造中心の施設に。',
        icon: '🏛️'
    },
    {
        year: '1984年',
        title: '旧国技館のラスト本場所',
        description: '昭和59年11月場所が旧国技館での最後の本場所に。多くの関取や相撲ファンが別れを惜しんだ。',
        icon: '👋'
    },
    {
        year: '1985年1月9日',
        title: '新国技館落成',
        description: '総工費約180億円をかけて、地下2階、地上6階建ての新国技館が完成。収容人数は約11,000人と大幅に拡大。現代的な施設設備と伝統的な様式を融合した画期的な建築として注目を集めた。',
        icon: '🎉'
    },
    {
        year: '1985年1月場所',
        title: '新国技館初の本場所',
        description: '新国技館での初めての本場所が開催。北の湖が優勝し、新時代の幕開けを飾った。多くのファンが新しい施設を体験しようと訪れた。',
        icon: '🏆'
    },
    {
        year: '1990年代',
        title: '曙の活躍と相撲人気の高まり',
        description: '1993年に曙が外国人力士として初めて横綱に昇進。新国技館は常に満員御礼の盛況を迎えた。',
        icon: '👑'
    },
    {
        year: '2011年',
        title: '八百長問題と春場所中止',
        description: '八百長問題により、戦後初めて本場所（春場所）が中止に。相撲界全体の信頼回復が課題となった。',
        icon: '⚠️'
    },
    {
        year: '2013年',
        title: '両国国技館改修工事',
        description: '開館から28年を経て大規模な改修工事を実施。空調設備の刷新や座席の改良などが行われた。',
        icon: '🔧'
    },
    {
        year: '2019年',
        title: '令和初の本場所',
        description: '令和元年5月場所が新国技館で開催。新時代の相撲の第一歩が刻まれた。',
        icon: '📅'
    },
    {
        year: '2020年',
        title: 'コロナ禍の無観客開催',
        description: 'COVID-19の影響により、史上初めて無観客での本場所が開催。テレビ中継のみという異例の状況に。',
        icon: '😷'
    },
    {
        year: '2026年（予定）',
        title: '新国技館落成から41周年',
        description: '昭和、平成、令和と三つの時代を見守ってきた相撲の聖地が、さらなる歴史を刻む。',
        icon: '🎂'
    }
];

// クイズのデータ
const quizData = [
    {
        question: '新国技館が落成したのは何年？',
        options: ['1980年', '1985年', '1990年', '1995年'],
        answer: 1
    },
    {
        question: '新国技館の最大収容人数は約何人？',
        options: ['5,500人', '8,000人', '11,000人', '15,000人'],
        answer: 2
    },
    {
        question: '新国技館落成時の総工費はいくら？',
        options: ['約80億円', '約120億円', '約150億円', '約180億円'],
        answer: 3
    },
    {
        question: '新国技館での初めての本場所で優勝したのは誰？',
        options: ['千代の富士', '北の湖', '大乃国', '旭富士'],
        answer: 1
    }
];

// DOMが完全に読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // タイムラインの初期化
    initTimeline();
    
    // クイズの初期化
    initQuiz();
});

// タイムラインの初期化と表示
function initTimeline() {
    const timelineElement = document.getElementById('timeline');
    
    // タイムラインアイテムを生成して追加
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        if (item.year === '1985年1月9日') {
            timelineItem.classList.add('active');
        }
        
        timelineItem.innerHTML = `
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-content">
                <p>${item.description}</p>
                <div class="timeline-image">
                    <div class="timeline-image-placeholder">${item.icon}</div>
                </div>
            </div>
        `;
        
        timelineItem.addEventListener('click', () => {
            // 現在アクティブなアイテムを非アクティブにする
            const currentActive = document.querySelector('.timeline-item.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            
            // クリックされたアイテムをアクティブにする
            timelineItem.classList.add('active');
        });
        
        timelineElement.appendChild(timelineItem);
    });
}

// クイズの初期化と表示
function initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    let currentQuestion = 0;
    let score = 0;
    let answered = false;
    
    // クイズを表示する関数
    function showQuestion() {
        const question = quizData[currentQuestion];
        
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <h4>問題 ${currentQuestion + 1}/${quizData.length}</h4>
                <p>${question.question}</p>
            </div>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" data-index="${index}">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <div class="quiz-feedback"></div>
        `;
        
        // 選択肢のクリックイベント
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                if (answered) return;
                
                const selectedIndex = parseInt(this.dataset.index);
                answered = true;
                
                // 選択された選択肢をマーク
                this.classList.add('selected');
                
                // 正解・不正解の判定
                const feedback = document.querySelector('.quiz-feedback');
                if (selectedIndex === question.answer) {
                    this.classList.add('correct');
                    feedback.textContent = '正解！';
                    score++;
                } else {
                    this.classList.add('incorrect');
                    options[question.answer].classList.add('correct');
                    feedback.textContent = `不正解。正解は「${question.options[question.answer]}」です。`;
                }
                
                // 次の質問ボタンを表示
                const nextButton = document.createElement('button');
                nextButton.className = 'quiz-next';
                nextButton.textContent = currentQuestion < quizData.length - 1 ? '次の問題へ' : '結果を見る';
                nextButton.addEventListener('click', () => {
                    currentQuestion++;
                    answered = false;
                    
                    if (currentQuestion < quizData.length) {
                        showQuestion();
                    } else {
                        showResult();
                    }
                });
                
                quizContainer.appendChild(nextButton);
            });
        });
    }
    
    // 結果を表示する関数
    function showResult() {
        quizContainer.innerHTML = `
            <div class="quiz-result">
                <h4>クイズ結果</h4>
                <div class="quiz-score">${score}/${quizData.length} 正解</div>
                <p>${getScoreMessage(score)}</p>
                <button class="quiz-restart">もう一度挑戦する</button>
            </div>
        `;
        
        // リスタートボタンのイベント
        document.querySelector('.quiz-restart').addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            answered = false;
            showQuestion();
        });
    }
    
    // スコアに応じたメッセージを取得
    function getScoreMessage(score) {
        if (score === quizData.length) {
            return '満点！あなたは新国技館マスターです！';
        } else if (score >= quizData.length * 0.7) {
            return 'よく知っていますね！相撲通ですか？';
        } else if (score >= quizData.length * 0.5) {
            return 'なかなかの知識です！もう少しで相撲通に！';
        } else {
            return 'もっと新国技館について学んでみましょう！';
        }
    }
    
    // 最初の質問を表示
    showQuestion();
}