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
    headPartArr = ['title', 'grid', 'menu'],

    cellTitle = '<label><a href="' + siteUrl +'" title="' + siteTitle + '" alt="' + siteName+ '">' + siteName + '</a>&nbsp;<a href="' + githubUrl + '">&copy;</a></label>',

    radioGrid = '',
    //radioGridArr = [1, 2, 3, 4, 6, 8, 9, 12, 15, 16, 20, 24, 25],
    radioGridArr = [1, 2, 3, 4, 6, 8, 9, 12, ],
    radioGridDefault = 3,
    radioGridTablet = 4,
    radioGridDesktop = 12,

    radioMenu = '',
    radioMenuDefault = 'World',
    //radioMenuShow = ['World', 'Taiwan', 'Ukraine'],
    radioMenuShow = ['World', 'Taiwan'],

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
        'F-POY4Q0QSI': 'Al Jazeera, Qatar',
        'w_Ma8oQLmSM': 'ABC, United States',
        'XWq5kBlakcQ': 'CNA, Singapore',
        'GE_SfNVNyqk': 'DW, Germany',
        'sPgqEHsONK8': 'euronews, Portugal',
        'h3MuIUNCCzI': 'FRANCE 24, France',
        '7fIU2aMImMQ': 'GB News, United Kingdom',
        'f0lYkdA-Gtw': 'NHK, Japan',
        //'V0I5eglJMRI': 'RT, Russia',
        //'9Auq9mYxFEE': 'Sky News, United Kingdom',
        '5mL-OkdM7Tc': 'TRT, Turkey',
        'KyUT37gNm5w': 'WION, India',
      },

      Taiwan: {
        //'Qg9U06O2R-s': 'CCTV ??????, China',
        '_QbRXRnHMVY': 'CTI ??????, China?',
        'wM0g8EoUZ_E': 'CTS ??????, Taiwan',
        'TCnaIE_SAtM': 'CTV ??????, Taiwan',
        'SBtGwNMfuf0': 'EBC ??????, Taiwan',
        //'jWtNbHdCKVo': 'FOCUS????????????, Taiwan',
        'yguQ1SzPM5U': 'FTV ??????, Taiwan',
        'B7Zp3d6xXWw': 'Global News ??????, Taiwan',
        'CKjSm5ZeehE': 'iNEWS ??????, Taiwan',
        '5n0y6b0Q25o': 'mnews ?????????, Taiwan',
        '4Uc00FPs27M': 'PTS ??????, Taiwan',
        'xL0ch83RAK8': 'TTV ??????, Taiwan',
        //'4cBjJEaY9jo': '???????????? Vox Populi, Taiwan',
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
        'CTX_OWSFpYE': 'N??MADE BR',
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
        'Rq8_WqE67SE': '?????????????????????????????? - ????????????????????????(???????????????) - Japanese',
        'rbfHY8mkhT8': '??????????????? - ???????????????????????????(??????????????????) - Japanese',
        'sUW4dDWiz-A': '??????????????? - ???????????????????????????(??????????????????) - Japanese',
        'SmDXanmSsUQ': 'Pieces - L\'Arc???en???Ciel - Japanese',
        'NJR8Inf77Ac': '?????? ??? - ?????????(IU) - Korean',
        'f_iQRO5BdCM': '?????? ??? - ?????????(IU) - Korean',
        'GQt03lkFQE4': '?????? ??? - ?????????(IU) - Korean',
        'jeqdYqsrsA0': '?????? ??? - ?????????(IU) - Korean',
        '3ql6lSe1E-M': 'My Heart - ACHA SEPTRIASA & IRWANSYAH - Indonesian',
      },

      IU: {
        'aERrdOMxXmQ': 'Last Fantasy',
        'XdPX3f58UwE': 'My old story',
        'QMLHUVL4boE': 'You and I',
        'cwsZWrYDY9A': 'Twenty-three ?????????',
        'cJcF5V1_Kck': 'FRIDAY Feat. ????????? Of History',
        '_BR8-Qp4j5M': 'Through the Night ??????',
        'yUKP0Rht2o4': 'Good Day ?????????',
        'v3-zV6wrbDU': 'Palette feat. G-DRAGON',
        'emJoiIMqB58': '????????????????????????',
        'lPffVN5lR6U': 'Every End of The Day ???????????????',
        'NPXVXh4HIQE': 'Ending Scene ?????????Ending',
      },

      Taiwanese: {
        '9gnqI0ygqWw': '????????? - ?????????',
        'KEBoeE0PdJM': '????????? - ?????????',
        'av-oi_OMM0g': '???????????? - ?????????',
        'ttFL9UvmuFc': '???????????? - ??????',
        'O4vpXDfW9G8': '???????????? - ??????',
        '36sZ1ubzZAk': '????????? - ??????',
        'YIk9XpSlxJ8': '????????? - ??????',
        '--Ux4aJaVg8': '?????????????????? - ?????????',
        'ZDxyVedqjiQ': '?????????????????? - ?????????',
        'JrTl0k8YPpE': '????????? - ?????????',
        '0QpGmmGUxos': '??????????????? - ????????? & ??????',
        'jLBn_S-f_iM': '??????????????? - ????????? & ??????',
        'gpwztOjPcmg': '??????????????? - ??????????????? & ?????????',
        'dOjt0L5KI8U': '??????????????? - ????????? & ?????????',
      },

      Mandarin: {
        'WUJBg0JizrQ': '????????????????????? - ??????',
        's2CE5n5W9D4': '?????? - ??????',
        'UuWI37iWVio': 'RAIN - ?????????',
        '2B7U5WkhOiE': '?????? - ?????????',
        'rAXmU300DRc': '?????? - ?????????',
        'Ygr1OOh8hvI': '?????? - ?????????',
        '4QmDKohzQdc': '???????????? - ?????????',
        'UehlbisT5Gs': '????????????????????? - ?????????',
        'EqBAV4i7d20': '?????? - ??????',
        'NA4otP-v6iI': '????????????????????? - ?????????',
        'n-k-_jzcp7c': '??????????????? - ?????? & ??????',
        '22b1WnBg5LA': '??????????????? - ????????? & ??????',
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
