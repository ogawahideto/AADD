// DOM要素の取得
document.addEventListener('DOMContentLoaded', function() {
    // タイムライン機能
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // 現在アクティブなアイテムからアクティブクラスを削除
            timelineItems.forEach(i => {
                i.classList.remove('active');
            });
            
            // クリックしたアイテムにアクティブクラスを追加
            this.classList.add('active');
        });
    });

    // クイズ機能
    const questionText = document.getElementById('question-text');
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');
    const option3 = document.getElementById('option3');
    const nextButton = document.getElementById('next-btn');
    const result = document.getElementById('result');
    
    // クイズの質問と回答
    const questions = [
        {
            question: 'たま駅長が就任した日はいつ？',
            options: ['2007年1月5日', '2006年12月25日', '2007年4月1日'],
            correct: 0, // 正解は最初のオプション
            explanation: '正解です！2007年1月5日、たまは和歌山電鐵貴志駅の名誉駅長に就任しました。'
        },
        {
            question: 'たま駅長の給料は何だった？',
            options: ['月給10万円', '猫缶一年分', 'マグロ刺身一生分'],
            correct: 1,
            explanation: '正解です！たま駅長の給料は猫缶一年分でした。現物支給だったんですね。'
        },
        {
            question: 'たま駅長によってもたらされた経済効果は推定いくらだった？',
            options: ['約1億円', '約5億円', '約11億円'],
            correct: 2,
            explanation: '正解です！たま駅長の経済効果は推定で年間約11億円と言われています。一匹の猫が生み出した驚異的な数字です。'
        },
        {
            question: '二代目駅長「ニタマ」の名前の由来は？',
            options: ['「に」は「二代目」、「たま」は初代から', '貴志「に」いる「たま」から', '「似た」猫という意味から'],
            correct: 0,
            explanation: '正解です！ニタマは「二代目のたま」という意味で名付けられました。たまの意志を継ぐ大切な役割を担っています。'
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    let answered = false;
    
    // クイズを表示する関数
    function showQuestion() {
        const question = questions[currentQuestion];
        questionText.textContent = question.question;
        option1.textContent = question.options[0];
        option2.textContent = question.options[1];
        option3.textContent = question.options[2];
        
        // クラスとスタイルをリセット
        resetOptions();
        
        result.style.display = 'none';
        nextButton.disabled = true;
        answered = false;
    }
    
    // オプションのクラスとスタイルをリセット
    function resetOptions() {
        [option1, option2, option3].forEach(opt => {
            opt.classList.remove('correct', 'incorrect');
        });
    }
    
    // 回答をチェックする関数
    function checkAnswer(selectedOption, optionIndex) {
        if (answered) return;
        
        const question = questions[currentQuestion];
        answered = true;
        
        if (optionIndex === question.correct) {
            // 正解の場合
            selectedOption.classList.add('correct');
            result.textContent = question.explanation;
            result.style.backgroundColor = '#4CAF50';
            score++;
        } else {
            // 不正解の場合
            selectedOption.classList.add('incorrect');
            const correctOption = [option1, option2, option3][question.correct];
            correctOption.classList.add('correct');
            result.textContent = `残念！正解は「${question.options[question.correct]}」です。${question.explanation.split('！')[1] || ''}`;
            result.style.backgroundColor = '#F44336';
        }
        
        result.style.display = 'block';
        nextButton.disabled = false;
    }
    
    // 次の質問に進む関数
    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            // クイズ終了
            questionText.textContent = `クイズ終了！あなたのスコア: ${score}/${questions.length}`;
            option1.style.display = 'none';
            option2.style.display = 'none';
            option3.style.display = 'none';
            result.textContent = score === questions.length ? 
                'すべて正解！あなたはたま駅長マスターです！' : 
                `${score}問正解しました。たま駅長についてもっと知りたくなりましたか？`;
            result.style.backgroundColor = '#2196F3';
            result.style.display = 'block';
            nextButton.textContent = 'もう一度挑戦';
            nextButton.disabled = false;
            
            // リセット用
            nextButton.onclick = function() {
                currentQuestion = 0;
                score = 0;
                option1.style.display = 'block';
                option2.style.display = 'block';
                option3.style.display = 'block';
                nextButton.textContent = '次の質問';
                nextButton.onclick = nextQuestion;
                showQuestion();
            };
            return;
        }
    }
    
    // イベントリスナーの設定
    option1.addEventListener('click', function() {
        checkAnswer(this, 0);
    });
    
    option2.addEventListener('click', function() {
        checkAnswer(this, 1);
    });
    
    option3.addEventListener('click', function() {
        checkAnswer(this, 2);
    });
    
    nextButton.addEventListener('click', nextQuestion);
    
    // 最初の質問を表示
    showQuestion();
    
    // 最初のタイムラインアイテムをアクティブに
    if (timelineItems.length > 0) {
        timelineItems[0].classList.add('active');
    }
});