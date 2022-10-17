/* Author   Johann Li
   LinkedIn https://www.linkedin.com/in/johannwpli/
   GitHub   https://github.com/johannwpli/
   Website  https://johann.li/
   Demo     https://johannwpli.github.io/tv-wall/   */

let

  widthDiff,
  heightDiff,
  docWidth,
  docHeight,

  newUrl,
  radioGrid = '',
  radioMenu = '',
  selectLang = '',

  radioGridDefault,
  radioMenuDefault = 'World',
  selectLangDefault = 'en',

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
  tvRatio,
  tvSrcKey,
  tvSrc

const

  tvWall = document.getElementById('tvWall'),

  siteAuthor = 'Johann Li',
  siteUrl = 'https://johannwpli.github.io/tv-wall/',
  siteTitle = document.title,
  siteName = 'TV Wall',
  githubUrl = 'https://github.com/johannwpli/tv-wall',

  urlSearchParams = new URLSearchParams(location.search),
  urlMenuParam = urlSearchParams.get('m'),
  urlGridParam = urlSearchParams.get('g'),
  urlLangParam = urlSearchParams.get('l'),
  urlIdParam = urlSearchParams.get('i'),

  oldUrl = location.pathname,
  newState = { additionalInformation: 'Updated the URL with JS' },

  wallPartArr = ['head', 'body'],
  headPartArr = ['title', 'grid', 'menu', 'lang'],

  cellTitle = `<label><a href="${siteUrl}" title="${siteTitle}" alt="${siteName}">${siteName}</a>&nbsp;<a href="${githubUrl}" title="copyright &copy; ${siteAuthor}" alt="&copy;">&copy;</a></label>`,

  widthTablet = 480,
  widthDesktop = 1024,

  radioGridArr = [1, 2, 3, 4, 6, 8, 9, 12, 15,'all'], // 15, 16, 20, 24, 25,
  radioGridTablet = 4, // shows on tablet from
  radioGridDesktop = 9, // shows on desktop from

  radioGridDefaultMobile = '3', // default grid on mobile
  radioGridDefaultTablet = '6', // default grid on tablet
  radioGridDefaultDesktop = '9', // default grid on desktop

  radioMenuShow = ['World', 'Taiwan'],
  radioMenuMy = 'My',

  selectLangObj = { 'en': 'English', 'zh': '繁體中文', 'jp': '日本語'},

  tvBorder = 0,
  tvAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  tvAllowfullscreen = 'allowfullscreen',
  tvSrcPrefix = 'https://www.youtube-nocookie.com/embed/',

  /* Get the closest number out of an array
      https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array#comment95981784_39942209 */

  getClosestGrid = goal => (a,b) => Math.abs(a - goal) < Math.abs(b - goal) ? a : b,

  setHtml = () => {
    /* set wall */

    tvWall.insertAdjacentHTML('beforeEnd', '<form name="tvWall"></form>')

    for (const i of wallPartArr)
      document.querySelector('#tvWall form').insertAdjacentHTML('beforeEnd', `<div id="${i}" class="table"></div>`)

    /* set head */

    document.querySelector('#head').insertAdjacentHTML('beforeEnd', '<div class="row"></div>')

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
    //console.log({urlLangParam})
    //console.log({urlIdParam})
    //console.log({radioMenuShow})

    for (const i in tvSrcObj) {
      if (radioMenuShow.includes(i))
        radioMenu += `<label><input type="radio" name="menu" value="${i}" />${i}</label>`
    }

    if (urlIdParam) {
      radioMenuDefault = radioMenuMy
      radioMenu += `<label><input type="radio" name="menu" value="${radioMenuDefault}" />${radioMenuDefault}</label>`

      tvSrcArr = urlIdParam.split(',')
      //console.log({tvSrcArr})
      //console.log({tvSrcObj})
      //console.log({radioMenuShow})
    }

    else {
      if (urlMenuParam && urlMenuParam in tvSrcObj) {
        radioMenuDefault = urlMenuParam

        tvSrcKey = radioMenuDefault
        tvSrcArr = Object.keys(tvSrcObj[tvSrcKey])
        //console.log({tvSrcArr})

        if (!radioMenuShow.includes(urlMenuParam)) {
          radioMenu += `<label><input type="radio" name="menu" value="${radioMenuDefault}" />${radioMenuDefault}</label>`
        }
      }
    }

    //console.log({radioMenu})

    document.querySelector('.cell.menu').insertAdjacentHTML('beforeEnd', radioMenu)

    document.querySelector(`input[value='${radioMenuDefault}']`).setAttribute('checked','checked')

    menuRadio = document.tvWall.menu
  },

  setGrid = () => {
    document.querySelector('.cell.grid').insertAdjacentHTML('afterBegin', `<label class="tablet ${selectLangDefault}"></label>`)

    for (const i of radioGridArr) {
      const j =
        i >= radioGridDesktop
          ? 'desktop'
          : i >= radioGridTablet
            ? 'tablet'
            : 'mobile'

      radioGrid += `<label class="${j}"><input type="radio" name="grid" value="${i}" />${i}</label>`
    }

    //console.log({urlGridParam})
    //console.log({radioGridArr})
    //console.log(radioGridArr.includes(urlGridParam))

    if (urlGridParam) {
      if (urlGridParam === 'all') {
        if (!urlMenuParam) {
          if (urlIdParam) {
            tvSrcArr = urlIdParam.split(',')
          }
          else {
            tvSrcKey = radioMenuDefault
            tvSrcArr = Object.keys(tvSrcObj[tvSrcKey])
          }
        }
        //console.log({tvSrcArr})
        radioGridDefault = 'all'
      }

      if (!isNaN(urlGridParam)) {
        //console.log(!isNaN(urlGridParam))
        radioGridDefault =
          radioGridArr.includes(urlGridParam)
            ? urlGridParam
            : radioGridArr.reduce(getClosestGrid(urlGridParam))
      }

      //console.log({radioGridDefault})
    }
    else {
      radioGridDefault =
        window.innerWidth > widthDesktop
          ? radioGridDefaultDesktop // desktop
          : window.innerWidth > widthTablet
            ? radioGridDefaultTablet //tablet
            : radioGridDefaultMobile //mobile
    }

    //console.log({radioGrid})

    document.querySelector('.cell.grid').insertAdjacentHTML('beforeEnd', radioGrid)

    document.querySelector(`input[value='${radioGridDefault}']`).setAttribute('checked','checked')

    gridRadio = document.tvWall.grid
  },

  setLang = () => {
    document.querySelector('.cell.lang').insertAdjacentHTML('afterBegin', '<select></select>')
    document.querySelector('.cell.lang').insertAdjacentHTML('afterBegin', `<label class="tablet ${selectLangDefault}"></label>`)

    for (const i in selectLangObj)
      selectLang += `<option name="lang" value="${i}">${selectLangObj[i]}</option>`

    document.querySelector('.cell.lang select').insertAdjacentHTML('beforeEnd', selectLang)

    if (urlLangParam && urlLangParam in selectLangObj)
      selectLangDefault = urlLangParam

    document.querySelector(`option[value='${selectLangDefault}']`).setAttribute('selected','selected')
  },

  setUrl = () => {
    menuChecked = document.querySelector('input[name="menu"]:checked')
    gridChecked = document.querySelector('input[name="grid"]:checked')
    langSelected = document.querySelector('option[name="lang"]:checked')

    newUrl = oldUrl + '?m=' + menuChecked.value + '&g=' + gridChecked.value + '&l=' + langSelected.value
    //console.log({newUrl})
    window.history.pushState(newState, siteTitle, newUrl)
  },

  preset = () => {
    setHtml()
    setMenu()
    setGrid() // has to be after setMenu()
    setLang()
    setUrl()
  }

preset()