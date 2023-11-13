/* Author: Johann Li, GitHub: https://github.com/johannwpli/ */

"use strict"

let

  tvwallPercent = 1, // fail-safe

  ctRoom,
  ctRoomHtml = '<div id="ctRoom"><chat-room room="TVWall.cc" height="100%"></div>',

  intervalSetTvSize,
  intervalSetTvSizeFlag = false,
  intervalSetTvSizeDelay = 1500, // i.e. 1.5 secs

  tv,
  iframe,
  bodyBorderWidth,
  headBorderWidth,
  headHeight,
  iframeBorderWidth,

  tvNowWidth,
  tvNowHeight,
  iframeNowWidth,
  iframeNowHeight,
  iframeGapHeight,

  tvNumberFlag = 0 // default

const

  handle = {
    ctrmRadio: {
      change: function() { /* set ctrm value by ctrm radio */
    
        // if (ctrmChecked) console.log(ctrmChecked.value)
        if (this !== ctrmChecked) ctrmChecked = this
        // console.log(this.value)
    
        if (this.value === 'On') {
          // console.log(ctRoom)
    
          ctrmOn.classList.add('hide')
          ctrmOff.classList.remove('hide')
        
          tvWall.insertAdjacentHTML('afterEnd', ctRoomHtml)
          tvWall.classList.add('ctRoomed')
    
          ctRoom = document.querySelector('#ctRoom')
    
          handle.window.resize()
        }
        else {
          ctrmOn.classList.remove('hide')
          ctrmOff.classList.add('hide')
    
          if (ctRoom) ctRoom.remove()
    
          tvWall.classList.remove('ctRoomed')
    
          handle.window.resize()
        }
      }
    },
  
    menuRadio: {
      click: function() { /* set menu value by menu radio */
    
        // if (menuChecked) console.log(menuChecked.value)
        if (this !== menuChecked) menuChecked = this
        // console.log(this.value)
    
        setTvAll()
        set.url()
        handle.thtrSelect.resetAndListen()
      }
    },
  
    gridRadio: {
      click: function() { /* set grid value by grid radio */
    
        // if (gridChecked) console.log(gridChecked.value)
        if (this !== gridChecked) gridChecked = this
        // console.log(this.value)
    
        setTvAll()
        set.url()
        handle.thtrSelect.resetAndListen()
      }
    },

    langSelect: {
      set: (value) => {
        langClasslist.add(value)
    
        const toRemoveLangArr = Object.keys(selectLangObj).filter((v) => v !== value)
        // console.log(toRemoveArr)
    
        for (const i of toRemoveLangArr)
          langClasslist.remove(i)
      },

      change: (e) => {
        handle.langSelect.set(e.target.value)
        set.url()
      },  
    },
  
    thtrSelect: {
      change: (value) => {
        // console.log(value)
        thtrSelect.querySelectorAll(`option[value="${value}"]`)[0].selected = 'selected'
        // console.log(thtrSelect.value)
      },

      click: (event) => {
        // console.log(event)
        // console.log({tvNumberFlag})
        // console.log(thtrSelect.value)
        // console.log({tvSrcArrCached})
    
        if (thtrSelect.value === '0') {
          setTv.sizeInterval(true)
          setTv.size()
          tvNumberFlag = 0
          
          for (let i = 1; i <= tvRowNumber; i++)
              document.getElementById(`row${i}`).classList.remove('hide')
        }
        else {
          setTv.sizeInterval(false)
          tvNumberFlag = alphanumericToNumber(thtrSelect.value)
    
          let _temp = (gridChecked.value === 'all') ? tvSrcArrCached.length : gridChecked.value * 1
    
          for (let i = 1; i <= _temp; i++) {
            // console.log(_temp) // number
    
            let e = document.getElementById(`tv${numberToAlphanumeric(i)}`)
            // console.log(e)
            // console.log(thtrSelect.value)
    
            if (e) {
              if (i !== alphanumericToNumber(thtrSelect.value)) {
                e.setAttribute('width', '0')
                e.setAttribute('height', '0')
              }
              else {
                e.setAttribute('width', screenWidth)
                e.setAttribute('height', screenHeight)
              }
            }
          }
    
          // console.log({tvAllNumber}) // e.g. 12
          // console.log({tvRowNumber}) // e.g. 4
          // console.log({tvColNumber}) // e.g. 3
      
          let rowNumber  = Math.floor((alphanumericToNumber(thtrSelect.value) - 1) / tvColNumber) + 1 // 7,8,9 => 6,7,8 => 2,2.x,2.y => 2 => 3
          // console.log({rowNumber})
      
          for (let i = 1; i <= tvRowNumber; i++) {
            let e = document.getElementById(`row${i}`)
            i !== rowNumber ? e.classList.add('hide') : e.classList.remove('hide')
          }
        }
    
        // console.log({tvNumberFlag})
        // console.log(thtrSelect.value)
      },

      changeAndClick: (value) => {
        handle.thtrSelect.change(value)
        handle.thtrSelect.click()
      },

      toggle: (value) => {
        // console.log({tvNumberFlag})
        if (tvNumberFlag !== 0) value = '0'
        // console.log({value})

        handle.thtrSelect.changeAndClick(value)
        // console.log({tvNumberFlag})
      },

      resetAndListen: () => {
        set.thtr() // to reset thtr
        listen.thtrSelect()
      }
    },

    window: {
      resize: () => {
        getWidthAndHeight()
        handle.thtrSelect.click()
      }
    },

    orientation: {
      change: () => {
        // console.log(screen.orientation)
    
        // getWidthAndHeight() // doesn't work
        
        /* doesn't work either */
        // let _temp = window.innerHeight
        // window.innerHeight = window.innerWidth
        // window.innerWidth = _temp
    
        // console.log('window.innerWidth: ', window.innerWidth)
        // console.log('window.innerHeight: ', window.innerHeight)
    
        handle.thtrSelect.resetAndListen()
        setTvAll()
      }
    },
  },

  langClasslist = {
    add: (value) => {
      for (let i = 1; i < headPartArr.length; i++) {
        document.querySelectorAll(`.${headPartArr[i]} label`).forEach(
          (e) => e.classList.add(value)
        )
      }
    },

    remove: (value) => {
      for (let i = 1; i < headPartArr.length; i++) {
        document.querySelectorAll(`.${headPartArr[i]} label`).forEach(
          (e) => e.classList.remove(value)
        )
      }
    },
  },

  listen = {
    thtrSelect: () => document.querySelector('.cell.thtr select').addEventListener('change', handle.thtrSelect.click),

    ctrmMenuGridRadio: () => {
      for (const i of ctrmRadio)
        i.addEventListener('change', handle.ctrmRadio.change)
  
      for (const j of menuRadio)
        j.addEventListener('click', handle.menuRadio.click)
  
      for (const k of gridRadio)
        k.addEventListener('click', handle.gridRadio.click)
    },

    langSelect: () => document.querySelector('.cell.lang select').addEventListener('change', handle.langSelect.change),

    keyPress: () => {
      /* capture keyboard input, https://codepen.io/DBoy_Fresh/pen/RgjYKG */
  
      document.onkeydown = (e) => {
        let keyPress = e.key
        // console.log({keyPress})
        // console.log(selectThtrObj)
        // console.log(keyPress in selectThtrObj)

        if (keyPress in selectThtrObj) /* check if thtr equals to key pressed */
          handle.thtrSelect.changeAndClick(keyPress)
      }
    },

    windowResize: () => window.addEventListener('resize', handle.window.resize),

    orientationChange: () => screen.orientation.addEventListener('change', handle.orientation.change)
  },

  getCssPx = (e,p) => { /* get css property pixel value */
    // console.log({e})
    return getComputedStyle(e).getPropertyValue(p).replace('px', '') * 1 || 0 // convert to number
  },


  getWidthAndHeight = () => { /* get width and height of tv and screen */
    // console.log({body})
    // console.log({head})
    // console.log({iframe})
    // console.log({tvNumberFlag})

    if (tvNumberFlag) {
      let _temp = alphanumericToNumber(numberToAlphanumeric(tvNumberFlag - 1))
      tv = document.querySelectorAll('.tv')[`${_temp}`]
      iframe = document.querySelectorAll('iframe')[`${_temp}`]
    }
    else {
      tv = document.querySelector('.tv')
      iframe = document.querySelector('iframe')
    }

    // console.log({tv})
    // console.log({iframe})

    bodyBorderWidth = getCssPx(body, 'border-width') * 2
    headBorderWidth = getCssPx(head, 'border-width') * 2
    headHeight = getCssPx(head, 'height')
    iframeBorderWidth = getCssPx(iframe, 'border-width') * 2

    // console.log({bodyBorderWidth})
    // console.log({headBorderWidth})
    // console.log({headHeight})
    // console.log({iframeBorderWidth})

    widthDiff = bodyBorderWidth
    heightDiff = bodyBorderWidth + headBorderWidth + headHeight

    // console.log({widthDiff})
    // console.log({heightDiff})

    tvNowWidth = getCssPx(tv, 'width')
    tvNowHeight = getCssPx(tv, 'height')
    iframeNowWidth = getCssPx(iframe, 'width')
    iframeNowHeight = getCssPx(iframe, 'height')

    // console.log({tvNowWidth})
    // console.log({tvNowHeight})
    // console.log({iframeNowWidth}) // default 300
    // console.log({iframeNowHeight}) //default 150

    // iframeGapWidth = tvNowWidth - iframeNowWidth
    iframeGapHeight = tvNowHeight - iframeNowHeight

    // console.log({iframeGapWidth})
    // console.log({iframeGapHeight}) // dynamic

    tvwallPercent = getComputedStyle(tvWall).getPropertyValue('width').replace('px', '') / window.innerWidth
    // console.log(window.innerWidth)
    // console.log({tvwallPercent})

    docWidth = (window.innerWidth - widthDiff) * tvwallPercent
    docHeight = window.innerHeight - heightDiff

    // console.log('window.innerWidth: ', window.innerWidth)
    // console.log('window.innerHeight: ', window.innerHeight)
    // console.log({docWidth})
    // console.log({docHeight})

    tvWidth = docWidth / tvColNumber - iframeBorderWidth // - iframeGapWidth // causes wrong width
    tvHeight = docHeight / tvRowNumber - iframeBorderWidth - iframeGapHeight

    // console.log({tvWidth})
    // console.log({tvHeight})

    screenWidth = docWidth - iframeBorderWidth
    screenHeight = docHeight - iframeBorderWidth - iframeGapHeight

    // console.log({screenWidth})
    // console.log({screenHeight})
  },

  shuffle = (arr) => {
    /* shuffle array with Fisher-Yates algo, https://shubo.io/javascript-random-shuffle/ */

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  },

  setTv = {
    grid: () => { /* set grid layout by grid value */

      menuChecked = document.querySelector('input[name="menu"]:checked')
      // console.log(menuChecked.value)
      tvSrcKey = menuChecked.value
      // console.log({tvSrcKey})

      tvSrcArr = (tvSrcObj.hasOwnProperty(tvSrcKey))
        ? tvSrcObj[tvSrcKey]
        : urlIdParam.split(',')

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
      // tvAllNumber: tvShortNumber; 1~3: 1, 4~8: 2, 9~15: 3, 16~24: 4

      window.innerWidth >= window.innerHeight
        ? tvColNumber = tvAllNumber / (tvRowNumber = tvShortNumber)
        : tvRowNumber = tvAllNumber / (tvColNumber = tvShortNumber)

      // console.log({tvAllNumber})
      // console.log({tvRowNumber})
      // console.log({tvColNumber})

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

    src: () => {
      tvSrcArrCached = [...tvSrcArr]

      if (tvSrcArrCached.length > tvAllNumber)
        shuffle(tvSrcArrCached)

      // console.log('TV Array Length: ', tvSrcArr.length)
      // console.log({tvAllNumber})
      // console.log({tvSrcArr})
      // console.log({tvSrcArrCached})

      tvRatio =
        (tvAllNumber < tvSrcArrCached.length)
          ? `${tvAllNumber} of ${tvSrcArrCached.length}`
          : `${tvSrcArrCached.length} of ${tvSrcArrCached.length}`

      console.group('Now Playing (' + tvRatio + ')')

      const setTvHtml = () => {
        document.querySelectorAll('#body .tv').forEach(
          (e,i) => {
            let _temp = numberToAlphanumeric(i + 1)

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

              // tvHtml = `<div name='${_temp}' class='tvNumber' title='click to trigger theater mode'>${_temp}</div>
              tvHtml = `<div name='${_temp}' class='tvNumber' title='click to toggle theater mode' onclick="handle.thtrSelect.toggle('${_temp}')">${_temp}</div>
              <iframe frameborder='${tvBorder}' allow='${tvAllow}' ${tvAllowfullscreen} src='${tvSrc}'></iframe>`

              e.insertAdjacentHTML('beforeEnd', tvHtml)

              // document.querySelector(`div[name='${_temp}']`).addEventListener('click', handle.thtrSelect.toggle(`${_temp}`)) // doesn't work
            }
          }
        )
      }

      setTvHtml()
    
      console.groupEnd()
    },

    size: () => { /* set tv size by window size */

      getWidthAndHeight()

      document.querySelectorAll('#tvWall iframe').forEach(
        (e,i) => {
          let _temp = numberToAlphanumeric(i + 1)

          e.setAttribute('id', `tv${_temp}`)
          e.setAttribute('width', tvWidth)
          e.setAttribute('height', tvHeight)
        }
      )
    },

    sizeInterval: (status) => {
      // console.log({intervalSetTvSizeFlag})

      if (status) {
        if (!intervalSetTvSizeFlag) {
          intervalSetTvSize = setInterval(setTv.size, intervalSetTvSizeDelay) // to fix iframe native bug returning from fullscreen
          intervalSetTvSizeFlag = true
        }
      }
      else {
        if (intervalSetTvSizeFlag) {
          clearInterval(intervalSetTvSize)
          intervalSetTvSizeFlag = false
        }
      }

      // console.log({intervalSetTvSizeFlag})
    },
  },

  // resetAndListenThtrSelect = () => {
  //   set.thtr() // to reset thtr
  //   listen.thtrSelect()
  // },

  listenAll = () => {
    listen.ctrmMenuGridRadio()
    listen.langSelect()
    listen.keyPress()
    listen.windowResize()
    listen.orientationChange()
  },

  setTvAll = () => {
    setTv.grid()
    setTv.src()
    setTv.size()
    setTv.sizeInterval(true)
  },

  tvwall = () => {
    handle.thtrSelect.resetAndListen()
    handle.langSelect.set(langSelect.value)
    listenAll()
    setTvAll()
  }

tvwall()