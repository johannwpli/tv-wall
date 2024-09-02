/* Author: Johann Li, GitHub: https://github.com/johannwpli/ */

"use strict"

let

  windowOrientation = {
    Before: undefined,
    After: undefined
  },

  widthDiff,
  heightDiff,
  docWidth,
  docHeight,
  screenWidth,
  screenHeight,

  docCellTitle,
  docCellTitleClntOS,
  docCellTitleClntBr,
  docCellTitleWinOri,
  docCellCtrm,
  docCellMenu,
  docCellGrid,
  docCellMore,
  docCellLang,
  docCellThtr,

  newUrl,

  radioCtrm = '',
  radioMenu = '',
  radioGrid = '',
  radioMore = '',
  selectLang = '',
  selectThtr = '',

  ctrmOn,
  ctrmOff,

  radioMenuDefault =
    (client.browser.lang === 'zh-TW')
      ? 'Taiwan'
      : 'World',

  radioGridKey,
  radioGridKeyNext,
  radioGridDefault,

  moreOn,
  moreOff,

  selectLangDefault =
    (client.browser.lang === 'zh-TW' || client.browser.lang === 'zh-HK')
      ? 'zh'
      : (client.browser.lang === 'ja')
        ? 'jp'
        : 'en',

  selectThtrObj = {},
  selectThtrDefault = 0,
  maxThtrNumber,

  ctrmChecked,
  menuChecked,
  gridChecked,
  moreChecked,
  thtrSelect,
  langSelect,

  ctrmRadio,
  gridRadio,
  moreRadio,
  menuRadio,

  tvAllNumber,
  tvShortNumber,
  tvRowNumber,
  tvColNumber,
  tvWidth,
  tvHeight,

  tvHtml,
  tvInfoFront = 'Loading...',
  tvInfoBack,
  tvTitle,
  tvChannel,
  tvAttrName,
  tvAttrAlt,
  tvAttrTitle,

  tvSrcArr,
  tvSrcArrCached,
  tvRatio,
  tvSrcKey,
  tvSrc

const

  tvWall = document.getElementById('tvWall'),

  siteAuthor = 'Johann Li',
  siteUrl    = 'https://johannwpli.github.io/tv-wall/',
  siteTitle  = document.title,
  siteDomain = 'WeWatch.cc',
  siteSld    = siteDomain.split('.')[0],
  siteTld    = siteDomain.split('.')[1],
  siteSign   = '⚡ ',
  siteName   = siteSign + siteSld,
  siteGithub = 'https://github.com/johannwpli/tv-wall',

  infoSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>',

  urlSearchParams = new URLSearchParams(location.search),
  urlMenuParam    = urlSearchParams.get('m'),
  urlGridParam    = urlSearchParams.get('g'),
  urlLangParam    = urlSearchParams.get('l'),
  urlIdParam      = urlSearchParams.get('i'),
  urlNameParam    = urlSearchParams.get('n'),

  oldUrl = location.pathname,
  newState = { additionalInformation: 'Updated the URL with JS' },

  wallPartArr = ['head', 'body'],
  headPartArr = ['title', 'ctrm', 'menu', 'grid', 'more', 'lang', 'thtr'],

  hour = (new Date).getHours(),
  cellTitle =
    `<label>
      <a href="${siteUrl}" title="${siteTitle}" alt="${siteName}">${siteName}</a><a href="${siteGithub}" title="copyright &copy; ${siteAuthor}" alt="&copy; ${siteAuthor}">.${siteTld}</a>
    </label>
    <label id='moreInfo'>
      <span id='clntOS'></span>
      <span id='clntBr'></span>
      <span id='winOri'></span>
    </label>`,

  radioCtrmShow = ['On', 'Off'],
  radioCtrmDefault = 'Off',

  radioMenuShow = ['World', 'Taiwan'],
  radioMenuMy = 'My',

  radioMoreShow = ['more', 'less'],
  radioMoreDefault = 'less',

  radioGridArr = [1, 2, 3, 4, 6, 8, 9, 12, 15, 16, 20, 24, 25, 30, 35, 36, 'all'], // to fix over 9 + 26

  radioGridObj = {
    mobile: {
      default: 3
    },

    tablet: {
      width: 576, // width from on tablet
      show: 4, // shows from on tablet, i.e. 4, 6
      default: 6 // default grid on tablet
    },

    laptop: {
      width: 768,
      show: 8, // i.e. 8, 9
      default: 9
    },

    desktop: {
      width: 992,
      show: 12, // i.e. 12, 15
      default: 12
    },

    hd: {
      width: 1280,
      show: 16, // i.e. 16, 20
      default: 15
    },

    fhd: {
      width: 1920,
      show: 24, // i.e. 24, 25
      default: 16
    },

    twok: { // 2k
      width: 2048,
      show: 30, // i.e. 30
      default: 20
    },

    fourk: { // 4k
      width: 3840,
      show: 35, // i.e. 35
      default: 24
    },

    eightk: { // 8k
      width: 7680,
      show: 36, // i.e. 36
      default: 25
    },
  },

  selectLangObj = {
    'en': 'English',
    'zh': '繁體中文',
    'tg': '台語', // iTaigi 愛台語 https://itaigi.tw
    'jp': '日本語',
    'hh': 'hunter' // ハンター文字 https://hunterxhunter.fandom.com/wiki/Hunter_%C3%97_Hunter_Alphabet
  },

  tvBorder = 0,
  tvAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  tvAllowfullscreen = 'allowfullscreen',
  tvSrcPrefix = 'https://www.youtube-nocookie.com/embed/',

  /* Get the closest number out of an array,
  https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array#comment95981784_39942209 */

  getClosestGrid = goal => (a,b) => (Math.abs(a - goal) < Math.abs(b - goal)) ? a : b,

  removeAllFirstChild = (e) => {
    /* innerHTML vs removeChild vs remove,
    https://www.measurethat.net/Benchmarks/Show/6910/0/innerhtml-vs-removechild-vs-remove#latest_results_block */

    while (e.firstChild)
      e.firstChild.remove()
  },

  numberToAlphanumeric = (e) => {
    return e.toString(36)
  },

  alphanumericToNumber = (e) => {
    return parseInt(e, 36)
  },

  set = {
    html: () => {

      /* Modifying Screen Orientation in Safari using JavaScript
      https://copyprogramming.com/howto/javascript-screen-orientation-on-safari */

      windowOrientation.Before = client.window.orientation()
      // console.log({windowOrientation})

      /* set tvwall parts */
  
      tvWall.insertAdjacentHTML('beforeEnd', '<form name="tvWall"></form>')
  
      for (const i of wallPartArr)
        document.querySelector('#tvWall form').insertAdjacentHTML('beforeEnd', `<div id="${i}" class="table"></div>`)
  
      /* set head parts */
  
      document.querySelector('#head').insertAdjacentHTML('beforeEnd', '<div class="row"></div>')
  
      for (const i of headPartArr)
        document.querySelector('#head .row').insertAdjacentHTML('beforeEnd', `<div class="cell ${i}"></div>`)
  
      /* set title */
  
      docCellTitle = document.querySelector('.cell.title')
      docCellTitle.insertAdjacentHTML('beforeEnd', cellTitle)

      docCellTitleClntOS = document.querySelector('#clntOS')
      docCellTitleClntOS.innerHTML = client.os.svg[client.os.app()]
  
      docCellTitleClntBr = document.querySelector('#clntBr')
      docCellTitleClntBr.innerHTML = client.browser.svg[client.browser.app()]
  
      docCellTitleWinOri = document.querySelector('#winOri')
      docCellTitleWinOri.innerHTML = client.window.svg[client.window.orientation()]

      /* set title gradient */
  
      docCellTitle.classList.add('grad')
    },

    ctrm: () => {
      docCellCtrm = document.querySelector('.cell.ctrm')
      docCellCtrm.insertAdjacentHTML('afterBegin', `<label class="${selectLangDefault}"></label>`)
  
      // console.log({radioCtrmShow})
  
      for (const i of radioCtrmShow)
        radioCtrm += `<label id="${i}" name="${i}"><input type="radio" name="ctrm" value="${i}" /></label>`
  
      // console.log({radioCtrm})
  
      docCellCtrm.insertAdjacentHTML('beforeEnd', radioCtrm)
  
      ctrmOn = document.getElementById('On')
      ctrmOff = document.getElementById('Off')
  
      ctrmOff.classList.add('hide')
  
      // document.querySelector(`input[value='${radioCtrmDefault}']`).setAttribute('checked', 'checked')
  
      ctrmRadio = document.tvWall.ctrm
    },
  
    menu: () => {
      docCellMenu = document.querySelector('.cell.menu')
      docCellMenu.insertAdjacentHTML('afterBegin', `<label class="${selectLangDefault}"></label>`)
  
      // console.log({tvSrcObj})
      // console.log({urlGridParam})
      // console.log({urlMenuParam})
      // console.log({urlLangParam})
      // console.log({urlIdParam})
      // console.log({radioMenuShow})
  
      if (!urlIdParam) {
        if (!urlMenuParam) {
          for (let i of radioMenuShow) {
            radioMenu += `<label name="${i}" class="${selectLangDefault}"><input type="radio" name="menu" value="${i}" /></label>`
          }
        }
        else { // urlMenuParam
          if (urlMenuParam in tvSrcObj) {
            radioMenuDefault = urlMenuParam
      
            tvSrcKey = radioMenuDefault
            tvSrcArr = Object.keys(tvSrcObj[tvSrcKey])
            // console.log({tvSrcKey})
            // console.log({tvSrcArr})
    
            if (!radioMenuShow.includes(urlMenuParam)) { // not World and not Taiwan
              radioMenu += `<label><input type="radio" name="menu" value="${radioMenuDefault}" />${radioMenuDefault}</label>`
            }
            else { // World or Taiwan
              for (let i of radioMenuShow) {
                radioMenu += `<label name="${i}" class="${selectLangDefault}"><input type="radio" name="menu" value="${i}" /></label>`
              }
            }
          }
        }
      }  
      else { // urlIdParam
        radioMenuDefault = radioMenuMy
        // console.log(urlNameParam)

        radioMenu += `<label><input type="radio" name="menu" value="${radioMenuDefault}" />`
        radioMenu += urlNameParam ? urlNameParam : radioMenuDefault
        radioMenu += `</label>`
  
        tvSrcArr = urlIdParam.split(',')
        // console.log({tvSrcArr})
        // console.log({tvSrcObj})
        // console.log({radioMenuShow})
      }

      // console.log({radioMenu})
  
      docCellMenu.insertAdjacentHTML('beforeEnd', radioMenu)
  
      document.querySelector(`input[value='${radioMenuDefault}']`).setAttribute('checked', 'checked')
  
      docCellMenu.insertAdjacentHTML('beforeEnd', `<label id='tvInfo' onclick='alert(tvInfoFront)'>${infoSvg}</label>`)
  
      menuRadio = document.tvWall.menu
    },

    grid: () => {
      docCellGrid = document.querySelector('.cell.grid')
      docCellGrid.insertAdjacentHTML('afterBegin', `<label class="${selectLangDefault}"></label>`)
  
      for (const i of radioGridArr) {
        const j =
          (i >= radioGridObj.eightk.show)
          ? 'eightk'
          : (i >= radioGridObj.fourk.show)
            ? 'fourk'
            : (i >= radioGridObj.twok.show)
              ? 'twok'
              : (i >= radioGridObj.fhd.show)
                ? 'fhd'
                : (i >= radioGridObj.hd.show)
                    ? 'hd'
                    : (i >= radioGridObj.desktop.show)
                        ? 'desktop'
                        : (i >= radioGridObj.laptop.show)
                            ? 'laptop'
                            : (i >= radioGridObj.tablet.show)
                                ? 'tablet'
                                : 'mobile'
  
        radioGrid +=
          (i !== 'all')
            ? `<label class="${j}"><input type="radio" name="grid" value="${i}" />${i}</label>` // number
            : `<label class="laptop" name="${i}"><input type="radio" name="grid" value="${i}" /></label>` // all
        }
  
      // console.log({urlGridParam})
      // console.log({radioGridArr})
      // console.log(radioGridArr.includes(Number(urlGridParam)))
  
      if (urlGridParam) {
        if (urlGridParam === 'all') {
          if (urlMenuParam) {
            if (urlIdParam) {
              tvSrcArr = urlIdParam.split(',')
            }
            // else {
            //   tvSrcKey = radioMenuDefault
            //   tvSrcArr = Object.keys(tvSrcObj[tvSrcKey])
            // }
          }
          // console.log({tvSrcArr})
  
          radioGridDefault = urlGridParam
        }
  
        if (!isNaN(urlGridParam)) { // is a number
          // console.log(!isNaN(urlGridParam))
          // console.log(radioGridArr.includes(Number(urlGridParam)))
          radioGridDefault =
            (radioGridArr.includes(Number(urlGridParam)))
              ? urlGridParam
              : radioGridArr.reduce(getClosestGrid(urlGridParam))
        }
  
      }
      else {
        radioGridKey =
          (window.innerWidth >= radioGridObj.eightk.width)
          ? 'eightk'
          : (window.innerWidth >= radioGridObj.fourk.width)
            ? 'fourk'
            : (window.innerWidth >= radioGridObj.twok.width)
              ? 'twok'
              : (window.innerWidth >= radioGridObj.fhd.width)
                ? 'fhd'
                : (window.innerWidth >= radioGridObj.hd.width)
                    ? 'hd'
                    : (window.innerWidth >= radioGridObj.desktop.width)
                        ? 'desktop'
                        : (window.innerWidth >= radioGridObj.laptop.width)
                            ? 'laptop'
                            : (window.innerWidth >= radioGridObj.tablet.width)
                              ? 'tablet'
                              : 'mobile'

        radioGridKeyNext = Object.keys(radioGridObj)[Object.keys(radioGridObj).indexOf(radioGridKey) + 1]

        radioGridDefault = radioGridObj[radioGridKey].default

        // console.log({radioGridKey})
        // console.log({radioGridKeyNext})
        // console.log({radioGridDefault})
        // console.log(tvSrcArr)

        if ((urlIdParam || urlMenuParam) && tvSrcArr.length < radioGridDefault) radioGridDefault = 'all'
      }
  
      // console.log({radioGridDefault})
      // console.log({radioGrid})
  
      docCellGrid.insertAdjacentHTML('beforeEnd', radioGrid)
  
      document.querySelector(`input[value='${radioGridDefault}']`).setAttribute('checked', 'checked')
  
      gridRadio = document.tvWall.grid
    },

    more: () => {
      docCellMore = document.querySelector('.cell.more')
      docCellMore.insertAdjacentHTML('afterBegin', `<label class="${selectLangDefault}"></label>`)
  
      // console.log({radioMoreShow})
  
      for (const i of radioMoreShow)
        radioMore += `<label id="${i}" name="${i}"><input type="radio" name="more" value="${i}" /></label>`
  
      // console.log({radioMore})
  
      docCellMore.insertAdjacentHTML('beforeEnd', radioMore)
  
      moreOn = document.getElementById('more')
      moreOff = document.getElementById('less')
  
      moreOff.classList.add('hide')
  
      // document.querySelector(`input[value='${radioMoreDefault}']`).setAttribute('checked', 'checked')
  
      moreRadio = document.tvWall.more
    },

    lang: () => {
      docCellLang = document.querySelector('.cell.lang')
      docCellLang.insertAdjacentHTML('afterBegin', '<select id="lang"></select>')
      docCellLang.insertAdjacentHTML('afterBegin', `<label class="${selectLangDefault}"></label>`)
  
      langSelect = document.querySelector('#lang')
  
      for (const i in selectLangObj)
        selectLang += `<option name="lang" value="${i}">${selectLangObj[i]}</option>`
  
      document.querySelector('.cell.lang select').insertAdjacentHTML('beforeEnd', selectLang)
  
      if (urlLangParam && urlLangParam in selectLangObj)
        selectLangDefault = urlLangParam
  
      document.querySelector(`option[value='${selectLangDefault}']`).setAttribute('selected', 'selected')
    },

    thtr: () => {
      docCellThtr = document.querySelector('.cell.thtr')
  
      removeAllFirstChild(docCellThtr)
      
      selectThtr = ''
      selectThtrObj[selectThtrDefault] = '0'
  
      docCellThtr.insertAdjacentHTML('afterBegin', '<select id="thtr"></select>')
      docCellThtr.insertAdjacentHTML('afterBegin', `<label class="${selectLangDefault}"></label>`)
  maxThtrNumber
      thtrSelect = document.querySelector('#thtr')
  
      // console.log({tvSrcArr})
      // console.log({tvSrcArrCached})
      // console.log(selectThtrObj)
  
      for (const k in selectThtrObj)
        if (k !== '0') delete selectThtrObj[k]
  
      // console.log(selectThtrObj)
  
      if (tvSrcArrCached) {
        // console.log('tvSrcArrCached is available')
        // console.log({tvSrcArrCached})
        
        maxThtrNumber =
          (gridChecked.value === 'all')
            ? tvSrcArrCached.length
            : Math.min(gridChecked.value, tvSrcArrCached.length)
  
        // console.log({maxThtrNumber})
  
        for (let i = 0; i < maxThtrNumber; i++) {
          selectThtrObj[i + 1] =
            (typeof tvSrcArrCached[i] === 'object')
              ? tvSrcArrCached[i]['id']
              : tvSrcArrCached[i]
        }
      }
      else {
        // console.log('tvSrcArrCached is NOT available')

        menuChecked = document.querySelector('input[name="menu"]:checked')
        
        tvSrcKey = menuChecked.value
        // console.log({tvSrcKey})
  
        tvSrcArr =
          (tvSrcObj.hasOwnProperty(tvSrcKey))
            ? tvSrcObj[tvSrcKey]
            : urlIdParam.split(',')
  
        // console.log({tvSrcArr})

        gridChecked = document.querySelector('input[name="grid"]:checked')

        maxThtrNumber =
          (gridChecked.value === 'all')
            ? tvSrcArr.length
            : Math.min(gridChecked.value, tvSrcArr.length)
  
        // console.log({maxThtrNumber})
  
        for (let i = 0; i < maxThtrNumber; i++) {
          selectThtrObj[i + 1] =
            (typeof tvSrcArr[i] === 'object')
              ? tvSrcArr[i]['id']
              : tvSrcArr[i]
        }
      }
  
      // console.log(selectThtrObj)
  
      for (let [k, v] of Object.entries(selectThtrObj)) {
        k = k * 1 // convert to number
  
        if (k >= 10) {
          delete selectThtrObj[k]
          selectThtrObj[numberToAlphanumeric(k)] = v
        }
      }
  
      // console.log(selectThtrObj)
  
      for (const k in selectThtrObj) {
        k === '0'
          ? selectThtr += `<option name="thtr" value="${k}">${selectThtrObj[k]}</option>`
          : selectThtr += `<option name="thtr" value="${k}">${k}</option>`
  
        // console.log(typeof(k))
      }
  
      document.querySelector('.cell.thtr select').insertAdjacentHTML('beforeEnd', selectThtr)
  
      document.querySelector(`option[value='${selectThtrDefault}']`).setAttribute('selected', 'selected')
    },
  
    url: () => {
      menuChecked = document.querySelector('input[name="menu"]:checked')
      gridChecked = document.querySelector('input[name="grid"]:checked')
  
      newUrl = oldUrl + '?m=' + menuChecked.value + '&g=' + gridChecked.value + '&l=' + langSelect.value
      // console.log({newUrl})
      window.history.pushState(newState, siteTitle, newUrl)
    }
  },

  preset = () => {
    set.html()
    set.ctrm()
    set.menu()
    set.grid() // must set after set.menu()
    set.more()
    set.lang()
    set.thtr()
    set.url()
  }

preset()