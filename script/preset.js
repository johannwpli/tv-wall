/* Author: Johann Li, GitHub: https://github.com/johannwpli/ */

"use strict"

let

  widthDiff,
  heightDiff,
  docWidth,
  docHeight,
  screenWidth,
  screenHeight,

  docCellTitle,
  docCellCtrm,
  docCellMenu,
  docCellGrid,
  docCellLang,
  docCellThtr,

  newUrl,
  radioCtrm = '',
  radioMenu = '',
  radioGrid = '',
  selectLang = '',
  selectThtr = '',

  browserLang = navigator.language || navigator.userLanguage,

  ctrmOn,
  ctrmOff,

  radioMenuDefault =
    (browserLang === 'zh-TW')
      ? 'Taiwan'
      : 'World',

  radioGridDefault,

  selectLangDefault =
    (browserLang === 'zh-TW' || browserLang === 'zh-HK')
      ? 'zh'
      : (browserLang === 'ja')
        ? 'jp'
        : 'en',

  selectThtrObj = {},
  selectThtrDefault = 0,
  maxThtrNumber,

  ctrmChecked,
  menuChecked,
  gridChecked,
  thtrSelect,
  langSelect,

  ctrmRadio,
  gridRadio,
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

  tvSrcArr,
  tvSrcArrCached,
  tvRatio,
  tvSrcKey,
  tvSrc

const

  tvWall = document.getElementById('tvWall'),

  siteAuthor = 'Johann Li',
  siteUrl = 'https://johannwpli.github.io/tv-wall/',
  siteTitle = document.title,
  siteName = '⚡ TVWall',
  githubUrl = 'https://github.com/johannwpli/tv-wall',

  infoSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>',

  urlSearchParams = new URLSearchParams(location.search),
  urlMenuParam = urlSearchParams.get('m'),
  urlGridParam = urlSearchParams.get('g'),
  urlLangParam = urlSearchParams.get('l'),
  urlIdParam = urlSearchParams.get('i'),

  oldUrl = location.pathname,
  newState = { additionalInformation: 'Updated the URL with JS' },

  wallPartArr = ['head', 'body'],
  headPartArr = ['title', 'ctrm', 'menu', 'grid', 'lang', 'thtr'],

  hour = (new Date).getHours(),
  cellTitle = `<label><a href="${siteUrl}" title="${siteTitle}" alt="${siteName}">${siteName}</a><a href="${githubUrl}" title="copyright &copy; ${siteAuthor}" alt="&copy; ${siteAuthor}">.cc</a></label>`,

  classHide = 'class="hide"',

  radioCtrmShow = ['On', 'Off'],
  radioCtrmDefault = 'Off',

  radioMenuShow = ['World', 'Taiwan'],
  radioMenuMy = 'My',

  radioGridArr = [1, 2, 3, 4, 6, 8, 9, 12, 15, 16, 20, 'all'], // 24, 25, ...

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

    xlscreen: {
      width: 1200,
      show: 16, // i.e. 16, 20
      default: 15
    },
  },

  selectLangObj = {
    'en': 'English',
    'zh': '繁體中文',
    // '??': '台語', // to add
    'jp': '日本語',
    'hh': 'hunter' // ハンター語
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

      /* set tvwall parts */
  
      tvWall.insertAdjacentHTML('beforeEnd', '<form name="tvWall"></form>')
  
      for (const i of wallPartArr)
        document.querySelector('#tvWall form').insertAdjacentHTML('beforeEnd', `<div id="${i}" class="table"></div>`)
  
      /* set head night mode */
  
      // console.log({hour})
  
      if (hour < 6 || hour >= 18)
        document.querySelector('#head').classList.add('night')
  
      /* set head parts */
  
      document.querySelector('#head').insertAdjacentHTML('beforeEnd', '<div class="row"></div>')
  
      for (const i of headPartArr)
        document.querySelector('#head .row').insertAdjacentHTML('beforeEnd', `<div class="cell ${i}"></div>`)
  
      /* set title */
  
      docCellTitle = document.querySelector('.cell.title')
      docCellTitle.insertAdjacentHTML('beforeEnd', cellTitle)
  
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
  
      for (const i in tvSrcObj) {
        if (radioMenuShow.includes(i))
          radioMenu += `<label name="${i}" class="${selectLangDefault}"><input type="radio" name="menu" value="${i}" /></label>`
      }
  
      if (urlIdParam) {
        radioMenuDefault = radioMenuMy
        radioMenu += `<label><input type="radio" name="menu" value="${radioMenuDefault}" />${radioMenuDefault}</label>`
  
        tvSrcArr = urlIdParam.split(',')
        // console.log({tvSrcArr})
        // console.log({tvSrcObj})
        // console.log({radioMenuShow})
      }
      else {
        if (urlMenuParam && urlMenuParam in tvSrcObj) {
          radioMenuDefault = urlMenuParam
  
          tvSrcKey = radioMenuDefault
          tvSrcArr = Object.keys(tvSrcObj[tvSrcKey])
          // console.log({tvSrcArr})
  
          if (!radioMenuShow.includes(urlMenuParam)) {
            radioMenu += `<label><input type="radio" name="menu" value="${radioMenuDefault}" />${radioMenuDefault}</label>`
          }
        }
      }
  
      // console.log({radioMenu})
  
      docCellMenu.insertAdjacentHTML('beforeEnd', radioMenu)
  
      document.querySelector(`input[value='${radioMenuDefault}']`).setAttribute('checked', 'checked')
  
      docCellMenu.insertAdjacentHTML('beforeEnd', `<a id='tvInfo' onclick='alert(tvInfoFront)'>${infoSvg}</a>`)

      menuRadio = document.tvWall.menu
    },

    grid: () => {
      docCellGrid = document.querySelector('.cell.grid')
      docCellGrid.insertAdjacentHTML('afterBegin', `<label class="${selectLangDefault}"></label>`)
  
      for (const i of radioGridArr) {
        const j =
          (i >= radioGridObj.xlscreen.show)
            ? 'xlscreen'
            : (i >= radioGridObj.desktop.show)
                ? 'desktop'
                : (i >= radioGridObj.laptop.show)
                    ? 'laptop'
                    : (i >= radioGridObj.tablet.show)
                        ? 'tablet'
                        : 'mobile'
  
        radioGrid +=
          (i !== 'all')
            ? `<label class="${j}"><input type="radio" name="grid" value="${i}" />${i}</label>`
            : `<label class="${j}" name="${i}"><input type="radio" name="grid" value="${i}" /></label>`
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
            else {
              tvSrcKey = radioMenuDefault
              tvSrcArr = Object.keys(tvSrcObj[tvSrcKey])
            }
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
        radioGridDefault =
          (window.innerWidth >= radioGridObj.xlscreen.width)
            ? radioGridObj.xlscreen.default // xlscreen
            : (window.innerWidth >= radioGridObj.desktop.width)
                ? radioGridObj.desktop.default // desktop
                : (window.innerWidth >= radioGridObj.laptop.width)
                    ? radioGridObj.laptop.default // laptop
                    : (window.innerWidth >= radioGridObj.tablet.width)
                      ? radioGridObj.tablet.default // tablet
                      : radioGridObj.mobile.default // mobile
      }
  
      // console.log({radioGridDefault})
      // console.log({radioGrid})
  
      docCellGrid.insertAdjacentHTML('beforeEnd', radioGrid)
  
      document.querySelector(`input[value='${radioGridDefault}']`).setAttribute('checked', 'checked')
  
      gridRadio = document.tvWall.grid
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
    set.lang()
    set.thtr()
    set.url()
  }

preset()