/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                      */

let /* set tv */

    widthDiff = 16,
    heightDiff = 72,

    width = window.innerWidth - widthDiff,
    height = window.innerHeight - heightDiff,

    cellTitle = '<label>TV Wall<sup><a href="https://github.com/johannwpli/TV-Wall">&copy;</a></sup></label>',

    radioLayout = '',
    radioLayoutDefault = 3,
    radioLayoutThreshold = 3,

    layoutArr = [1, 2, 3, 4, 6, 8, 9, 12],

    searchParams = new URLSearchParams(location.search).get('menu'),

    radioMenu = '',
    radioMenuDefault = searchParams || 'World',
    radioMenuHide = 'Hsin',

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
        'Qg9U06O2R-s': 'CCTV',
        'lu_BJKxqGnk': 'CTI',
        'wM0g8EoUZ_E': 'CTS',
        'TCnaIE_SAtM': 'CTV',
        'R2iMq5LKXco': 'EBC',
        'XGEmg3vhrzU': 'FTV',
        'JAzRXylm3M0': 'PTS',
        'FoBfXvlOR6I': 'SET',
        'CKjSm5ZeehE': 'SET iNEWS',
        'xL0ch83RAK8': 'TTV',
        '2mCSYvcfhtc': 'TVBS'
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
      //console.log(tvSrcObj)
      //console.log(searchParams)
      //console.log(radioMenuHide)

      for (let i in tvSrcObj) {
        if (i !== radioMenuHide)
          radioMenu +=
            `<label><input type="radio" name="menu" value="${i}" />${i}</label>`
      }

      if (searchParams === radioMenuHide) {
          radioMenu +=
            `<label><input type="radio" name="menu" value="${radioMenuHide}" />${radioMenuHide}</label>`
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
