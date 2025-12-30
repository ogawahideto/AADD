// タイムラインのインタラクション
document.addEventListener('DOMContentLoaded', function() {
    // タイムライン機能
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineDetails = document.querySelectorAll('.timeline-detail');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // アクティブクラスをすべて削除
            timelineItems.forEach(i => i.classList.remove('active'));
            timelineDetails.forEach(d => d.classList.remove('active'));
            
            // クリックされた項目をアクティブに
            this.classList.add('active');
            
            // 対応するコンテンツを表示
            const year = this.getAttribute('data-year');
            document.getElementById(`content-${year}`).classList.add('active');
        });
    });
    
    // クイズ機能
    const questions = [
        {
            question: "日本初の地下鉄が開業したのは何年？",
            options: ["1920年", "1927年", "1934年", "1945年"],
            correctIndex: 1,
            explanation: "正解は1927年12月30日です。浅草駅から上野駅までの区間が開業しました。"
        },
        {
            question: "日本初の地下鉄の区間距離はどれくらい？",
            options: ["1.0km", "2.2km", "5.0km", "10.5km"],
            correctIndex: 1,
            explanation: "正解は2.2kmです。浅草駅から上野駅までのわずかな距離でした。"
        },
        {
            question: "開業当時の地下鉄駅の数は？",
            options: ["3駅", "5駅", "7駅", "9駅"],
            correctIndex: 1,
            explanation: "正解は5駅です。浅草、田原町、稲荷町、上野、南千住の5駅でした。"
        },
        {
            question: "現在、この路線は何という名前？",
            options: ["丸ノ内線", "銀座線", "日比谷線", "東西線"],
            correctIndex: 1,
            explanation: "正解は銀座線です。1927年に開業した東京地下鉄道は現在の東京メトロ銀座線の一部となっています。"
        }
    ];
    
    let currentQuestionIndex = 0;
    let score = 0;
    
    // クイズ要素の取得
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const correctAnswer = document.getElementById('correct-answer');
    const nextButton = document.getElementById('next-btn');
    const finalResults = document.getElementById('final-results');
    const scoreMessage = document.getElementById('score-message');
    const restartButton = document.getElementById('restart-btn');
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');
    
    // クイズを開始
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        showQuestion(questions[currentQuestionIndex]);
        finalResults.classList.add('hidden');
        updateProgress();
    }
    
    // 問題を表示
    function showQuestion(question) {
        questionElement.textContent = question.question;
        optionsContainer.innerHTML = '';
        resultContainer.classList.add('hidden');
        
        question.options.forEach((option, index) => {
            const button = document.createElement('div');
            button.classList.add('option');
            button.textContent = option;
            button.dataset.index = index;
            button.addEventListener('click', selectAnswer);
            optionsContainer.appendChild(button);
        });
    }
    
    // 回答を選択
    function selectAnswer(e) {
        const selectedIndex = parseInt(e.target.dataset.index);
        const currentQuestion = questions[currentQuestionIndex];
        
        // すべての選択肢のクリックイベントを無効化
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.removeEventListener('click', selectAnswer);
            option.style.cursor = 'default';
        });
        
        // 正解・不正解のスタイリング
        if (selectedIndex === currentQuestion.correctIndex) {
            e.target.classList.add('correct');
            resultMessage.textContent = "正解！";
            score++;
        } else {
            e.target.classList.add('incorrect');
            options[currentQuestion.correctIndex].classList.add('correct');
            resultMessage.textContent = "不正解...";
        }
        
        correctAnswer.textContent = currentQuestion.explanation;
        resultContainer.classList.remove('hidden');
    }
    
    // 次の問題へ
    function nextQuestion() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
            updateProgress();
        } else {
            showFinalResults();
        }
    }
    
    // 最終結果を表示
    function showFinalResults() {
        document.getElementById('question-container').classList.add('hidden');
        resultContainer.classList.add('hidden');
        finalResults.classList.remove('hidden');
        
        // スコアに応じたメッセージ
        if (score === questions.length) {
            scoreMessage.textContent = `満点！ ${questions.length}問中${score}問正解です！あなたは地下鉄マスターです！`;
        } else if (score >= questions.length * 0.7) {
            scoreMessage.textContent = `素晴らしい！ ${questions.length}問中${score}問正解です。地下鉄についての知識が豊富ですね！`;
        } else if (score >= questions.length * 0.5) {
            scoreMessage.textContent = `良い成績です。${questions.length}問中${score}問正解しました。`;
        } else {
            scoreMessage.textContent = `${questions.length}問中${score}問正解しました。もう一度挑戦してみませんか？`;
        }
    }
    
    // プログレスバーを更新
    function updateProgress() {
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `問題 ${currentQuestionIndex + 1}/${questions.length}`;
    }
    
    // イベントリスナー
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', function() {
        document.getElementById('question-container').classList.remove('hidden');
        startQuiz();
    });
    
    // クイズ初期化
    startQuiz();
});