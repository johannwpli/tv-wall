/* menu: [ {id, title, channel}, ... ]
tvSrcKey: [ {tvSrc, tvTitle, tvChannel}, ... ] */

let
    tvSrcObj = {
        World: [
            { id: 'gCNeDWCI0vo', title: 'Al Jazeera, Qatar', channel: 'https://www.youtube.com/c/aljazeeraenglish' },
            { id: 'vOTiJkg1voo', title: 'ABC News, Australia', channel: 'https://www.youtube.com/c/NewsOnABC' },
            { id: 'OOtxXPaQvoM', title: 'ABC News, United States', channel: 'https://www.youtube.com/@ABCNews' },
            { id: 'XWq5kBlakcQ', title: 'CNA, Singapore', channel: 'https://www.youtube.com/user/channelnewsasia' },
            { id: 'pqabxBKzZ6M', title: 'DW, Germany', channel: 'https://www.youtube.com/c/dwnews' },
            { id: 'pykpO5kQJ98', title: 'euronews, Portugal', channel: 'https://www.youtube.com/EuronewsUSA' },
            { id: 'tkDUSYHoKxE', title: 'FRANCE 24, France', channel: 'https://www.youtube.com/c/FRANCE24English' },
            { id: '8WX6YL9JnLw', title: 'GB News, United Kingdom', channel: 'https://www.youtube.com/c/GBNewsOnline' },
            // { id: 'lyeyoqwXm5o', title: 'India Today, India', channel: 'https://www.youtube.com/c/indiatoday' }, // alternative of NDTV
            { id: 'Nen3UXaWDDE', title: 'NDTV, India', channel: 'https://www.youtube.com/c/NDTV' },
            // { id: 'f0lYkdA-Gtw', title: 'NHK, Japan', channel: 'https://www.youtube.com/c/NHKWORLDJAPAN' }, // uniframeable
            // { id: 'V0I5eglJMRI', title: 'RT, Russia', channel: '' }, // blocked by YouTube, https://twitter.com/googleeurope/status/1498572529409179648
            { id: '9Auq9mYxFEE', title: 'Sky News, United Kingdom', channel: 'https://www.youtube.com/c/SkyNews' },
            { id: '5VF4aor94gw', title: 'TRT, Turkey', channel: 'https://www.youtube.com/c/trtworld' },
            { id: 'lmZRiDMK3OU', title: 'WION, India', channel: 'https://www.youtube.com/c/WION' },
        ],

        Taiwan: [
            { id: 'oIgbl7t0S_w', title: 'CTI 中天', channel: 'https://www.youtube.com/c/ctitv' },
            { id: 'wM0g8EoUZ_E', title: 'CTS 華視', channel: 'https://www.youtube.com/c/CtsTw' },
            { id: 'TCnaIE_SAtM', title: 'CTV 中視', channel: 'https://www.youtube.com/c/twctvnews' },
            { id: 'LbS-xQ67fos', title: 'EBC 東森', channel: 'https://www.youtube.com/c/57%E6%9D%B1%E6%A3%AE%E8%B2%A1%E7%B6%93%E6%96%B0%E8%81%9E' },
            { id: 'ylYJSBUgaMA', title: 'FTV 民視', channel: 'https://www.youtube.com/c/FTVLIVE' },
            { id: '6IquAgfvYmc', title: 'Global News 寰宇', channel: 'https://www.youtube.com/c/%E5%AF%B0%E5%AE%87%E6%96%B0%E8%81%9E%E9%A0%BB%E9%81%93' },
            { id: 'CKjSm5ZeehE', title: 'iNEWS 三立', channel: 'https://www.youtube.com/c/setmoney159' },
            { id: '5n0y6b0Q25o', title: 'mnews 鏡視', channel: 'https://www.youtube.com/channel/UC4LjkybVKXCDlneVXlKAbmw' },
            { id: 'C6gYqSHLRw4', title: 'PTS 公視', channel: 'https://www.youtube.com/c/ptslivestream' },
            // { id: 'xL0ch83RAK8', title: 'TTV 台視', channel: 'https://www.youtube.com/@TTV_NEWS' }, // uniframeable
            { id: 'm_dhMSvUCIc', title: 'TVBS', channel: 'https://www.youtube.com/@TVBSNEWS01' },
        ],

        IU: [
            { id: 'aERrdOMxXmQ', title: 'Last Fantasy' },
            { id: 'XdPX3f58UwE', title: 'My old story' },
            { id: 'QMLHUVL4boE', title: 'You and I' },
            { id: 'cwsZWrYDY9A', title: 'Twenty-three 二十三' },
            { id: 'cJcF5V1_Kck', title: 'FRIDAY Feat. 張利貞 Of History' },
            { id: '_BR8-Qp4j5M', title: 'Through the Night 夜信' },
            { id: 'yUKP0Rht2o4', title: 'Good Day 好日子' },
            { id: 'v3-zV6wrbDU', title: 'Palette feat. G-DRAGON' },
            { id: 'emJoiIMqB58', title: '只有我不知道的事' },
            { id: 'lPffVN5lR6U', title: 'Every End of The Day 一天的盡頭' },
            { id: 'NPXVXh4HIQE', title: 'Ending Scene 這樣的Ending' },
        ],

        Taiwanese: [
            { id: '9gnqI0ygqWw', title: '青石願 - 黃鳳儀' },
            { id: 'KEBoeE0PdJM', title: '青石願 - 黃鳳儀' },
            { id: 'av-oi_OMM0g', title: '甘願的路 - 張涵雅' },
            { id: 'ttFL9UvmuFc', title: '相思聲聲 - 黃妃' },
            { id: 'O4vpXDfW9G8', title: '相思聲聲 - 黃妃' },
            { id: '36sZ1ubzZAk', title: '虞美人 - 黃妃' },
            { id: 'YIk9XpSlxJ8', title: '虞美人 - 黃妃' },
            { id: '--Ux4aJaVg8', title: '我愛妳，再會 - 荒山亮' },
            { id: 'ZDxyVedqjiQ', title: '我愛妳，再會 - 荒山亮' },
            { id: 'JrTl0k8YPpE', title: '大千懺 - 蓮歌子' },
            { id: '0QpGmmGUxos', title: '愛你的是我 - 荒山亮 & 麗莎' },
            { id: 'jLBn_S-f_iM', title: '愛你的是我 - 荒山亮 & 麗莎' },
            { id: 'gpwztOjPcmg', title: '愛你的是我 - 荒山亮 & 蔡佳瑩' },
            { id: 'PrwhLvMOkqE', title: '真愛只有你 - 林姍 & 傅振輝' },
            { id: 'uFwqNrOXVgI', title: '無人來作伴 - 林姍 & 翁立友' },
            { id: 'dOjt0L5KI8U', title: '愛你的代價 - 方瑞娥 & 高向鵬' },
        ],

        Mandarin: [
            { id: 'WUJBg0JizrQ', title: '你那好冷的小手 - 銀霞' },
            { id: 's2CE5n5W9D4', title: '偶然 - 銀霞' },
            { id: 'UuWI37iWVio', title: 'RAIN - 范曉萱' },
            { id: '2B7U5WkhOiE', title: '雪人 - 范曉萱' },
            { id: 'rAXmU300DRc', title: '心動 - 林曉培' },
            { id: 'Ygr1OOh8hvI', title: '愛情 - 莫文蔚' },
            { id: '4QmDKohzQdc', title: '夢田農夫 - 熊天平' },
            { id: 'UehlbisT5Gs', title: '如果不是因為你 - 林志炫' },
            { id: 'EqBAV4i7d20', title: '傳奇 - 李健' },
            { id: 'NA4otP-v6iI', title: '無與倫比的美麗 - 蘇打綠' },
            { id: 'U1_ILHivgGE', title: '流星下的願 - 張學友 & 許慧欣' },
            { id: 'n-k-_jzcp7c', title: '美麗的神話 - 孫楠 & 韓紅' },
            { id: '22b1WnBg5LA', title: '堅強的理由 - 莫文蔚 & 伍佰' },
        ],

        Hsin: [
            { id: 'Cx8QCN5fGOg' },
            { id: 'fHo4cmOembI' },
            { id: '9zIbGCdWIh4' },
            { id: 'B1fUWSGvlsU' },
            { id: 's2RQuTTn7os' },
            { id: 'n-BMA_a8nM4' },
            { id: 'ZJ6ZUj8R5uQ' },
            { id: 'FHL-o1CJOnY' },
            { id: 'FCOtL6RFN4Y' },
            { id: '2bCDBwyEhkc' },
            { id: '50sSQrHMeWM' },
            { id: 'zs98k8eCrGU' },
        ],

        Kiki: [
            { id: '0T7GUHADUy8' },
            { id: 'lHUsygnbonE' },
            { id: 'w9HoEXxpFP4' },
            { id: 'tPJFgjiwz9U' },
            { id: 'wt8V98l51FA' },
            { id: 'SK5TsRLLmhc' },
            { id: 'TJ1VQS2wMds' },
            { id: 'GMIhhxjHc10' },
            { id: 'xJsYTsrTnD4' },
            { id: 'U4kg15WP-7w' },
        ],
    }
