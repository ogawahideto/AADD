// さきがけタイムラインコントローラー
document.addEventListener('DOMContentLoaded', () => {
  // タイムラインのイベント制御
  const events = document.querySelectorAll('.timeline-event');
  const progressBar = document.querySelector('.progress-bar');
  const prevBtn = document.getElementById('prev-event');
  const nextBtn = document.getElementById('next-event');
  let currentEvent = 0;
  const totalEvents = events.length;

  // イベント表示を更新する関数
  function updateEventDisplay() {
    events.forEach((event, index) => {
      event.classList.remove('active');
      if (index === currentEvent) {
        event.classList.add('active');
      }
    });
    
    // プログレスバーの更新
    const progress = ((currentEvent + 1) / totalEvents) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // 初期表示
  updateEventDisplay();

  // 前のイベントへ
  prevBtn.addEventListener('click', () => {
    if (currentEvent > 0) {
      currentEvent--;
      updateEventDisplay();
    }
  });

  // 次のイベントへ
  nextBtn.addEventListener('click', () => {
    if (currentEvent < totalEvents - 1) {
      currentEvent++;
      updateEventDisplay();
    }
  });

  // クイズ機能
  const quizData = [
    {
      question: "「さきがけ」の重量は約何kgでしたか？",
      options: ["38kg", "138kg", "438kg", "738kg"],
      answer: 1
    },
    {
      question: "「さきがけ」が打ち上げられた場所はどこですか？",
      options: ["種子島宇宙センター", "内之浦宇宙空間観測所", "田代ロケット実験場", "角田宇宙センター"],
      answer: 1
    },
    {
      question: "「さきがけ」はハレー彗星にどれくらい接近しましたか？",
      options: ["約7万km", "約70万km", "約700万km", "約7000万km"],
      answer: 2
    },
    {
      question: "「さきがけ」打ち上げ時に使用されたロケットは？",
      options: ["H-I", "M-3SII", "N-I", "L-4S"],
      answer: 1
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  const questionElement = document.getElementById('question');
  const optionsContainer = document.getElementById('options-container');
  const resultContainer = document.getElementById('result-container');
  const resultMessage = document.getElementById('result-message');
  const restartBtn = document.getElementById('restart-btn');
  const quizDisplay = document.getElementById('quiz-display');

  // クイズ開始ボタン
  const startQuizBtn = document.querySelector('.quiz-start-btn');
  startQuizBtn.addEventListener('click', startQuiz);

  // クイズを開始する
  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    quizDisplay.classList.remove('hidden');
    loadQuestion();
  }

  // 質問を読み込む
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    
    optionsContainer.innerHTML = '';
    
    currentQuizData.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option-btn');
      button.addEventListener('click', () => selectAnswer(index));
      optionsContainer.appendChild(button);
    });
  }

  // 回答を選択
  function selectAnswer(index) {
    const buttons = document.querySelectorAll('.option-btn');
    const currentQuizData = quizData[currentQuestion];
    
    buttons.forEach(button => {
      button.disabled = true;
    });
    
    if (index === currentQuizData.answer) {
      buttons[index].classList.add('correct');
      score++;
    } else {
      buttons[index].classList.add('incorrect');
      buttons[currentQuizData.answer].classList.add('correct');
    }
    
    setTimeout(() => {
      currentQuestion++;
      
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }

  // 結果表示
  function showResults() {
    quizDisplay.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    let message = '';
    if (score === quizData.length) {
      message = `素晴らしい！満点です！${score}/${quizData.length}点！あなたは「さきがけ」の専門家です！`;
    } else if (score >= quizData.length / 2) {
      message = `よくできました！${score}/${quizData.length}点！宇宙探査の知識が豊富ですね。`;
    } else {
      message = `${score}/${quizData.length}点。もう一度挑戦して「さきがけ」についてもっと学びましょう！`;
    }
    
    resultMessage.textContent = message;
  }

  // リスタートボタン
  restartBtn.addEventListener('click', startQuiz);
});