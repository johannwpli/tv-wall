/* menu    : { YouTube Video ID: channel }
    tvSrcKey: { tvSrc:            tvTitle } */

let
    tvSrcObj = {
        World: {
            'F-POY4Q0QSI': 'Al Jazeera, Qatar\nhttps://www.youtube.com/c/aljazeeraenglish',
            'w_Ma8oQLmSM': 'ABC, United States\nhttps://www.youtube.com/c/ABCNews',
            'XWq5kBlakcQ': 'CNA, Singapore\nhttps://www.youtube.com/user/channelnewsasia',
            'GE_SfNVNyqk': 'DW, Germany\nhttps://www.youtube.com/c/dwnews',
            'ntmPIzlkcJk': 'euronews, Portugal\nhttps://www.youtube.com/EuronewsUSA',
            'h3MuIUNCCzI': 'FRANCE 24, France\nhttps://www.youtube.com/c/FRANCE24English',
            '5SOmL-522CA': 'GB News, United Kingdom\nhttps://www.youtube.com/c/GBNewsOnline',
            'f0lYkdA-Gtw': 'NHK, Japan\nhttps://www.youtube.com/c/NHKWORLDJAPAN',
            //'V0I5eglJMRI': 'RT, Russia\n', // blocked by YouTube, https://twitter.com/googleeurope/status/1498572529409179648
            '9Auq9mYxFEE': 'Sky News, United Kingdom\nhttps://www.youtube.com/c/SkyNews',
            '5mL-OkdM7Tc': 'TRT, Turkey\nhttps://www.youtube.com/c/trtworld',
            'o3qZWSfkLXY': 'WION, India\nhttps://www.youtube.com/c/WION',
        },

        Taiwan: {
            '_QbRXRnHMVY': 'CTI 中天\nhttps://www.youtube.com/c/ctitv',
            'wM0g8EoUZ_E': 'CTS 華視\nhttps://www.youtube.com/c/CtsTw',
            'TCnaIE_SAtM': 'CTV 中視\nhttps://www.youtube.com/c/twctvnews',
            //'SBtGwNMfuf0': 'EBC 東森\nhttps://www.youtube.com/c/newsebc',
            //'jWtNbHdCKVo': 'FOCUS世界新聞\n',
            'ylYJSBUgaMA': 'FTV 民視\nhttps://www.youtube.com/c/FTVLIVE',
            'B7Zp3d6xXWw': 'Global News 寰宇\nhttps://www.youtube.com/c/%E5%AF%B0%E5%AE%87%E6%96%B0%E8%81%9E%E9%A0%BB%E9%81%93',
            'CKjSm5ZeehE': 'iNEWS 三立\nhttps://www.youtube.com/c/setmoney159',
            '5n0y6b0Q25o': 'mnews 鏡視\nhttps://www.youtube.com/channel/UC4LjkybVKXCDlneVXlKAbmw',
            '4Uc00FPs27M': 'PTS 公視\nhttps://www.youtube.com/c/ptslivestream',
            'xL0ch83RAK8': 'TTV 台視\nhttps://www.youtube.com/c/ttvnewsview',
        },

        Exotic: {
            'Rq8_WqE67SE': '裏切り者のレクイエム - ハセガワダイスケ(長谷川大輔) - Japanese',
            'rbfHY8mkhT8': '夕暮れの鳥 - 神聖かまってちゃん(神聖放逐樂隊) - Japanese',
            'sUW4dDWiz-A': '夕暮れの鳥 - 神聖かまってちゃん(神聖放逐樂隊) - Japanese',
            'SmDXanmSsUQ': 'Pieces - L\'Arc～en～Ciel - Japanese',
            'NJR8Inf77Ac': '너랑 나 - 아이유(IU) - Korean',
            'f_iQRO5BdCM': '너랑 나 - 아이유(IU) - Korean',
            'GQt03lkFQE4': '좋은 날 - 아이유(IU) - Korean',
            'jeqdYqsrsA0': '좋은 날 - 아이유(IU) - Korean',
            '3ql6lSe1E-M': 'My Heart - ACHA SEPTRIASA & IRWANSYAH - Indonesian',
        },

        IU: {
            'aERrdOMxXmQ': 'Last Fantasy',
            'XdPX3f58UwE': 'My old story',
            'QMLHUVL4boE': 'You and I',
            'cwsZWrYDY9A': 'Twenty-three 二十三',
            'cJcF5V1_Kck': 'FRIDAY Feat. 張利貞 Of History',
            '_BR8-Qp4j5M': 'Through the Night 夜信',
            'yUKP0Rht2o4': 'Good Day 好日子',
            'v3-zV6wrbDU': 'Palette feat. G-DRAGON',
            'emJoiIMqB58': '只有我不知道的事',
            'lPffVN5lR6U': 'Every End of The Day 一天的盡頭',
            'NPXVXh4HIQE': 'Ending Scene 這樣的Ending',
        },

        Taiwanese: {
            '9gnqI0ygqWw': '青石願 - 黃鳳儀',
            'KEBoeE0PdJM': '青石願 - 黃鳳儀',
            'av-oi_OMM0g': '甘願的路 - 張涵雅',
            'ttFL9UvmuFc': '相思聲聲 - 黃妃',
            'O4vpXDfW9G8': '相思聲聲 - 黃妃',
            '36sZ1ubzZAk': '虞美人 - 黃妃',
            'YIk9XpSlxJ8': '虞美人 - 黃妃',
            '--Ux4aJaVg8': '我愛妳，再會 - 荒山亮',
            'ZDxyVedqjiQ': '我愛妳，再會 - 荒山亮',
            'JrTl0k8YPpE': '大千懺 - 蓮歌子',
            '0QpGmmGUxos': '愛你的是我 - 荒山亮 & 麗莎',
            'jLBn_S-f_iM': '愛你的是我 - 荒山亮 & 麗莎',
            'gpwztOjPcmg': '愛你的是我 - 愛妳的是我 & 蔡佳瑩',
            'dOjt0L5KI8U': '愛你的代價 - 方瑞娥 & 高向鵬',
        },

        Mandarin: {
            'WUJBg0JizrQ': '你那好冷的小手 - 銀霞',
            's2CE5n5W9D4': '偶然 - 銀霞',
            'UuWI37iWVio': 'RAIN - 范曉萱',
            '2B7U5WkhOiE': '雪人 - 范曉萱',
            'rAXmU300DRc': '心動 - 林曉培',
            'Ygr1OOh8hvI': '愛情 - 莫文蔚',
            '4QmDKohzQdc': '夢田農夫 - 熊天平',
            'UehlbisT5Gs': '如果不是因為你 - 林志炫',
            'EqBAV4i7d20': '傳奇 - 李健',
            'NA4otP-v6iI': '無與倫比的美麗 - 蘇打綠',
            'n-k-_jzcp7c': '美麗的神話 - 孫楠 & 韓紅',
            '22b1WnBg5LA': '堅強的理由 - 莫文蔚 & 伍佰',
        },

        Hsin: {
            'fHo4cmOembI': '',
            '9zIbGCdWIh4': '',
            'B1fUWSGvlsU': '',
            's2RQuTTn7os': '',
            'n-BMA_a8nM4': '',
            'ZJ6ZUj8R5uQ': '',
            'FHL-o1CJOnY': '',
            'FCOtL6RFN4Y': '',
            '2bCDBwyEhkc': '',
            '50sSQrHMeWM': '',
            'zs98k8eCrGU': '',
        },

        New: { 
        }
    }