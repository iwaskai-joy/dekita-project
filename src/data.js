export const years = [{ year: 2026, participants: 121 }];
export const courses = [
 {id:'all',name:'すべて',color:'#203054',icon:'✦'},
 {id:'vocal',name:'ボーカル',color:'#f34e98',icon:'♫'},
 {id:'piano',name:'ピアノ',color:'#df9360',icon:'♬'},
 {id:'guitar',name:'ギター',color:'#26a4df',icon:'♬'},
 {id:'ukulele',name:'ウクレレ',color:'#c59030',icon:'♪'},
 {id:'voice',name:'ボイス',color:'#6986d5',icon:'♩'},
 {id:'anison',name:'アニソン・ボカロ',color:'#d368bb',icon:'♫'},
 {id:'vtuber',name:'VTuber',color:'#9562e9',icon:'✧'},
 {id:'dtm',name:'作曲・DTM',color:'#29bc94',icon:'♩'},
 {id:'unassigned',name:'コース未登録',color:'#7b879a',icon:'○'},
];
export const getCourse = id => courses.find(c=>c.id===id && c.id!=='all') || courses.find(c=>c.id==='unassigned');
// All profiles and reports below are fictional examples. Avatars are decorative.
export const stories = [
 {id:1,course:'vocal',year:2026,name:'はるか',goal:'好きな曲を、原曲のキーで歌いたい。',report:'サビが近づくと緊張していた私。呼吸を意識して少しずつ練習を重ねたら、憧れの高音が出せました！ いまは歌うのが前よりもっと楽しいです。'},
 {id:2,course:'guitar',year:2026,name:'そうた',goal:'大好きな曲を、一曲通して弾く。',report:'難しいところをゆっくり、何度も練習しました。はじめて最後まで止まらず弾けたとき、思わず「できた！」と声が出ました。'},
 {id:3,course:'dtm',year:2026,name:'りん',goal:'自分だけのオリジナル曲をつくりたい。',report:'思いついたメロディーに少しずつ音を重ねて、はじめての一曲が完成しました。頭の中の音楽が形になって、うれしいです！'},
 {id:4,course:'vtuber',year:2026,name:'星乃ゆめ',goal:'自分らしい声で、歌配信に挑戦する。',report:'短い歌を録って聴き返しながら練習しました。ドキドキしたけれど、はじめて配信で歌うことができました。'},
 {id:5,course:'vocal',year:2026,name:'みお',goal:'緊張しても、人前で一曲歌う。',report:null},
 {id:6,course:null,year:2026,name:'けん',goal:'苦手なコードをきれいに鳴らしたい。',report:null},
 {"id": 7, "course": "vocal", "year": 2026, "name": "こはる", "goal": "息継ぎを整えて、長いフレーズを歌いきりたい。", "report": "すぐに息が足りなくなっていたフレーズを、最後まで歌えました。息を吸う場所を決めて練習したら、歌詞の気持ちにも集中できるようになりました。"},
 {"id": 8, "course": "guitar", "year": 2026, "name": "つばさ", "goal": "好きな曲で弾き語りに挑戦する。", "report": "ギターと歌を同時に続けるのが難しかったけれど、まずはゆっくり一節ずつ。週末に一曲録音できて、自分でも成長を感じました！"},
 {"id": 9, "course": "dtm", "year": 2026, "name": "なぎ", "goal": "一分間のオリジナルBGMを完成させたい。", "report": "短いメロディーから音を重ねて、散歩に合うBGMができました。音を足すだけでなく、引いてみることも大切だと気づきました。"},
 {"id": 10, "course": "vtuber", "year": 2026, "name": "月野しずく", "goal": "配信の最初のあいさつを、明るく伝えたい。", "report": "録音を聴き返しながら間の取り方を練習しました。最初のひと言を落ち着いて話せるようになって、配信を始める時間が楽しみになりました。"},
 {"id": 11, "course": "vocal", "year": 2026, "name": "あおい", "goal": "苦手な低い音も、無理なく響かせたい。", "report": "低いところで声が小さくなっていたのですが、姿勢と響きを意識して練習。好きな曲のAメロを、前より自然に歌えました。"},
 {"id": 12, "course": "guitar", "year": 2026, "name": "まめ", "goal": "リズムに乗ってストロークを続けたい。", "report": "メトロノームに合わせて短い練習を続けたら、テンポが揺れにくくなりました。一曲通してリズムを保てて、とてもうれしかったです。"},
 {"id": 13, "course": "dtm", "year": 2026, "name": "ゆず", "goal": "自分の声を録音して、曲に入れてみたい。", "report": "はじめは録音した自分の声が照れくさかったけれど、音量や響きを整えるうちに曲になじんできました。歌入りの作品を完成できました！"},
 {"id": 14, "course": "vtuber", "year": 2026, "name": "空音そら", "goal": "歌に気持ちを込めて、聴く人に届けたい。", "report": "歌詞の場面を想像して、言葉ごとに表現を考えました。歌い終わったあと、自分でも以前と違う手応えがあって、次の曲にも挑戦したくなりました。"},
 {"id": 15, "course": "vocal", "year": 2026, "name": "ひなた", "goal": "録音した歌を、自分で好きだと思えるようになりたい。", "report": "前は失敗したところばかり気になっていました。練習前後の録音を比べたら、声の伸びが変わっていて、自分の歌の好きなところを見つけられました。"},
 {"id": 16, "course": "guitar", "year": 2026, "name": "たく", "goal": "はじめてのアルペジオを一曲で使ってみたい。", "report": "指の順番を覚えるところから、少しずつ練習しました。やさしい音で伴奏できるようになり、同じ曲の新しい楽しさを発見しました。"},
 {"id": 17, "course": "dtm", "year": 2026, "name": "おと", "goal": "ドラムの打ち込みで、自分らしいリズムをつくる。", "report": "好きなリズムを参考にしながら、音の強弱を調整しました。できあがったビートにメロディーを乗せると、自然に体が動いてしまいました。"},
 {"id": 18, "course": "vtuber", "year": 2026, "name": "桃瀬もも", "goal": "緊張しても、最後まで朗読をやりきりたい。", "report": "声の高さや間を少しずつ変えながら練習して、短いお話を最後まで読めました。登場人物の気持ちを声で伝えるのが楽しくなりました。"},
 {"id": 19, "course": "vocal", "year": 2026, "name": "つむぎ", "goal": "歌の強弱をつけて、サビをもっと表現したい。", "report": "全部を同じ強さで歌わず、静かな部分を大切にしてみました。サビに向かう流れがつくれて、歌の景色が広がったように感じています。"},
 {"id": 20, "course": "guitar", "year": 2026, "name": "のん", "goal": "家族に一曲プレゼントしたい。", "report": "何度もつまずいた曲でしたが、毎日少しずつ弾き続けました。家族の前で最後まで弾けた日の拍手が、これからも練習したい気持ちにつながっています。"},
];
// null means not yet counted; 0 means a verified zero. Counts are independent of sample cards.
export const achievement = { year: 2026, reportedCount: 75, isSample: false, reportUrl: null };
