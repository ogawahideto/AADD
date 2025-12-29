# AADD 自動実行セットアップガイド

このガイドでは、AADDを毎日自動実行するための設定方法を説明します。

## 📋 前提条件

- Windows 10/11
- Python 3.11以上がインストール済み
- 仮想環境(venv)が作成済み
- Claude API キーが.envに設定済み

## 🚀 セットアップ方法

### 方法1: PowerShellスクリプトで自動設定（推奨）

1. **PowerShellを管理者権限で起動**
   - スタートメニューで「PowerShell」を検索
   - 右クリック → 「管理者として実行」

2. **実行ポリシーを一時的に変更**（初回のみ）
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   ```

3. **セットアップスクリプトを実行**
   ```powershell
   cd <AADDプロジェクトのパス>\scripts
   .\setup_task_scheduler.ps1
   ```
   例: `cd C:\path\to\AADD\scripts`

4. **完了！**
   - タスクが作成され、毎日9:00に自動実行されます

### 方法2: 手動でタスクスケジューラに設定

1. **タスクスケジューラを開く**
   - `Win + R` → `taskschd.msc` と入力 → Enter

2. **新しいタスクを作成**
   - 右クリック → 「タスクの作成」

3. **全般タブ**
   - 名前: `AADD-DailyRun`
   - 説明: `Automated Anniversary-Driven Development - Daily execution`
   - ✅ 最上位の特権で実行する

4. **トリガータブ**
   - 「新規」をクリック
   - タスクの開始: `スケジュールに従う`
   - 設定: `毎日`
   - 開始時刻: `午前 9:00`
   - ✅ 有効

5. **操作タブ**
   - 「新規」をクリック
   - 操作: `プログラムの開始`
   - プログラム/スクリプト: `<AADDプロジェクトのパス>\scripts\run_aadd.bat`
   - 開始: `<AADDプロジェクトのパス>`
   - 例: `C:\path\to\AADD\scripts\run_aadd.bat`

6. **条件タブ**
   - ✅ タスクを実行するためにスリープを解除する
   - ✅ 次のネットワーク接続が使用可能な場合のみタスクを開始する

7. **設定タブ**
   - ✅ タスクが失敗した場合の再起動の間隔: `1分`
   - ✅ 再起動の試行回数: `3回`
   - 実行時間の制限: `1時間`

8. **OK をクリックして保存**

## 🧪 テスト方法

### バッチファイルを直接実行してテスト

```cmd
cd <AADDプロジェクトのパス>\scripts
test_run.bat
```

### タスクスケジューラから手動実行

1. タスクスケジューラを開く
2. `AADD-DailyRun` を探す
3. 右クリック → 「実行」

### PowerShellから手動実行

```powershell
Start-ScheduledTask -TaskName "AADD-DailyRun"
```

## 📊 実行状態の確認

### ログファイルを確認

```cmd
cd <AADDプロジェクトのパス>\logs
notepad aadd.log
```

### タスクの履歴を確認

1. タスクスケジューラを開く
2. `AADD-DailyRun` を選択
3. 下部の「履歴」タブを確認

### 最後の実行結果を確認

```powershell
Get-ScheduledTask -TaskName "AADD-DailyRun" | Get-ScheduledTaskInfo
```

## 🔧 トラブルシューティング

### タスクが実行されない場合

1. **ログを確認**
   ```cmd
   notepad <AADDプロジェクトのパス>\logs\aadd.log
   ```

2. **バッチファイルを手動実行**
   ```cmd
   <AADDプロジェクトのパス>\scripts\run_aadd.bat
   ```

3. **ネットワーク接続を確認**
   - タスクの条件でネットワーク接続が必要な場合、Wi-Fiがオンか確認

4. **PCの電源設定を確認**
   - スリープ状態でタスクが実行されるか確認
   - 必要に応じて「タスクを実行するためにスリープを解除する」を有効に

### APIキーエラーが出る場合

```cmd
notepad <AADDプロジェクトのパス>\.env
```
- `CLAUDE_API_KEY` が正しく設定されているか確認

### Git pushが失敗する場合

```cmd
cd <AADDプロジェクトのパス>
git config --global user.name "your-github-username"
git config --global user.email "your-email@example.com"
```

## ⚙️ 設定のカスタマイズ

### 実行時刻を変更したい場合

PowerShellで：
```powershell
$trigger = New-ScheduledTaskTrigger -Daily -At "14:00"  # 午後2時に変更
Set-ScheduledTask -TaskName "AADD-DailyRun" -Trigger $trigger
```

### タスクを無効化したい場合

```powershell
Disable-ScheduledTask -TaskName "AADD-DailyRun"
```

### タスクを再度有効化

```powershell
Enable-ScheduledTask -TaskName "AADD-DailyRun"
```

### タスクを削除

```powershell
Unregister-ScheduledTask -TaskName "AADD-DailyRun" -Confirm:$false
```

## 📧 通知設定（オプション）

実行結果をメールで受け取りたい場合は、`.env`に以下を追加：

```env
ENABLE_ERROR_EMAILS=true
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_TO=your-email@gmail.com
```

（注: この機能は実装する必要があります）

## 📝 推奨事項

- ✅ 週に1回はログを確認して、正常に動作しているか確認
- ✅ 月に1回は手動でテスト実行して、動作確認
- ✅ API使用量を定期的に確認（Anthropic Console）
- ✅ GitHubリポジトリのコミット履歴を確認

## 🎉 完了！

これで、AADDが毎日自動的に実行され、新しい記念日アプリが生成されてGitHub Pagesに公開されます！
