/* Author   Johann Li                                 
   LinkedIn https://www.linkedin.com/in/johannwpli/   
   GitHub   https://github.com/johannwpli/            
   Website  https://johann.li/                      */

let /* set tv */

    widthDiff = 16,
    heightDiff = 66,

    width = window.innerWidth - widthDiff,
    height = window.innerHeight - heightDiff,

    tvAllNumber,
    tvShortNumber,
    tvRowNumber,
    tvColNumber,

    tvWidth,
    tvHeight,

    tvTitle = 'YouTube video player',
    tvBorder = '0',
    tvAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    tvAllowfullscreen = '',
    tvSrcArr,

    tvSrc = 'https://www.youtube-nocookie.com/embed/',

    /* set wall with YouTube Video ID */

    tvSrcKey,
    tvSrcObj = {
      world: [
        '-upyPouRrB8', //Al Jazeera English
        'w_Ma8oQLmSM', //ABC News
        'XWq5kBlakcQ', //CNA
        'V9KZGs1MtP4', //DW News
        'sPgqEHsONK8', //euronews
        'jNhh-OLzWlE', //FRANCE 24 English
        'V0I5eglJMRI', //RT
        '9Auq9mYxFEE', //Sky News
        'CV5Fooi8YJA'  //TRT World
      ],
      taiwan: [
        'Qg9U06O2R-s', //CCTV
        'lu_BJKxqGnk', //CTI
        'wM0g8EoUZ_E', //CTS
        'TCnaIE_SAtM', //CTV
        'R2iMq5LKXco', //EBC
        'XGEmg3vhrzU', //FTV
        'JAzRXylm3M0', //PTS
        'FoBfXvlOR6I', //SET
        'CKjSm5ZeehE', //SET iNEWS
        'xL0ch83RAK8', //TTV
        '2mCSYvcfhtc'  //TVBS
      ],
      hsin: [
        'fHo4cmOembI',
        '9zIbGCdWIh4',
        'B1fUWSGvlsU',
        's2RQuTTn7os',
        'n-BMA_a8nM4',
        'ZJ6ZUj8R5uQ',
        'FHL-o1CJOnY',
        'FCOtL6RFN4Y',
        '2bCDBwyEhkc',
        '50sSQrHMeWM',
        'zs98k8eCrGU' 
      ]
    },

    /* world live news */

    tvSrc0 = '-upyPouRrB8', //Al Jazeera English
    tvSrc1 = 'w_Ma8oQLmSM', //ABC News
    tvSrc2 = 'XWq5kBlakcQ', //CNA
    tvSrc3 = 'V9KZGs1MtP4', //DW News
    tvSrc4 = 'sPgqEHsONK8', //euronews
    tvSrc5 = 'jNhh-OLzWlE', //FRANCE 24 English
    tvSrc6 = 'V0I5eglJMRI', //RT
    tvSrc7 = '9Auq9mYxFEE', //Sky News
    tvSrc8 = 'CV5Fooi8YJA', //TRT World

    tvSrcArr0 = [tvSrc0,tvSrc1,tvSrc2,
                 tvSrc3,tvSrc4,tvSrc5,
                 tvSrc6,tvSrc7,tvSrc8],

    /* taiwan live news */

    tvSrcA = 'Qg9U06O2R-s', //CCTV
    tvSrcB = 'lu_BJKxqGnk', //CTI
    tvSrcC = 'wM0g8EoUZ_E', //CTS
    tvSrcD = 'TCnaIE_SAtM', //CTV
    tvSrcE = 'R2iMq5LKXco', //EBC
    tvSrcF = 'XGEmg3vhrzU', //FTV
    tvSrcG = 'JAzRXylm3M0', //PTS
    tvSrcH = 'FoBfXvlOR6I', //SET
    tvSrcI = 'CKjSm5ZeehE', //SET iNEWS
    tvSrcJ = 'xL0ch83RAK8', //TTV
    tvSrcK = '2mCSYvcfhtc', //TVBS

    tvSrcArr1 = [tvSrcA,tvSrcB,tvSrcC,
                 tvSrcD,tvSrcE,tvSrcF,
                 tvSrcG,tvSrcH,tvSrcI,
                 tvSrcJ,tvSrcK],

    /* hsin studio videos */

    tvSrca = 'fHo4cmOembI',
    tvSrcb = '9zIbGCdWIh4',
    tvSrcc = 'B1fUWSGvlsU',
    tvSrcd = 's2RQuTTn7os',
    tvSrce = 'n-BMA_a8nM4',
    tvSrcf = 'ZJ6ZUj8R5uQ',
    tvSrcg = 'FHL-o1CJOnY',
    tvSrch = 'FCOtL6RFN4Y',
    tvSrci = '2bCDBwyEhkc',
    tvSrcj = '50sSQrHMeWM',
    tvSrck = 'zs98k8eCrGU',

    tvSrcArr2 = [tvSrca,tvSrcb,tvSrcc,
                 tvSrcd,tvSrce,tvSrcf,
                 tvSrcg,tvSrch,tvSrci,
                 tvSrcj,tvSrck]
