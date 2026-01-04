// タイムラインのインタラクティブ機能
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
    const markers = document.querySelectorAll('.timeline-marker');
    const prevBtn = document.getElementById('timeline-prev');
    const nextBtn = document.getElementById('timeline-next');
    
    let activeIndex = 3; // 1948年の位置から開始
    
    // タイムラインマーカーの初期配置
    function initTimeline() {
        const totalMarkers = markers.length;
        markers.forEach((marker, index) => {
            // スクリーン中央を基準にした位置を計算
            const position = ((index - activeIndex) * 300) + (timeline.offsetWidth / 2);
            marker.style.left = `${position}px`;
            
            // アクティブな位置を設定
            if (index === activeIndex) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }
    
    // 次のマーカーへ移動
    function moveNext() {
        if (activeIndex < markers.length - 1) {
            activeIndex++;
            updateTimeline();
        }
    }
    
    // 前のマーカーへ移動
    function movePrev() {
        if (activeIndex > 0) {
            activeIndex--;
            updateTimeline();
        }
    }
    
    // タイムラインの位置を更新
    function updateTimeline() {
        markers.forEach((marker, index) => {
            // スクリーン中央を基準にした位置を計算
            const position = ((index - activeIndex) * 300) + (timeline.offsetWidth / 2);
            marker.style.left = `${position}px`;
            
            // アクティブな位置を設定
            if (index === activeIndex) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }
    
    // 各マーカーのクリックイベント
    markers.forEach((marker, index) => {
        marker.addEventListener('click', () => {
            activeIndex = index;
            updateTimeline();
        });
    });
    
    // 次へ・前へボタンのイベント
    nextBtn.addEventListener('click', moveNext);
    prevBtn.addEventListener('click', movePrev);
    
    // ウィンドウサイズ変更時にタイムラインを更新
    window.addEventListener('resize', initTimeline);
    
    // 初期化
    initTimeline();
    
    // 通信シミュレーターの機能
    const commBtns = document.querySelectorAll('.comm-btn');
    const methodTitle = document.getElementById('method-title');
    const methodDesc = document.getElementById('method-description');
    const timeValue = document.getElementById('time-value');
    const costValue = document.getElementById('cost-value');
    const reliabilityValue = document.getElementById('reliability-value');
    const transmissionIndicator = document.querySelector('.transmission-indicator');
    
    // 通信方法のデータ
    const communicationMethods = {
        letter: {
            title: '手紙による通信 (1900年頃)',
            description: '蒸気船で太平洋を渡る手紙。日本からアメリカまで、片道だけで何週間もかかりました。',
            time: '3〜4週間',
            cost: '現在の2,000円程度',
            reliability: '中程度 (天候や輸送手段に左右される)',
            animationDuration: 8000 // ミリ秒
        },
        telegram: {
            title: '電報 (1930年頃)',
            description: '電気信号を使って文字情報を送信。短い文章に限られ、料金は文字数で決まりました。',
            time: '数時間〜1日',
            cost: '現在の5,000〜10,000円程度（文字数による）',
            reliability: '良好',
            animationDuration: 3000
        },
        phone: {
            title: '国際電話 (1948年)',
            description: '1948年に開通した日米間の電話回線。リアルタイムの会話が初めて可能になりました。',
            time: 'ほぼリアルタイム（わずかな遅延あり）',
            cost: '3分間で現在の50,000円程度',
            reliability: '普通（天候や電波状態に影響される）',
            animationDuration: 500
        },
        satellite: {
            title: '衛星通信 (1970年頃)',
            description: '通信衛星を使った国際電話。品質と安定性が大幅に向上しました。',
            time: 'リアルタイム（0.5秒程度の遅延）',
            cost: '1分間で現在の2,000〜5,000円程度',
            reliability: '高い',
            animationDuration: 300
        },
        internet: {
            title: 'インターネット通話 (現代)',
            description: 'VoIPやビデオ通話アプリを使った通信。高品質で低コストのグローバル通信が実現。',
            time: 'ほぼリアルタイム',
            cost: '基本無料（インターネット接続費のみ）',
            reliability: '非常に高い（ネット環境による）',
            animationDuration: 100
        }
    };
    
    // 通信方法ボタンのクリックイベント
    commBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // アクティブボタンの切り替え
            commBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const method = btn.dataset.method;
            const data = communicationMethods[method];
            
            // 情報の更新
            methodTitle.textContent = data.title;
            methodDesc.textContent = data.description;
            timeValue.textContent = data.time;
            costValue.textContent = data.cost;
            reliabilityValue.textContent = data.reliability;
            
            // アニメーションの実行
            transmissionIndicator.style.opacity = '1';
            transmissionIndicator.style.transition = `left ${data.animationDuration}ms linear`;
            transmissionIndicator.style.left = '0%';
            
            setTimeout(() => {
                transmissionIndicator.style.left = '100%';
                
                // アニメーション完了後の処理
                setTimeout(() => {
                    transmissionIndicator.style.opacity = '0';
                    transmissionIndicator.style.transition = 'none';
                    transmissionIndicator.style.left = '0%';
                }, data.animationDuration);
            }, 100);
        });
    });
    
    // 初期状態では国際電話を選択
    document.querySelector('[data-method="phone"]').click();
});