// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', function() {
  // テーマ切り替え機能
  setupThemeToggle();
  
  // 電車アニメーション
  animateTrain();
  
  // タイムライン初期化
  initTimeline();
  
  // 事実カードの操作
  setupFactCards();
  
  // クイズ機能初期化
  initQuiz();
});

// ダークモード切り替え機能
function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // システム設定に基づいて初期テーマを設定
  if (prefersDarkScheme.matches) {
    document.body.setAttribute('data-theme', 'dark');
  }
  
  themeToggle.addEventListener('click', function() {
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'dark');
    }
  });
}

// 電車アニメーション
function animateTrain() {
  const train = document.getElementById('animatedTrain');
  
  // CSSアニメーションを適用
  train.style.animation = 'trainMove var(--train-speed) infinite';
}

// タイムライン処理
function initTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // スクロール時のアクティブ化
  function checkTimelineItems() {
    timelineItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight * 0.8;
      
      if (itemTop < triggerPoint) {
        item.classList.add('active');
      }
    });
  }
  
  // 初期チェックとスクロールイベント設定
  checkTimelineItems();
  window.addEventListener('scroll', checkTimelineItems);
}

// 事実カードの操作
function setupFactCards() {
  const factCards = document.querySelectorAll('.fact-card');
  const prevButton = document.getElementById('prevFact');
  const nextButton = document.getElementById('nextFact');
  const indicators = document.querySelectorAll('.indicator');
  let currentFact = 0;
  
  // 表示する事実カードを更新
  function updateFactCards() {
    factCards.forEach((card, index) => {
      card.classList.toggle('active', index === currentFact);
    });
    
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentFact);
    });
  }
  
  // 前の事実へ移動
  prevButton.addEventListener('click', function() {
    currentFact = (currentFact - 1 + factCards.length) % factCards.length;
    updateFactCards();
  });
  
  // 次の事実へ移動
  nextButton.addEventListener('click', function() {
    currentFact = (currentFact + 1) % factCards.length;
    updateFactCards();
  });
  
  // インジケーターのクリック処理
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      currentFact = index;
      updateFactCards();
    });
  });
}

// クイズ機能
function initQuiz() {
  const quizContainer = document.getElementById('quizContainer');
  const questionElement = document.getElementById('quizQuestion');
  const optionsElement = document.getElementById('quizOptions');
  const resultElement = document.getElementById('quizResult');
  const nextButton = document.getElementById('nextQuestion');
  const scoreElement = document.getElementById('quizScore');
  const restartButton = document.getElementById('restartQuiz');
  
  // クイズの問題と答え
  const quizData = [
    {
      question: '日本で最初の地下鉄が開業したのは何年？',
      options: ['1907年', '1927年', '1947年', '1967年'],
      correct: 1,
      explanation: '正解は1927年（昭和2年）です。1927年12月30日に浅草駅〜上野駅間が開業しました。'
    },
    {
      question: '最初に開業した地下鉄区間の長さは？',
      options: ['1.0km', '2.2km', '4.5km', '10.0km'],
      correct: 1,
      explanation: '正解は2.2kmです。浅草駅から上野駅までの距離で、当時の片道運行時間は約9分でした。'
    },
    {
      question: '日本の地下鉄建設を主導した「地下鉄の父」と呼ばれる人物は？',
      options: ['伊藤博文', '早川徳次', '五島慶太', '松下幸之助'],
      correct: 1,
      explanation: '正解は早川徳次です。東京地下鉄道株式会社の創始者として、日本初の地下鉄建設を主導しました。'
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let answered = false;
  
  // 問題を表示
  function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
      const button = document.createElement('div');
      button.classList.add('quiz-option');
      button.textContent = option;
      button.setAttribute('data-index', index);
      button.addEventListener('click', selectOption);
      optionsElement.appendChild(button);
    });
    
    resultElement.style.display = 'none';
    nextButton.style.display = 'none';
    answered = false;
  }
  
  // 選択肢の選択
  function selectOption() {
    if (answered) return;
    
    const selectedIndex = parseInt(this.getAttribute('data-index'));
    const currentQuiz = quizData[currentQuestion];
    
    answered = true;
    
    // すべての選択肢から既存のクラスを削除
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.classList.remove('selected', 'correct', 'wrong');
    });
    
    // 選択した選択肢にクラスを追加
    this.classList.add('selected');
    
    // 正誤判定
    if (selectedIndex === currentQuiz.correct) {
      this.classList.add('correct');
      resultElement.textContent = '正解です！ ' + currentQuiz.explanation;
      resultElement.className = 'correct';
      score++;
    } else {
      this.classList.add('wrong');
      const correctOption = document.querySelector(`.quiz-option[data-index="${currentQuiz.correct}"]`);
      correctOption.classList.add('correct');
      resultElement.textContent = '不正解です。 ' + currentQuiz.explanation;
      resultElement.className = 'wrong';
    }
    
    resultElement.style.display = 'block';
    
    if (currentQuestion < quizData.length - 1) {
      nextButton.style.display = 'block';
    } else {
      scoreElement.textContent = `あなたのスコア: ${score}/${quizData.length}`;
      scoreElement.style.display = 'block';
      restartButton.style.display = 'block';
    }
  }
  
  // 次の問題に進む
  nextButton.addEventListener('click', function() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    }
  });
  
  // クイズをリスタート
  restartButton.addEventListener('click', function() {
    currentQuestion = 0;
    score = 0;
    scoreElement.style.display = 'none';
    restartButton.style.display = 'none';
    showQuestion();
  });
  
  // クイズ開始
  showQuestion();
}