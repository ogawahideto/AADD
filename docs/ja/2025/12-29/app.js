// タイムラインのデータ
const timelineData = [
    {
        year: '1872',
        title: '日本初の鉄道開業',
        content: `
            <h3>新橋-横浜間に日本初の鉄道開通</h3>
            <p>1872年（明治5年）10月14日、新橋駅と横浜駅を結ぶ日本初の鉄道が開通しました。これは<strong>政府主導のプロジェクト</strong>で、イギリス人技師エドモンド・モレルの指導のもと建設されました。当時は外国人技術者に頼らざるを得ない状況でした。</p>
            <p>この路線は「見せるための鉄道」という側面も強く、日本の近代化を西洋諸国に示すショーケースとしての役割もありました。</p>
        `
    },
    {
        year: '1880',
        title: '阪堺鉄道会社の設立',
        content: `
            <h3>日本初の民間鉄道会社「阪堺鉄道」誕生</h3>
            <p>政府の鉄道建設が遅れる中、大阪の実業家・五代友厚らは<strong>民間の力で鉄道を作る</strong>ことを決意。1880年（明治13年）11月、資本金50万円で阪堺鉄道会社が設立されました。</p>
            <p>「大阪の発展のためには堺港との連結が不可欠」という考えのもと、難波から堺までの路線建設に着手。政府からの援助なしに、純粋な民間資本のみで進められた革新的な事業でした。</p>
            <p>阪堺鉄道の設立は、その後の日本全国での鉄道熱に大きな影響を与えることになります。</p>
        `
    },
    {
        year: '1882',
        title: '建設工事の開始',
        content: `
            <h3>日本人技師のみによる鉄道建設の挑戦</h3>
            <p>1882年（明治15年）、阪堺鉄道の建設工事が本格的に始まりました。この工事の最大の特徴は、<strong>外国人技師に頼らず、日本人だけで行われた</strong>ことです。</p>
            <p>政府の鉄道がイギリス人技師の指導で建設されたのに対し、阪堺鉄道は政府鉄道で経験を積んだ日本人技術者たちが中心となって設計・施工されました。</p>
            <p>建設には約1,200人の労働者が従事し、彼らの日給は平均25銭。当時の米1升の価格が約7銭という時代に、決して高くない賃金での重労働でした。</p>
        `
    },
    {
        year: '1885.7',
        title: '五代友厚の死',
        content: `
            <h3>「大阪の恩人」開業を見ることなく逝去</h3>
            <p>阪堺鉄道の開業を目前に控えた1885年（明治18年）7月16日、創設者の一人である五代友厚が49歳の若さでこの世を去りました。</p>
            <p>薩摩藩出身で、明治維新後は大阪の経済発展に尽力した五代。「<strong>民間の力で近代化を進めなければ、日本の未来はない</strong>」という彼の信念は、阪堺鉄道という形で実を結びつつありましたが、その完成を見届けることはできませんでした。</p>
            <p>死の直前まで「大阪と堺を結ぶ鉄道の開業がどれほど大阪の発展に寄与するか」を周囲に語っていたと言われています。</p>
        `
    },
    {
        year: '1885.12',
        title: '難波-大和川間開業',
        content: `
            <h3>日本初の民間鉄道いよいよ開業</h3>
            <p>1885年（明治18年）12月29日、ついに阪堺鉄道の難波-大和川間（約7.6km）が開業しました。この日、駅には多くの見物人が集まり、蒸気機関車の走る様子に歓声が上がりました。</p>
            <p>初日の乗客は約2,000人。当時の人々にとって、<strong>時速約20kmで走る列車は「驚異的なスピード」</strong>でした。それまで人力車で1時間以上かかった移動がわずか30分ほどで可能になったのです。</p>
            <p>開業時の駅は難波、今宮、大正、粉浜、大和川の5駅。蒸気機関車2両、客車6両、貨車10両でのスタートでした。</p>
        `
    },
    {
        year: '1886',
        title: '大和川-堺間延伸',
        content: `
            <h3>大和川を越え、堺までついに全線開通</h3>
            <p>開業から半年後の1886年（明治19年）6月28日、大和川-堺間が延伸開業し、当初の計画通り難波-堺間の全線がつながりました。</p>
            <p>大和川に架かる鉄橋の建設は難工事でしたが、これも<strong>日本人技術者の手で完成</strong>。日本人だけで本格的な鉄道を建設・運営できることが証明されました。</p>
            <p>阪堺鉄道の成功は全国に民間鉄道ブームを引き起こし、1890年代には「鉄道熱」と呼ばれる投資ブームが起きます。その先駆けとしての阪堺鉄道の歴史的意義は大きいものでした。</p>
        `
    },
    {
        year: '1897',
        title: '南海鉄道へ',
        content: `
            <h3>阪堺鉄道から南海鉄道へ社名変更</h3>
            <p>1897年（明治30年）、阪堺鉄道は社名を「南海鉄道」に変更しました。これは路線が和歌山方面へと延伸されるなど、単に大阪と堺を結ぶだけの鉄道ではなくなったことを示しています。</p>
            <p>この頃には1日の利用者数が約1万人に増加。沿線には工場や住宅が次々と建設され、<strong>大阪の都市圏拡大に大きく貢献</strong>しました。</p>
            <p>南海鉄道はその後も発展を続け、現在の南海電気鉄道（南海電鉄）の基礎となります。</p>
        `
    },
    {
        year: '2025',
        title: '開業140周年',
        content: `
            <h3>阪堺鉄道開業から140年</h3>
            <p>阪堺鉄道が開業してから140年。現在の南海電鉄の路線の多くは、かつての阪堺鉄道の路線上にあります。難波駅から堺駅までの区間は、路線としては日本最古級の部類に入ります。</p>
            <p>私たちが日常的に利用する鉄道は、明治時代の先人たちの挑戦と情熱の上に成り立っています。<strong>日本の近代化を支えた「2番目」の鉄道</strong>の遺産は、今も私たちの生活の中に生きているのです。</p>
        `
    }
];

// クイズのデータ
const quizData = [
    {
        question: '阪堺鉄道が開業した年はいつですか？',
        options: ['1872年', '1885年', '1897年', '1905年'],
        correctIndex: 1,
        explanation: '阪堺鉄道は1885年（明治18年）12月29日に難波-大和川間で開業しました。日本で2番目の鉄道、民間鉄道としては初めてのものでした。'
    },
    {
        question: '阪堺鉄道設立の中心人物で「大阪の恩人」と呼ばれた人物は誰ですか？',
        options: ['永井久一郎', '五代友厚', '松本重太郎', '吉田茂'],
        correctIndex: 1,
        explanation: '五代友厚は薩摩藩出身の実業家で、大阪の近代化に尽力し「大阪の恩人」と呼ばれました。阪堺鉄道の設立を強く推進しましたが、開業前の1885年7月に亡くなっています。'
    },
    {
        question: '阪堺鉄道の最大の特徴として正しいものはどれですか？',
        options: [
            'イギリス人技師の指導で建設された', 
            '政府の資金援助を受けて建設された',
            '日本人だけの技術で建設された',
            '当初から電気で走る鉄道だった'
        ],
        correctIndex: 2,
        explanation: '阪堺鉄道は、日本初の鉄道（新橋-横浜間）とは異なり、外国人技術者に頼らず日本人だけの技術で建設されました。これは当時としては画期的なことでした。'
    },
    {
        question: '阪堺鉄道は現在どの鉄道会社になっていますか？',
        options: ['JR西日本', '阪急電鉄', '南海電鉄', '京阪電鉄'],
        correctIndex: 2,
        explanation: '阪堺鉄道は1897年に南海鉄道に社名変更し、その後1947年に南海電気鉄道（南海電鉄）となりました。現在も南海本線として運行しています。'
    }
];

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // タイムラインの生成
    createTimeline();
    
    // クイズの初期化
    initQuiz();
});

// タイムライン生成関数
function createTimeline() {
    const timeline = document.getElementById('timeline');
    const timelineContent = document.getElementById('timelineContent');
    
    // タイムラインの各項目を生成
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');
        timelineItem.setAttribute('data-index', index);
        
        timelineItem.innerHTML = `
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-title">${item.title}</div>
        `;
        
        // クリックイベント
        timelineItem.addEventListener('click', () => {
            // アクティブクラスをリセット
            document.querySelectorAll('.timeline-item').forEach(item => {
                item.classList.remove('active');
            });
            
            document.querySelectorAll('.timeline-content-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // 選択された項目をアクティブに
            timelineItem.classList.add('active');
            
            // コンテンツを表示
            showTimelineContent(index);
        });
        
        timeline.appendChild(timelineItem);
        
        // コンテンツ項目も作成しておく
        const contentItem = document.createElement('div');
        contentItem.classList.add('timeline-content-item');
        contentItem.setAttribute('data-index', index);
        contentItem.innerHTML = item.content;
        
        timelineContent.appendChild(contentItem);
    });
    
    // デフォルトで最初の項目を表示（開業の項目）
    const defaultIndex = 4; // 難波-大和川間開業の項目
    document.querySelector(`.timeline-item[data-index="${defaultIndex}"]`).classList.add('active');
    showTimelineContent(defaultIndex);
}

// タイムラインコンテンツ表示関数
function showTimelineContent(index) {
    // プレースホルダーを非表示
    const placeholder = document.querySelector('.content-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    // 対応するコンテンツを表示
    const contentItem = document.querySelector(`.timeline-content-item[data-index="${index}"]`);
    contentItem.classList.add('active');
}

// クイズ初期化関数
let currentQuestionIndex = 0;
let score = 0;

function initQuiz() {
    // 最初の問題を表示
    showQuestion(currentQuestionIndex);
    
    // 結果表示のイベントリスナー
    document.getElementById('next-btn').addEventListener('click', () => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            showQuestion(currentQuestionIndex);
            document.getElementById('result').classList.add('hidden');
        } else {
            // クイズ終了
            showFinalResult();
        }
    });
    
    // リスタートボタン
    document.getElementById('restart-btn').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        showQuestion(currentQuestionIndex);
        document.getElementById('final-result').classList.add('hidden');
    });
}

// 問題表示関数
function showQuestion(index) {
    const questionData = quizData[index];
    document.getElementById('question').textContent = questionData.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        
        optionElement.addEventListener('click', () => {
            checkAnswer(i, questionData.correctIndex);
        });
        
        optionsContainer.appendChild(optionElement);
    });
}

// 回答チェック関数
function checkAnswer(selectedIndex, correctIndex) {
    const options = document.querySelectorAll('.option');
    
    // 選択できないように
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // 正解・不正解のスタイル適用
    options[selectedIndex].classList.add('selected');
    options[correctIndex].classList.add('correct');
    
    if (selectedIndex !== correctIndex) {
        options[selectedIndex].classList.add('incorrect');
    } else {
        score++;
    }
    
    // 結果メッセージの表示
    const resultMessage = document.getElementById('result-message');
    const explanation = document.getElementById('explanation');
    
    if (selectedIndex === correctIndex) {
        resultMessage.textContent = '正解です！';
    } else {
        resultMessage.textContent = '残念、不正解です。';
    }
    
    explanation.textContent = quizData[currentQuestionIndex].explanation;
    document.getElementById('result').classList.remove('hidden');
}

// 最終結果表示関数
function showFinalResult() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('final-result').classList.remove('hidden');
    
    const scoreMessage = document.getElementById('score-message');
    scoreMessage.textContent = `${quizData.length}問中${score}問正解しました！`;
    
    let feedbackMessage = '';
    if (score === quizData.length) {
        feedbackMessage = '素晴らしい！あなたは阪堺鉄道の歴史博士です！';
    } else if (score >= quizData.length / 2) {
        feedbackMessage = 'よくできました！鉄道の歴史に詳しいですね。';
    } else {
        feedbackMessage = '鉄道の歴史はとても興味深いです。もう一度挑戦してみましょう！';
    }
    
    const feedbackElement = document.createElement('p');
    feedbackElement.textContent = feedbackMessage;
    document.getElementById('final-result').appendChild(feedbackElement);
}