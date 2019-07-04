# Bit Coin Price Index

[![Build Status](https://travis-ci.org/myLifeAsaDog/bitcoin.svg?branch=master)](https://travis-ci.org/myLifeAsaDog/bitcoin)

BitCoin の１ケ月の変動チャートを日本円で表示

## Used Libraries

- [VueJS](https://jp.vuejs.org/index.html)
- [chartJS](http://www.chartjs.org/)
- [axios](https://github.com/mzabriskie/axios)

## Used data

- [coindesk](https://www.coindesk.com/api/)

## Notes

BotCoin の1ケ月の変動チャートを作成してみた、coindesk を選んだのは1ケ月分の値を提供しているAPIが意外ににも少なくて、たまたま見つけたのがここだったから。

別に React でもよかったのだが勉強用に VueJS と axios を使ってみた、VueJS は初期の学習子コストの低さと、使い方の柔軟性をアピールするあまり、逆に単一コンポーネントでの組み方のサンプルが少なすぎるように感じた、ここら辺は逆にほとんどやり方が固定されている React の方が情報が多くて便利かもしれない。

axios は async/await と併用したため恐ろしく便利だが、async/awaitを使うとUglifyJSがそのままだと使えない上に、頑張って使ってもWARNが出まくるという悲しみがある。

chartJSは、依存が少なく簡単に使えるしカスタムの自由度も高いが、カスタムの仕方についてはドキュメントが異常に分かりにくいのでビビる。
