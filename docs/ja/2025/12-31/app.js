// タイムラインとクイズを管理する
document.addEventListener('DOMContentLoaded', function() {
    // タイムラインデータ
    const timelineEvents = [
        {
            year: "2003年",
            title: "研究開始",
            description: "理化学研究所の森田浩介博士らのチームが新元素の合成実験を開始"
        },
        {
            year: "2004年7月",
            title: "最初の合成成功",
            description: "113番元素の最初の観測に成功。しかし、完全な崩壊連鎖の観測には至らず"
        },
        {
            year: "2005年4月",
            title: "2回目の観測",
            description: "2回目の113番元素の合成に成功。信頼性の高いデータを取得"
        },
        {
            year: "2012年8月",
            title: "決定的な証拠",
            description: "3回目の合成で、崩壊連鎖を既知の元素まで完全に追跡することに成功"
        },
        {
            year: "2015年12月",
            title: "IUPAC公式認定",
            description: "国際純正・応用化学連合が日本の研究チームを113番元素の正式な発見者として認定"
        },
        {
            year: "2016年11月",
            title: "ニホニウムと命名",
            description: "発見チームが「ニホニウム（Nihonium）」と命名し、IUPACが正式承認"
        },
        {
            year: "2025年",
            title: "発見から10年",
            description: "113番元素ニホニウム発見から10周年を迎える"
        }
    ];

    // タイムライン生成
    generateTimeline();

    // クイズデータ
    const quizQuestions = [
        {
            question: "ニホニウムの元素記号は何ですか？",
            options: ["Ni", "Jp", "Nh", "Nn"],
            answer: 2, // 0-indexed
            explanation: "ニホニウムの元素記号は「Nh」です。これは英語での日本（Nihon）に由来しています。"
        },
        {
            question: "113番元素の発見が正式に認められたのはいつですか？",
            options: ["2004年", "2012年", "2015年", "2016年"],
            answer: 2,
            explanation: "2015年12月31日にIUPACが理化学研究所チームを正式な発見者として認定しました。"
        },
        {
            question: "理研チームはどのような方法で113番元素を合成しましたか？",
            options: [
                "金の原子にネオンを衝突させた",
                "ウランの原子に炭素を衝突させた",
                "ビスマスの原子に亜鉛を衝突させた",
                "プルトニウムの原子にカルシウムを衝突させた"
            ],
            answer: 2,
            explanation: "理研チームはビスマス（Bi）の標的に亜鉛（Zn）イオンビームを衝突させる「コールドフュージョン法」を用いました。"
        },
        {
            question: "ニホニウムの発見の何がとくに歴史的だったのですか？",
            options: [
                "初めて日本人が元素を発見した",
                "アジア初の新元素発見だった",
                "史上最も安定した人工元素だった",
                "周期表の最後の元素となった"
            ],
            answer: 1,
            explanation: "ニホニウムの発見はアジアで初めての新元素発見という歴史的偉業でした。それまで新元素の発見・命名はロシア、アメリカ、ドイツなど欧米諸国に限られていました。"
        }
    ];

    // クイズ初期化
    initQuiz(quizQuestions);

    // タイムライン生成関数
    function generateTimeline() {
        const timeline = document.getElementById('timeline');
        const timelineContent = document.getElementById('timeline-content');
        
        // タイムラインのマーカーを生成
        timelineEvents.forEach((event, index) => {
            const marker = document.createElement('div');
            marker.classList.add('timeline-marker');
            marker.style.position = 'absolute';
            marker.style.top = '-7px';
            marker.style.left = `${(index / (timelineEvents.length - 1)) * 100}%`;
            marker.style.width = '15px';
            marker.style.height = '15px';
            marker.style.backgroundColor = 'var(--timeline-color)';
            marker.style.borderRadius = '50%';
            marker.style.cursor = 'pointer';
            marker.dataset.index = index;
            
            marker.addEventListener('click', () => {
                showTimelineEvent(index);
                
                // すべてのマーカーから選択状態を削除
                document.querySelectorAll('.timeline-marker').forEach(m => {
                    m.style.backgroundColor = 'var(--timeline-color)';
                    m.style.transform = 'scale(1)';
                });
                
                // クリックされたマーカーをハイライト
                marker.style.backgroundColor = 'var(--nihonium-color)';
                marker.style.transform = 'scale(1.5)';
            });
            
            timeline.appendChild(marker);
        });
        
        // 最初のイベントを表示
        showTimelineEvent(0);
        // 最初のマーカーをハイライト
        const firstMarker = document.querySelector('.timeline-marker');
        firstMarker.style.backgroundColor = 'var(--nihonium-color)';
        firstMarker.style.transform = 'scale(1.5)';
    }
    
    // タイムラインイベント表示関数
    function showTimelineEvent(index) {
        const timelineContent = document.getElementById('timeline-content');
        const event = timelineEvents[index];
        
        // 新しいコンテンツを作成
        timelineContent.innerHTML = `
            <h3>${event.year}: ${event.title}</h3>
            <p>${event.description}</p>
        `;
        
        // フェードインアニメーション
        timelineContent.style.opacity = 0;
        setTimeout(() => {
            timelineContent.style.opacity = 1;
            timelineContent.style.transition = 'opacity 0.5s ease';
        }, 50);
    }

    // クイズ初期化関数
    function initQuiz(questions) {
        let currentQuestionIndex = 0;
        let score = 0;
        let answered = false;
        
        const questionContainer = document.getElementById('question-container');
        const optionsContainer = document.getElementById('options-container');
        const resultContainer = document.getElementById('result-container');
        const nextButton = document.getElementById('next-button');
        const progressText = document.getElementById('progress-text');
        const progress = document.getElementById('progress');
        
        // 初期状態
        nextButton.disabled = true;
        
        // 最初の問題を表示
        showQuestion(currentQuestionIndex);
        
        // 次の問題ボタンイベント
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            
            if (currentQuestionIndex < questions.length) {
                showQuestion(currentQuestionIndex);
                nextButton.disabled = true;
                answered = false;
            } else {
                // クイズ終了、結果表示
                showFinalResult();
            }
        });
        
        // 問題表示関数
        function showQuestion(index) {
            const question = questions[index];
            questionContainer.textContent = question.question;
            optionsContainer.innerHTML = '';
            resultContainer.innerHTML = '';
            
            // 選択肢生成
            question.options.forEach((option, i) => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                optionElement.textContent = option;
                optionElement.dataset.index = i;
                
                optionElement.addEventListener('click', () => {
                    if (answered) return; // すでに回答済みなら何もしない
                    
                    answered = true;
                    selectOption(optionElement, i, question.answer, question.explanation);
                });
                
                optionsContainer.appendChild(optionElement);
            });
            
            // 進捗表示を更新
            updateProgress(index);
        }
        
        // 選択肢選択処理
        function selectOption(optionElement, selectedIndex, correctIndex, explanation) {
            const options = document.querySelectorAll('.option');
            
            // すべての選択肢からselectedクラスを削除
            options.forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // 選択された選択肢を強調表示
            optionElement.classList.add('selected');
            
            // 正解/不正解の処理
            if (selectedIndex === correctIndex) {
                optionElement.classList.add('correct');
                resultContainer.innerHTML = `<p class="correct-message">正解！</p><p>${explanation}</p>`;
                score++;
            } else {
                optionElement.classList.add('incorrect');
                options[correctIndex].classList.add('correct');
                resultContainer.innerHTML = `<p class="incorrect-message">不正解！</p><p>${explanation}</p>`;
            }
            
            // 次の問題ボタンを有効化
            nextButton.disabled = false;
        }
        
        // 進捗表示更新
        function updateProgress(index) {
            progressText.textContent = `問題 ${index + 1}/${questions.length}`;
            progress.style.width = `${((index + 1) / questions.length) * 100}%`;
        }
        
        // 最終結果表示
        function showFinalResult() {
            questionContainer.textContent = 'クイズ完了！';
            optionsContainer.innerHTML = '';
            resultContainer.innerHTML = `<p>あなたのスコア: ${score}/${questions.length}</p>`;
            
            if (score === questions.length) {
                resultContainer.innerHTML += '<p class="correct-message">素晴らしい！すべて正解です！</p>';
            } else if (score >= questions.length / 2) {
                resultContainer.innerHTML += '<p>よくできました！</p>';
            } else {
                resultContainer.innerHTML += '<p>もう一度挑戦してみましょう！</p>';
            }
            
            nextButton.textContent = '最初からやり直す';
            nextButton.addEventListener('click', () => {
                currentQuestionIndex = 0;
                score = 0;
                showQuestion(currentQuestionIndex);
                nextButton.textContent = '次の問題';
                nextButton.disabled = true;
                answered = false;
            }, { once: true });
        }
    }
});