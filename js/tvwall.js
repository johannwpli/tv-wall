/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                        
   Demo     https://johannwpli.github.io/tv-wall/   */

let /* set grid value by grid radio */

    clickGridRadio = function() {
      //gridChecked ? console.log(gridChecked.value) : null
      this !== gridChecked ? gridChecked = this : null
      //console.log(this.value)

      setUrl()
      setBody()
      setTv()
    },

    listenGridRadio = () => {
      for (let i of gridRadio) {
        i.addEventListener('click', clickGridRadio)
      }
    },

    /* set menu value by menu radio */

    changeMenuRadio = function() {
      //menuChecked ? console.log(menuChecked.value) : null
      this !== menuChecked ? menuChecked = this : null
      //console.log(this.value)

      setUrl()
      setTv()
    },

    listenMenuRadio = () => {
      for (let i of menuRadio) {
        i.addEventListener('change', changeMenuRadio)
      }
    },

    /* adjust tv size by window size */

    listenWindowResize = () => {
      window.addEventListener('resize',
        () => {
          tvSize()

          document.querySelectorAll('iframe').forEach(
            (e) => {
              e.setAttribute('width', tvWidth)
              e.setAttribute('height', tvHeight)
            }
          )
        }
      )
    },

    /* set grid layout by grid value */

    tvGrid = () => {
      tvAllNumber = gridRadio.value
      tvShortNumber = Math.floor(Math.sqrt(tvAllNumber))
      // 1~3:1, 4~8:2, 9~15:3, 16:4

      window.innerWidth >= window.innerHeight
        ? tvColNumber = tvAllNumber / (tvRowNumber = tvShortNumber)
        : tvRowNumber = tvAllNumber / (tvColNumber = tvShortNumber)

      //console.log({tvAllNumber})
      //console.log({tvRowNumber})
      //console.log({tvColNumber})
    },

    /* set tv size by window size */

    tvSize = () => {
      //console.log({head})
      //console.log({body})

      let tv = document.querySelector('.tv')

      bbw = getComputedStyle(body)
              .getPropertyValue('border-width').replace('px',''),
      tbw = getComputedStyle(tv)
              .getPropertyValue('border-width').replace('px',''),
      hbw = getComputedStyle(head)
              .getPropertyValue('border-width').replace('px',''),
      hht = getComputedStyle(head)
              .getPropertyValue('height').replace('px',''),

      widthDiff =  bbw * 2 + tbw * 2 * tvColNumber
      // body border width * 2 sides
      // + tv border width * 2 sides * max cols

      heightDiff =  bbw * 2 + (tbw * 2 + 4) * tvRowNumber + hbw * 2 + hht * 1
      // body border height * 2 sides
      // + (tv border height * 2 sides + iframe height gap) * max rows
      // + header border height * 2 sides
      // + header height

      //console.log({bbw})
      //console.log({tbw})
      //console.log({hbw})
      //console.log({hht})
      //console.log({widthDiff})
      //console.log({heightDiff})

      docWidth = window.innerWidth - widthDiff
      docHeight = window.innerHeight - heightDiff

      //console.log({docWidth})
      //console.log({docHeight})

      tvWidth = docWidth / tvColNumber
      tvHeight = docHeight / tvRowNumber

      //console.log({tvWidth})
      //console.log({tvHeight})
      //console.log('tvWidth*tvColNumber: ', tvWidth * tvColNumber)
      //console.log('tvHeight*tvRowNumber: ', tvHeight * tvRowNumber)
    },

    /* shuffle array with Fisher-Yates algo          
       https://shubo.io/javascript-random-shuffle/ */

    shuffle = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    },

    setBody = () => {
      tvGrid()

      /* innerHTML vs removeChild vs remove
         https://www.measurethat.net/Benchmarks/Show/6910/0/innerhtml-vs-removechild-vs-remove#latest_results_block */

      while (body.firstChild) body.firstChild.remove()

      for (let i = 0; i < tvRowNumber; i++) {
        document.querySelector('#body')
          .insertAdjacentHTML('beforeEnd', `<div class="row"></div>`)
      }

      document.querySelectorAll('#body .row').forEach(
        (e,i) => {
          for (let i = 0; i < tvColNumber; i++) {
            e.insertAdjacentHTML('beforeEnd', `<div class="cell tv"></div>`)
          }
        }
      )
    },

    setTv = () => {
      tvSize()

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
                     ` width='${tvWidth}'` +
                     ` height='${tvHeight}'` +
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
    },

    tvwall = () => {
      listenGridRadio()
      listenMenuRadio()
      listenWindowResize()
      setBody()
      setTv()
    }

tvwall()
