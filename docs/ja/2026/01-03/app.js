// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', () => {
  // スムーズスクロール
  document.getElementById('scroll-cta').addEventListener('click', () => {
    document.getElementById('intro').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });

  // タイムラインのデータ
  const timelineData = {
    "1888": {
      title: "1888年 - 初観測",
      content: "1888年1月3日、エドワード・ホールデン台長率いる天文学者たちが初めて36インチ望遠鏡を使用。月のクレーター、土星の環、星雲など、かつてないほど詳細に天体を観測しました。初日の観測結果は科学界に衝撃を与え、多くの学術雑誌で取り上げられました。"
    },
    "1892": {
      title: "1892年 - 木星の第5衛星の発見",
      content: "エドワード・バーナード天文学者が、リック天文台の望遠鏡を使って木星の第5衛星（現在のアマルテア）を発見。1610年にガリレオが最初の4つの衛星を発見して以来、約280年ぶりの木星衛星発見となりました。この発見は、望遠鏡の性能と観測者の技術の証明となりました。"
    },
    "1895": {
      title: "1895年 - 二重星の精密測定",
      content: "リック天文台は二重星の観測で特に優れた成果を上げました。数千の二重星系を測定し、カタログ化することで恒星の質量や進化に関する理解を大きく前進させました。これらのデータは今日でも価値があり、恒星の長期的変化の研究に利用されています。"
    },
    "1908": {
      title: "1908年 - 系外惑星探査の先駆け",
      content: "ウィリアム・キャンベル天文学者が恒星の視線速度の精密測定を開始。この技術は後に系外惑星の発見につながる重要な基礎となりました。当時は技術的限界から惑星の直接検出はできませんでしたが、その先駆的研究は現代の系外惑星探査に大きな影響を与えています。"
    },
    "1969": {
      title: "1969年〜現代 - 月面着陸地点の選定",
      content: "アポロ計画の月面着陸地点選定にリック天文台の詳細な月面写真が活用されました。現在も天文学の研究と教育に貢献し続け、最新の技術と歴史的機器が共存する珍しい天文台として、毎年数万人の訪問者を魅了しています。"
    }
  };

  // タイムラインのナビゲーションボタン設定
  const timelineBtns = document.querySelectorAll('.timeline-btn');
  const timelineContent = document.getElementById('timeline-content');

  // 初期表示（1888年）
  updateTimelineContent("1888");

  // タイムラインボタンのイベントリスナー
  timelineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const year = btn.getAttribute('data-year');
      
      // アクティブボタンの更新
      timelineBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // コンテンツ更新
      updateTimelineContent(year);
    });
  });

  // タイムラインコンテンツ更新関数
  function updateTimelineContent(year) {
    const data = timelineData[year];
    
    // コンテンツ更新のアニメーション
    timelineContent.style.opacity = 0;
    
    setTimeout(() => {
      timelineContent.innerHTML = `
        <div class="timeline-item active">
          <h3>${data.title}</h3>
          <p>${data.content}</p>
        </div>
      `;
      timelineContent.style.opacity = 1;
    }, 300);
  }

  // クイズ機能
  const quizData = [
    {
      question: "リック天文台の望遠鏡はいつ初観測が行われましたか？",
      options: [
        "1878年1月3日",
        "1888年1月3日",
        "1898年1月3日",
        "1908年1月3日"
      ],
      correct: 1
    },
    {
      question: "望遠鏡のレンズ製作にかかった時間はどれくらいでしたか？",
      options: [
        "1年",
        "2年",
        "4年",
        "7年"
      ],
      correct: 2
    },
    {
      question: "リック天文台の望遠鏡レンズの直径は？",
      options: [
        "36センチ",
        "56センチ",
        "76センチ",
        "91センチ"
      ],
      correct: 3
    },
    {
      question: "ジェームズ・リックは望遠鏡建設のために死後いくらを寄付しましたか？",
      options: [
        "7万ドル",
        "70万ドル",
        "700万ドル",
        "7000万ドル"
      ],
      correct: 1
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let quizCompleted = false;

  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const resultElement = document.getElementById('result');
  const nextButton = document.getElementById('next-btn');
  const scoreElement = document.getElementById('score');
  const restartButton = document.getElementById('restart-btn');

  // クイズ開始
  loadQuestion();

  // 次の質問ボタンのイベントリスナー
  nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
      resultElement.textContent = '';
      nextButton.style.display = 'none';
    } else {
      // クイズ終了
      showScore();
    }
  });

  // リスタートボタンのイベントリスナー
  restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizCompleted = false;
    scoreElement.style.display = 'none';
    restartButton.style.display = 'none';
    loadQuestion();
  });

  // 問題読み込み関数
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    
    questionElement.textContent = currentQuizData.question;
    optionsElement.innerHTML = '';
    
    currentQuizData.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('option');
      optionElement.textContent = option;
      optionElement.dataset.index = index;
      
      optionElement.addEventListener('click', selectOption);
      
      optionsElement.appendChild(optionElement);
    });
  }

  // 選択肢選択関数
  function selectOption(e) {
    if (quizCompleted) return;
    
    const selectedOption = e.target;
    const selectedAnswer = parseInt(selectedOption.dataset.index);
    const correctAnswer = quizData[currentQuestion].correct;
    
    // すべての選択肢を選択不可に
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
      option.removeEventListener('click', selectOption);
    });
    
    // 正解・不正解の表示
    if (selectedAnswer === correctAnswer) {
      selectedOption.classList.add('correct');
      resultElement.textContent = '正解！';
      score++;
    } else {
      selectedOption.classList.add('incorrect');
      options[correctAnswer].classList.add('correct');
      resultElement.textContent = '不正解。正解は「' + quizData[currentQuestion].options[correctAnswer] + '」です。';
    }
    
    // 次の質問ボタン表示
    nextButton.style.display = 'inline-block';
    quizCompleted = true;
  }

  // スコア表示関数
  function showScore() {
    questionElement.textContent = 'クイズ完了！';
    optionsElement.innerHTML = '';
    resultElement.textContent = '';
    nextButton.style.display = 'none';
    
    scoreElement.textContent = `スコア: ${score}/${quizData.length}`;
    scoreElement.style.display = 'block';
    restartButton.style.display = 'inline-block';
  }
});