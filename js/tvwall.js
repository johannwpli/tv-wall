// Author: Johann Li, GitHub: https://github.com/johannwpli/

const

  removeAllFirstChild = (e) => {
    while (e.firstChild)
      e.firstChild.remove()
  },

  setThea = () => {
    docCellThea = document.querySelector('.cell.thea')

    removeAllFirstChild(docCellThea)
    
    selectThea = ''
    selectTheaObj = {all: 'all'},

    docCellThea.insertAdjacentHTML('afterBegin', '<select></select>')
    docCellThea.insertAdjacentHTML('afterBegin', `<label class="tablet ${selectLangDefault}"></label>`)

    // console.log({tvSrcArr})
    // console.log({tvSrcArrCached})

    if (tvSrcArrCached) {
      //// console.log('tvSrcArrCached is available')
      
      if (gridChecked.value === 'all') {
        for (let i = 0; i < tvSrcArrCached.length; i++) {
          if (typeof tvSrcArrCached[i] === 'object')
            selectTheaObj[i + 1] = tvSrcArrCached[i]['id']
          else
            selectTheaObj[i + 1] = tvSrcArrCached[i]
        }
      }
      else {
        for (let i = 0; i < gridChecked.value; i++) {
          if (typeof tvSrcArrCached[i] === 'object')
            selectTheaObj[i + 1] = tvSrcArrCached[i]['id']
          else
            selectTheaObj[i + 1] = tvSrcArrCached[i]
        }
      }
    }
    else {
      // console.log('tvSrcArrCached is NOT available')
      tvSrcKey = menuChecked.value
      // console.log({tvSrcKey})

      if (tvSrcObj.hasOwnProperty(tvSrcKey))
        tvSrcArr = tvSrcObj[tvSrcKey]
      else
        tvSrcArr = urlIdParam.split(',')

      // console.log({tvSrcArr})

      if (gridChecked.value === 'all') {
        for (let i = 0; i < tvSrcArr.length; i++) {
          if (typeof tvSrcArr[i] === 'object')
            selectTheaObj[i + 1] = tvSrcArr[i]['id']
          else
            selectTheaObj[i + 1] = tvSrcArr[i]
        }
      }
      else {
        for (let i = 0; i < gridChecked.value; i++) {
          if (typeof tvSrcArr[i] === 'object')
            selectTheaObj[i + 1] = tvSrcArr[i]['id']
          else
            selectTheaObj[i + 1] = tvSrcArr[i]
        }
      }
    }

    // console.log(selectTheaObj)

    for (const k in selectTheaObj)
      // selectThea += `<option name="thea" value="${selectTheaObj[k]}">${k}</option>`
      selectThea += `<option name="thea" value="${k}">${k}</option>`

    document.querySelector('.cell.thea select').insertAdjacentHTML('beforeEnd', selectThea)

    document.querySelector(`option[value='${selectTheaDefault}']`).setAttribute('selected','selected')
  },

  setLangSelect = (value) => {
    langClasslistAdd(value)

    const toRemoveLangArr = Object.keys(selectLangObj).filter((v) => v !== value)

    for (const i of toRemoveLangArr)
      langClasslistRemove(i)
  },

  /* set grid value by grid radio */

  clickGridRadio = function() {
    //if (gridChecked) console.log(gridChecked.value)
    if (this !== gridChecked) gridChecked = this
    // console.log(this.value)

    setTv()
    setUrl()
    setThea()
  },

  /* set menu value by menu radio */

  clickMenuRadio = function() {
      // if (menuChecked) console.log(menuChecked.value)
      if (this !== menuChecked) menuChecked = this
      // console.log(this.value)

    setTv()
    setUrl()
    setThea()
  },

  listenGridMenuRadio = () => {
    for (const i of gridRadio)
      i.addEventListener('click', clickGridRadio)

    for (const j of menuRadio)
      j.addEventListener('click', clickMenuRadio)
  },

  clickTheaSelect = (e) => {
    // clearInterval(intervalSetTvSize)

    // console.log(e)
    theaSelected = document.querySelector('option[name="thea"]:checked')
    // console.log(theaSelected.value)
    // console.log({tvSrcArrCached})

    // console.log({screenWidth})
    console.log('----------------------')
    console.log({screenHeight})
    console.log('----------------------')

    if (theaSelected.value === 'all') {
      for (let i = 1; i <= tvSrcArrCached.length; i++)
        document.getElementById(`${i}`).classList.remove('onThea')
        // document.getElementById(`${i}`).classList.remove('hide')

        // document.getElementById(`${i}`).setAttribute('width', tvWidth)
        // document.getElementById(`${i}`).setAttribute('height', tvHeight)
    }
    else {
      for (let i = 1; i <= tvSrcArrCached.length; i++) {
        document.getElementById(`${i}`).classList.add('onThea')

        if (i !== theaSelected.value * 1) {
          document.getElementById(`${i}`).setAttribute('width', '0')
          document.getElementById(`${i}`).setAttribute('height', '0')
          // document.getElementById(`${i}`).classList.add('hide')
        }
        else {
          document.getElementById(`${i}`).setAttribute('width', screenWidth)
          document.getElementById(`${i}`).setAttribute('height', screenHeight)
          // document.getElementById(`${i}`).classList.remove('hide')
        }
      }
    }

    // document.getElementById(`${theaSelected.value}`).style.display = 'none'
    // document.getElementById(`${theaSelected.value}`).classList.remove('hide')
    // document.getElementById(`${theaSelected.value}`).setAttribute('width', screenWidth)
    // document.getElementById(`${theaSelected.value}`).setAttribute('height', screenHeight)


    // setTvGrid() // to remove old code
    // setTvSrc(e) // to remove old code
  },

  listenTheaSelect = () => document.querySelector('.cell.thea select').addEventListener('change', clickTheaSelect),

  langClasslistAdd = (value) => {
    for (let i = 1; i < headPartArr.length; i++)
      document.querySelector(`.${headPartArr[i]} label:first-of-type`).classList.add(value)
  },

  langClasslistRemove = (value) => {
    for (let i = 1; i < headPartArr.length; i++)
      document.querySelector(`.${headPartArr[i]} label:first-of-type`).classList.remove(value)
  },

  clickLangSelect = (e) => {
    langClasslistAdd(e.target.value)

    const toRemoveLangArr = Object.keys(selectLangObj).filter((v) => v !== e.target.value)
    // console.log(toRemoveArr)

    for (const i of toRemoveLangArr)
      langClasslistRemove(i)

    setUrl()
  },

  listenLangSelect = () => document.querySelector('.cell.lang select').addEventListener('change', clickLangSelect),

/*   listenKeyPress = () => {
    // https://codepen.io/DBoy_Fresh/pen/RgjYKG
    document.onkeydown = function(e) {
      let keyPress = e.key

      for (let menu of radioMenuShow) {
        // https://stackoverflow.com/questions/53093241/check-if-string-is-starting-with-prefix
        if (menu.toLowerCase().indexOf(keyPress.toLowerCase()) === 0) { // check if menu starts with key pressed as prefix 
          console.log(keyPress)
          console.log(menu)
        }
      }
    }
  } */

  /* set tv size by window size */

  setTvSize = () => {
    // console.log({head})
    // console.log({body})

    tv = document.querySelector('.tv')
    iframe = document.querySelector('iframe')

    getCssPx = (e,p) => 
      getComputedStyle(e).getPropertyValue(p).replace('px','') * 1 //toNumber

    bodyBorderWidth = getCssPx(body,'border-width') * 2
    headBorderWidth = getCssPx(head,'border-width') * 2
    headHeight = getCssPx(head,'height')

    // console.log({bodyBorderWidth})
    // console.log({headBorderWidth})
    // console.log({headHeight})

    widthDiff = bodyBorderWidth
    heightDiff = bodyBorderWidth + headBorderWidth + headHeight

    // console.log({widthDiff})
    // console.log({heightDiff})

    // console.log(getCssPx(tv,'width'))
    // console.log(getCssPx(tv,'height'))
    // console.log(getCssPx(iframe,'width'))
    // console.log(getCssPx(iframe,'height'))

    iframeBorderWidth = getCssPx(iframe,'border-width') * 2
    //iframeGapWidth = getCssPx(tv,'width') - getCssPx(iframe,'width')
    iframeGapHeight = getCssPx(tv,'height') - getCssPx(iframe,'height')

    // console.log({iframeBorderWidth})
    // console.log({iframeGapWidth})
    // console.log({iframeGapHeight}) // changable

    docWidth = window.innerWidth - widthDiff
    docHeight = window.innerHeight - heightDiff

    // console.log('window.innerWidth: ', window.innerWidth)
    // console.log('window.innerHeight: ', window.innerHeight)
    // console.log({docWidth})
    // console.log({docHeight})

    tvWidth = docWidth / tvColNumber - iframeBorderWidth //- iframeGapWidth // cause wrong width
    tvHeight = docHeight / tvRowNumber - iframeBorderWidth - iframeGapHeight

    // console.log({tvWidth})
    // console.log({tvHeight})

    screenWidth = docWidth - iframeBorderWidth
    screenHeight = docHeight - iframeBorderWidth - iframeGapHeight

    // console.log({screenWidth})
    // console.log({screenHeight})

    document.querySelectorAll('iframe:not(.onThea)').forEach(
      (e,i) => {
        let _temp = i + 1
        e.setAttribute('id', _temp)
        e.setAttribute('width', tvWidth)
        e.setAttribute('height', tvHeight)
      }
    )
  },

  /* set grid layout by grid value */

  setTvGrid = () => {
    tvSrcKey = menuChecked.value
    // console.log({tvSrcKey})

    if (tvSrcObj.hasOwnProperty(tvSrcKey))
      tvSrcArr = tvSrcObj[tvSrcKey]
    else
      tvSrcArr = urlIdParam.split(',')

    // console.log({tvSrcArr})
    // console.log({radioGridArr})
    // console.log(radioGridArr[radioGridArr.length - 2])

    theaSelected = document.querySelector('option[name="thea"]:checked')
    // console.log(theaSelected.value)

    if (theaSelected.value === 'all') {
      if (gridChecked.value === 'all') {
        if (tvSrcArr.length >= radioGridArr[radioGridArr.length - 2]) {
          tvAllNumber = radioGridArr[radioGridArr.length - 2]
        }
        else {
          let _temp = tvSrcArr.length
          while (!radioGridArr.includes(_temp))
            _temp++
          tvAllNumber = _temp
        }
      }
      else {
        tvAllNumber = gridChecked.value
      }
    }
    else {
      tvAllNumber = 1
    }
    // console.log({tvSrcArr})
    
    tvShortNumber = Math.floor(Math.sqrt(tvAllNumber))
    // 1~3:1, 4~8:2, 9~15:3, 16~24:4

    window.innerWidth >= window.innerHeight
      ? tvColNumber = tvAllNumber / (tvRowNumber = tvShortNumber)
      : tvRowNumber = tvAllNumber / (tvColNumber = tvShortNumber)

    // console.log({tvAllNumber})
    // console.log({tvRowNumber})
    // console.log({tvColNumber})

    /* innerHTML vs removeChild vs remove
        https://www.measurethat.net/Benchmarks/Show/6910/0/innerhtml-vs-removechild-vs-remove#latest_results_block */

    removeAllFirstChild(body)

    for (let i = 0; i < tvRowNumber; i++)
      body.insertAdjacentHTML('beforeEnd', '<div class="row"></div>')

    document.querySelectorAll('#body .row').forEach(
      (e,i) => {
        for (let i = 0; i < tvColNumber; i++)
          e.insertAdjacentHTML('beforeEnd', '<div class="cell tv"></div>')
      }
    )
  },

  /* shuffle array with Fisher-Yates algo
      https://shubo.io/javascript-random-shuffle/ */

  shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  },

  setTvSrc = (event) => {
    // console.log(event)
    if (!event) {
      tvSrcArrCached = [...tvSrcArr]

      if (tvSrcArrCached.length > tvAllNumber)
        shuffle(tvSrcArrCached)
    }

    // console.log('TV Array Length: ', tvSrcArr.length)
    // console.log({tvAllNumber})
    // console.log({tvSrcArr})
    // console.log({tvSrcArrCached})

    tvRatio =
      tvAllNumber < tvSrcArrCached.length
        ? `${tvAllNumber} of ${tvSrcArrCached.length}`
        : `${tvSrcArrCached.length} of ${tvSrcArrCached.length}`

    console.group('Now Playing (' + tvRatio + ')')

    document.querySelectorAll('#body .tv').forEach(
      (e,i) => {
        let _temp = i + 1
        // console.log(_temp)
        // console.log(e)
        e.removeAttribute('alt')
        e.removeAttribute('title')
        // console.log(tvSrcArrCached[i])

        if (tvSrcArrCached[i]) {
          if (typeof tvSrcArrCached[i] === 'object') {
            // console.log( tvSrcArrCached[i]['id'])
            tvSrc = tvSrcPrefix + tvSrcArrCached[i]['id']
            tvTitle = tvSrcArrCached[i]['title']
            tvChannel = tvSrcArrCached[i]['channel']

            tvInfo = _temp + '. '
            if (tvTitle) tvInfo += tvTitle
            tvInfo += ' ' + tvSrc
            if (tvChannel) tvInfo += ' on ' + tvChannel

            // e.setAttribute('id', _temp)
            e.setAttribute('alt', tvSrcKey + ' - ' + tvTitle)
            e.setAttribute('title', tvTitle)
          }
          else {
            tvSrc = tvSrcPrefix + tvSrcArrCached[i]

            tvInfo = _temp + '. '
            tvInfo += ' ' + tvSrc
          }

          console.log(tvInfo)

          removeAllFirstChild(e)

          if (event) {
            if (theaSelected.value !== 'all')
              tvSrc = tvSrcPrefix + theaSelected.value
            else
              tvSrc = tvSrcPrefix + tvSrcArrCached[i] // to fix
          }

          //// console.log({tvSrc})

          tvHtml = `<iframe frameborder='${tvBorder}' allow='${tvAllow}' ${tvAllowfullscreen} src='${tvSrc}'></iframe>`

          e.insertAdjacentHTML('beforeEnd', tvHtml)
        }
      }
    )

    console.groupEnd()
  },

  setTv = () => {
    setTvGrid()
    setTvSrc()
  },

  intervalSetTvSize = setInterval(setTvSize, 1000),

  tvwall = () => {
    setThea()
    setLangSelect(langSelected.value)
    listenGridMenuRadio()
    listenTheaSelect()
    listenLangSelect()
    setTv()
    // setTvSize()
    // setInterval(setTvSize, 1000) // to fix fullscreen bug
  }

tvwall()