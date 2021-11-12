# TexTageでランダムガチャの配置を確認するやつ

スマホでも使えるBookmarklet版が出来ました→ [Textage-RandomSetBookmarklet](https://fusisan.github.io/TexTage-RandomSetBookmarklet/)

## 概要

beatmania IIDX 29 CastHour でランダムレーンチケット機能が追加されました。

引いたチケットがどの譜面で有効かを確認しやすくするためにこの拡張機能を作成しました。

[TexTage](https://textage.cc/)様で公開されている譜面ページに任意の配置を適用するボタンを追加します。

## 注意事項

この拡張機能を導入することで起こったあらゆる事について TexTage 様に問い合わせるのはお止めください。

## インストール方法

1. [Releases](https://github.com/fusisan/Textage-RandomSetExtention/releases) ページから最新版の Source code (zip) をダウンロード
2. ダウンロードした zipファイルを任意のフォルダに展開
3. Chrome の`拡張機能`>`デベロッパーモード`を有効化し`パッケージ化されていない拡張機能を読み込む`を選択
4. 2.で展開したフォルダを選択

## 使い方

1. 拡張機能欄から本拡張機能のアイコンをクリックし入力欄に任意の配置を半角数字で入力する。
2. `配置を保存`をクリックする。
3. TexTage の譜面ページにアクセスする。
4. 画面下部に表示されている任意の配置のボタンをクリックする。

## 最大保存件数の変更方法

`popup` フォルダにある `options.html` をメモ帳等で開き、下記の式に沿って `maxlength` の値を修正して下さい。

式 : ( 入力したい最大件数 \* 8 ) - 1

例: 10 件 →79 , 20 件 →159 , 30 件 →239

```html
<textarea id="input_random_pattern" rows="20" cols="20" maxlength="159" wrap="OFF"></textarea>
```



また、`rows`を修正する事で入力欄の表示行数を変更する事ができます。

## 更新履歴

### v0.0.4 2021-11-02
- DPの非ランダム譜面で2P側にランダムを掛けた時に正しくURLを生成できない不具合を修正
### v0.0.3 2021-10-31
- DPのFLIP適用時に動作するように修正 (@ravelll PullRequest thx!)

### v0.0.2 2021-10-30

- DP に対応
- 公式サイトから一覧からコピーした配置の貼り付け対応(有効期限除去)
- 配置の最大保存件数を 10 件 → 20 件に変更,README に件数の追加方法を追記

### v0.0.1 2021-10-28

- SP のみ対応
