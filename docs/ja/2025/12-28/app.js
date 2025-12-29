// タイムラインデータ - 映画史の重要な瞬間
const timelineEvents = [
    {
        year: "1895",
        title: "世界初の商業映画上映",
        description: "リュミエール兄弟が12月28日、パリのグラン・カフェで世界初の商業映画上映会を開催。「工場の出口」「赤ちゃんの食事」など10本の短編が上映され、現代映画の誕生を告げました。"
    },
    {
        year: "1902",
        title: "物語映画の誕生",
        description: "ジョルジュ・メリエスが「月世界旅行」を制作。特殊効果と物語性を組み合わせた初のSF映画として、映画の新たな可能性を示しました。"
    },
    {
        year: "1915",
        title: "長編映画の登場",
        description: "D・W・グリフィスの「國民の創生」が公開。物議を醸す内容でしたが、編集技術とストーリーテリングの革新により映画は芸術として認められるようになりました。"
    },
    {
        year: "1927",
        title: "トーキー映画の時代へ",
        description: "「ジャズ・シンガー」が初のトーキー（音声付き）長編映画として公開。「映画に声を与えた」この作品は、サイレント映画時代の終わりを告げました。"
    },
    {
        year: "1939",
        title: "カラー映画の黄金期",
        description: "「オズの魔法使い」と「風と共に去りぬ」がテクニカラーの魅力を全世界に示し、カラー映画の時代の幕開けとなりました。"
    },
    {
        year: "1950-60年代",
        title: "世界的な映画運動",
        description: "フランスのヌーベルバーグ、イタリアのネオレアリズモ、日本の黒澤明など、世界各地で独自の映画文化が花開き、映画は国際的な芸術形式として確立しました。"
    },
    {
        year: "1977",
        title: "ブロックバスターの誕生",
        description: "「スター・ウォーズ」がスペシャルエフェクトとマーケティングを革新し、現代のフランチャイズ映画ビジネスモデルの基礎を築きました。"
    },
    {
        year: "1995",
        title: "デジタル時代の幕開け",
        description: "「トイ・ストーリー」が世界初のフルCGアニメーション長編として公開。デジタル技術が映画製作の新たな可能性を切り開きました。"
    },
    {
        year: "2010年代",
        title: "ストリーミング革命",
        description: "Netflixなどのストリーミングサービスが映画の配給と視聴方法を変革。パンデミック時には映画館からオンライン配信への移行が加速しました。"
    },
    {
        year: "2025",
        title: "映画130周年",
        description: "リュミエール兄弟の初上映から130年。AR/VR技術や人工知能の進化により、映画はさらに新たな時代へと進化し続けています。"
    }
];

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', () => {
    // 変数の初期化
    const themeToggle = document.getElementById('themeToggle');
    const timelineContent = document.getElementById('timelineContent');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const timelineProgress = document.getElementById('timelineProgress');
    
    let currentEventIndex = 0;
    const totalEvents = timelineEvents.length;
    
    // テーマ切り替え機能
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            toggleTheme();
        }
    });
    
    // システム設定のダークモード検出
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // タイムラインイベントをDOMに追加
    timelineEvents.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = `timeline-event ${index === 0 ? 'active' : ''}`;
        
        eventElement.innerHTML = `
            <h3><span class="timeline-year">${event.year}</span> ${event.title}</h3>
            <div class="timeline-image">映像・写真の代わりに想像力を働かせてください。${event.title}の様子を思い浮かべてみましょう。</div>
            <p>${event.description}</p>
        `;
        
        timelineContent.appendChild(eventElement);
    });
    
    // タイムラインナビゲーション
    prevBtn.addEventListener('click', showPreviousEvent);
    nextBtn.addEventListener('click', showNextEvent);
    
    // 進行状況の更新
    updateProgress();
    
    // キーボードナビゲーション
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showPreviousEvent();
        } else if (e.key === 'ArrowRight') {
            showNextEvent();
        }
    });
    
    // 関数定義
    
    // テーマ切り替え関数
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', 'dark');
        }
    }
    
    // 前のイベントを表示
    function showPreviousEvent() {
        if (currentEventIndex > 0) {
            const currentEvent = document.querySelectorAll('.timeline-event')[currentEventIndex];
            currentEvent.classList.remove('active');
            
            currentEventIndex--;
            
            const prevEvent = document.querySelectorAll('.timeline-event')[currentEventIndex];
            prevEvent.classList.add('active');
            
            updateProgress();
        }
    }
    
    // 次のイベントを表示
    function showNextEvent() {
        if (currentEventIndex < totalEvents - 1) {
            const currentEvent = document.querySelectorAll('.timeline-event')[currentEventIndex];
            currentEvent.classList.remove('active');
            
            currentEventIndex++;
            
            const nextEvent = document.querySelectorAll('.timeline-event')[currentEventIndex];
            nextEvent.classList.add('active');
            
            updateProgress();
        }
    }
    
    // 進行状況インジケーターの更新
    function updateProgress() {
        const progressPercentage = (currentEventIndex / (totalEvents - 1)) * 100;
        timelineProgress.style.width = `${progressPercentage}%`;
        
        // ボタンの状態を更新
        prevBtn.disabled = currentEventIndex === 0;
        nextBtn.disabled = currentEventIndex === totalEvents - 1;
        
        // 視覚的なフィードバック
        prevBtn.style.opacity = currentEventIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentEventIndex === totalEvents - 1 ? '0.5' : '1';
    }
});