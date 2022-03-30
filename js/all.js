'use strict';

// func Module
const getId  = n => document.getElementById( n ),
      queOne = n => document.querySelector( n ),
      queAll = n => document.querySelectorAll( n ),
      GAS    = n => `https://script.google.com/macros/s/${ n }/exec`;

// const dom
const html      = getId( 'Html' ),
      load      = getId( 'Load' ),
      header    = getId( 'Header' ),
      naviLs    = getId( 'NaviLs' ),
      btnBurger = getId( 'BtnBurger' ),
      btnMore   = getId( 'BtnMore'),
      banr      = getId( 'Banr' ),
      banrAni   = queAll( '.banr-img-ani' ),
      btnTop    = getId( 'BtnTop' ),
      scroll    = queAll( '.--scroll' );

// func 取得現在日期時間
function dateTran( date = null , split = '-' , time = false ) {

    var n;
    date === null ? n = new Date() : n = new Date( date );

    var Y = ( n.getFullYear()  ).toString(),
        M = ( n.getMonth() + 1 ).toString(),
        D = ( n.getDate()      ).toString(),
        h = ( n.getHours()     ).toString(),
        m = ( n.getMinutes()   ).toString(),
        s = ( n.getSeconds()   ).toString();

    if ( M.length < 2 ) M = '0' + M;
    if ( D.length < 2 ) D = '0' + D;
    if ( h.length < 2 ) h = '0' + h;
    if ( m.length < 2 ) m = '0' + m;
    if ( s.length < 2 ) s = '0' + s;

    if( time === true ) {
        return [ Y , M , D , h , m , s ].join( split );

    } else {
        return [ Y , M , D ].join( split );
    }
}

// func 裝置判斷
function deviceJudge( device = '' ) {

    var d = [ 'Android' , 'webOS' , 'iPhone' , 'iPad' , 'iPod' , 'BlackBerry' , 'Windows Phone' ];

    if( device !== '' ) d = device;

    var u = navigator.userAgent, // Chrome 未來不支援
        l = d.length,
        j = false;

    for ( let i = 0 ; i < l ; i++ ) {
        if ( u.match( d[ i ] ) ) {
            j = true;
        }
    }
    return j;
}

// func 點選螢幕滑動
function clickScroll( obj , time = 600 ) {

    var b = [ '#BtnTop' , '#BtnMore' , '.header-btn' ],
        w = window.pageYOffset,
        o = getId( obj ).offsetTop,
        i = 1,
        f = 50,
        h = ( o - w ) / f,
        t = time / f;

    header.classList.remove( '--open' );

    b.forEach( el =>
        queAll( el ).forEach( n => {
            n.disabled = true
        })
    );

    var e = setInterval( () => {

        if ( i <= f ) {
            window.scroll( 0 , w + h * i );
            i++;

        } else {
            clearInterval( e );

            b.forEach( el =>
                queAll( el ).forEach( n => {
                    n.disabled = false;
                })
            )
        }
    } , t );
}

// event 頁面讀取完畢
window.onload = () => setTimeout( () => {

    load.classList.add( '--hide' );
    banr.classList.add( '--show' );
    html.classList.remove( '--lock' );

    banrAni.forEach( el => el.classList.remove( '--hide' ) );

} , 3200 );

// event 漢堡選單
btnBurger.onclick = () => header.classList.toggle( '--open' );

// event 觀看更多
btnMore.onclick = () => clickScroll( 'Base1' , 400 );

// event 置頂
btnTop.onclick = () => clickScroll( 'Banr' , 800 );

// // event 若先點選，取消滑動執行
// scroll.forEach( el => {
//     el.onclick = () => {
//         el.classList.remove( '--scroll' )
//     }
// })

// event 滑動觸發
window.onscroll = () => {

    banrAni.forEach( el => el.classList.remove( '--load' ) );
    
    // 顯示
    if ( window.pageYOffset > 50 ) {

        header.classList.add( '--slide' );
        btnTop.classList.add( '--show' );

        banrAni.forEach( el => el.classList.add( '--hide' ) );

    // 隱藏
    } else {

        header.classList.remove( '--slide' );
        btnTop.classList.remove( '--show' );

        banrAni.forEach( el => el.classList.remove( '--hide' ) );
    }

    // // 動畫
    // scroll.forEach( el => {

    //     var h = el.offsetTop + el.innerHeight() * 1.5,
    //         w = window.innerHeight + window.pageYOffset;

    //     if ( w > h ) el.classList.remove( '--scroll' );
    // })
}