# TodoApp
人気ゲームLOBOTMY CORPORATION風に仕上げた「Todo」リストです。黒、少し蛍光がかった赤、薄い黄色といった色を基調とし、タスクの優先度や期限を危険度、収容期限といった風に書き換えています。選択肢ごとに色を変えるなどかなりこだわっています。

## 開発履歴

- 2024年10月24日：プロジェクト開始
  2024年11月25日:大まかなプログラム完成

##　開発時間

　約25時間

##　危険度について

危険度は優先度のこと
5段階でZAYIN(簡単)~ALEPH(難しい)となっている

##　開発談義

今回のプログラムを作るにあたり私は多くの壁を経験しました。私はIコースでありながらプログラムを描くことがあまり得意ではありません。ゆえに今回のプログラムも書き方や表現の仕方の理解にかなりの時間を要しました。授業で扱われたプログラムも何がどんなことを表しているのかがさっぱりという感じでした。そこで、授業で扱われたプログラムを細かく分割し、chatGPTに何度も質問してはプログラムにコメントアウトで内容や理解したことをメモするということを繰り返しました。実際にApp.tsxファイルを確認いただければ私のコメントアウトを確認していただけると思います。
今回のtodoリストを作成するにあたり苦労したことは、選択肢ごとに色を変えるところです。もちろん基礎的な部分の理解にもかなり苦しめられましたが選択肢ごとに色を分ける部分は中でも一番実装が大変でした。スタイルをhtml部分で変更できないためconstの部分でスタイルを定義し、html側に渡すといった作業が必要だったのですがなかなか指定した色に変化しなかったり、すべて同じ色になったりと踏んだり蹴ったりでした。苦労した分、正常に動作したときは本当にうれしかったです。
最後に振り返りと心残りについて。今回の課題は私にとってかなり大きな壁でした。プログラムの内容は何も理解していない状態から、プログラム内容を理解したうえでここまで持ってくるという経験は私の中で大きな一歩だったといえます。しっかりやってよかったと感じました。ただ、ほかの人と比べると作業時間と進捗がかみ合っていないかもしれません。もっと実装したい機能もありました。ですが、確かに私は一歩前に進んだのだという達成感は私の中に色濃く残っています。これからの活動にこの感覚がきっと役立ってくれるでしょう。

追記　期限が近づくとクリフォト暴走を起こすようにしたいな～

## ライセンス

MIT License

Copyright (c) 2024 Shou-K

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.