/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                      */

let /* get layoutRadio */

    layoutRadio = document.wall.layout,
    layoutPrev = null,
    
    changeLayoutRadio = function() {
      //layoutPrev ? console.log(layoutPrev.value) : null
      this !== layoutPrev ? layoutPrev = this : null
      //console.log(this.value)
      setWall()
      setTv()
    },

    listenLayoutRadio = () => {
      for (let i of layoutRadio) {
        i.addEventListener('change', changeLayoutRadio)
      }
    },

    /* get menuRadio */

    menuRadio = document.wall.menu,
    menuPrev = null,
    
    changeMenuRadio = function() {
      //menuPrev ? console.log(menuPrev.value) : null
      this !== menuPrev ? menuPrev = this : null
      //console.log(this.value)
      setTv()
    },

    listenMenuRadio = () => {
      for (let i of menuRadio) {
        i.addEventListener('change', changeMenuRadio)
      }
    },

    tvLayout = () => {
      console.log('width: ', width)
      console.log('height: ', height)

      tvAllNumber = layoutRadio.value,

      tvRowNumber =
        !layoutPrev || tvAllNumber === '6' && width >= height ? 2
        : !layoutPrev || tvAllNumber === '6' && width < height ? 3
        : tvAllNumber === '12' ? 3
        : Math.sqrt(tvAllNumber)

      tvColNumber = tvAllNumber / tvRowNumber

      console.log('tvAllNumber: ', tvAllNumber)
      console.log('tvRowNumber: ', tvRowNumber)
      console.log('tvColNumber: ', tvColNumber)
    },

    tvSize = () => {
      width = window.innerWidth - widthDiff,
      height = window.innerHeight - heightDiff,

      tvWidth = width / tvColNumber,
      tvHeight = height / tvRowNumber

      //console.log(tvWidth, tvHeight)
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
      tvLayout()

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

      tvSrcArr =
        !menuPrev || menuPrev.value === 'world' ? tvSrcArr0
        : menuPrev.value === 'taiwan' ? tvSrcArr1
        : tvSrcArr2

      if (tvSrcArr.length > tvAllNumber) shuffle(tvSrcArr)

      //console.log('TV Array Length: ', tvSrcArr.length)
      //console.log('TV All Number: ', tvAllNumber)

      document.querySelectorAll('#wall .tv').forEach(
        (e,i) => {
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
    },

    /* set tv size*/

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

    listenOrientationChange = () => {
      window.addEventListener('orientationchange',
        () => {
          console.log('Change')
          //setWall()
          //setTv()
        }
      )
    }

listenLayoutRadio()
listenMenuRadio()
listenWindowResize()
listenOrientationChange()
setWall()
setTv()
