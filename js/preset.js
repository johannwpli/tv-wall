/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                        
   Demo     https://johannwpli.github.io/tv-wall/   */

let
    /* set tv */

    tvWall = document.getElementById('tvWall'),

    widthDiff,
    heightDiff,
    docWidth,
    docHeight,

    siteAuthor = 'Johann Li',
    siteUrl = 'https://johannwpli.github.io/tv-wall/',
    siteTitle = document.title,
    siteName = 'TV Wall',
    githubUrl = 'https://github.com/johannwpli/tv-wall',

    urlSearchParams = new URLSearchParams(location.search),
    urlGridParam = urlSearchParams.get('g'),
    urlMenuParam = urlSearchParams.get('m'),

    oldUrl = location.pathname,
    oldTitle = siteTitle,
    newUrl,
    newTitle,
    newState = { additionalInformation: 'Updated the URL with JS' },

    wallPartArr = ['head', 'body'],
    headPartArr = ['title', 'grid', 'menu', 'lang'],

    cellTitle = `<label><a href="${siteUrl}" title="${siteTitle}" alt="${siteName}">${siteName}</a>&nbsp;<a href="${githubUrl}" title="copyright &copy; ${siteAuthor}" alt="&copy;">&copy;</a></label>`,

    radioGrid = '',
    radioGridArr = [1, 2, 3, 4, 6, 8, 9, 12, ], // 15, 16, 20, 24, 25,
    radioGridDefault = 3,
    radioGridTablet = 4,
    radioGridDesktop = 12,

    radioMenu = '',
    radioMenuDefault = 'World',
    //radioMenuShow = ['World', 'Taiwan', 'Ukraine'],
    radioMenuShow = ['World', 'Taiwan'],

    selectLang = '',
    selectLangObj = { 'en': 'English', 'zh': '繁體中文', 'jp': '日本語'},
    selectLangDefault = 'en',

    tvAllNumber,
    tvShortNumber,
    tvRowNumber,
    tvColNumber,
    tvWidth,
    tvHeight,

    tvHtml,
    tvTitle = 'YouTube video player',
    tvBorder = '0',
    tvAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    tvAllowfullscreen = 'allowfullscreen',

    tvSrcArr,
    tvRatio,
    tvSrcPrefix = 'https://www.youtube-nocookie.com/embed/',
    tvSrcKey,
    tvSrc

    /* menu    : { YouTube Video ID: channel }
       tvSrcKey: { tvSrc:            tvTitle } */

const tvSrcObj = {
      World: {
        'F-POY4Q0QSI': 'Al Jazeera, Qatar\nhttps://www.youtube.com/c/aljazeeraenglish',
        'w_Ma8oQLmSM': 'ABC, United States\nhttps://www.youtube.com/c/ABCNews',
        'XWq5kBlakcQ': 'CNA, Singapore\nhttps://www.youtube.com/user/channelnewsasia',
        'GE_SfNVNyqk': 'DW, Germany\nhttps://www.youtube.com/c/dwnews',
        'ntmPIzlkcJk': 'euronews, Portugal\nhttps://www.youtube.com/EuronewsUSA',
        'h3MuIUNCCzI': 'FRANCE 24, France\nhttps://www.youtube.com/c/FRANCE24English',
        '5SOmL-522CA': 'GB News, United Kingdom\nhttps://www.youtube.com/c/GBNewsOnline',
        'f0lYkdA-Gtw': 'NHK, Japan\nhttps://www.youtube.com/c/NHKWORLDJAPAN',
        //'V0I5eglJMRI': 'RT, Russia\n',
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
        '5n0y6b0Q25o': 'mnews 鏡新聞\nhttps://www.youtube.com/channel/UC4LjkybVKXCDlneVXlKAbmw',
        '4Uc00FPs27M': 'PTS 公視\nhttps://www.youtube.com/c/ptslivestream',
        'xL0ch83RAK8': 'TTV 台視\nhttps://www.youtube.com/c/ttvnewsview',
      },

      Ukraine: {
        '3NaALp5iZWI': 'Audionix',
        'q1yTYnX4E4A': 'DD Cyprus1Click',
        'vjTFWPVFyHk': 'e.hocamm web 1',
        'SIIpI0u7WMU': 'e.hocamm web 2',
        'KWByWZuJ3RI': 'Inquizex',
        'KXuDYZDyHEc': 'Ionatan Funny',
        'iZebYm-nenY': 'Livestream Events',
        'cNOb6TRy0Og': 'Lucas LiveStream',
        'l5M-ABHmyL0': 'Marble Marathon ASMR',
        'CTX_OWSFpYE': 'NÔMADE BR',
        '3hiyVq44pK8': 'SameWaveLength',
        'u-W1N-mlZKo': 'SBK SHOW',
        'FQyKozPMDsQ': 'Sloth On Meth',
        'Gb3Q8ttfXeQ': 'The Valkyrie',
        'e2gC37ILQmk': 'TVL Trzcianka',
        'uT6RDbXEBj4': 'VBMedia',
        '16NCx5MnBkk': 'War Stream',
        'T33IflAtPi0': 'Zabby',
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
      }
    },

    /* Get the closest number out of an array
       https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array#comment95981784_39942209 */

    getClosestGrid = goal => (a,b) => Math.abs(a - goal) < Math.abs(b - goal) ? a : b,

    setHtml = () => {
      /* set wall */

      tvWall.insertAdjacentHTML('beforeEnd', `<form name="tvWall"></form>`)

      for (const i of wallPartArr)
        document.querySelector('#tvWall form').insertAdjacentHTML('beforeEnd', `<div id="${i}" class="table"></div>`)

      /* set head */

      document.querySelector('#head').insertAdjacentHTML('beforeEnd', `<div class="row"></div>`)

      for (const i of headPartArr)
        document.querySelector('#head .row').insertAdjacentHTML('beforeEnd', `<div class="cell ${i}"></div>`)

      /*set title */

      document.querySelector('.cell.title').insertAdjacentHTML('beforeEnd', cellTitle)
    },

    setMenu = () => {
      document.querySelector('.cell.menu').insertAdjacentHTML('afterBegin', `<label class="tablet ${selectLangDefault}"></label>`)

      //console.log({tvSrcObj})
      //console.log({urlGridParam})
      //console.log({urlMenuParam})
      //console.log({radioMenuShow})

      for (const i in tvSrcObj) {
        if (radioMenuShow.includes(i))
          radioMenu +=
            `<label>` +
              `<input type="radio" name="menu" value="${i}" />` +
              `<span></span>` +
              `<span>${i}</span>` +
            `</label>`
      }

      if (urlMenuParam && urlMenuParam in tvSrcObj) {
        radioMenuDefault = urlMenuParam

        tvSrcKey = radioMenuDefault
        tvSrcArr = Object.keys(tvSrcObj[tvSrcKey])
        //console.log({tvSrcArr})

        if (!radioMenuShow.includes(urlMenuParam)) {
          radioMenu +=
            `<label>` +
              `<input type="radio" name="menu" value="${radioMenuDefault}" />` +
              urlMenuParam + 
            `</label>`
        }
      }

      //console.log({radioMenu})

      document.querySelector('.cell.menu').insertAdjacentHTML('beforeEnd', radioMenu)

      document.querySelector(`input[value='${radioMenuDefault}']`).setAttribute('required','required')

      document.querySelector(`input[value='${radioMenuDefault}']`).setAttribute('checked','checked')

      menuRadio = document.tvWall.menu 
      menuChecked = document.querySelector('input[name="menu"]:checked') 
    },

    setGrid = () => {
      document.querySelector('.cell.grid').insertAdjacentHTML('afterBegin', `<label class="tablet ${selectLangDefault}"></label>`)

      for (const i of radioGridArr) {
        const j =
          i >= radioGridDesktop
            ? 'desktop'
            :  i >= radioGridTablet
              ? 'tablet'
              : 'mobile'

        radioGrid +=
          `<label class="${j}">` +
             `<input type="radio" name="grid" value="${i}" />` +
             i +
          `</label>`
      }

      //console.log({urlGridParam})
      //console.log({radioGridArr})
      //console.log(radioGridArr.includes(urlGridParam))

      if (urlGridParam) {
        if (!isNaN(urlGridParam)) {
          //console.log(!isNaN(urlGridParam))
          radioGridDefault =
            radioGridArr.includes(urlGridParam)
              ? urlGridParam
              : radioGridArr.reduce(getClosestGrid(urlGridParam))
        }

        if (urlGridParam === 'all') {
          console.log(tvSrcArr.length)
          //console.log({radioGridArr})
          //console.log(radioGridArr[radioGridArr.length - 1])

          if (tvSrcArr.length >= radioGridArr[radioGridArr.length - 1]) {
            radioGridDefault = radioGridArr[radioGridArr.length - 1]
          }
          else {
            while (!radioGridArr.includes(tvSrcArr.length)) tvSrcArr.length++
            radioGridDefault = tvSrcArr.length
          }
        }

        //console.log({radioGridDefault})
      }

      //console.log({radioGrid})

      document.querySelector('.cell.grid').insertAdjacentHTML('beforeEnd', radioGrid)

      document.querySelector(`input[value='${radioGridDefault}']`).setAttribute('required','required')

      document.querySelector(`input[value='${radioGridDefault}']`).setAttribute('checked','checked')

      gridRadio = document.tvWall.grid 
      gridChecked = document.querySelector('input[name="grid"]:checked') 
    },

    setLang = () => {
      document.querySelector('.cell.lang').insertAdjacentHTML('afterBegin', `<select name="lang"></select>`)

      for (const i in selectLangObj)
        selectLang += `<option value="${i}">${selectLangObj[i]}</option>`

      document.querySelector('.cell.lang select').insertAdjacentHTML('beforeEnd', selectLang)
    },

    setUrl = () => {
      newUrl = oldUrl + '?m=' + menuChecked.value + '&g=' + gridChecked.value
      //console.log({newUrl})
      window.history.pushState(newState, oldTitle, newUrl)
    },

    preset = () => {
      setHtml()
      setMenu()
      setGrid() // has to be after setMenu()
      setLang()
      setUrl()
    }

preset()