/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                      */

let /* set tv */

    widthDiff = 16,
    heightDiff = 72,

    width = window.innerWidth - widthDiff,
    height = window.innerHeight - heightDiff,

    urlSearchParams = new URLSearchParams(location.search),
    urlMenuParams = urlSearchParams.get('menu'),
    urlLayoutParams = urlSearchParams.get('layout'),

    cellTitle = '<label><a href="https://johannwpli.github.io/TV-Wall/">TV Wall</a><sup><a href="https://github.com/johannwpli/TV-Wall">&copy;</a></sup></label>',

    radioLayout = '',
    radioLayoutDefault = urlLayoutParams || 3,
    radioLayoutThreshold = 3,

    layoutArr = [1, 2, 3, 4, 6, 8, 9, 12],

    radioMenu = '',
    radioMenuDefault = urlMenuParams || 'World',
    radioMenuHide = ['IU', 'Hsin'],

    tvAllNumber,
    tvShortNumber,
    tvRowNumber,
    tvColNumber,

    tvWidth,
    tvHeight,

    tvTitle = 'YouTube video player',
    tvBorder = '0',
    tvAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    tvAllowfullscreen = '',
    tvSrcArr,
    tvTitleArr,

    tvSrc = 'https://www.youtube-nocookie.com/embed/',

    /* set wall with YouTube Video ID */

    tvSrcKey,

    tvSrcObj = {
      World: {
        '-upyPouRrB8': 'Al Jazeera - Qatar',
        'w_Ma8oQLmSM': 'ABC News - United States',
        'XWq5kBlakcQ': 'CNA - Singapore',
        'V9KZGs1MtP4': 'DW News - Germany',
        'sPgqEHsONK8': 'euronews - Portugal',
        'jNhh-OLzWlE': 'FRANCE 24 - France',
        'V0I5eglJMRI': 'RT - Russia',
        '9Auq9mYxFEE': 'Sky News - United Kingdom',
        'CV5Fooi8YJA': 'TRT World - Turkey'
      },

      Taiwan: {
        'Qg9U06O2R-s': 'CCTV 央視 - China',
        'lu_BJKxqGnk': 'CTI 中天 - China?',
        'wM0g8EoUZ_E': 'CTS 華視 - Taiwan',
        'TCnaIE_SAtM': 'CTV 中視 - Taiwan',
        'R2iMq5LKXco': 'EBC 東森 - Taiwan',
        'XGEmg3vhrzU': 'FTV 民視 - Taiwan',
        'CKjSm5ZeehE': 'iNEWS 三立 - Taiwan',
        'JAzRXylm3M0': 'PTS 公視 - Taiwan',
        'FoBfXvlOR6I': 'SET 三立 - Taiwan',
        'xL0ch83RAK8': 'TTV 台視 - Taiwan',
        '2mCSYvcfhtc': 'TVBS - Taiwan'
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
        'NPXVXh4HIQE': 'Ending Scene 這樣的Ending'
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
        'zs98k8eCrGU': ''
      }
    },

    setCellTitle = () => {
      document.querySelector('.cell.title')
        .insertAdjacentHTML('beforeEnd', `${cellTitle}`)
    }

    setRadioLayout = () => {
      document.querySelector('.cell.layout')
        .insertAdjacentHTML('afterBegin', `
          <label class="more">
            layout<span class="required">*</span>
          </label>`)

      for (let i of layoutArr) {
        let j =
          i <= radioLayoutThreshold ? 'less' : 'more'

        radioLayout += `
          <label class="${j}">
             <input type="radio" name="layout" value="${i}" />${i}
          </label>`
      }
      //console.log(radioLayout)

      document.querySelector('.cell.layout')
        .insertAdjacentHTML('beforeEnd', `${radioLayout}`)

      document.querySelector(`input[value='${radioLayoutDefault}']`)
        .setAttribute('required','required')

      document.querySelector(`input[value='${radioLayoutDefault}']`)
        .setAttribute('checked','checked')
    },

    setRadioMenu = () => {
      document.querySelector('.cell.menu')
        .insertAdjacentHTML('afterBegin', `
          <label class="more">
            menu<span class="required">*</span>
          </label>`)

      //console.log(tvSrcObj)
      //console.log(urlLayoutParams)
      //console.log(urlMenuParams)
      //console.log(radioMenuHide)

      for (let i in tvSrcObj) {
        if (!radioMenuHide.includes(i))
          radioMenu += `
            <label><input type="radio" name="menu" value="${i}" />${i}</label>`
      }

      if (radioMenuHide.includes(urlMenuParams)) {
          radioMenu += `
            <label><input type="radio" name="menu" value="${urlMenuParams}" />${urlMenuParams}</label>`
      }

      //console.log(radioMenu)

      document.querySelector('.cell.menu')
        .insertAdjacentHTML('beforeEnd', `${radioMenu}`)

      document.querySelector(`input[value='${radioMenuDefault}']`)
        .setAttribute('required','required')

      document.querySelector(`input[value='${radioMenuDefault}']`)
        .setAttribute('checked','checked')
    }

setCellTitle()
setRadioLayout()
setRadioMenu()
