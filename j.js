let
    /* get radio */

    radio = document.wall.list,
    prev = null,
    
    checkRadio = function() {
      prev ? console.log(prev.value) : null
      this !== prev ? prev = this : null
      console.log(this.value)
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

    /* set wall */

    tvSrc0 = tvSrc + '-upyPouRrB8', tvSrc1 = tvSrc + 'w_Ma8oQLmSM', tvSrc2 = tvSrc + 'XWq5kBlakcQ', 
    tvSrc3 = tvSrc + 'V9KZGs1MtP4', tvSrc4 = tvSrc + 'sPgqEHsONK8', tvSrc5 = tvSrc + 'jNhh-OLzWlE', 
    tvSrc6 = tvSrc + 'V0I5eglJMRI', tvSrc7 = tvSrc + '9Auq9mYxFEE', tvSrc8 = tvSrc + 'CV5Fooi8YJA',

    tvSrcArr0 = [tvSrc0,tvSrc1,tvSrc2,
                 tvSrc3,tvSrc4,tvSrc5,
                 tvSrc6,tvSrc7,tvSrc8],

    tvSrcA = tvSrc + 'wM0g8EoUZ_E', tvSrcB = tvSrc + 'TCnaIE_SAtM', tvSrcC = tvSrc + 'R2iMq5LKXco', 
    tvSrcD = tvSrc + 'XGEmg3vhrzU', tvSrcE = tvSrc + 'JAzRXylm3M0', tvSrcF = tvSrc + 'FoBfXvlOR6I', 
    tvSrcG = tvSrc + 'CKjSm5ZeehE', tvSrcH = tvSrc + 'xL0ch83RAK8', tvSrcI = tvSrc + '2mCSYvcfhtc',

    tvSrcArr1 = [tvSrcA,tvSrcB,tvSrcC,
                 tvSrcD,tvSrcE,tvSrcF,
                 tvSrcG,tvSrcH,tvSrcI],

    tvSrca = tvSrc + 'fHo4cmOembI', tvSrcb = tvSrc + '9zIbGCdWIh4', tvSrcc = tvSrc + 'B1fUWSGvlsU',
    tvSrcd = tvSrc + 's2RQuTTn7os', tvSrce = tvSrc + 'n-BMA_a8nM4', tvSrcf = tvSrc + 'ZJ6ZUj8R5uQ', 
    tvSrcg = tvSrc + 'FHL-o1CJOnY', tvSrch = tvSrc + 'FCOtL6RFN4Y', tvSrci = tvSrc + '2bCDBwyEhkc',

    tvSrcArr2 = [tvSrca,tvSrcb,tvSrcc,
                 tvSrcd,tvSrce,tvSrcf,
                 tvSrcg,tvSrch,tvSrci],

    setWall = () => {
      tvSize()

      document.querySelectorAll('.tv').forEach(
        (e,i) => {
          e.innerHTML = ''

          tvSrcArr =
            !prev || prev.value === 'world' ? tvSrcArr0
            : prev.value === 'taiwan' ? tvSrcArr1
            : tvSrcArr2

          e.insertAdjacentHTML('beforeEnd', `<iframe
            width='${tvWidth}'
            height='${tvHeight}'
            title='${tvTitle}'
            frameborder='${tvBorder}'
            allow='${tvAllow}'
            allowfullscreen='${tvAllowfullscreen}'
            src='${tvSrcArr[i]}'
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
