/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                        
   Demo     https://johannwpli.github.io/tv-wall/   */

let /* get gridRadio */

    gridRadio = document.tvWall.grid,
    gridChckd = null,
    
    changeGridRadio = () => {
      //gridChckd ? console.log(gridChckd.value) : null
      this !== gridChckd ? gridChckd = this : null
      //console.log(this.value)
      setBody()
      setTv()
    },

    listenGridRadio = () => {
      for (let i of gridRadio) {
        i.addEventListener('change', changeGridRadio)
      }
    },

    /* get menuRadio */

    menuRadio = document.tvWall.menu,
    menuChckd = null,
    
    changeMenuRadio = function() {
      //menuChckd ? console.log(menuChckd.value) : null
      this !== menuChckd ? menuChckd = this : null
      //console.log(this.value)
      setTv()
    },

    listenMenuRadio = () => {
      for (let i of menuRadio) {
        i.addEventListener('change', changeMenuRadio)
      }
    },

    tvGrid = () => {
      //console.log('docWidth: ', docWidth)
      //console.log('docHeight: ', docHeight)

      tvAllNumber = gridRadio.value
      tvShortNumber = Math.floor(Math.sqrt(tvAllNumber))
      // 1~3:1, 4~8:2, 9~15:3, 16:4

      docWidth >= docHeight 
        ? tvColNumber = tvAllNumber / (tvRowNumber = tvShortNumber)
        : tvRowNumber = tvAllNumber / (tvColNumber = tvShortNumber)

      //console.log('tvAllNumber: ', tvAllNumber)
      //console.log('tvRowNumber: ', tvRowNumber)
      //console.log('tvColNumber: ', tvColNumber)
    },

    tvSize = () => {
      docWidth = window.innerWidth - widthDiff
      docHeight = window.innerHeight - heightDiff

      tvWidth = docWidth / tvColNumber
      tvHeight = docHeight / tvRowNumber

      //console.log('tvWidth: ', tvWidth)
      //console.log('tvHeight: ', tvHeight)
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

      document.querySelector('#body').innerHTML = ''

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

      tvSrcKey =
        !menuChckd || menuChckd.value === radioMenuDefault
          ? radioMenuDefault
          : menuChckd.value

      tvSrcArr = Object.keys(tvSrcObj[tvSrcKey])
      //console.log(tvSrcArr)

      tvRatio =
        tvAllNumber < tvSrcArr.length
          ? tvAllNumber + ' of '+ tvSrcArr.length
          : tvSrcArr.length + ' of ' + tvSrcArr.length

      console.group('Now Playing (' + tvRatio + ')')

      tvSrcArr.length > tvAllNumber ? shuffle(tvSrcArr) : null

      //console.log('TV Array Length: ', tvSrcArr.length)
      //console.log('TV All Number: ', tvAllNumber)

      document.querySelectorAll('#body .tv').forEach(
        (e,i) => {
          //console.log(i+1, tvSrcArr[i])
          tvTitle = tvSrcObj[tvSrcKey][tvSrcArr[i]]
          tvTitle ? console.log(i+1 + '. '+ tvTitle) : null
          tvSrc = tvSrcPrefix + tvSrcArr[i]
          //tvSrc ? console.log(tvSrc) : null

          e.removeAttribute('alt')
          e.removeAttribute('title')
          e.innerHTML = ''

          if (tvSrcArr[i]) {
            tvHtml = `<iframe width='${tvWidth}'
                              height='${tvHeight}'
                              title='${tvTitle}'
                              frameborder='${tvBorder}'
                              allow='${tvAllow}'
                              allowfullscreen='${tvAllowfullscreen}'
                              src='${tvSrc}'></iframe>`

            e.setAttribute('alt', tvSrcKey + ' - ' + tvTitle)
            e.setAttribute('title', tvTitle)
            e.insertAdjacentHTML('beforeEnd', tvHtml)
          }

        }
      )

      console.groupEnd()
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
    }

listenGridRadio()
listenMenuRadio()
listenWindowResize()
setBody()
setTv()
