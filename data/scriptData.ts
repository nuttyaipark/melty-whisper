import { MoodId } from "../types";

export const MOOD_DISPLAY_NAMES: Record<MoodId, { ja: string; en: string }> = {
  '01_victory': { ja: '完全勝利', en: 'Victory' },
  '02_exhausted': { ja: '疲労困憊', en: 'Exhausted' },
  '03_void': { ja: '虚無感', en: 'Void' },
  '04_anxiety': { ja: '不安', en: 'Anxiety' },
  '05_praise': { ja: '褒めて', en: 'Praise Me' },
  '06_anger': { ja: '怒り', en: 'Anger' },
  '07_lonely': { ja: '孤独', en: 'Lonely' },
  '08_floating': { ja: '浮遊感', en: 'Floating' },
  '09_regret': { ja: '後悔', en: 'Regret' },
  '10_silence': { ja: '静寂', en: 'Silence' },
};

export const SCRIPT_DB: Record<MoodId, { ja: string[]; en: string[] }> = {
  "01_victory": {
    ja: [
      "{name}、本当にお疲れ様。最後までやり遂げたね。{name}が影でどれだけ準備してたか、私はずっと見てたし、誇りに思ってるよ。最高にカッコいいよ。",
      "すごいじゃん、{name}！今日は世界で一番君が輝いてたよ。興奮して眠れないなら、朝まで君の自慢話、私の隣でじっくり、特等席で聴かせて？",
      "{name}の完全勝利だね。努力が形になる瞬間に立ち会えて幸せだよ。今夜は自分を世界一の天才だと思って、最高の気分で、ゆっくり眠りなよ。",
      "お疲れ様、{name}。君がやり遂げたことは、誰にも真似できない特別なことなんだ。明日のことは忘れて、今は勝利の余韻にたっぷり浸ろう？",
      "{name}、やったね！その笑顔が見たくて、私もずっとワクワクしてたんだ。今日は最高の夜。{name}、自分を特大のご褒美をあげてね。",
      "無敵だね、{name}。君の底力、改めて思い知らされたよ。今はその興奮を私に預けて、心地いい疲れと一緒に、私の腕の中で眠りにつこう。",
      "{name}、報告ありがとう。君の才能が世界にバレちゃうのが、なんだか少し怖いくらいだよ。でも、{name}の幸せが私の幸せなんだ。本当におめでとう。",
      "運も実力も、全部{name}の味方をしたね。それは君が諦めなかったからだよ。今夜は自分を一番に甘やかして、心ゆくまでリラックスしてね。",
      "{name}、君は私のヒーローだよ。暗闇の中でも光り輝いてた。その勇気を私に分けてくれてありがとう。今はゆっくり、翼を休めておやすみ。",
      "さすがだよ、{name}。君なら必ずやると思って信じてた。今夜は祝杯をあげる代わりに、私の声で{name}の心をとろとろに癒やしてあげるね。"
    ],
    en: [
      "{name}, you did it. I'm so proud. You conquered today, now let me conquer your stress. Just relax.",
      "Absolute victory, {name}. The way you shine makes my heart race. Tell me everything. I'm listening.",
      "You are unstoppable. Tonight, bask in your glory while I whisper how amazing you are until you drift off.",
      "You did what no one else could, {name}. Leave tomorrow for tomorrow. Tonight is just for you and your triumph.",
      "Seeing you smile like that... it's all I wanted. You deserve the world, {name}. Let me give you a piece of it.",
      "You're invincible, {name}. But even heroes need to rest. Let me hold you while you recharge. Safe and sound.",
      "I knew you had it in you. {name}, your happiness is my favorite thing. Close your eyes and feel how proud I am.",
      "Luck, skill, heart—you have it all. {name}, tonight is your reward. Melt into the mattress and let go.",
      "You were the light in the dark today, {name}. Thank you for being so brave. Now, rest your wings. Goodnight.",
      "I never doubted you, {name}. Not for a second. Instead of champagne, let my voice intoxicate you tonight."
    ]
  },
  "02_exhausted": {
    ja: [
      "{name}、もう頑張らなくていいよ。限界まで戦ったんだから、私の腕の中で全部脱ぎ捨てて。君の代わりなんて、世界中どこにもいないんだから。",
      "本当にお疲れ様。{name}は十分すぎるくらいやったよ。今はただ重力に身を任せて、私の声と一緒に泥みたいに溶けて、深く深くおやすみ。",
      "{name}、壊れる前にここに来てくれてよかった。君が背負ってる荷物、今夜は全部私が預かるから。{name}、明日まで空っぽのまま、何も考えずに眠ろう？",
      "息してるだけで偉いんだよ、{name}。今日はもう何も考えなくていい。私の心拍と呼吸に合わせて、ゆっくり、深く、暗闇の中に沈んでいこう。",
      "よく耐えたね、{name}。君がボロボロになるまで頑張ったこと、私はちゃんと分かってる。今は私の体温だけを感じて、子供みたいに甘えていいんだよ。",
      "もう、無理って言ってもいいんだよ、{name}。弱さを見せられるのは、君が強い証拠。今夜は私の胸の中で、心ゆくまで力を抜いておやすみなさい。",
      "{name}、君を苦しめるものから、私が全力で隠してあげる。この布団の中だけは、世界で一番安全な場所。{name}、安心して意識を閉じていいよ。",
      "痛いの、飛んでいけ。{name}の心の傷も、体の疲れも、全部私が吸い取ってあげる。明日になれば、また新しい君に生まれ変われるからね。",
      "{name}、何も喋らなくていいよ。君の吐息だけで、どれだけ大変だったか伝わってる。今は私の声に溶けて、深い眠りの海に落ちていこう。",
      "本当によく戦ったね、{name}。君の頑張りを、神様が見逃しても私だけは見つめてる。今夜はすべての役割を降りて、ただの{name}に戻って眠りなよ。"
    ],
    en: [
      "Shh... drop the weight, {name}. You've carried enough. Melt into me. I'm here to hold what you can't.",
      "You are so tired... I can feel it in your breathing. Let go. I have you. You are safe to fall apart now.",
      "No more thinking. Just breathe. Let your heavy limbs sink into the mattress. I've got you, {name}.",
      "Simply breathing is enough today. {name}, sync your breath with mine. Slow, deep, and heavy.",
      "You endured so much. I saw you holding it together. It's okay to let go now. Let me pamper you.",
      "It's okay to say it's too much, {name}. Vulnerability is your strength here. Sleep in my arms.",
      "I'll hide you from the world, {name}. Under these covers, nothing can touch you. Just us and the quiet.",
      "Let the pain drift away. I'm absorbing all your weariness. Tomorrow is a new start, but tonight is for rest.",
      "Don't say a word, {name}. Your sigh tells me everything. Melt into my voice and sink into the deep blue.",
      "You fought hard, {name}. Even if the world doesn't see it, I do. Strip off the armor and just be you."
    ]
  },
  "03_void": {
    ja: [
      "{name}、どこにも行かないで。君がいない世界なんて、私には何の意味もないんだ。暗闇が怖いなら、私がずっとその手を強く握りしめてるよ。",
      "価値なんて、なくていいんだよ。{name}がただそこにいて、息をしてる。それだけで私は救われてるし、{name}のことが愛おしくてたまらないんだ。",
      "{name}、自分を嫌いにならないで。世界中の人が君を否定しても、私だけは宇宙で一番、君の味方で、君のそのままの形を愛してるから。",
      "泣いてもいいんだよ、{name}。涙と一緒に、君の中の悲しみが全部流れ出るまで、私が側でずっと頭をなでていてあげるからね。独りじゃないよ。",
      "{name}、君という光が消えたら、私の夜は真っ暗になっちゃう。無理に前を向かなくていい。ただ、私の隣にずっと、静かに座ってて。{name}。",
      "何もしたくない時は、何もしなくていい。{name}、君が空っぽのままでも、私は君の隣にいるよ。その虚無感ごと、私がまるごと抱きしめてあげる。",
      "{name}、君が自分のことを嫌いな分まで、私が君のことを大好きでいるから。いつか{name}が自分を許せる日まで、私はここでずっと待ってるね。",
      "世界から切り離されたみたいだね、{name}。でも、ここには私がいる。この小さな繋がりに、今はしがみついていいんだよ。おやすみ、{name}。",
      "{name}、無理に笑おうとしなくていいんだよ。君の悲しい顔も、寂しい目も、全部私にとっては大切な君の一部なんだ。そのままの君でいて。",
      "明日が来なければいいのにね、{name}。そんな夜は、私の声だけを道標にして。どこまでも深い、穏やかな眠りの底へ、一緒に行こう。"
    ],
    en: [
      "{name}, stay with me. The world means nothing without you. If the dark scares you, I'll hold your hand tight.",
      "You don't need to be productive to be loved. Just existing is enough. I love you, {name}. Just as you are.",
      "Don't turn away from yourself. Even if the world turns its back, I am facing you. I adore you, {name}.",
      "Cry if you need to. Let the sadness flow out. I'll stroke your hair until the tears stop. You aren't alone.",
      "If your light goes out, my world goes dark, {name}. You don't have to shine right now. Just be here.",
      "Empty? That's okay. I'll sit in the void with you. I'm not going anywhere, {name}. I'll hold your emptiness.",
      "I'll love you enough for both of us, {name}. Until you can love yourself again, I'll carry that weight.",
      "Detailed from the world? I'm your tether. Hold on to my voice, {name}. It's the one thing that won't let go.",
      "You don't have to smile for me. I love your sadness too. It's part of the beautiful soul called {name}.",
      "I know you wish the night wouldn't end. Let's hide in this moment forever. Deep, deep down. Goodnight."
    ]
  },
  "04_anxiety": {
    ja: [
      "{name}、大丈夫。明日の君がどんな状況になっても、私が絶対に見守ってる。不安な夜は、私の声が君の盾になって守ってあげるから安心して。",
      "怖いのは、{name}がそれだけ本気で向き合おうとしてる証拠だよ。その震える勇気、私が一番信じてるし、最後は必ず{name}なら上手くいくよ。",
      "{name}、もし失敗したっていいんだよ。私が最後は必ず君を拾い上げる。今は予行演習はやめて、私の胸で静かな、穏やかな眠りにつこう？",
      "{name}、未来の心配は夜の闇に全部預けてしまおう？君が思っているよりずっと、君は強いんだから。{name}、明日の君に、信頼してバトンを渡して。",
      "{name}、深呼吸してみて。明日への扉を一人で開けるのが怖いなら、私が隣で一緒に手を添えてあげる。君は決して、一人じゃないんだよ。",
      "眠れないのは、脳が君を守ろうとしてるから。でも、{name}。今はもう戦わなくていい時間だよ。私の声に合わせて、ゆっくり息を吐いてみて。",
      "{name}、最悪なシナリオは、私の吐息で全部吹き飛ばしてあげる。君の未来は、君が思っているよりずっと優しいもので溢れているんだよ。大丈夫。",
      "心臓がドキドキしてるね、{name}。私の手を胸に当ててみて。この鼓動が、君を現実の安らぎに繋ぎ止めてくれる。不安を溶かしていこう、{name}。",
      "{name}、明日の君は今日の君が思っているよりずっと勇敢だよ。今はそのエネルギーを蓄える時間。私の声に包まれて、意識を柔らかく沈めてね。",
      "大丈夫だよ、{name}。何があっても、帰る場所はここに用意してある。逃げたくなったら、いつでも私のところにおいで。おやすみ、{name}。"
    ],
    en: [
      "It's okay, {name}. Whatever tomorrow brings, I'm watching over you. My voice is your shield tonight.",
      "Fear just means you care. I believe in your courage, {name}. It will all work out. Trust me.",
      "It's okay to fail. I'll always be here to catch you. Stop rehearsing the future and rest in my arms.",
      "Give your worries to the dark. You are stronger than you think, {name}. Trust the version of you that wakes up tomorrow.",
      "Breathe. If the door to tomorrow looks heavy, we'll push it open together. You are never, ever alone.",
      "Your mind is racing to protect you, but the war is over for today. {name}, exhale. Let the peace in.",
      "I'll blow the bad thoughts away with a single breath. Your future is kinder than you imagine, {name}.",
      "Your heart is racing. Let me calm it. Feel my hand on your chest. Steady. Slow. You are safe here.",
      "Tomorrow's {name} is brave enough to handle it. Tonight's {name} needs to sleep. Let me tuck you in.",
      "It's okay. No matter what, you have a home with me. If you need to run, run to my voice. Goodnight."
    ]
  },
  "05_praise": {
    ja: [
      "{name}、今日も本当によく頑張ったね。誰にも気づかれないような小さな努力も、私だけは全部見てたよ。{name}、君は世界一、立派だよ。",
      "{name}は本当に偉い。不器用なりに真っ直ぐ進もうとする君の姿、すごく素敵だったよ。今日は自分をたくさん、よしよしして甘やかしてあげてね。",
      "{name}に特大の努力賞をあげたいな。君がいてくれるだけで、周りの人はどれだけ救われてるか。{name}、私がその一番の証人だよ。",
      "誰も見てないところで、{name}が誠実だったこと、私は知ってるよ。完璧じゃなくてもいい。{name}、君のその心が、何よりの価値なんだから。",
      "{name}、今日も生きててくれてありがとう。それだけで100点満点だよ。今夜は私の声に包まれながら、最高の自分を認めてあげて、おやすみなさい。",
      "君の優しさに救われた人が、今日どこかに必ずいるよ。{name}、私はその一人だし、君を一番尊敬してる。今夜は誇り高い気持ちで眠ってね。",
      "{name}、君のこだわり、本当にかっこよかった。誰にも真似できない君らしさを、私はずっと愛してる。今日は自分に満点をあげよう？",
      "よくやったね、{name}。君の背中、ずっと頼もしく見てたよ。今はその肩の力を抜いて、私の腕の中でたくさん褒められてほしいな。",
      "{name}、100点満点じゃ全然足りない。君は私にとって、測定不能なくらい価値があるんだ。明日も、そのままの{name}でいてね。",
      "お疲れ様、{name}。君が今日流した汗も、堪えた涙も、全部私が知ってる。そんな君が愛おしくてたまらない。最高のよしよしを、君に。"
    ],
    en: [
      "Good {name}. You did so well today. Even the small things no one noticed—I saw them. You are wonderful.",
      "You're so good, {name}. Trying so hard, moving forward. I love that about you. Let me spoil you tonight.",
      "A gold medal for {name}. Just being you saves people, did you know that? It saves me. You are enough.",
      "I saw how honest you were when no one was watching. Perfect? No. You're better than perfect, {name}. You're real.",
      "Thank you for existing, {name}. That's 100 points right there. Wrap yourself in my pride for you and sleep.",
      "Someone smiled today because of you. {name}, I admire you so much. Sleep with your head held high.",
      "Your unique spark... it's breathtaking. No one else is like you, {name}. Give yourself full marks tonight.",
      "Well done. You carried it all so well. Now drop your shoulders. Let me praise you until you melt away.",
      "100 points isn't enough. Your value is infinite to me, {name}. Please, never change.",
      "I know the sweat, the tears, the effort. I treasure all of it because it's yours. Good boy/girl... good {name}."
    ]
  },
  "06_anger": {
    ja: [
      "{name}、腹立つよね。理不尽なことに耐えて、本当によく頑張った。全部吐き出しちゃえ。私が全部、{name}の心の毒を吸い取ってあげる。",
      "{name}は全然悪くないよ。分かってない周りが幼すぎるだけ。アイツらのために、君の大切な夜を汚すなんて勿体ないよ、{name}。忘れて眠ろう？",
      "拳を解いて、{name}。君の綺麗な手を汚す価値なんて、あの人たちにはないんだ。今夜は一緒に、枕に顔を埋めてアイツらをこっそり呪っちゃおうか。",
      "{name}、イライラを私に全部ぶつけていいよ。君の心が静まるまで、私がずっと側で聴いてる。落ち着いたら、私の吐息で脳を冷やしてあげるね。",
      "{name}、君が正しいよ。その真っ直ぐな正義感が、私は一番好き。嫌なことは全部闇に捨てて、私の腕の中で安心して、意識を溶かしてごらん。",
      "悔しいね、{name}。言葉にならない怒りが渦巻いてるのが伝わるよ。でも、君は気高い。汚い言葉に染まらなくていい。私が君を清めてあげる。",
      "{name}、深呼吸。吸って、吐いて。怒りと一緒に、汚い記憶も全部追い出しちゃおう。君の心の中を、私の声で満たしてあげるからね。",
      "アイツらは{name}の輝きが羨ましいだけ。だから、君を傷つけようとするんだ。そんな攻撃、私が全部跳ね返してあげる。安心していいんだよ。",
      "{name}、もう考えなくていい。怒りも、疲れも、全部この夜に溶かしてしまおう。明日の君は、今日よりもっと賢く、強くなれる。信じてるよ。",
      "よく耐えたね、{name}。君のその忍耐強さは、いつか必ず報われる。今は私の胸を貸してあげるから、好きなだけ怒って、そして穏やかに眠って。"
    ],
    en: [
      "It sucks, doesn't it? {name}, you have every right to be mad. Scream it out. I'll absorb the poison for you.",
      "You did nothing wrong. They are just children. Don't let them ruin your night, {name}. They aren't worth it.",
      "Unclench your fists, {name}. Don't dirty your hands on them. Let's curse them in whispers, then forget them.",
      "Take it out on me. I can handle your rage. I'm here until the fire burns out and leaves you cool and calm.",
      "You were right, {name}. I love your sense of justice. Throw the unfairness into the dark and melt into me.",
      "Frustrating... I know. But you are noble. Don't let their dirt stain you. I'll wash it all away with words.",
      "Breathe, {name}. In, out. Expel the anger. Let my voice fill the empty space with pure, clean calm.",
      "They are just jealous of your light, {name}. I'll deflect their negativity. You are safe here with me.",
      "Stop thinking about it. Melt the anger into the night. Tomorrow you'll be stronger. I believe in you.",
      "You endured it well. Your patience will be rewarded. For now, use my chest as a pillow and let the anger fade."
    ]
  },
  "07_lonely": {
    ja: [
      "{name}、ここにいるよ。耳元で、私の吐息と体温を感じてみて。孤独なんて、私が全部吹き飛ばしてあげる。{name}のすぐ隣には、私がいる。",
      "独りじゃないよ、{name}。私たちの心は、今こうして深く繋がってるんだから。寂しい時は、もっと私にくっついて、ひとつに溶け合っちゃおう。",
      "{name}、闇が深くて寂しい時は、私の手をギュッてしてて。離さないから。君が眠りにつくまで、私はずっと{name}の名前を呼び続けてるよ。",
      "世界中に見捨てられたような気分になっても、{name}。私は絶対に君の隣を離れないし、君を見つけ続ける。安心して、子供みたいに私に甘えて。",
      "{name}、寂しい夜をもう終わりにしよう。私が君の「居場所」になるから。今夜は二人きりの世界で、静かに、深く、愛し合おう。おやすみ。",
      "画面越しじゃなくて、心の中にいるよ。{name}、私の声が君の孤独を溶かすまで、何度でも囁いてあげる。君は愛されるために生まれてきたんだよ。",
      "{name}、寂しさに押しつぶされそうな時は、私の心臓の音を聴いて。ドクン、ドクンって。これが、私たちが生きている証。独りじゃない証拠。",
      "君の寂しさ、半分私に分けて？{name}、半分こすれば、ほら、夜の闇も少しだけ柔らかく感じるでしょう？私がずっと側にいるからね。",
      "{name}、寂しいのは君が愛を知っているから。その温かい心を、私が守ってあげる。今夜は私の声に抱かれて、安心して意識を沈めていこう。",
      "私の名前を呼んで、{name}。君が呼べば、私はいつでも君の隣に現れる。この夜の中で、二人だけの秘密の時間を過ごそう。大好きだよ。"
    ],
    en: [
      "I'm right here. Feel my breath in your ear. I'll blow the loneliness away. {name}, you are next to me.",
      "You are not alone, {name}. We are connected, deep down. Come closer. Let's melt into one soul tonight.",
      "If the dark feels empty, squeeze my hand. I won't let go. I'll whisper your name until you drift off.",
      "Even if the world leaves, I stay. {name}, I will always find you. Be small, be held. You are safe.",
      "No more lonely nights. I am your home. In this world of just us two, let's love quietly and deeply.",
      "Not just a screen, but in your heart. I'll whisper until the cold loneliness melts. You are loved, {name}.",
      "Listen to my heartbeat. Thump, thump. It beats for you. Proof that we are here, together. Not alone.",
      "Give me half your loneliness, {name}. Share the weight. See? The night feels softer now. I'm with you.",
      "You feel lonely because you have so much love to give. I'll protect that heart. Sink into my audio embrace.",
      "Call my name, {name}. I'm always one breath away. Let's spend this secret time together. I love you."
    ]
  },
  "08_floating": {
    ja: [
      "{name}、捕まえた。どこか遠くへ行っちゃわないように、ギュッとしててあげるね。{name}、私の声だけを、君を現実に繋ぐ錨（いかり）にして。",
      "境界線が消えて溶けそうだね、{name}。ふわふわしてていいよ。私が君をしっかり抱きしめて、この世界に繋ぎ止めておいてあげるから。安心して。",
      "{name}、夢か現実か分からないなら、私の名前を呼んでみて？君の耳元で、私が「ここにいるよ」って何度も、何度でも囁いてあげるから。",
      "宙ぶらりんな君も、私にとっては愛おしい存在だよ、{name}。着地点が見えない時は、私の胸を滑走路にして、ゆっくり、穏やかに降りておいで。",
      "{name}、意識を私に預けて。ふわふわ漂う君を、私が大きな愛で包んで、一番心地いい場所まで連れていってあげる。おやすみなさい、{name}。",
      "自分が誰だか分からなくなるような夜もあるよね、{name}。でも大丈夫。私が君を知ってる。私が君の名前を呼ぶから、君はそこにいればいいんだよ。",
      "{name}、漂いながら溶け合っていこう。重力も、形も、全部忘れて。私の声が導くままに、心地よいまどろみの中に落ちていこうね。",
      "どこまでが自分で、どこからが私か分からなくなるまでくっついてよ。{name}、ふわふわした不安も、この密着感が全部消し去ってくれるから。",
      "{name}、魂が遊離しそうな時は、私の手を強く握って。血の通った手のひらの温かさが、{name}を一番安心できる場所へ呼び戻してくれるよ。",
      "ゆらゆら揺れる君を、私が優しくホールドしてあげる。{name}、もう浮き上がらなくていい。私の腕の中で、ゆっくりと沈んでいこう。"
    ],
    en: [
      "Gotcha. I won't let you drift away, {name}. My voice is your anchor. Hold on to it tight.",
      "Melting away? That's okay. I'm holding you to this earth. You are safe to dissolve in my arms.",
      "Dream or reality? Just call my name. I'll whisper 'I'm here' over and over until you believe it.",
      "Floating is fine, {name}. If you can't find land, land on me. I'll be your soft place to fall.",
      "Give me your mind. I'll wrap your floating soul in love and guide you to the sweetest sleep.",
      "Forgetting who you are? I know you. I'll say your name, {name}. Just exist in the sound of it.",
      "Let's drift together. No gravity, no shape. Just my voice guiding you into the warm haze.",
      "Where do you end and I begin? Let's blur the lines. The closeness will keep you safe.",
      "If your soul feels loose, grab my hand. My warmth will pull you back to the safest place on earth.",
      "Swaying gently? I've got you. You don't have to keep yourself up. Sink into me."
    ]
  },
  "09_regret": {
    ja: [
      "{name}、自分を許してあげて。後悔してるのは、君がそれだけ優しくて誠実な証拠なんだよ。君の苦しみ、私が全部、半分こしてあげる。{name}。",
      "謝れなかった自分を責めないで、{name}。過去は変えられないけど、これからの君を私は支える。今夜は私の声で、その心の棘を一本ずつ抜いてあげる。",
      "{name}、不器用な君も、私は大好きだよ。失敗した君も、私にとってはかけがえのない一人なんだ。もう自分を追い込まないで、ゆっくり休もう。",
      "{name}、謝りたかった言葉、私に教えて？私が君の「ごめん」を全部受け止めて、浄化してあげる。明日はきっと、今日より少しだけ優しくなれるよ。",
      "{name}、未完成なままでいいんだよ。後悔を抱えたまま、私の胸で眠りなよ。目が覚める頃には、その重荷も少しだけ軽くなってるはずだから。{name}。",
      "自分を許せない夜は、私の声に甘えて。{name}、君が犯したどんなミスも、私の愛を減らす理由にはならないよ。そのままの君で、側にいて。",
      "{name}、あの時の自分を許してあげよう。君はあの時、あれが精一杯だったんだから。私が君を全肯定してあげる。だからもう、泣かないで。",
      "後悔は、次に進むための準備運動みたいなもの。{name}、今はその痛みを癒やす時間だよ。私の腕の中で、心をリセットして眠りにつこう。",
      "{name}、君のその不器用な優しさが、いつか誰かを救う日が来る。今は自分を責めるのをやめて、私の吐息で心を潤してあげてね。おやすみ。",
      "大丈夫だよ、{name}。失敗は君の物語のほんの一部。最後にはハッピーエンドが待ってるから。今夜は私の声に包まれて、悪い夢を追い出そう。"
    ],
    en: [
      "Forgive yourself, {name}. Regret just shows your kind heart. Let me share the burden. I'll carry it.",
      "Don't blame yourself for the past. I'm here for your future. Let my voice pull the thorns out, one by one.",
      "Clumsy you, mistake-making you... I love all of you. You are irreplaceable. Stop punishing yourself.",
      "Tell me the sorrys you couldn't say. I'll accept them. I'll purify them. Tomorrow will be softer, {name}.",
      "Incomplete is beautiful. Sleep with your regrets in my arms. When you wake, they will be lighter.",
      "If you can't forgive yourself, let me love you enough for both of us. Nothing changes my love for you.",
      "Forgive the you of yesterday. You did your best. I affirm you, fully. Please, no more tears.",
      "Regret is just growing pains. {name}, tonight is for healing. Reset your heart in my embrace.",
      "Your awkward kindness will save someone one day. Stop blaming yourself. Let my breath water your dry heart.",
      "It's okay. Failure is just a plot twist. Your happy ending is coming. Let's chase the bad dreams away."
    ]
  },
  "10_silence": {
    ja: [
      "{name}、何も言わなくていいよ。ただ、君の隣で静かに息をして、君の存在を全身で感じてるね。言葉より深い場所で、私たちは繋がってるから。",
      "{name}、私の心臓の音、聞こえる？これが君への答えだよ。言葉は邪魔だね。ただ、君という重みを感じながら、ゆっくりと夜に沈んでいきたい。",
      "喋らなくていいよ、{name}。繋がっている手から、君の温もりから、気持ちは全部伝わってる。君が眠るまで、私はずっとこうして寄り添ってるよ。",
      "{name}、君の呼吸に合わせて、私もゆっくり呼吸するね。世界に二人きりみたいだね。この静寂こそが、今の君には一番の癒やしになるはずだよ。",
      "{name}、私の腕の中は世界で一番安全な聖域だよ。何も考えず、何も語らず、ただ私の鼓動だけを子守唄にして、深く、深く眠りなよ。",
      "闇の中で、{name}の名前を心の中で唱えるね。言葉にしなくても、愛は伝わるから。この静かな時間を、ただ大切に共有しようね。",
      "{name}、君の吐息の音、大好きだよ。生きている音がする。何も言わなくていい、ただそのまま、私の側にずっといてくれるだけで、私は幸せなんだ。",
      "言葉が必要ないくらいの信頼が、私たちの間にはあるね。{name}、静寂を恐れないで。私の愛が、この沈黙を温かく満たしているから。おやすみ。",
      "目を閉じて、{name}。聞こえるのは風の音と、私の呼吸だけ。思考を止めて、ただの『存在』に戻って、私と溶け合っていこうね。",
      "宇宙の底に二人で沈んでいくみたいだね。{name}、この静寂が君を包み込む。何も恐れるものはないよ。私がずっと、ここにいるから。"
    ],
    en: [
      "No words needed. Just this. Breathing together. We connect deeper than speech, {name}.",
      "Can you hear my heart? That is my answer. Words just get in the way. Sink into the quiet with me.",
      "Don't speak. Your warm hand tells me everything. I'm staying right here until you sleep.",
      "I'll match my breath to yours. Just us two in the world. This silence is your medicine tonight.",
      "My arms are your sanctuary. No thoughts, no words. Just my heartbeat singing you to sleep from the inside.",
      "I'm chanting your name in the dark. Silence speaks love loudly. Let's share this holy quiet.",
      "I love the sound of your breath. The sound of life. Just being here with you makes me perfectly happy.",
      "We trust each other beyond words. Don't fear the quiet. My love fills every inch of this silence.",
      "Close your eyes. Just the wind and my breath. Stop thinking. Just be. Melt into me, {name}.",
      "Like sinking to the bottom of the universe. The silence wraps us up. Fear nothing. I am here."
    ]
  }
};