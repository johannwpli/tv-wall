/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                      */

let /* set tv */

    widthDiff = 16,
    heightDiff = 72,

    width = window.innerWidth - widthDiff,
    height = window.innerHeight - heightDiff,

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

    tvSrc = 'https://www.youtube-nocookie.com/embed/',

    /* set wall with YouTube Video ID */

    tvSrcKey,

    tvSrcObj = {
      World: [
        '-upyPouRrB8', //Al Jazeera English
        'w_Ma8oQLmSM', //ABC News
        'XWq5kBlakcQ', //CNA
        'V9KZGs1MtP4', //DW News
        'sPgqEHsONK8', //euronews
        'jNhh-OLzWlE', //FRANCE 24 English
        'V0I5eglJMRI', //RT
        '9Auq9mYxFEE', //Sky News
        'CV5Fooi8YJA'  //TRT World
      ],

      Taiwan: [
        'Qg9U06O2R-s', //CCTV
        'lu_BJKxqGnk', //CTI
        'wM0g8EoUZ_E', //CTS
        'TCnaIE_SAtM', //CTV
        'R2iMq5LKXco', //EBC
        'XGEmg3vhrzU', //FTV
        'JAzRXylm3M0', //PTS
        'FoBfXvlOR6I', //SET
        'CKjSm5ZeehE', //SET iNEWS
        'xL0ch83RAK8', //TTV
        '2mCSYvcfhtc'  //TVBS
      ],

      Hsin: [
        'fHo4cmOembI',
        '9zIbGCdWIh4',
        'B1fUWSGvlsU',
        's2RQuTTn7os',
        'n-BMA_a8nM4',
        'ZJ6ZUj8R5uQ',
        'FHL-o1CJOnY',
        'FCOtL6RFN4Y',
        '2bCDBwyEhkc',
        '50sSQrHMeWM',
        'zs98k8eCrGU' 
      ]
    },

    cellTitle = '<label>TV Wall<sup><a href="https://github.com/johannwpli/TV-Wall">&copy;</a></sup></label>',

    radioMenu = '',
    radioMenuDefault = 'World',

    setRadioMenu = () => {

      for (let i in tvSrcObj) {
        radioMenu +=
          `<label><input type="radio" name="menu" value="${i}" />${i}</label>`
      }

      //console.log(radioMenu)

      document.querySelector('.cell.title')
        .insertAdjacentHTML('beforeEnd', `${cellTitle}`)

      document.querySelector('.cell.menu')
        .insertAdjacentHTML('beforeEnd', `${radioMenu}`)

      document.querySelector(`input[value='${radioMenuDefault}']`)
        .setAttribute('required','required')

      document.querySelector(`input[value='${radioMenuDefault}']`)
        .setAttribute('checked','checked')

    }

setRadioMenu()
