'use strict';

// func Module
const getId  = n => document.getElementById( n ),
      queOne = n => document.querySelector( n ),
      queAll = n => document.querySelectorAll( n ),
      GAS    = n => `https://script.google.com/macros/s/${ n }/exec`;

// const dom
const Html      = getId( 'Html' ),
      Load      = getId( 'Load' ),
      Header    = getId( 'Header' ),
      NaviLs    = getId( 'NaviLs' ),
      BtnBurger = getId( 'BtnBurger' ),
      BtnMore   = getId( 'BtnMore'),
      Banr      = getId( 'Banr' ),
      BanrAni   = queAll( '.banr-img-ani' ),
      BtnTop    = getId( 'BtnTop' ),
      Scroll    = queAll( '.--scroll' );

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
function DeviceJudge( device = '' ) {

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

    Header.classList.remove( '--open' );

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

    Load.classList.add( '--hide' );
    Banr.classList.add( '--show' );
    Html.classList.remove( '--lock' );

    BanrAni.forEach( el => el.classList.remove( '--hide' ) );

} , 3200 );

// event 漢堡選單
BtnBurger.onclick = () => Header.classList.toggle( '--open' );

// event 觀看更多
BtnMore.onclick = () => clickScroll( 'Base1' , 400 );

// event 置頂
BtnTop.onclick = () => clickScroll( 'Banr' , 800 );

// // event 若先點選，取消滑動執行
// Scroll.forEach( el => {
//     el.onclick = () => {
//         el.classList.remove( '--scroll' )
//     }
// })

// event 滑動觸發
window.onscroll = () => {

    BanrAni.forEach( el => el.classList.remove( '--load' ) );
    
    // 顯示
    if ( window.pageYOffset > 50 ) {

        Header.classList.add( '--slide' );
        BtnTop.classList.add( '--show' );

        BanrAni.forEach( el => el.classList.add( '--hide' ) );

    // 隱藏
    } else {

        Header.classList.remove( '--slide' );
        BtnTop.classList.remove( '--show' );

        BanrAni.forEach( el => el.classList.remove( '--hide' ) );
    }

    // // 動畫
    // Scroll.forEach( el => {

    //     var h = el.offsetTop + el.innerHeight() * 1.5,
    //         w = window.innerHeight + window.pageYOffset;

    //     if ( w > h ) el.classList.remove( '--scroll' );
    // })
}