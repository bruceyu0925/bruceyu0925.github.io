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
      Base1     = getId( 'Base1' ),
      BtnTop    = getId( 'BtnTop' ),
      Scroll    = queAll( '.--scroll' );

// func 取得現在日期時間
function GetDate( dateObj = '' , timer = false , timeObj = '' ) {

    var T = new Date(),
        l = [
            [
                T.getFullYear(),
                T.getMonth() + 1,
                T.getDate()     
            ],
            [ 
                T.getHours(),
                T.getMinutes(),
                T.getSeconds()  
            ]
        ],
        f = '',
        i = 0,
        r = 0;

    for ( i in l ) {
        for ( r in l[ i ] ) {
            l[ i ][ r ] = l[ i ][ r ].toString();
            if ( l[ i ][ r ].length < 2 ) {
                l[ i ][ r ] = '0' + l[ i ][ r ]
            }
        }
    }

    if ( timer ) f = ' ' + l[ 1 ].join( timeObj );

    return l[ 0 ].join( dateObj ) + f;
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
            j = true
        }
    }
    return j
}

// func 點選螢幕滑動
function ClickScroll( btn , obj , time = 600 ) {

    btn.disabled = true;
    Header.classList.remove( '--open' );

    var w = window.pageYOffset,
        o = obj.offsetTop,
        i = 1,
        f = 50,
        h = ( o - w ) / f,
        t = time / f;

    var e = setInterval( () => {

        if ( i <= f ) {
            window.scroll( 0 , w + h * i );
            i++;

        } else {
            clearInterval( e );
            btn.disabled = false;
        }
    } , t );
}

// event 頁面讀取完畢
window.onload = () => setTimeout( () => {

    Load.classList.add( '--hide' );
    Banr.classList.add( '--show' );
    Html.classList.remove( '--lock' );

    BanrAni.forEach( el => el.classList.remove( '--hide' ) );

} , 1300 );

// event 漢堡選單
BtnBurger.onclick = () => Header.classList.toggle( '--open' );

// event 觀看更多
BtnMore.onclick = function() { ClickScroll( this , Base1 , 400 ) };

// event 置頂
BtnTop.onclick = function() { ClickScroll( this , Banr , 800 ) };

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