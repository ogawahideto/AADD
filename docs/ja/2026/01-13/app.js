// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', () => {
    // スタートボタンのスクロール処理
    const startJourneyBtn = document.getElementById('start-journey');
    const introSection = document.getElementById('intro');
    
    startJourneyBtn.addEventListener('click', () => {
        introSection.scrollIntoView({ behavior: 'smooth' });
    });

    // タイムラインデータ
    const timelineData = {
        '1930年代': [
            {
                year: 1936,
                month: 1,
                day: 13,
                title: '初公演',
                description: '日劇ダンシングチームが東京・有楽町の日本劇場で初公演を行った。16人のダンサーによる革新的なショーは大成功を収め、連日満員の観客を集めた。',
                impact: '当時の新聞は「近代的な美の結晶」と絶賛。日本の舞台芸術に新たな時代が幕を開けた。'
            },
            {
                year: 1937,
                title: '全国ツアー開始',
                description: '人気に応えて初の全国ツアーを開催。大阪、名古屋、福岡など主要都市で公演を行い、「都会の華」として地方でも人気を博した。',
                impact: '東京中心だった西洋式エンターテインメントを全国に広める役割を果たした。'
            },
            {
                year: 1939,
                title: '映画デビュー',
                description: '松竹映画「東京の灯り」に出演。ダンスシーンは映画の見どころとなり、NDTの知名度をさらに高めた。',
                impact: '映像メディアへの進出により、より広い層にNDTの存在が知られるようになった。'
            }
        ],
        '1940年代': [
            {
                year: 1941,
                title: '戦時体制への移行',
                description: '太平洋戦争の開戦とともに、演目は「国民士気を高める」愛国的な内容に変更された。衣装も簡素化され、ダンサーの人数も減少した。',
                impact: '芸術とプロパガンダの境界が曖昧になる中、エンターテインメントとしての質を保つ難しい舵取りを迫られた。'
            },
            {
                year: 1945,
                title: '空襲と活動休止',
                description: '東京大空襲で日本劇場が被災。NDTは一時活動を休止した。メンバーの多くは疎開を余儀なくされた。',
                impact: '戦争の現実がエンターテインメントにも及んだ瞬間。多くの文化的資産が失われた。'
            },
            {
                year: 1947,
                title: '戦後の再出発',
                description: '占領下の日本で活動を再開。アメリカ軍向けの公演も行い、新たなスタイルのショーを展開した。',
                impact: '戦後日本の復興のシンボルとなり、日本人の心に明るさと希望をもたらした。'
            }
        ],
        '1950-60年代': [
            {
                year: 1952,
                title: '黄金期の到来',
                description: '日本の主権回復後、NDTは最盛期を迎える。メンバー数は80名を超え、年間公演数は1000回以上に達した。',
                impact: '「見たことがある」から「見に行った」エンターテインメントへ。日本人の余暇活動の定番となった。'
            },
            {
                year: 1958,
                title: 'テレビ進出',
                description: 'NHKの正月特別番組に出演し、テレビメディアに進出。以後、定期的にTV出演を重ねる。',
                impact: 'メディアミックスの先駆けとなり、エンターテインメント業界のビジネスモデルに影響を与えた。'
            },
            {
                year: 1964,
                title: '東京オリンピック',
                description: '東京オリンピックの開会式に特別参加。国際的な注目を集め、日本文化の使者としての役割を果たした。',
                impact: '日本の近代化と国際化を象徴するパフォーマンスとして高く評価された。'
            }
        ],
        '1970-80年代': [
            {
                year: 1970,
                title: '大阪万博出演',
                description: '大阪万博の日本館で特別ショーを開催。未来志向のモダンな演出で話題となった。',
                impact: '伝統と革新の融合という日本の文化政策の方向性を体現した。'
            },
            {
                year: 1977,
                title: '危機と変革',
                description: 'ディスコブームやアイドル文化の台頭により、観客層の変化に直面。演目を刷新し、より現代的なショーにシフトした。',
                impact: '「古き良きエンターテインメント」から「現代のスペクタクル」への転換点となった。'
            },
            {
                year: 1986,
                title: '創立50周年',
                description: '創立50周年を記念した特別公演を開催。歴代のスターダンサーが集結し、話題となった。',
                impact: '半世紀の文化的貢献が評価され、芸術選奨文部大臣賞を受賞。'
            }
        ],
        '1990年代〜現在': [
            {
                year: 1995,
                title: '阪神・淡路大震災チャリティ',
                description: '阪神・淡路大震災の被災者支援のためのチャリティ公演を開催。全国から観客が集まった。',
                impact: '芸術の社会貢献という新たな側面を示した。'
            },
            {
                year: 1996,
                title: '最終公演',
                description: '経営難と時代の変化により、60年の歴史に幕を下ろすことを決定。3か月にわたる最終公演シリーズは連日満員となった。',
                impact: '日本のエンターテインメント史上最も長く続いたダンスカンパニーの一つとして記録された。'
            },
            {
                year: 2026,
                title: '生誕90周年',
                description: '初公演から90年。元ダンサーや関係者によるNDT文化保存会が結成され、デジタルアーカイブや記念展示会などが計画されている。',
                impact: '日本の現代エンターテインメントのルーツとして、改めて文化史的価値が見直されている。'
            }
        ]
    };

    // 現在表示している年代
    let currentEraIndex = 0;
    const eras = Object.keys(timelineData);

    // タイムライン関連の要素
    const timeline = document.getElementById('timeline');
    const eventDetails = document.getElementById('event-details');
    const currentEraEl = document.getElementById('current-era');
    const prevEraBtn = document.getElementById('prev-era');
    const nextEraBtn = document.getElementById('next-era');

    // 年代切り替え関数
    function updateEra() {
        currentEraEl.textContent = eras[currentEraIndex];
        renderTimeline(eras[currentEraIndex]);

        // ボタンの有効/無効状態を更新
        prevEraBtn.disabled = currentEraIndex === 0;
        nextEraBtn.disabled = currentEraIndex === eras.length - 1;
        
        // 無効なボタンのスタイル調整
        prevEraBtn.style.opacity = prevEraBtn.disabled ? 0.3 : 1;
        nextEraBtn.style.opacity = nextEraBtn.disabled ? 0.3 : 1;
    }

    // イベント詳細表示関数
    function showEventDetails(event) {
        const content = `
            <h3>${event.year}年${event.month ? event.month + '月' : ''}${event.day ? event.day + '日' : ''}: ${event.title}</h3>
            <p>${event.description}</p>
            <p class="event-impact"><strong>影響:</strong> ${event.impact}</p>
        `;
        
        document.getElementById('event-content').innerHTML = content;
        
        // すべてのイベントの強調を解除し、クリックされたイベントのみ強調
        document.querySelectorAll('.timeline-event').forEach(el => {
            el.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    }

    // タイムライン描画関数
    function renderTimeline(era) {
        timeline.innerHTML = '';
        const events = timelineData[era];
        const timelineHeight = timeline.clientHeight;
        
        events.forEach((event, index) => {
            // イベントの位置を計算
            const position = (index / (events.length - 1)) * 100;
            const eventEl = document.createElement('div');
            eventEl.className = 'timeline-event';
            
            // モバイルでは左寄せ、デスクトップでは中央配置
            eventEl.style.left = window.innerWidth <= 768 ? '20px' : '50%';
            eventEl.style.top = `${position}%`;
            
            // イベントラベルを作成
            const labelEl = document.createElement('div');
            labelEl.className = 'event-label';
            labelEl.textContent = `${event.year}: ${event.title}`;
            
            // ラベルの位置を調整（上下交互に）
            if (window.innerWidth <= 768) {
                labelEl.style.left = '30px';
            } else {
                labelEl.style.transform = index % 2 === 0 ? 'translateX(-120%)' : 'translateX(20%)';
            }
            
            eventEl.appendChild(labelEl);
            
            // クリックイベントを追加
            eventEl.addEventListener('click', function(e) {
                showEventDetails(e);
            });
            
            timeline.appendChild(eventEl);
        });
    }

    // 年代切り替えボタンの設定
    prevEraBtn.addEventListener('click', () => {
        if (currentEraIndex > 0) {
            currentEraIndex--;
            updateEra();
        }
    });
    
    nextEraBtn.addEventListener('click', () => {
        if (currentEraIndex < eras.length - 1) {
            currentEraIndex++;
            updateEra();
        }
    });

    // 初期表示
    updateEra();
});