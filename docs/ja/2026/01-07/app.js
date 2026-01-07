// タイムラインのイベントデータ
const timelineEvents = [
  {
    id: 1,
    date: "1926年1月",
    title: "文藝家協会の誕生",
    content: "小説家協会と劇作家協会が合併して文藝家協会が発足。初代会長に菊池寛が就任。設立時の会員数は約180名。「文学者の団結による権利保護」を掲げ、出版社との交渉力を高めることが主な目的でした。"
  },
  {
    id: 2,
    date: "1931年",
    title: "著作権法改正への貢献",
    content: "協会は著作権法改正運動を展開。作家の権利強化と保護期間延長を実現させました。この改正により、文学作品の無断使用に対する法的保護が強化されたのです。"
  },
  {
    id: 3,
    date: "1935年",
    title: "芥川賞・直木賞の創設",
    content: "文藝春秋社と協力し、新人作家の登竜門となる芥川龍之介賞と直木三十五賞を創設。日本文学界に新たな才能を発掘する仕組みが誕生しました。両賞は今日まで日本文学の重要な指標となっています。"
  },
  {
    id: 4,
    date: "1945-1948年",
    title: "戦後の再建",
    content: "戦争による活動停止から再建。GHQによる検閲下でも言論と表現の自由を守るため、新たな体制で活動を再開しました。「日本文藝家協会」と改称し、戦後文学の発展に寄与します。"
  },
  {
    id: 5,
    date: "1965年",
    title: "国際的な活動の展開",
    content: "国際ペンクラブとの連携を強化し、日本文学の国際的な地位向上に貢献。海外文学者との交流プログラムを開始し、翻訳事業も支援するようになりました。"
  },
  {
    id: 6,
    date: "1985年",
    title: "著作権デジタル対応",
    content: "デジタル化が進む中、電子媒体における著作権保護に向けた活動を開始。コピー機の普及による無断複製問題にも取り組みました。この時期の活動が後のデジタル著作権保護の基礎となります。"
  },
  {
    id: 7,
    date: "2010年代",
    title: "電子書籍時代への対応",
    content: "電子書籍の普及に伴い、デジタル著作権管理と適正な利益配分のためのガイドラインを策定。新たな時代における作家の権利保護に取り組んでいます。"
  },
  {
    id: 8,
    date: "2026年",
    title: "設立100周年",
    content: "100年の歴史を祝う記念式典と記念出版を計画。AI創作時代における人間の創作性の価値や、次の100年に向けた文学の役割について議論が行われる予定です。"
  }
];

// クイズのデータ
const quizData = [
  {
    question: "日本文藝家協会が設立された年は？",
    options: ["1921年", "1926年", "1935年", "1945年"],
    correct: 1,
    feedback: "正解です！1926年1月7日に小説家協会と劇作家協会が合併して設立されました。",
    wrongFeedback: "不正解です。正解は1926年です。1月7日に小説家協会と劇作家協会が合併して設立されました。"
  },
  {
    question: "文藝家協会の初代会長を務めたのは誰？",
    options: ["芥川龍之介", "菊池寛", "谷崎潤一郎", "川端康成"],
    correct: 1,
    feedback: "正解です！菊池寛が初代会長を務めました。彼は文藝春秋の創刊者でもあります。",
    wrongFeedback: "不正解です。正解は菊池寛です。彼は初代会長として協会の基礎を築きました。"
  },
  {
    question: "芥川賞と直木賞が創設されたのはいつ？",
    options: ["1926年", "1935年", "1945年", "1952年"],
    correct: 1,
    feedback: "正解です！1935年に文藝春秋社と協力して創設されました。",
    wrongFeedback: "不正解です。正解は1935年です。文藝春秋社と協力して創設されました。"
  }
];

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
  // タイムラインの初期化
  initTimeline();
  
  // クイズの初期化
  initQuiz();
});

// タイムライン機能の初期化
function initTimeline() {
  const timelineTrack = document.getElementById('timeline-track');
  const eventContainer = document.getElementById('event-container');
  const prevButton = document.getElementById('prev-event');
  const nextButton = document.getElementById('next-event');
  
  let currentEventIndex = 0;
  
  // タイムラインポイントを生成
  timelineEvents.forEach((event, index) => {
    const position = (index / (timelineEvents.length - 1)) * 100;
    const point = document.createElement('div');
    point.className = 'timeline-point';
    point.dataset.index = index;
    point.style.left = `${position}%`;
    
    const label = document.createElement('div');
    label.className = 'timeline-point-label';
    label.textContent = event.date;
    point.appendChild(label);
    
    point.addEventListener('click', () => {
      updateActiveEvent(index);
    });
    
    timelineTrack.appendChild(point);
  });
  
  // イベントコンテンツを生成
  timelineEvents.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.className = 'event';
    eventElement.dataset.id = event.id;
    
    eventElement.innerHTML = `
      <div class="event-date">${event.date}</div>
      <h3 class="event-title">${event.title}</h3>
      <p>${event.content}</p>
    `;
    
    eventContainer.appendChild(eventElement);
  });
  
  // 前後のイベントに移動するボタンの設定
  prevButton.addEventListener('click', () => {
    if (currentEventIndex > 0) {
      updateActiveEvent(currentEventIndex - 1);
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (currentEventIndex < timelineEvents.length - 1) {
      updateActiveEvent(currentEventIndex + 1);
    }
  });
  
  // アクティブなイベントを更新する関数
  function updateActiveEvent(index) {
    currentEventIndex = index;
    
    // タイムラインポイントの更新
    document.querySelectorAll('.timeline-point').forEach((point, i) => {
      if (i === index) {
        point.classList.add('active');
      } else {
        point.classList.remove('active');
      }
    });
    
    // イベントコンテンツの更新
    document.querySelectorAll('.event').forEach((eventEl, i) => {
      if (i === index) {
        eventEl.classList.add('active');
      } else {
        eventEl.classList.remove('active');
      }
    });
    
    // ボタンの有効/無効状態の更新
    prevButton.disabled = index === 0;
    nextButton.disabled = index === timelineEvents.length - 1;
  }
  
  // 初期イベントの表示
  updateActiveEvent(0);
}

// クイズ機能の初期化
function initQuiz() {
  const quizIntro = document.getElementById('quiz-intro');
  const quizContent = document.getElementById('quiz-content');
  const quizResult = document.getElementById('quiz-result');
  const startQuizButton = document.getElementById('start-quiz');
  
  let currentQuestionIndex = 0;
  let score = 0;
  let quizCompleted = false;
  
  // クイズ開始ボタンのイベントリスナー
  startQuizButton.addEventListener('click', () => {
    quizIntro.style.display = 'none';
    quizContent.style.display = 'block';
    showQuestion(currentQuestionIndex);
  });
  
  // 質問を表示する関数
  function showQuestion(index) {
    quizContent.innerHTML = '';
    
    if (index >= quizData.length) {
      showResults();
      return;
    }
    
    const question = quizData[index];
    
    const questionElement = document.createElement('div');
    questionElement.className = 'quiz-question';
    
    questionElement.innerHTML = `
      <h3>質問 ${index + 1}/${quizData.length}</h3>
      <p>${question.question}</p>
    `;
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'quiz-options';
    
    question.options.forEach((option, optIndex) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'quiz-option';
      optionElement.textContent = option;
      optionElement.addEventListener('click', () => selectOption(optIndex, index));
      
      optionsContainer.appendChild(optionElement);
    });
    
    questionElement.appendChild(optionsContainer);
    
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'quiz-feedback';
    feedbackElement.style.display = 'none';
    questionElement.appendChild(feedbackElement);
    
    quizContent.appendChild(questionElement);
  }
  
  // 選択肢を選んだ時の処理
  function selectOption(optionIndex, questionIndex) {
    if (quizCompleted) return;
    
    const question = quizData[questionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedbackElement = document.querySelector('.quiz-feedback');
    
    // 全ての選択肢の選択を解除
    options.forEach(opt => opt.classList.remove('selected'));
    
    // 選択された選択肢をハイライト
    options[optionIndex].classList.add('selected');
    
    const isCorrect = optionIndex === question.correct;
    
    if (isCorrect) {
      options[optionIndex].classList.add('correct');
      feedbackElement.textContent = question.feedback;
      feedbackElement.className = 'quiz-feedback correct';
      score++;
    } else {
      options[optionIndex].classList.add('incorrect');
      options[question.correct].classList.add('correct');
      feedbackElement.textContent = question.wrongFeedback;
      feedbackElement.className = 'quiz-feedback incorrect';
    }
    
    feedbackElement.style.display = 'block';
    
    // 次の質問へのナビゲーション
    const navElement = document.createElement('div');
    navElement.className = 'quiz-nav';
    
    const nextButton = document.createElement('button');
    
    if (questionIndex < quizData.length - 1) {
      nextButton.textContent = '次の質問へ';
      nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
      });
    } else {
      nextButton.textContent = '結果を見る';
      nextButton.addEventListener('click', () => {
        showResults();
      });
    }
    
    navElement.appendChild(nextButton);
    quizContent.appendChild(navElement);
    
    quizCompleted = true;
  }
  
  // 結果の表示
  function showResults() {
    quizContent.style.display = 'none';
    quizResult.style.display = 'block';
    
    let resultMessage;
    let resultClass;
    
    if (score === quizData.length) {
      resultMessage = `おめでとうございます！満点です！${score}/${quizData.length} 正解！<br>あなたは日本文学のエキスパートです！`;
      resultClass = 'perfect';
    } else if (score >= quizData.length / 2) {
      resultMessage = `良い成績です！${score}/${quizData.length} 正解！<br>日本文学についての知識が豊富ですね。`;
      resultClass = 'good';
    } else {
      resultMessage = `${score}/${quizData.length} 正解。<br>このアプリで日本文学についてもっと学びましょう！`;
      resultClass = 'try-again';
    }
    
    quizResult.innerHTML = `
      <h3>クイズ結果</h3>
      <p class="${resultClass}">${resultMessage}</p>
      <button id="restart-quiz">もう一度挑戦する</button>
    `;
    
    document.getElementById('restart-quiz').addEventListener('click', () => {
      currentQuestionIndex = 0;
      score = 0;
      quizCompleted = false;
      quizResult.style.display = 'none';
      quizIntro.style.display = 'block';
    });
  }
}