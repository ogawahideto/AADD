// タイムラインデータ
const timelineEvents = [
  {
    year: "1868",
    title: "明治維新",
    description: "徳川幕府から明治政府へと政権が移行し、近代化が始まる。"
  },
  {
    year: "1871",
    title: "廃藩置県",
    description: "地方行政区分が藩から府県に変わり、中央集権体制が確立。"
  },
  {
    year: "1872",
    title: "学制公布",
    description: "日本初の近代的教育制度「学制」が公布され、全国に小学校設立の基盤が整う。"
  },
  {
    year: "1873",
    title: "東京師範学校附属小学校開校",
    description: "現在の筑波大学附属小学校が日本初の学制に基づく小学校として開校。"
  },
  {
    year: "1879",
    title: "教育令",
    description: "学制が廃止され、より日本の実情に合わせた教育制度へと改革。"
  },
  {
    year: "1890",
    title: "教育勅語発布",
    description: "天皇による教育方針が示され、修身教育や忠君愛国の精神が強調される。"
  },
  {
    year: "1907",
    title: "義務教育6年制",
    description: "義務教育が4年から6年に延長され、就学率が急上昇。"
  },
  {
    year: "1947",
    title: "六三三制導入",
    description: "戦後の教育改革で現在の小学校6年・中学校3年・高校3年の学校制度が確立。"
  }
];

// クイズデータ
const quizQuestions = [
  {
    question: "明治5年に設立された日本初の学制に基づく小学校はどこでしょう？",
    options: [
      "東京師範学校附属小学校（現・筑波大学附属小学校）",
      "大阪師範学校附属小学校",
      "京都師範学校附属小学校",
      "広島師範学校附属小学校"
    ],
    correctAnswer: 0,
    explanation: "正解！東京師範学校附属小学校（現在の筑波大学附属小学校）が日本で最初の学制に基づく小学校として1873年（明治5年）に開校しました。"
  },
  {
    question: "明治初期の小学校の授業料はどうだったでしょうか？",
    options: [
      "最初から無償だった",
      "都市部のみ有料で、農村部は無償だった",
      "有料だった（月に労働者の1日分の賃金程度）",
      "通学者の家族の職業によって変動した"
    ],
    correctAnswer: 2,
    explanation: "正解！明治初期の小学校は義務教育でも授業料が必要で、月に12.5銭〜25銭程度（当時の労働者の1日分の賃金相当）でした。完全無償化は1900年代まで待つことになります。"
  },
  {
    question: "学制が公布された1872年（明治5年）頃の日本の就学率はどれくらいだったでしょう？",
    options: [
      "約90％",
      "約60％",
      "約40％",
      "約30％"
    ],
    correctAnswer: 3,
    explanation: "正解！学制が公布された当初の就学率はわずか約30％程度でした。「子どもは学校より農作業を手伝うべき」という考えや授業料負担などが原因でした。"
  },
  {
    question: "明治初期の小学校教師の呼び名として正しいものはどれでしょう？",
    options: [
      "教諭（きょうゆ）",
      "訓導（くんどう）",
      "教官（きょうかん）",
      "教師（きょうし）"
    ],
    correctAnswer: 1,
    explanation: "正解！明治時代の小学校教師は「訓導（くんどう）」と呼ばれていました。現在のように「先生」や「教師」という呼び名が一般的になるのは、もう少し後の時代になってからです。"
  }
];

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
  // タイムラインの初期化
  initTimeline();
  
  // クイズボタンのイベントリスナー
  document.getElementById('show-quiz-btn').addEventListener('click', function() {
    document.getElementById('quiz-section').classList.remove('hidden');
    // スムーズなスクロール
    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
    startQuiz();
  });
  
  // スクロール監視でタイムラインアニメーションを実行
  window.addEventListener('scroll', checkTimelineEvents);
});

// タイムラインの初期化
function initTimeline() {
  const timeline = document.getElementById('timeline');
  
  timelineEvents.forEach((event, index) => {
    const position = index % 2 === 0 ? 'left' : 'right';
    const timelineEvent = document.createElement('div');
    timelineEvent.className = `timeline-event ${position}`;
    timelineEvent.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="year">${event.year}</span>
        <h4>${event.title}</h4>
        <p>${event.description}</p>
      </div>
    `;
    timeline.appendChild(timelineEvent);
  });
  
  // 最初のチェック
  checkTimelineEvents();
}

// タイムラインのスクロールチェック
function checkTimelineEvents() {
  const timelineEvents = document.querySelectorAll('.timeline-event');
  
  timelineEvents.forEach(event => {
    const eventPosition = event.getBoundingClientRect();
    // 画面の80%位置に達したらイベントを表示
    if (eventPosition.top < window.innerHeight * 0.8) {
      event.classList.add('visible');
    }
  });
}

// クイズの開始
function startQuiz() {
  let currentQuestion = 0;
  let score = 0;
  
  // クイズの要素
  const quizContainer = document.getElementById('quiz-container');
  const questionElement = document.getElementById('quiz-question');
  const optionsElement = document.getElementById('quiz-options');
  const feedbackElement = document.getElementById('quiz-feedback');
  const nextButton = document.getElementById('quiz-next-btn');
  const progressCurrentElement = document.querySelector('.quiz-progress .current');
  const progressTotalElement = document.querySelector('.quiz-progress .total');
  const resultsElement = document.getElementById('quiz-results');
  
  // クイズの合計問題数を表示
  progressTotalElement.textContent = quizQuestions.length;
  
  // 最初の問題を表示
  showQuestion(currentQuestion);
  
  // 次へボタンのイベントリスナー
  nextButton.addEventListener('click', function() {
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
      showQuestion(currentQuestion);
      feedbackElement.classList.add('hidden');
      nextButton.classList.add('hidden');
    } else {
      // クイズ終了
      showResults();
    }
  });
  
  // 問題を表示する関数
  function showQuestion(questionIndex) {
    const question = quizQuestions[questionIndex];
    
    // 現在の問題番号を更新
    progressCurrentElement.textContent = questionIndex + 1;
    
    // 問題文を設定
    questionElement.textContent = question.question;
    
    // 選択肢をクリア
    optionsElement.innerHTML = '';
    
    // 選択肢を追加
    question.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'quiz-option';
      optionElement.textContent = option;
      optionElement.dataset.index = index;
      
      optionElement.addEventListener('click', function() {
        // すべての選択肢を選択不可に
        const allOptions = optionsElement.querySelectorAll('.quiz-option');
        allOptions.forEach(opt => {
          opt.style.pointerEvents = 'none';
        });
        
        // 正解かどうかをチェック
        const selectedIndex = parseInt(this.dataset.index);
        const isCorrect = selectedIndex === question.correctAnswer;
        
        // 正解と不正解の表示
        if (isCorrect) {
          this.classList.add('correct');
          feedbackElement.textContent = question.explanation;
          feedbackElement.className = 'quiz-feedback correct';
          score++;
        } else {
          this.classList.add('incorrect');
          // 正解を表示
          allOptions[question.correctAnswer].classList.add('correct');
          feedbackElement.textContent = `不正解！${question.explanation}`;
          feedbackElement.className = 'quiz-feedback incorrect';
        }
        
        feedbackElement.classList.remove('hidden');
        nextButton.classList.remove('hidden');
      });
      
      optionsElement.appendChild(optionElement);
    });
  }
  
  // 結果を表示する関数
  function showResults() {
    questionElement.classList.add('hidden');
    optionsElement.classList.add('hidden');
    feedbackElement.classList.add('hidden');
    nextButton.classList.add('hidden');
    
    resultsElement.classList.remove('hidden');
    resultsElement.innerHTML = `
      <div class="quiz-score">あなたのスコア: ${score} / ${quizQuestions.length}</div>
      <p>${getScoreMessage(score)}</p>
    `;
  }
  
  // スコアメッセージを取得する関数
  function getScoreMessage(score) {
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
      return '素晴らしい！あなたは明治時代の教育に詳しいですね！';
    } else if (percentage >= 75) {
      return 'よくできました！明治の学校についての知識が豊富です。';
    } else if (percentage >= 50) {
      return 'まずまずの結果です。明治時代の教育について、もっと学んでみましょう。';
    } else {
      return '明治時代の教育は難しいテーマですね。このアプリで学びを深めましょう！';
    }
  }
}