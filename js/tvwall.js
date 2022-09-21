/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                        
   Demo     https://johannwpli.github.io/tv-wall/   */

const
    /* set grid value by grid radio */

    clickGridRadio = function() {
      //gridChecked ? console.log(gridChecked.value) : null
      this !== gridChecked ? gridChecked = this : null
      //console.log(this.value)

      setUrl()
      setGridTV()
    },

    /* set menu value by menu radio */

    clickMenuRadio = function() {
      //menuChecked ? console.log(menuChecked.value) : null
      this !== menuChecked ? menuChecked = this : null
      //console.log(this.value)

      setUrl()
      setTV()
    },

    listenGridMenuRadio = () => {
      for (const i of gridRadio)
        i.addEventListener('click', clickGridRadio)

      for (const j of menuRadio)
        j.addEventListener('click', clickMenuRadio)
    },

    gridMenuClasslistAdd = (value) => {
      document.querySelector('.grid label:first-of-type').classList.add(value)
      document.querySelector('.menu label:first-of-type').classList.add(value)
    },

    gridMenuClasslistRemove = (value) => {
      document.querySelector('.grid label:first-of-type').classList.remove(value)
      document.querySelector('.menu label:first-of-type').classList.remove(value)
    },

    clickLangSelect = (e) => {
      gridMenuClasslistAdd(e.target.value)

      const toRemoveLangArr = Object.keys(selectLangObj).filter((v) => v !== e.target.value)
      //console.log(toRemoveArr)

      for (const i of toRemoveLangArr) gridMenuClasslistRemove(i)
    },

    listenLangSelect = () => document.querySelector('.cell.lang select').addEventListener("change", clickLangSelect),

    /* set tv size by window size */

    tvSize = () => {
      //console.log({head})
      //console.log({body})

      tv = document.querySelector('.tv')
      iframe = document.querySelector('iframe')

      getCssPx = (e,p) => 
        getComputedStyle(e).getPropertyValue(p).replace('px','') * 1 //toNumber

      bodyBorderWidth = getCssPx(body,'border-width') * 2
      headBorderWidth = getCssPx(head,'border-width') * 2
      headHeight = getCssPx(head,'height')

      //console.log({bodyBorderWidth})
      //console.log({headBorderWidth})
      //console.log({headHeight})

      widthDiff = bodyBorderWidth
      heightDiff = bodyBorderWidth + headBorderWidth + headHeight

      //console.log({widthDiff})
      //console.log({heightDiff})

      //console.log(getCssPx(tv,'width'))
      //console.log(getCssPx(tv,'height'))
      //console.log(getCssPx(iframe,'width'))
      //console.log(getCssPx(iframe,'height'))

      iframeBorderWidth = getCssPx(iframe,'border-width') * 2
      //iframeGapWidth = getCssPx(tv,'width') - getCssPx(iframe,'width')
      iframeGapHeight = getCssPx(tv,'height') - getCssPx(iframe,'height')

      //console.log({iframeBorderWidth})
      //console.log({iframeGapWidth})
      //console.log({iframeGapHeight})

      docWidth = window.innerWidth - widthDiff
      docHeight = window.innerHeight - heightDiff

      //console.log('window.innerWidth: ', window.innerWidth)
      //console.log('window.innerHeight: ', window.innerHeight)
      //console.log({docWidth})
      //console.log({docHeight})

      tvWidth = docWidth / tvColNumber - iframeBorderWidth
      tvHeight = docHeight / tvRowNumber - iframeGapHeight - iframeBorderWidth

      //console.log({tvWidth})
      //console.log({tvHeight})

      //console.log('tvWidth * tvColNumber: ', tvWidth * tvColNumber)
      //console.log('tvHeight * tvRowNumber: ', tvHeight * tvRowNumber)

      document.querySelectorAll('iframe').forEach(
        (e) => {
          e.setAttribute('width', tvWidth)
          e.setAttribute('height', tvHeight)
        }
      )
    },

    /* set grid layout by grid value */

    tvGrid = () => {
      tvAllNumber = gridRadio.value
      tvShortNumber = Math.floor(Math.sqrt(tvAllNumber))
      // 1~3:1, 4~8:2, 9~15:3, 16~24:4

      window.innerWidth >= window.innerHeight
        ? tvColNumber = tvAllNumber / (tvRowNumber = tvShortNumber)
        : tvRowNumber = tvAllNumber / (tvColNumber = tvShortNumber)

      //console.log({tvAllNumber})
      //console.log({tvRowNumber})
      //console.log({tvColNumber})

      /* innerHTML vs removeChild vs remove
         https://www.measurethat.net/Benchmarks/Show/6910/0/innerhtml-vs-removechild-vs-remove#latest_results_block */

      while (body.firstChild) body.firstChild.remove()

      for (let i = 0; i < tvRowNumber; i++)
        body.insertAdjacentHTML('beforeEnd', `<div class="row"></div>`)

      document.querySelectorAll('#body .row').forEach(
        (e,i) => {
          for (let i = 0; i < tvColNumber; i++)
            e.insertAdjacentHTML('beforeEnd', `<div class="cell tv"></div>`)
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

    setTV = () => {
      tvSrcKey = menuChecked.value
      //console.log({tvSrcKey})

      tvSrcArr = Object.keys(tvSrcObj[tvSrcKey])
      //console.log({tvSrcArr})

      tvRatio =
        tvAllNumber < tvSrcArr.length
          ? tvAllNumber + ' of '+ tvSrcArr.length
          : tvSrcArr.length + ' of ' + tvSrcArr.length

      console.group('Now Playing (' + tvRatio + ')')

      tvSrcArr.length > tvAllNumber ? shuffle(tvSrcArr) : null

      //console.log('TV Array Length: ', tvSrcArr.length)
      //console.log({tvAllNumber})

      document.querySelectorAll('#body .tv').forEach(
        (e,i) => {
          //console.log(i+1, tvSrcArr[i])
          tvTitle = tvSrcObj[tvSrcKey][tvSrcArr[i]]
          tvTitle ? console.log(i+1 + '. '+ tvTitle) : null
          tvSrc = tvSrcPrefix + tvSrcArr[i]
          //tvSrc ? console.log({tvSrc}) : null

          e.removeAttribute('alt')
          e.removeAttribute('title')
          while (e.firstChild) e.firstChild.remove()

          if (tvSrcArr[i]) {
            tvHtml = `<iframe` +
                     ` title='${tvTitle}'` +
                     ` frameborder='${tvBorder}'` +
                     ` allow='${tvAllow}'` +
                     ` allowfullscreen='${tvAllowfullscreen}'` +
                     ` src='${tvSrc}'>` +
                     `</iframe>`

            e.setAttribute('alt', tvSrcKey + ' - ' + tvTitle)
            e.setAttribute('title', tvTitle)
            e.insertAdjacentHTML('beforeEnd', tvHtml)
          }

        }
      )

      console.groupEnd()

      //tvSize()
      setInterval(tvSize, 1000) //to fix fullscreen bug
    },    

    /* set grid and tv by window size */

    setGridTV = () => {
      tvGrid()
      setTV()
    },

    listenWindowResize = () => window.addEventListener('resize', setGridTV),

    tvwall = () => {
      listenGridMenuRadio()
      listenLangSelect()
      setGridTV()
      listenWindowResize()
    }

tvwall()