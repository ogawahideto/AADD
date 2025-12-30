// タイムラインコンテンツの定義
const timelineEvents = [
  {
    year: "1944年",
    title: "ブレトンウッズ会議",
    description: "第二次世界大戦の終結前、44カ国の代表がアメリカのブレトンウッズに集まり、戦後の国際経済システムについて協議しました。ここで、IMFと世界銀行の設立が計画されました。"
  },
  {
    year: "1945年",
    title: "IMFと世界銀行の正式設立",
    description: "1945年12月27日、IMFと世界銀行が正式に設立され、新しい国際金融秩序の基礎が築かれました。最初の加盟国は29カ国でした。"
  },
  {
    year: "1947年",
    title: "最初の融資",
    description: "世界銀行は最初の融資としてフランスに2億5000万ドルを提供し、戦後復興を支援しました。これは現代の国際開発金融の始まりとなりました。"
  },
  {
    year: "1971年",
    title: "ブレトンウッズ体制の崩壊",
    description: "ニクソンショックにより、アメリカはドルと金の兌換を停止。固定相場制から変動相場制への移行が始まり、IMFの役割が大きく変化しました。"
  },
  {
    year: "1980年代",
    title: "構造調整プログラム",
    description: "債務危機に対応するため、IMFと世界銀行は多くの発展途上国に構造調整プログラムを導入。これらの政策は後に批判の対象となりました。"
  },
  {
    year: "1997年",
    title: "アジア金融危機",
    description: "タイから始まり東アジア全体に広がった金融危機。IMFの厳しい条件付き支援は議論を呼び、国際金融機関の役割について再考を促しました。"
  },
  {
    year: "2008年",
    title: "世界金融危機",
    description: "リーマンショックに始まる世界金融危機に対応するため、IMFは加盟国への緊急融資を拡大し、G20は世界的な経済協調の重要性を再確認しました。"
  },
  {
    year: "2020年",
    title: "COVID-19パンデミック対応",
    description: "新型コロナウイルスの経済的影響に対処するため、IMFと世界銀行は史上最大規模の緊急支援を提供し、最貧国の債務返済停止イニシアチブを支援しました。"
  },
  {
    year: "2025年",
    title: "設立80周年",
    description: "IMFと世界銀行は設立80周年を迎え、気候変動、デジタル通貨、経済格差などの新たな課題に対応するため、組織の現代化を継続しています。"
  }
];

// DOM要素の取得
const timelineBtn = document.getElementById("timeline-btn");
const timelineSection = document.getElementById("timeline-section");
const timelineContent = document.getElementById("timeline-content");
const prevBtn = document.getElementById("prev-event");
const nextBtn = document.getElementById("next-event");
const progressBar = document.getElementById("progress-bar");

// 現在のタイムラインインデックス
let currentIndex = 0;

// タイムラインの表示/非表示を切り替える
timelineBtn.addEventListener("click", () => {
  timelineSection.classList.toggle("hidden");
  
  // 初めて表示される場合は最初のイベントを表示
  if (!timelineSection.classList.contains("hidden") && !timelineContent.innerHTML) {
    showTimelineEvent(0);
  }
  
  // ボタンのスクロール位置にスクロール
  if (!timelineSection.classList.contains("hidden")) {
    timelineSection.scrollIntoView({ behavior: "smooth" });
  }
});

// 前のイベントを表示
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showTimelineEvent(currentIndex);
  }
});

// 次のイベントを表示
nextBtn.addEventListener("click", () => {
  if (currentIndex < timelineEvents.length - 1) {
    currentIndex++;
    showTimelineEvent(currentIndex);
  }
});

/**
 * 指定されたインデックスのタイムラインイベントを表示する
 * @param {number} index - 表示するイベントのインデックス
 */
function showTimelineEvent(index) {
  const event = timelineEvents[index];
  
  // タイムラインコンテンツを更新
  timelineContent.innerHTML = `
    <div class="timeline-item">
      <div class="timeline-year">${event.year}</div>
      <h3 class="timeline-title">${event.title}</h3>
      <p class="timeline-description">${event.description}</p>
    </div>
  `;
  
  // プログレスバーの更新
  const progress = ((index + 1) / timelineEvents.length) * 100;
  progressBar.style.width = `${progress}%`;
  
  // ナビゲーションボタンの状態更新
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === timelineEvents.length - 1;
  
  // アクセシビリティ対応：現在位置を示す
  timelineContent.setAttribute("aria-label", `タイムラインイベント ${index + 1}/${timelineEvents.length}: ${event.year} ${event.title}`);
}