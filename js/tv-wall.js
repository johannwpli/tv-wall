/*
Author  Johann Li
Source  https://github.com/johannwpli/
Website https://johann.li/
*/

let
    /* get radio */

    radio = document.wall.list,
    prev = null,
    
    checkRadio = function() {
      //prev ? console.log(prev.value) : null
      this !== prev ? prev = this : null
      //console.log(this.value)
      setWall()
    },

    changeRadio = () => {
      for (let i of radio) {
        i.addEventListener('change', checkRadio)
      }
    },

    /* set tv */

    widthDiff = 9,
    heightDiff = 69,
    width,
    height,
    tvWidth,
    tvHeight,

    tvSize = () => {
      width = window.innerWidth - widthDiff,
      height = window.innerHeight - heightDiff,

      tvWidth = width / 3,
      tvHeight = height / 3

      /*
      if (tvWidth < 320 || tvHeight < 240) {
        tvWidth = 320
        tvHeight = 240
      }

      else if (tvWidth < 480 || tvHeight < 360) {
        tvWidth = 480
        tvHeight = 360
      }
      */

      //console.log(tvWidth, tvHeight)
    },

    tvTitle = 'YouTube video player',
    tvBorder = '0',
    tvAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    tvAllowfullscreen = '',
    tvSrcArr,

    tvSrc = 'https://www.youtube-nocookie.com/embed/',

    /* set wall with YouTube Video ID */

    tvSrc0 = '-upyPouRrB8', tvSrc1 = 'w_Ma8oQLmSM', tvSrc2 = 'XWq5kBlakcQ', 
    tvSrc3 = 'V9KZGs1MtP4', tvSrc4 = 'sPgqEHsONK8', tvSrc5 = 'jNhh-OLzWlE', 
    tvSrc6 = 'V0I5eglJMRI', tvSrc7 = '9Auq9mYxFEE', tvSrc8 = 'CV5Fooi8YJA',

    tvSrcArr0 = [tvSrc0,tvSrc1,tvSrc2,
                 tvSrc3,tvSrc4,tvSrc5,
                 tvSrc6,tvSrc7,tvSrc8],

    tvSrcA = 'wM0g8EoUZ_E', tvSrcB = 'TCnaIE_SAtM', tvSrcC = 'R2iMq5LKXco', 
    tvSrcD = 'XGEmg3vhrzU', tvSrcE = 'JAzRXylm3M0', tvSrcF = 'FoBfXvlOR6I', 
    tvSrcG = 'CKjSm5ZeehE', tvSrcH = 'xL0ch83RAK8', tvSrcI = '2mCSYvcfhtc',

    tvSrcArr1 = [tvSrcA,tvSrcB,tvSrcC,
                 tvSrcD,tvSrcE,tvSrcF,
                 tvSrcG,tvSrcH,tvSrcI],

    tvSrca = 'fHo4cmOembI', tvSrcb = '9zIbGCdWIh4', tvSrcc = 'B1fUWSGvlsU',
    tvSrcd = 's2RQuTTn7os', tvSrce = 'n-BMA_a8nM4', tvSrcf = 'ZJ6ZUj8R5uQ', 
    tvSrcg = 'FHL-o1CJOnY', tvSrch = 'FCOtL6RFN4Y', tvSrci = '2bCDBwyEhkc',
    tvSrcj = '50sSQrHMeWM', tvSrck = 'zs98k8eCrGU',

    tvSrcArr2 = [tvSrca,tvSrcb,tvSrcc,
                 tvSrcd,tvSrce,tvSrcf,
                 tvSrcg,tvSrch,tvSrci,
                 tvSrcj,tvSrck],

    /* shuffle array with Fisher-Yates algo */

    shuffle = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    setWall = () => {
      tvSize()

      shuffle(tvSrcArr2)

      tvSrcArr =
        !prev || prev.value === 'world' ? tvSrcArr0
        : prev.value === 'taiwan' ? tvSrcArr1
        : tvSrcArr2

      document.querySelectorAll('.tv').forEach(
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

    windowResize = () => {
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

changeRadio()
setWall()
windowResize()
