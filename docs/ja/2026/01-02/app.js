// タイムラインのイベントデータ
const timelineEvents = [
    {
        year: "1904",
        title: "日本初の新聞写真",
        description: "報知新聞に川上貞奴の写真が掲載され、日本の新聞史上初めての写真掲載となりました。当時の技術的制約の中で実現した革命的出来事でした。"
    },
    {
        year: "1905",
        title: "日露戦争と戦場写真",
        description: "日露戦争の報道で、戦場写真が新聞に掲載され始めます。遠い戦場の様子を視覚的に伝えることで、国民の戦争への理解と関心が深まりました。"
    },
    {
        year: "1920年代",
        title: "写真週刊誌の誕生",
        description: "「アサヒグラフ」など、写真を中心とした雑誌が人気を集めます。記事よりも写真で語る新しいメディアの形が確立しました。"
    },
    {
        year: "1930年代",
        title: "報道写真の黄金期",
        description: "土門拳、木村伊兵衛などの写真家が活躍。写真は単なる記録から「表現」へと進化し、社会や政治を批評する力を持ちました。"
    },
    {
        year: "1953",
        title: "テレビ放送開始",
        description: "NHKが日本初のテレビ放送を開始。動く画像という新たなビジュアルメディアの時代が始まりました。"
    },
    {
        year: "1990年代",
        title: "デジタル写真の時代へ",
        description: "デジタルカメラの普及で、写真撮影と共有が民主化。新聞社や専門家だけでなく、一般市民も視覚情報の発信者になりました。"
    },
    {
        year: "2000年代",
        title: "携帯カメラとSNSの融合",
        description: "携帯電話のカメラ機能とSNSの普及により、「いつでも、どこでも、誰でも」写真を撮影・共有できる時代に。"
    },
    {
        year: "現在",
        title: "AIと写真の新時代",
        description: "AIによる画像生成技術が発展し、「撮影」という概念を超えた視覚表現が可能に。川上貞奴の時代から続く「見ることの革命」は新たな段階へ。"
    }
];

// クイズの質問データ
const quizQuestions = [
    {
        question: "1904年の新聞写真掲載と現代のSNS画像共有には、どのような共通点があるでしょうか？",
        options: [
            "どちらも情報の民主化に貢献した",
            "どちらも技術革新によって可能になった",
            "どちらも視覚による情報伝達の変革をもたらした",
            "上記すべて"
        ],
        correctAnswer: 3,
        feedback: "正解です！どちらも技術革新によって実現し、情報の民主化を促進し、視覚による情報伝達の方法を根本的に変えました。"
    },
    {
        question: "現代の「画像過多社会」について、どのような問題が考えられますか？",
        options: [
            "真実と虚偽の区別が難しくなっている",
            "視覚情報への依存度が高まりすぎている",
            "価値ある画像と無価値な画像の選別が困難",
            "以上のすべて"
        ],
        correctAnswer: 3,
        feedback: "その通りです。情報過多の現代社会では、真偽の判断、依存症問題、価値ある情報の選別など、様々な課題が生まれています。"
    },
    {
        question: "もし川上貞奴が現代に生きていたら、どのような影響力を持っていたと思いますか？",
        options: [
            "世界的なインフルエンサーとして活躍していた",
            "伝統と革新を融合する芸術家として注目されていた",
            "女性の社会進出を促進する活動家になっていた",
            "正解はありません（個人の考えを選んでください）"
        ],
        correctAnswer: 3,
        feedback: "興味深い視点をありがとうございます。川上貞奴は時代の最先端を走り続けた革新者でした。現代ならではの方法で社会に影響を与えていたでしょう。"
    }
];

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
    // タイムラインの初期化
    initTimeline();
    
    // クイズの初期化
    initQuiz();
});

// タイムラインの初期化と制御
function initTimeline() {
    let currentEventIndex = 0;
    const prevButton = document.getElementById('prev-event');
    const nextButton = document.getElementById('next-event');
    const timelineMarker = document.getElementById('timeline-marker');
    
    // イベント表示を更新する関数
    function updateEventDisplay() {
        const event = timelineEvents[currentEventIndex];
        document.querySelector('.event-year').textContent = event.year;
        document.querySelector('.event-title').textContent = event.title;
        document.querySelector('.event-description').textContent = event.description;
        
        // マーカーの位置を更新（パーセンテージで計算）
        const percentage = (currentEventIndex / (timelineEvents.length - 1)) * 100;
        timelineMarker.style.left = `${percentage}%`;
        
        // ボタンの有効/無効状態を更新
        prevButton.disabled = currentEventIndex === 0;
        nextButton.disabled = currentEventIndex === timelineEvents.length - 1;
        
        // 無効なボタンのスタイルを調整
        prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
    }
    
    // 初期表示
    updateEventDisplay();
    
    // ボタンイベントの設定
    prevButton.addEventListener('click', () => {
        if (currentEventIndex > 0) {
            currentEventIndex--;
            updateEventDisplay();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentEventIndex < timelineEvents.length - 1) {
            currentEventIndex++;
            updateEventDisplay();
        }
    });
}

// クイズの初期化と制御
function initQuiz() {
    let currentQuestionIndex = 0;
    let score = 0;
    
    const questionContainer = document.getElementById('question-container');
    const questionText = questionContainer.querySelector('.question-text');
    const optionsContainer = questionContainer.querySelector('.options-container');
    const feedback = questionContainer.querySelector('.feedback');
    const nextButton = questionContainer.querySelector('.next-btn');
    const quizResults = document.querySelector('.quiz-results');
    const resultsMessage = quizResults.querySelector('.results-message');
    const restartButton = quizResults.querySelector('.restart-btn');
    
    // 質問を表示する関数
    function showQuestion() {
        const question = quizQuestions[currentQuestionIndex];
        questionText.textContent = question.question;
        
        // 選択肢をクリア
        optionsContainer.innerHTML = '';
        
        // 選択肢を追加
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            optionElement.addEventListener('click', selectOption);
            optionsContainer.appendChild(optionElement);
        });
        
        // フィードバックをリセット
        feedback.style.display = 'none';
        feedback.textContent = '';
        feedback.className = 'feedback';
        
        // 次へボタンを非表示
        nextButton.style.display = 'none';
    }
    
    // 選択肢を選んだときの処理
    function selectOption(e) {
        // すでに選択済みの場合は何もしない
        if (feedback.style.display === 'block') return;
        
        const selectedIndex = parseInt(e.target.dataset.index);
        const question = quizQuestions[currentQuestionIndex];
        
        // すべての選択肢から選択状態を解除
        optionsContainer.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // 選択した選択肢にクラスを追加
        e.target.classList.add('selected');
        
        // フィードバックを表示
        feedback.style.display = 'block';
        feedback.textContent = question.feedback;
        
        // 最後の質問は自由回答なので必ず「正解」とする
        if (currentQuestionIndex === quizQuestions.length - 1) {
            feedback.classList.add('correct');
            score++;
        } else {
            // それ以外の質問は正誤判定
            if (selectedIndex === question.correctAnswer) {
                feedback.classList.add('correct');
                score++;
            } else {
                feedback.classList.add('incorrect');
            }
        }
        
        // 次へボタンを表示
        nextButton.style.display = 'block';
    }
    
    // 次の質問へ進む
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            // 次の質問を表示
            showQuestion();
        } else {
            // クイズ終了、結果表示
            questionContainer.style.display = 'none';
            quizResults.style.display = 'block';
            
            // 結果メッセージを設定
            resultsMessage.textContent = `あなたの考察は興味深いものでした。このクイズは正解・不正解を競うものではなく、写真と情報の関係について考えるきっかけとなれば幸いです。`;
        }
    });
    
    // クイズを再開
    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        quizResults.style.display = 'none';
        questionContainer.style.display = 'block';
        showQuestion();
    });
    
    // 初期表示
    showQuestion();
}