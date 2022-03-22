/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                        
   Demo     https://johannwpli.github.io/tv-wall/   */

let /* set tv */

    widthDiff,
    heightDiff,
    docWidth,
    docHeight,

    siteUrl = 'https://johannwpli.github.io/tv-wall/',
    siteTitle = document.title,
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
    headPartArr = ['title', 'grid', 'menu'],

    cellTitle = '<label><a href="' + siteUrl +'">TV Wall</a>' +
      ' <a href="' + githubUrl + '">&copy;</a></label>',

    radioGrid = '',
    radioGridArr = [1, 2, 3, 4, 6, 8, 9, 12, 15, 16],
    radioGridDefault = 3,
    radioGridTablet = 4,
    radioGridDesktop = 12,

    radioMenu = '',
    radioMenuDefault = 'World',
    radioMenuShow = ['World', 'Taiwan', 'Ukraine'],

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
    tvSrc,

    /* menu    : { YouTube Video ID: title }
       tvSrcKey: { tvSrc:            tvtitle } */

    tvSrcObj = {
      World: {
        '-upyPouRrB8': 'Al Jazeera 🇶🇦 Qatar',
        'w_Ma8oQLmSM': 'ABC 🇺🇸 United States',
        'XWq5kBlakcQ': 'CNA 🇸🇬 Singapore',
        'V9KZGs1MtP4': 'DW 🇩🇪 Germany',
        'sPgqEHsONK8': 'euronews 🇵🇹 Portugal',
        'h3MuIUNCCzI': 'FRANCE 24 🇫🇷 France',
        '7fIU2aMImMQ': 'GB News 🇬🇧 United Kingdom',
        'f0lYkdA-Gtw': 'NHK 🇯🇵 Japan',
        'V0I5eglJMRI': 'RT 🇷🇺 Russia',
        '9Auq9mYxFEE': 'Sky News 🇬🇧 United Kingdom',
        'CV5Fooi8YJA': 'TRT 🇹🇷 Turkey',
        'DyCpI9tKY0g': 'WION 🇮🇳 India',
      },

      Taiwan: {
        'Qg9U06O2R-s': 'CCTV 央視 🇨🇳 China',
        'lu_BJKxqGnk': 'CTI 中天 🇨🇳 China?',
        'wM0g8EoUZ_E': 'CTS 華視 🇹🇼 Taiwan',
        'TCnaIE_SAtM': 'CTV 中視 🇹🇼 Taiwan',
        'R2iMq5LKXco': 'EBC 東森 🇹🇼 Taiwan',
        'yguQ1SzPM5U': 'FTV 民視 🇹🇼 Taiwan',
        'CKjSm5ZeehE': 'iNEWS 三立 🇹🇼 Taiwan',
        '4Uc00FPs27M': 'PTS 公視 🇹🇼 Taiwan',
        'FoBfXvlOR6I': 'SET 三立 🇹🇼 Taiwan',
        'xL0ch83RAK8': 'TTV 台視 🇹🇼 Taiwan',
        '2mCSYvcfhtc': 'TVBS 🇹🇼 Taiwan',
      },

      Ukraine: {
        'GhEjttMC_ls': 'Audionix',
        'fthTxdAUJ2E': 'DD Cyprus1Click',
        'v3v3_pESvrc': 'Inquizex',
        'iZebYm-nenY': 'Livestream Events',
        'fVeY6fQ_14Q': 'Lucas Mieli',
        '0Zy-EJuWr8M': 'Politischios.gr',
        '-c8GF8W59M0': 'RICIERG',
        'p40zMEYWn9U': 'SBK SHOW',
        'S8utklsSbaU': 'Sloth On Meth',
        'e2gC37ILQmk': 'TVL Trzcianka',
        'Yx-1gcrqMG8': 'VBMedia',
        'Z__toj8IHGM': 'Zabby',
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

    setTvWall = () => {
      document.querySelector('#tvWall')
        .insertAdjacentHTML('beforeEnd', `<form name="tvWall"></form>`)

      for(let i of wallPartArr) {
        document.querySelector('#tvWall form')
          .insertAdjacentHTML('beforeEnd', `<div id="${i}" class="table"></div>`)
      }
    },

    setHead = () => {
      document.querySelector('#head')
        .insertAdjacentHTML('beforeEnd', `<div class="row"></div>`)

      for(let i of headPartArr) {
        document.querySelector('#head .row')
          .insertAdjacentHTML('beforeEnd', `<div class="cell ${i}"></div>`)
      }
    },

    setTitle = () => {
      document.querySelector('.cell.title')
        .insertAdjacentHTML('beforeEnd', cellTitle)
    },

    setGrid = () => {
      document.querySelector('.cell.grid')
        .insertAdjacentHTML('afterBegin', `<label class="tablet">grid</label>`)

      for (let i of radioGridArr) {
        let j =
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
          //console.log(tvSrcArr.length)
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

      document.querySelector('.cell.grid')
        .insertAdjacentHTML('beforeEnd', radioGrid)

      document.querySelector(`input[value='${radioGridDefault}']`)
        .setAttribute('required','required')

      document.querySelector(`input[value='${radioGridDefault}']`)
        .setAttribute('checked','checked')

      gridRadio = document.tvWall.grid 
      gridChecked = document.querySelector('input[name="grid"]:checked') 
    },

    setMenu = () => {
      document.querySelector('.cell.menu')
        .insertAdjacentHTML('afterBegin', `<label class="tablet">menu</label>`)

      //console.log({tvSrcObj})
      //console.log({urlGridParam})
      //console.log({urlMenuParam})
      //console.log({radioMenuShow})

      for (let i in tvSrcObj) {
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

      document.querySelector('.cell.menu')
        .insertAdjacentHTML('beforeEnd', radioMenu)

      document.querySelector(`input[value='${radioMenuDefault}']`)
        .setAttribute('required','required')

      document.querySelector(`input[value='${radioMenuDefault}']`)
        .setAttribute('checked','checked')

      menuRadio = document.tvWall.menu 
      menuChecked = document.querySelector('input[name="menu"]:checked') 
    },

    setUrl = () => {
      newUrl = oldUrl + '?m=' + menuChecked.value + '&g=' + gridChecked.value
      //console.log({newUrl})
      window.history.pushState(newState, oldTitle, newUrl)
    },

    preset = () => {
      setTvWall()
      setHead()
      setTitle()
      setMenu()
      setGrid()
      setUrl()
    }

preset()
