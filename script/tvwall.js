/* Author: Johann Li, GitHub: https://github.com/johannwpli/ */

let

  intervalSetTvSize,
  intervalSetTvSizeCount = false

const

  removeAllFirstChild = (e) => {
    while (e.firstChild)
      e.firstChild.remove()
  },

  setThtrSelect = () => {
    docCellThtr = document.querySelector('.cell.thtr')

    removeAllFirstChild(docCellThtr)
    
    selectThtr = ''
    selectThtrObj[selectThtrDefault] = 'all'

    docCellThtr.insertAdjacentHTML('afterBegin', '<select id="thtr"></select>')
    docCellThtr.insertAdjacentHTML('afterBegin', `<label class="${selectLangDefault}"></label>`)

    thtrSelect = document.querySelector('#thtr')

    // console.log({tvSrcArr})
    // console.log({tvSrcArrCached})

    if (tvSrcArrCached) {
      // console.log('tvSrcArrCached is available')
      
      if (gridChecked.value === 'all') {
        for (let i = 0; i < tvSrcArrCached.length; i++) {
          if (typeof tvSrcArrCached[i] === 'object')
            selectThtrObj[i + 1] = tvSrcArrCached[i]['id']
          else
            selectThtrObj[i + 1] = tvSrcArrCached[i]
        }
      }
      else {
        for (let i = 0; i < gridChecked.value; i++) {
          if (typeof tvSrcArrCached[i] === 'object')
            selectThtrObj[i + 1] = tvSrcArrCached[i]['id']
          else
            selectThtrObj[i + 1] = tvSrcArrCached[i]
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
            selectThtrObj[i + 1] = tvSrcArr[i]['id']
          else
            selectThtrObj[i + 1] = tvSrcArr[i]
        }
      }
      else {
        for (let i = 0; i < gridChecked.value; i++) {
          if (typeof tvSrcArr[i] === 'object')
            selectThtrObj[i + 1] = tvSrcArr[i]['id']
          else
            selectThtrObj[i + 1] = tvSrcArr[i]
        }
      }
    }

    // console.log(selectThtrObj)

    for (const k in selectThtrObj) {
      // console.log(k)
      (k === '0')
        ? selectThtr += `<option name="thtr" value="${k}">${selectThtrObj[k]}</option>`
        : selectThtr += `<option name="thtr" value="${k}">${k}</option>`
    }

    document.querySelector('.cell.thtr select').insertAdjacentHTML('beforeEnd', selectThtr)

    document.querySelector(`option[value='${selectThtrDefault}']`).setAttribute('selected', 'selected')
  },

  setLangSelect = (value) => {
    langClasslistAdd(value)

    const toRemoveLangArr = Object.keys(selectLangObj).filter((v) => v !== value)

    for (const i of toRemoveLangArr)
      langClasslistRemove(i)
  },

  /* set grid value by grid radio */

  clickGridRadio = function() {
    // if (gridChecked) console.log(gridChecked.value)
    if (this !== gridChecked) gridChecked = this
    // console.log(this.value)

    setTv()
    setUrl()
    setThtr()
  },

  /* set menu value by menu radio */

  clickMenuRadio = function() {
      // if (menuChecked) console.log(menuChecked.value)
      if (this !== menuChecked) menuChecked = this
      // console.log(this.value)

    setTv()
    setUrl()
    setThtr()
  },

  listenGridMenuRadio = () => {
    for (const i of gridRadio)
      i.addEventListener('click', clickGridRadio)

    for (const j of menuRadio)
      j.addEventListener('click', clickMenuRadio)
  },

  clickThtrSelect = (e) => {
    // console.log(e)

    // console.log(thtrSelect.value)
    // console.log({tvSrcArrCached})
    
    // console.log({screenWidth})
    // console.warn({screenHeight})

    if (thtrSelect.value === '0') {
      setIntervalSetTvSize(true)
      
      for (let i = 1; i <= tvRowNumber; i++)
          document.getElementById(`row${i}`).classList.remove('hide')
    }
    else {
      setIntervalSetTvSize(false)

      let _temp = gridChecked.value === 'all' ? tvSrcArrCached.length : gridChecked.value * 1

      for (let i = 1; i <= _temp; i++) {
          // console.log(_temp)
          // console.log(i)

        if (document.getElementById(`tv${i}`)) {
          if (i !== thtrSelect.value * 1) {
            document.getElementById(`tv${i}`).setAttribute('width', '0')
            document.getElementById(`tv${i}`).setAttribute('height', '0')
          }
          else {
            document.getElementById(`tv${i}`).setAttribute('width', screenWidth)
            document.getElementById(`tv${i}`).setAttribute('height', screenHeight)
          }
        }
      }

      // console.log({tvAllNumber}) // 12
      // console.log({tvRowNumber}) // 4
      // console.log({tvColNumber}) // 3
  
      let rowNumber  = Math.floor((thtrSelect.value - 1 ) / tvColNumber) + 1 // 7,8,9 => 6,7,8 => 2,2.x,2.y => 2 => 3
      // console.log({rowNumber})
  
      for (let i = 1; i <= tvRowNumber; i++)
        (i !== rowNumber)
          ? document.getElementById(`row${i}`).classList.add('hide')
          : document.getElementById(`row${i}`).classList.remove('hide')
    }
  },

  listenThtrSelect = () => document.querySelector('.cell.thtr select').addEventListener('change', clickThtrSelect),

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

  listenKeyPress = () => {
    /* Capture KeyBoard Input, https://codepen.io/DBoy_Fresh/pen/RgjYKG */

    document.onkeydown = (e) => {
      let keyPress = e.key
      // console.log({keyPress})
      // console.log(selectThtrObj)
      // console.log(keyPress in selectThtrObj)

      if (keyPress in selectThtrObj)
        thtrSelect.querySelectorAll(`option[value="${keyPress}"]`)[0].selected = 'selected'

      // console.log(thtrSelect.value)

      clickThtrSelect()

      // for (let menu of radioMenuShow) {
      //   // https://stackoverflow.com/questions/53093241/check-if-string-is-starting-with-prefix
      //   if (menu.toLowerCase().indexOf(keyPress.toLowerCase()) === 0) { // check if menu starts with key pressed as prefix 
      //     console.log(menu)
      //   }
      // }
    }
  },

  /* get css property pixel value */

  getCssPx = (e,p) => 
    getComputedStyle(e).getPropertyValue(p).replace('px', '') * 1 // toNumber

  /* set tv size by window size */

  setTvSize = () => {
    // console.log({head})
    // console.log({body})

    tv = document.querySelector('.tv')
    iframe = document.querySelector('iframe')

    bodyBorderWidth = getCssPx(body, 'border-width') * 2
    headBorderWidth = getCssPx(head, 'border-width') * 2
    headHeight = getCssPx(head, 'height')

    // console.log({bodyBorderWidth})
    // console.log({headBorderWidth})
    // console.log({headHeight})

    widthDiff = bodyBorderWidth
    heightDiff = bodyBorderWidth + headBorderWidth + headHeight

    // console.log({widthDiff})
    // console.log({heightDiff})

    // console.log(getCssPx(tv, 'width'))
    // console.log(getCssPx(tv, 'height'))
    // console.log(getCssPx(iframe, 'width'))
    // console.log(getCssPx(iframe, 'height'))

    iframeBorderWidth = getCssPx(iframe, 'border-width') * 2
    // iframeGapWidth = getCssPx(tv, 'width') - getCssPx(iframe, 'width')
    iframeGapHeight = getCssPx(tv, 'height') - getCssPx(iframe, 'height')

    // console.log({iframeBorderWidth})
    // console.log({iframeGapWidth})
    // console.log({iframeGapHeight}) // dynamic

    docWidth = window.innerWidth - widthDiff
    docHeight = window.innerHeight - heightDiff

    // console.log('window.innerWidth: ', window.innerWidth)
    // console.log('window.innerHeight: ', window.innerHeight)
    // console.log({docWidth})
    // console.log({docHeight})

    tvWidth = docWidth / tvColNumber - iframeBorderWidth // - iframeGapWidth // cause wrong width
    tvHeight = docHeight / tvRowNumber - iframeBorderWidth - iframeGapHeight

    // console.log({tvWidth})
    // console.log({tvHeight})

    screenWidth = docWidth - iframeBorderWidth
    screenHeight = docHeight - iframeBorderWidth - iframeGapHeight

    // console.log({screenWidth})
    // console.log({screenHeight})

    document.querySelectorAll('iframe').forEach(
      (e,i) => {
        let _temp = i + 1
        e.setAttribute('id', `tv${_temp}`)
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
    // console.log({tvSrcArr})
    
    tvShortNumber = Math.floor(Math.sqrt(tvAllNumber))
    // 1~3:1, 4~8:2, 9~15:3, 16~24:4

    window.innerWidth >= window.innerHeight
      ? tvColNumber = tvAllNumber / (tvRowNumber = tvShortNumber)
      : tvRowNumber = tvAllNumber / (tvColNumber = tvShortNumber)

    // console.log({tvAllNumber})
    // console.log({tvRowNumber})
    // console.log({tvColNumber})

    /* innerHTML vs removeChild vs remove, https://www.measurethat.net/Benchmarks/Show/6910/0/innerhtml-vs-removechild-vs-remove#latest_results_block */

    removeAllFirstChild(body)

    for (let i = 0; i < tvRowNumber; i++) {
      let _temp = i + 1
      body.insertAdjacentHTML('beforeEnd', `<div class="row" id="row${_temp}"></div>`)
    }

    document.querySelectorAll('#body .row').forEach(
      (e,i) => {
        for (let j = 0; j < tvColNumber; j++)
          e.insertAdjacentHTML('beforeEnd', `<div class="cell tv"></div>`)
      }
    )
  },

  /* shuffle array with Fisher-Yates algo, https://shubo.io/javascript-random-shuffle/ */

  shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  },

  setTvSrc = () => {
    tvSrcArrCached = [...tvSrcArr]

    if (tvSrcArrCached.length > tvAllNumber)
      shuffle(tvSrcArrCached)

    // console.log('TV Array Length: ', tvSrcArr.length)
    // console.log({tvAllNumber})
    // console.log({tvSrcArr})
    // console.log({tvSrcArrCached})

    tvRatio =
      tvAllNumber < tvSrcArrCached.length
        ? `${tvAllNumber} of ${tvSrcArrCached.length}`
        : `${tvSrcArrCached.length} of ${tvSrcArrCached.length}`

    console.group('Now Playing (' + tvRatio + ')')

    // return

    const setTvHtml = () => {
      let tvNumber = 1
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
              e.setAttribute('alt', tvSrcKey + ' > ' + tvTitle)
              e.setAttribute('title', _temp + '. ' + tvTitle)
            }
            else {
              tvSrc = tvSrcPrefix + tvSrcArrCached[i]

              tvInfo = _temp + '. '
              tvInfo += ' ' + tvSrc
            }

            console.log(tvInfo)

            removeAllFirstChild(e)

            // console.log({tvSrc})

            tvHtml = `<div class='tvNumber'>${tvNumber++}</div>
              <iframe frameborder='${tvBorder}' allow='${tvAllow}' ${tvAllowfullscreen} src='${tvSrc}'></iframe>`

            e.insertAdjacentHTML('beforeEnd', tvHtml)
          }
        }
      )
    }
    

    setTimeout(() => { setTvHtml() }, 500)
  
    console.groupEnd()
  },

  setIntervalSetTvSize = (status) => {
    // console.log({intervalSetTvSizeCount})

    if (status) {
      if (!intervalSetTvSizeCount) {
        intervalSetTvSize = setInterval(setTvSize, 500) // to fix bug of 1st iframe returning from fullscreen
        intervalSetTvSizeCount = true
      }
    }
    else {
      if (intervalSetTvSizeCount) {
        clearInterval(intervalSetTvSize)
        intervalSetTvSizeCount = false
      }
    }

    // console.log({intervalSetTvSizeCount})
  },

  setThtr = () => {
    setThtrSelect()
    listenThtrSelect()
  },

  setTv = () => {
    setTvGrid()
    setTvSrc()
    setIntervalSetTvSize(true)
  },

  tvwall = () => {
    setThtr()
    setLangSelect(langSelect.value)
    listenGridMenuRadio()
    listenLangSelect()
    listenKeyPress()
    setTv()
  }

tvwall()