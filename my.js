let widthDiff = 8,
    heightDiff = 68,
    width,
    height,
    frameWidth,
    frameHeight,

    frameSize = () => {
      width = window.innerWidth - widthDiff,
      height = window.innerHeight - heightDiff,

      frameWidth = width / 3,
      frameHeight = height / 3

      /*
      if (frameWidth < 320 || frameHeight < 240) {
        frameWidth = 320
        frameHeight = 240
      }

      else if (frameWidth < 480 || frameHeight < 360) {
        frameWidth = 480
        frameHeight = 360
      }
      */

      //console.log(frameWidth, frameHeight)
    },

    frameTitle = 'YouTube video player',
    frameBorder = '0',
    frameAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    frameAllowfullscreen = '',

    frameSrc = 'https://www.youtube-nocookie.com/embed/',

    frameSrc0 = frameSrc + '-upyPouRrB8',
    frameSrc1 = frameSrc + 'w_Ma8oQLmSM',
    frameSrc2 = frameSrc + 'XWq5kBlakcQ',

    frameSrc3 = frameSrc + 'V9KZGs1MtP4',
    frameSrc4 = frameSrc + 'sPgqEHsONK8',
    frameSrc5 = frameSrc + 'jNhh-OLzWlE',

    frameSrc6 = frameSrc + 'V0I5eglJMRI',
    frameSrc7 = frameSrc + '9Auq9mYxFEE',
    frameSrc8 = frameSrc + 'CV5Fooi8YJA',

    frameSrcArr = [frameSrc0,frameSrc1,frameSrc2,
                   frameSrc3,frameSrc4,frameSrc5,
                   frameSrc6,frameSrc7,frameSrc8],

    setIframe = () => {
      frameSize()

      document.querySelectorAll('.cell').forEach(
        (e,i) => {
          e.insertAdjacentHTML('beforeEnd', `<iframe
            width='${frameWidth}'
            height='${frameHeight}'
            title='${frameTitle}'
            frameborder='${frameBorder}'
            allow='${frameAllow}'
            allowfullscreen='${frameAllowfullscreen}'
            src='${frameSrcArr[i]}'
          ></iframe>`)
        }
      )

      /*
      document.querySelectorAll('iframe').forEach(
        (e,i) => {
          e.setAttribute('width', frameWidth)
          e.setAttribute('height', frameHeight)
          e.setAttribute('title', frameTitle)
          e.setAttribute('frameborder', frameBorder)
          e.setAttribute('allow', frameAllow)
          e.setAttribute('allowfullscreen', frameAllowfullscreen)
          e.setAttribute('src', frameSrcArr[i])
        }
      )
      */
    }
    
window.addEventListener('resize',
  () => {
    frameSize()

    document.querySelectorAll('iframe').forEach(
      (e) => {
        e.setAttribute('width', frameWidth)
        e.setAttribute('height', frameHeight)
      }
    )
  }
)

setIframe()
