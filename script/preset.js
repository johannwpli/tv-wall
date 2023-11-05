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
    browserLang === 'zh-TW'
      ? 'Taiwan'
      : 'World',

  radioGridDefault,

  selectLangDefault = 
    browserLang === 'zh-TW' || browserLang === 'zh-HK'
      ? 'zh'
      : browserLang === 'ja'
        ? 'jp'
        : 'en',

  selectThtrObj = {},
  selectThtrDefault = 0,

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
  tvInfo,
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

  widthTablet = 576,
  widthLaptop = 768,
  widthDesktop = 992,
  widthLscreen = 1200,

  classHide = 'class="hide"',

  radioCtrmShow = ['On', 'Off'],
  radioCtrmDefault = 'Off',

  radioMenuShow = ['World', 'Taiwan'],
  radioMenuMy = 'My',

  radioGridArr = [1, 2, 3, 4, 6, 8, 9, 12, 15, 16, 20, 'all'], // 24, 25, ...
  radioGridTabletShow = 4, // shows from on tablet, i.e. 4, 6
  radioGridLaptopShow = 8, // shows from on laptop, i.e. 8, 9
  radioGridDesktopShow = 12, // shows from on desktop, i.e. 12, 15
  radioGridLscreenShow = 16, // shows from on lscreen, i.e. 16, 20

  radioGridMobileDefault = '3', // default grid on mobile
  radioGridTabletDefault = '6', // default grid on tablet
  radioGridLaptopDefault = '9', // default grid on laptop
  radioGridDesktopDefault = '12', // default grid on desktop
  radioGridLscreenDefault = '15', // default grid on lscreen

  selectLangObj = {
    'en': 'English',
    'zh': '繁體中文',
    'jp': '日本語',
    'hh': 'hunter' // ハンター語
  },

  tvBorder = 0,
  tvAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  tvAllowfullscreen = 'allowfullscreen',
  tvSrcPrefix = 'https://www.youtube-nocookie.com/embed/',

  /* Get the closest number out of an array,
  https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array#comment95981784_39942209 */

  getClosestGrid = goal => (a,b) => Math.abs(a - goal) < Math.abs(b - goal) ? a : b,

  setHtml = () => {

    /* set wall */

    tvWall.insertAdjacentHTML('beforeEnd', '<form name="tvWall"></form>')

    for (const i of wallPartArr)
      document.querySelector('#tvWall form').insertAdjacentHTML('beforeEnd', `<div id="${i}" class="table"></div>`)

    /* set night mode */

    // console.log({hour})

    if (hour < 6 || hour >= 18)
      document.querySelector('#head').classList.add('night')

    /* set head */

    document.querySelector('#head').insertAdjacentHTML('beforeEnd', '<div class="row"></div>')

    for (const i of headPartArr)
      document.querySelector('#head .row').insertAdjacentHTML('beforeEnd', `<div class="cell ${i}"></div>`)

    /*set title */

    docCellTitle = document.querySelector('.cell.title')
    docCellTitle.insertAdjacentHTML('beforeEnd', cellTitle)

    /* set gradient */

    docCellTitle.classList.add('grad')
  },

  setCtrm = () => {
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

  setMenu = () => {
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

    menuRadio = document.tvWall.menu
  },

  setGrid = () => {
    docCellGrid = document.querySelector('.cell.grid')
    docCellGrid.insertAdjacentHTML('afterBegin', `<label class="${selectLangDefault}"></label>`)

    for (const i of radioGridArr) {
      const j =
        // i >= radioGridLscreenShow
        // ? 'lscreen'
        // :
          i >= radioGridDesktopShow
          ? 'desktop'
          :
            i >= radioGridLaptopShow
            ? 'laptop'
            :
              i >= radioGridTabletShow
              ? 'tablet'
              : 'mobile'

      radioGrid +=
        i !== 'all'
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
          radioGridArr.includes(Number(urlGridParam))
            ? urlGridParam
            : radioGridArr.reduce(getClosestGrid(urlGridParam))
      }

    }
    else {
      radioGridDefault =
        window.innerWidth > widthLscreen
          ? radioGridLscreenDefault // lscreen
          : window.innerWidth > widthDesktop
              ? radioGridDesktopDefault // desktop
              : window.innerWidth > widthLaptop
                  ? radioGridLaptopDefault // laptop
                  : window.innerWidth > widthTablet
                    ? radioGridTabletDefault // tablet
                    : radioGridMobileDefault // mobile
    }

    // console.log({radioGridDefault})
    // console.log({radioGrid})

    docCellGrid.insertAdjacentHTML('beforeEnd', radioGrid)

    document.querySelector(`input[value='${radioGridDefault}']`).setAttribute('checked', 'checked')

    gridRadio = document.tvWall.grid
  },

  setLang = () => {
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

  setUrl = () => {
    menuChecked = document.querySelector('input[name="menu"]:checked')
    gridChecked = document.querySelector('input[name="grid"]:checked')

    newUrl = oldUrl + '?m=' + menuChecked.value + '&g=' + gridChecked.value + '&l=' + langSelect.value
    // console.log({newUrl})
    window.history.pushState(newState, siteTitle, newUrl)
  },

  preset = () => {
    setHtml()
    setCtrm()
    setMenu()
    setGrid() // set after setMenu()
    setLang()
    setUrl()
  }

preset()
