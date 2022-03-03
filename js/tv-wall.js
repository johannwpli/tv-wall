/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                      */

let /* get gridRadio */

    gridRadio = document.wall.grid,
    gridChckd = null,
    
    changeGridRadio = () => {
      //gridChckd ? console.log(gridChckd.value) : null
      this !== gridChckd ? gridChckd = this : null
      //console.log(this.value)
      setWall()
      setTv()
    },

    listenGridRadio = () => {
      for (let i of gridRadio) {
        i.addEventListener('change', changeGridRadio)
      }
    },

    /* get menuRadio */

    menuRadio = document.wall.menu,
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
      //console.log('width: ', width)
      //console.log('height: ', height)

      tvAllNumber = gridRadio.value
      tvShortNumber = Math.floor(Math.sqrt(tvAllNumber))
      // 12:3, 9:3, 8:2, 6:2, 4:2, 2:1

      width >= height 
        ? tvColNumber = tvAllNumber / (tvRowNumber = tvShortNumber)
        : tvRowNumber = tvAllNumber / (tvColNumber = tvShortNumber)

      //console.log('tvAllNumber: ', tvAllNumber)
      //console.log('tvRowNumber: ', tvRowNumber)
      //console.log('tvColNumber: ', tvColNumber)
    },

    tvSize = () => {
      width = window.innerWidth - widthDiff
      height = window.innerHeight - heightDiff

      tvWidth = width / tvColNumber
      tvHeight = height / tvRowNumber

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

    setWall = () => {
      tvGrid()

      document.querySelector('#wall').innerHTML = ''

      for (let i = 0; i < tvRowNumber; i++) {
        document.querySelector('#wall')
          .insertAdjacentHTML('beforeEnd', `<div class="row"></div>`)
      }

      document.querySelectorAll('#wall .row').forEach(
        (e,i) => {
          for (let i = 0; i < tvColNumber; i++) {
            e.insertAdjacentHTML('beforeEnd', `<div class="cell tv"></div>`)
          }
        }
      )
    },

    setTv = () => {
      tvSize()

      tvSrcKey = !menuChckd || menuChckd.value === radioMenuDefault
        ? radioMenuDefault
        : menuChckd.value

      tvSrcArr = Object.keys(tvSrcObj[tvSrcKey])
      //console.log(tvSrcArr)
      console.group('Now Playing')

      if (tvSrcArr.length > tvAllNumber) shuffle(tvSrcArr)

      //console.log('TV Array Length: ', tvSrcArr.length)
      //console.log('TV All Number: ', tvAllNumber)

      document.querySelectorAll('#wall .tv').forEach(
        (e,i) => {
          tvTitle = tvSrcObj[tvSrcKey][tvSrcArr[i]]
          tvTitle ? console.log(++i + '. '+ tvTitle) : null

          e.innerHTML = ''

          e.insertAdjacentHTML('beforeEnd', `<iframe
            width='${tvWidth}'
            height='${tvHeight}'
            title='${tvTitle}'
            frameborder='${tvBorder}'
            allow='${tvAllow}'
            allowfullscreen='${tvAllowfullscreen}'
            src='${tvSrc}${tvSrcArr[i]}'
          ></iframe>`)
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
setWall()
setTv()
