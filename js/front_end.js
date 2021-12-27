// Paint --------------------------------------------------

// const 畫板
const Paint          = getId( 'Paint' ),
      PaintImg       = getId( 'PaintImg' ),
      PaintCanvas    = getId( 'PaintCanvas' ),
      PaintDefult    = getId( 'PaintPointer01' ),
      PaintPointers  = queAll( '.paint-pointer-li' );

// const 功能鍵
const PaintUpload    = getId( 'PaintUpload' ),
      PaintDownload  = getId( 'PaintDownload' ),
      PaintEdit      = getId( 'PaintEdit' ),
      PaintReset     = getId( 'PaintReset' ),
      PaintCancel    = getId( 'PaintCancel' ),
      PaintApply     = getId( 'PaintApply' ),
      PaintBtn       = queAll( '.paint-btn-li' );

// const 浮動視窗：上傳
const MsgNamed       = getId( 'MsgNamed' ),
      MsgSuccess     = getId( 'MsgSuccess' ),
      MsgError       = getId( 'MsgError' ),
      BtnCancel      = getId( 'BtnCancel' ),
      BtnSend        = getId( 'BtnSend' ),
      BtnSuccess     = getId( 'BtnSuccess' ),
      BtnError       = getId( 'BtnError' ),
      InputName      = getId( 'InputName' ),
      InputWarn      = getId( 'InputWarn' );

// const 浮動視窗：圖庫
const PaintLibrary   = getId( 'PaintLibrary' ),
      PaintBlog      = getId( 'PaintBlog' ),
      PaintMore      = getId( 'PaintMore' ),
      PaintNew       = getId( 'PaintNew' ),
      PaintList      = getId( 'PaintList' ),
      PaintLoad      = getId( 'PaintLoad' ),
      PaintClose     = getId( 'PaintClose' );

// const 調色功能
const PaintBody      = getId( 'PaintBody' ),
      PaintName      = getId( 'PaintName' ),
      PaintPalette   = getId( 'PaintPalette' ),
      PaintColorcode = getId( 'PaintColorcode' ),
      PaintHex       = getId( 'PaintHex' ),
      PaintR         = getId( 'PaintR' ),
      PaintG         = getId( 'PaintG' ),
      PaintB         = getId( 'PaintB' ),
      PaintH         = getId( 'PaintH' ),
      PaintS         = getId( 'PaintS' ),
      PaintL         = getId( 'PaintL' ),
      PaintInput     = queAll( '.paint-input-li > input' ),
      PaintNum       = queAll( '.paint-input-num' );

// var
var Paint_Len    = PaintPointers.length,
    Paint_Array  = [],
    Paint_Total,
    Paint_Width;

// func 調色盤RWD
PaintResize = () => {

    if ( window.innerWidth > 1200 ) {
        Paint_Width  = 300;
        
    } else if ( window.innerWidth > 600 ) {
        Paint_Width  = 250;

    } else {
        Paint_Width  = 200;
    }
}
PaintResize();

// var 調色盤（ API: iro.js ）
var PaintPicker = new iro.ColorPicker( '#PaintPicker' , {
    width:     Paint_Width,
    boxHeight: 200,
    color: PaintDefult.getAttribute( 'data-color-save' ),
    layout: [
        {
            component: iro.ui.Box
        },
        {
            component: iro.ui.Slider,
            options: { sliderType: 'hue' }
        }
    ]
});
var Picker = PaintPicker.color;

// func 返回設定
PaintSet = ( get , set ) => {

    PaintPointers.forEach( el => {

        let s = el.getAttribute( 'data-color-' + get ),
            n = el.getAttribute( 'data-color-class' );

        el.setAttribute( 'data-color-' + set , s );

        if ( get !== 'set' ) {
            queAll( '#PaintImg .' + n ).forEach( o => o.style.fill = s )
        }
    })
}

// func 請求圖庫資料
PaintBrowse = ( n ) => {

    fetch( GAS( 'AKfycbzjpRHDa7AkMo65J9xTWuBH9VptRWMyXYYAfM62q2LfSfCmYJPkkm3jHbXsDsrthuoP' ) , {
        method: 'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
        body: JSON.stringify( { 'sort' : n } )

    }).then( ( res ) => {
        return res.json()

    }).then( ( data ) => {
        Paint_Array = data;
        Paint_Total = data.length;

        if ( PaintBlog.classList.contains( '--show' ) ) PaintHtml();
    })
}

// func 輸出html
PaintHtml = () => {

    PaintList.innerHTML = ''; // 防止接收多個 Response

    for ( let i = 0 ; i < Paint_Total ; i++ ) {

        let n     = Paint_Array[ i ],
            id    = 'PaintBlog' + i,
            clr0  = n[ 'Clr0' ],
            clr1  = n[ 'Clr1' ],
            clr2  = n[ 'Clr2' ],
            clr3  = n[ 'Clr3' ],
            clr4  = n[ 'Clr4' ],
            clr5  = n[ 'Clr5' ],
            clr6  = n[ 'Clr6' ],
            clr7  = n[ 'Clr7' ],
            clr8  = n[ 'Clr8' ],
            clr9  = n[ 'Clr9' ],
            date  = n[ 'Date' ],
            name  = n[ 'Name' ],
            watch = n[ 'Watch' ];

        let s = new Date( date ),
            y = ( s.getFullYear()  ).toString(),
            m = ( s.getMonth() + 1 ).toString(),
            d = ( s.getDate()      ).toString();

        if ( m.length < 2 ) m = '0' + m;
        if ( d.length < 2 ) d = '0' + d;
        date = y + '-' + m + '-' + d;

        PaintList.insertAdjacentHTML( 'beforeend' ,
            `<li class="paint-blog-li">
                <div id="${ id }" class="paint-blog-block __sha4px __rad12px" onclick="PaintClick(${ i })">
                    <svg class="img-resp" viewBox="0 0 1377.51952 858.48984"><defs>
                        <style>.paint-b, .paint-g, .paint-o, .paint-p, .paint-q, .paint-r, .paint-s, .paint-t, .paint-u, .paint-v{ fill: #fff;} .paint-b{ opacity: 0.07;} .paint-l{ opacity: 0.15;} .paint-n{ opacity: 0.45;} .paint-o{ opacity: 0.8;} .paint-p{ opacity: 0.6;} .paint-q{ opacity: 0.75;} .paint-r{ opacity: 0.35;} .paint-s{ opacity: 0.7;} .paint-t{ opacity: 0.2;} .paint-u{ opacity: 0.5;} .paint-v{ opacity: 0.9;} .paint-w{ opacity: 0.4; fill: url(#PaintA);}
                            #${ id } .paint-c{ fill : ${ clr0 }; }
                            #${ id } .paint-a{ fill : ${ clr1 }; }
                            #${ id } .paint-d{ fill : ${ clr2 }; }
                            #${ id } .paint-e{ fill : ${ clr3 }; }
                            #${ id } .paint-f{ fill : ${ clr4 }; }
                            #${ id } .paint-j{ fill : ${ clr5 }; }
                            #${ id } .paint-h{ fill : ${ clr6 }; }
                            #${ id } .paint-i{ fill : ${ clr7 }; }
                            #${ id } .paint-k{ fill : ${ clr8 }; }
                            #${ id } .paint-m{ fill : ${ clr9 }; }
                        </style>
                    </defs><rect class="paint-a" x="-88.89929" y="512.63868" width="1555.3181" height="396.22733" /><rect id="PaintImgWave1" class="paint-b" x="-88.89929" y="486.7494" width="1555.3181" height="259.73331" /><rect id="PaintImgWave2" class="paint-b" x="-88.89929" y="486.7494" width="1555.3181" height="181.4938" /><rect class="paint-c" x="-88.89929" y="-83.26303" width="1555.3181" height="672.91241" /><rect class="paint-d" x="-88.89929" y="818.74492" width="1555.3181" height="119.55217" /><g class="paint-e"><path d="M482.14355,512.63868a45.13086,45.13086,0,0,0-44.78116-51.19784,44.97245,44.97245,0,0,0-23.64766,6.67986c-7.48479-31.18582-39.88908-54.64722-78.73023-54.64722-32.63643,0-60.72793,16.56555-73.31005,40.35912-7.11552-8.17321-16.40327-13.13277-26.57319-13.13277-17.971,0-33.201,15.45688-38.50963,36.85073-11.72424-10.27992-27.07047-13.38293-38.91881-6.54208-9.36673,5.4078-14.44366,15.81595-14.658,27.49452a66.58162,66.58162,0,0,0-23.96356-4.27016c-19.50367,0-36.1213,7.66574-42.45315,18.40584Z" /><path d="M689.12438,303.42457c5.2752-9.56445,19.94345-16.44811,37.22586-16.44811a59.24609,59.24609,0,0,1,18.853,2.96779c4.41094-22.00446,37.19082-39.09971,76.9958-39.09971a132.34025,132.34025,0,0,1,23.22253,2.01843c8.75089-29.65387,39.45045-49.57942,72.81787-45.63566,21.56228,2.54844,39.42724,14.50175,49.569,30.94a38.31813,38.31813,0,0,1,17.76028-9.445c24.46407-5.52031,50.33126,13.69181,58.00945,42.96688a53.85945,53.85945,0,0,1,30.71867-9.23048c26.08882,0,47.23786,17.17226,47.23786,38.3554,0,.87837-.0496,1.74687-.12106,2.61044Z" /></g><path class="paint-f" d="M688.75959,188.926c-15.33367,0-27.76376,13.969-27.76376,31.20075v49.52346h55.52786V220.12679C716.52369,202.89508,704.09326,188.926,688.75959,188.926Z" /><path class="paint-g" d="M689.176,205.1684c-4.56747,0-8.27,11.15835-8.27,24.92291v39.55894h16.5402V230.09131C697.44612,216.32675,693.74344,205.1684,689.176,205.1684Z" /><path class="paint-h" d="M749.44378,194.03824V183.72593h-3.173v-8.72581h-6.70045l-49.42236-35.107V112.333h-2.77639v27.56015l-49.42235,35.107h-6.70045v8.72581h-3.173v10.31231H635.81V199.591h-5.94942v7.1393H635.81v38.07625h-4.56122v30.937h115.022v-30.937h-4.56122V206.73033H747.659V199.591h-5.94942v-5.55279Zm-92.21592,0H684.9918V199.591H657.22786Zm27.76394,12.69209v38.07625H657.22786V206.73033Zm7.53592,0h27.76393v38.07625H692.52772Zm0-7.1393v-5.55279h27.76393V199.591Zm-37.67962-5.55279V199.591H640.56951v-5.55279Zm-14.27859,12.69209H654.8481v38.07625H640.56951Zm82.10191,38.07625V206.73033H736.95v38.07625ZM736.95,199.591H722.67142v-5.55279H736.95Z" /><rect x="708.59114" y="317.78605" width="15.8651" height="26.17742" /><rect x="718.1102" y="511.34032" width="15.8651" height="26.17742" /><polygon class="paint-i" points="617.125 768.355 760.394 768.355 755.351 680.304 622.168 680.304 617.125 768.355" /><polygon class="paint-i" points="738.724 389.972 733.182 293.195 644.337 293.195 638.795 389.972 738.724 389.972" /><polygon class="paint-i" points="633.253 486.749 627.71 583.527 749.809 583.527 744.267 486.749 633.253 486.749" /><rect class="paint-j" x="627.67911" y="275.74353" width="122.1613" height="17.45161" /><polygon class="paint-j" points="633.253 486.749 744.267 486.749 738.724 389.972 638.795 389.972 633.253 486.749" /><polygon class="paint-j" points="627.71 583.527 622.168 680.304 755.351 680.304 749.809 583.527 627.71 583.527" /><rect class="paint-k" x="708.19451" y="317.78605" width="15.8651" height="26.17742" /><rect class="paint-k" x="717.71357" y="511.34032" width="15.8651" height="26.17742" /><rect class="paint-k" x="653.4599" y="414.56318" width="15.8651" height="26.17742" transform="translate(1322.78491 855.30379) rotate(-180)" /><rect class="paint-k" x="643.94084" y="608.11745" width="15.8651" height="26.17742" transform="translate(1303.74678 1242.41232) rotate(-180)" /><rect class="paint-k" x="669.72163" y="666.02508" width="38.07625" height="102.32992" /><polygon class="paint-l" points="733.182 293.195 749.841 293.195 749.841 275.744 706.211 275.744 706.211 768.355 707.798 768.355 760.394 768.355 733.182 293.195" /><polygon class="paint-m" points="435.082 818.745 921.082 818.745 895.822 769.455 844.629 737.266 749.716 752.856 622.317 733.745 484.854 758.893 441.244 787.059 435.082 818.745" /><g class="paint-n"><polygon class="paint-o" points="441.244 787.059 473.951 793.597 435.082 818.745 441.244 787.059" /><polygon class="paint-p" points="499.073 818.745 473.951 793.597 435.082 818.745 499.073 818.745" /><polygon class="paint-q" points="484.854 758.893 473.951 793.597 499.073 818.745 484.854 758.893" /><polygon class="paint-r" points="551.924 776.245 499.073 818.745 607.979 818.745 611.983 802.902 600.039 771.467 551.924 776.245" /><polygon class="paint-p" points="484.854 758.893 551.924 776.245 499.073 818.745 484.854 758.893" /><polygon class="paint-s" points="622.317 733.745 600.039 771.467 611.983 802.902 622.317 733.745" /><polygon class="paint-t" points="676.845 776.245 611.983 802.902 607.979 818.745 711.279 818.745 726.126 777.502 676.845 776.245" /><polygon class="paint-r" points="622.317 733.745 676.845 776.245 611.983 802.902 622.317 733.745" /><polygon class="paint-r" points="749.716 752.856 726.126 777.502 711.279 818.745 774.006 818.745 749.716 752.856" /><polygon class="paint-t" points="810.5 766.437 766.799 799.196 774.006 818.745 831.395 818.745 810.5 766.437" /><polygon class="paint-p" points="749.716 752.856 810.5 766.437 766.799 799.196 749.716 752.856" /><polygon class="paint-s" points="844.629 737.266 810.5 766.437 831.395 818.745 844.629 737.266" /><path class="paint-u" d="M886.91578,785.80064l-55.5205,32.94428h89.687Z" /><polygon class="paint-o" points="844.629 737.266 886.916 785.801 831.395 818.745 844.629 737.266" /><polygon class="paint-s" points="895.822 769.455 886.916 785.801 921.082 818.745 895.822 769.455" /><polygon class="paint-o" points="484.854 758.893 622.317 733.745 600.039 771.467 551.924 776.245 484.854 758.893" /><polygon class="paint-p" points="622.317 733.745 676.845 776.245 726.126 777.502 749.716 752.856 622.317 733.745" /><polygon class="paint-o" points="749.716 752.856 844.629 737.266 810.5 766.437 749.716 752.856" /><polygon class="paint-v" points="484.854 758.893 441.244 787.059 473.951 793.597 484.854 758.893" /><polygon class="paint-v" points="844.629 737.266 895.822 769.455 886.916 785.801 844.629 737.266" /><polygon class="paint-w" points="684.204 244.748 0.863 349.792 0.863 89.656 684.204 194.7 684.204 244.748" /></g><linearGradient id="PaintA" x1="0.86283" y1="219.72398" x2="684.20434" y2="219.72398" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0" /><stop offset="1" stop-color="#fff" /></linearGradient></svg>
                    <div class="paint-blog-aside">
                        <div class="paint-blog-title">${ name }</div>
                        <div class="paint-blog-desc">
                            <span class="paint-blog-date">
                                ${ date }
                            </span>
                            <span class="paint-blog-watch">
                                <i class="fas fa-eye"></i>
                                ${ watch }
                            </span>
                        </div>
                    </div>
                </div>
            </li>`
        ) // IE 不支援
    }
    PaintShow();
}

// func 顯示html
PaintShow = () => {

    PaintLoad.classList.remove( '--show' );

    queAll( '.paint-blog-li' ).forEach( el => el.classList.add( '--show' ) );

    PaintMore.disabled = false;
    PaintNew .disabled = false;
}

// func 套用圖庫＆回傳觀看次數
PaintClick = ( n ) => {

    var l = Paint_Array[ n ],
        b = l[ 'Name' ];

    fetch( GAS( 'AKfycbyv_Boek_RXT1XTIkWJQa-5NobUTIgvOMj9rrNCcoNzE3OwQN2ke6d-KP6XQVgE2YkY' ) , {
        method: 'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
        body: JSON.stringify( { 'name' : b } )

    }).then( ( res ) => {
        return res.text()

    }).then( ( data ) => {
        console.log( data )

    })

    for ( let i = 0 ; i < Paint_Len ; i++ ) {

        let s = l[ 'Clr' + i ],
            o = PaintPointers[ i ],
            c = o.getAttribute( 'data-color-class' );

        o.setAttribute( 'data-color-set' , s );
        
        queAll( '#PaintImg .' + c ).forEach( el =>
            el.style.fill = s
        )
    }
    Picker.hexString = queOne( '.paint-pointer-li.--click' ).getAttribute( 'data-color-set' );
    PaintBlog.classList.remove( '--show' );
    Html     .classList.remove( '--lock' );
    PaintList.innerHTML = '';
}

// func 圖庫：點選排序
PaintSort = () => {
    PaintList.innerHTML = '';
    PaintLoad.classList.add( '--show' );
    PaintMore.disabled = true;
    PaintNew .disabled = true;
}

// event 上傳鍵
PaintUpload.onclick = () => {
    InputName.value = '';
    InputWarn.innerHTML = '';
    Html    .classList.add( '--lock' );
    MsgNamed.classList.add( '--show' );
}

// event 上傳：取消
BtnCancel.onclick = () => {
    Html    .classList.remove( '--lock' );
    MsgNamed.classList.remove( '--show' );
}

// event 上傳：送出
BtnSend.onclick = () => {

    let n = InputName.value,
        l = n.replace( /\s*/g , '' ).replace( /[^\x00-\xff]/g , 'xx' ).length;

    fx = ( i ) => PaintPointers[ i ].getAttribute( 'data-color-save' );

    if ( l >= 4 && l <= 20 ) {

        let j = JSON.stringify({
            'date'    : GetDate( '/' , true , ':' ),
            'name'    : n,
            'color01' : fx( 0 ),
            'color02' : fx( 1 ),
            'color03' : fx( 2 ),
            'color04' : fx( 3 ),
            'color05' : fx( 4 ),
            'color06' : fx( 5 ),
            'color07' : fx( 6 ),
            'color08' : fx( 7 ),
            'color09' : fx( 8 ),
            'color10' : fx( 9 )
        })

        Html    .classList.remove( '--lock' );
        MsgNamed.classList.remove( '--show' );

        fetch( GAS( 'AKfycbzzuSoIudNMfQh7jQHbm-GAWbNSeynqZkIv_Kgt2YMoC0KETt_Z2YoT4gtkTnY15ULM' ) , {
            method: 'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body: j
    
        }).then( ( res ) => {
            return res.text()
    
        }).then( ( data ) => {

            Html.classList.add( '--lock' );

            if ( data === 'Success' ) {
                MsgSuccess.classList.add( '--show' )

            } else if ( data === 'Warn' ) {
                MsgNamed.classList.add( '--show' );
                InputWarn.innerHTML = '已有相同名稱！';

            } else {
                MsgError.classList.add( '--show' )
            }
        })
    } else {
        InputWarn.innerHTML = '不符合命名規範！';
    }
}

// event 上傳：成功
BtnSuccess.onclick = () => {
    MsgSuccess.classList.remove( '--show' );
    Html      .classList.remove( '--lock' );
}

// event 上傳：失敗
BtnError.onclick = () => {
    MsgError.classList.remove( '--show' );
    Html    .classList.remove( '--lock' );
}

// event 下載鍵
PaintDownload.onclick = () => {

    let svg = new XMLSerializer().serializeToString( PaintImg ),
        img = new Image();

    // 鎖按鈕
    PaintBtn.forEach( el => el.disabled = true );

    // 圖片轉 base64
    img.setAttribute( 'src' , 'data:image/svg+xml;base64,' + btoa( svg ) );

    // 圖片讀完
    img.onload = () => {

        let a   = document.createElement( 'a' ),
            ctx = PaintCanvas.getContext( '2d' );

        // canvas 繪圖
        PaintCanvas.width  = img.width  * 3;
        PaintCanvas.height = img.height * 3;
        ctx.drawImage( img , 0 , 0 , img.width * 3 , img.height * 3 );

        // 下載圖片準備
        a.download = `BruceYuDesign ${ GetDate( '-' ) }.png`;
        a.href     = PaintCanvas.toDataURL( "image/png" );

        // 不支援：開新分頁
        if ( DeviceJudge( [ 'FBAN' , 'FBIOS' , 'Instagram' ] ) === true ) {

            let i = `<iframe width='100%' height='100%' style="border:none" src="${ a.href }"></iframe>`,
                x = window.open();

            x.document.write( i );

        // 支援：下載圖片加動畫
        } else {

            PaintCanvas.classList.add( '--show' );

            setTimeout( () => {

                a.click();
                PaintBtn.forEach( el => el.disabled = false );
                PaintCanvas.classList.remove( '--show' );

            } , 1250 );
        }
    }
}

// event 編輯鍵
PaintEdit.onclick = () => {
    Paint.classList.add( '--edit' )
}

// event 編輯：重設
PaintReset.onclick = () => {
    PaintSet( 'reset' , 'set' );
    Picker.hexString = queOne( '.paint-pointer-li.--click' ).getAttribute( 'data-color-set' );
}

// event 編輯：取消
PaintCancel.onclick = () => {
    Paint.classList.remove( '--edit' );
    PaintSet( 'save' , 'set' );
    Picker.hexString = queOne( '.paint-pointer-li.--click' ).getAttribute( 'data-color-set' );
}

// event 編輯：確定
PaintApply.onclick = () => {
    Paint.classList.remove( '--edit' );
    PaintSet( 'set' , 'save' );
}

// event 圖庫：開啟
PaintLibrary.onclick = () => {
    PaintSort();
    PaintBlog.classList.add( '--show' );
    Html     .classList.add( '--lock' );
    PaintBrowse( queOne( '.paint-blog-btn.--click' ).value );
}

// event 圖庫：排序 最多人
PaintMore.onclick = function () {
    PaintSort();
    this    .classList.add( '--click' );
    PaintNew.classList.remove( '--click' );
    PaintBrowse( 'more' );
}

// event 圖庫：排序 最新
PaintNew.onclick = function () {
    PaintSort();
    this     .classList.add( '--click' );
    PaintMore.classList.remove( '--click' );
    PaintBrowse( 'new' );
}

// event 圖庫：關閉
PaintClose.onclick = () => {
    PaintBlog.classList.remove( '--show' );
    Html     .classList.remove( '--lock' );
    PaintList.innerHTML = '';
}

// event 畫板：點選
PaintPointers.forEach( el => {
    el.onclick = () => {

        queOne( '.paint-pointer-li.--click' ).classList.remove( '--click' );
        el.classList.add( '--click' );

        var c = el.getAttribute( 'data-color-set' ),
            n = el.getAttribute( 'data-color-name' );

        PaintName.innerHTML = n;
        Picker   .hexString = c;
    }
})

// event 調色：調色盤模式（ mobile ）
PaintPalette.onclick = () => {
    PaintBody.classList.add( '--palette' )
    PaintBody.classList.remove( '--colorcode' )
}

// event 調色：色碼表模式（ mobile ）
PaintColorcode.onclick = () => {
    PaintBody.classList.remove( '--palette' )
    PaintBody.classList.add( '--colorcode' )
}

// event 調色：調色盤（ API: iro.js ）
PaintPicker.on( [ 'color:change' , 'color:init' ] , () => {

    let x = Picker.hexString,
        r = Picker.red,
        g = Picker.green,
        b = Picker.blue,
        h = parseInt( Picker.hue        , 10 ),
        s = parseInt( Picker.saturation , 10 ),
        l = parseInt( Picker.value      , 10 ),
        o = queOne( '.paint-pointer-li.--click' ),
        n = o.getAttribute( 'data-color-class' );

    PaintHex.value = x.replace( '#' , '' );
    PaintR  .value = r;
    PaintG  .value = g;
    PaintB  .value = b;
    PaintH  .value = h;
    PaintS  .value = s;
    PaintL  .value = l;

    o.setAttribute( 'data-color-set' , x );
    
    queAll( '#PaintImg .' + n ).forEach( el => 
        el.style.fill = x
    )
})

// event 調色：Hex blur 設定顏色
PaintHex.onblur = function () {

    let v = this.value;

    try {
        Picker.hexString = v

    } catch {
        v = ( Picker.hexString ).replace( '#' , '' );
        this.value = v;
    }
}

// event 調色：Hex keyup 防呆機制
PaintHex.onkeyup = function () {
    this.value = this.value.replace( /[^a-fA-F0-9]|_/ig , '' )
}


// event 調色：RGB、HSL
PaintNum.forEach( el => {

    // blur 設定顏色
    el.onblur = () => {

        let k = el.getAttribute( 'kind' ),
            n = el.getAttribute( 'name' ),
            v = el.value;

        if ( v === '' ) {
            v = 0;
            el.value = 0;
        }

        Picker.setChannel( k , n , v );
    }

    // keyup 防呆機制
    el.onkeyup = () => {

        el.value = el.value.replace( /[^0-9]|_/ig , '' );

        let v = parseInt( el.value , 10 ),
            i = parseInt( el.getAttribute( 'min' ) , 10 ),
            a = parseInt( el.getAttribute( 'max' ) , 10 );

        if ( v < i ) {
            el.value = i

        } else if ( v > a ) {
            el.value = a
        }
    }
})

// event 鍵盤 Enter
PaintInput.forEach( el => {
    el.onkeydown = ( e ) => {
        if ( e.keyCode === 13 ) el.blur()
    }
})

// carry out 調色盤名稱
PaintName.innerHTML = PaintDefult.getAttribute( 'data-color-name' );

// carry out 設定圖片顏色
PaintPointers.forEach( el => {
    let c = el.getAttribute( 'data-color-class' ),
        s = el.getAttribute( 'data-color-save' );
    queAll( '.' + c ).forEach( o => o.style.fill = s );
})

// Skill --------------------------------------------------

// const 
const SkillBtnLs = getId( 'SkillBtnLs' ),
      SkillLs    = getId( 'SkillLs' ),
      SkillLoad  = getId( 'SkillLoad' ),
      SkillFull  = getId( 'SkillFull' ),
      SkillTitle = getId( 'SkillTitle' ),
      SkillDesc  = getId( 'SkillDesc' ),
      SkillClose = getId( 'SkillClose' );

// var
var Skill_Btns  = [],
    Skill_Array = [],
    Skill_Total,
    Skill_Circle = [],
    Skill_Radius,
    Skill_Width;

// func 切換類別
SkillKind = ( n ) => {
    
    let o = Skill_Btns[ n ];

    Skill_Circle = [];
    SkillLs.innerHTML = '';
    SkillHtml( o.value );

    queOne( '.skill-btn-li.--click' ).classList.remove( '--click' );    
    o.classList.add( '--click' );
}

// func 產生html
SkillHtml = ( e ) => {

    for( let i = 0 ; i < Skill_Total ; i++ ) {

        let n = Skill_Array[ i ],
            t = n[ 'Title' ],
            d = n[ 'Desc' ],
            k = n[ 'Kind' ],
            s = n[ 'Score' ];

        if ( k.match( e ) ){
            
            SkillLs.insertAdjacentHTML( 'beforeend' ,
                `<li class="skill-li">
                    <div class="skill-li-box __tran200ms __rad12px __sha16px" onclick="SkillOpen(${ i })">
                        <div class="skill-li-head">
                            <p class="skill-li-title">${ t }</p>
                            <p class="skill-li-desc">${ d }</p>
                        </div>
                        <div class="skill-li-body">
                            <div id="Piechart${ i }" class="piechart"></div>
                        </div>
                    </div>
                </li>`
            ) // IE 不支援

            SkillPiechart( 'Piechart' + i , s );
        }
    }
}

// func 產生圓餅圖
SkillPiechart = ( o , v ) => {

    let c;
        
    if ( v >= 80 ) {
        c = '#15BCAB'

    } else if ( v >= 60 ) {
        c = '#FEB53F'

    } else {
        c = '#FE5A5F'
    }

    SkillResize();
    
    // （ API: circle.js ）
    var o = Circles.create({
        id:       o,
        radius:   Skill_Radius,
        value:    v,
        width:    Skill_Width,
        colors:   [ '#ddd' , c ],
        duration: 1000
    })

    Skill_Circle.push( o );
}

// func 圓餅圖RWD
SkillResize = () => {
    try {
        let n = queOne( '.skill-li-box' ).offsetWidth;
        Skill_Radius = n / 9;
        Skill_Width  = n / 50;

    } catch {}
}

// func 開啟全屏
SkillOpen = ( i ) => {

    let n = Skill_Array[ i ],
        t = n[ 'Title' ],
        d = n[ 'Desc' ],
        s = n[ 'Score' ];

    SkillPiechart( 'PiechartFull' , s );
    SkillTitle.innerHTML = t;
    SkillDesc .innerHTML = d;
    SkillFull.classList.add( '--show' );
    Html     .classList.add( '--lock' );
}

// event 關閉全屏
SkillClose.onclick = () => {
    SkillFull.classList.remove( '--show' );
    Html     .classList.remove( '--lock' );
}

// carry out 取得Json
fetch( GAS( 'AKfycbxXLeyvQBab1BSNcpIIcQrz5DAyOg8gXqo9wqZ5M5zHtrkXE9ZUp5RhfFnsSS3r8AB7' ) , {
    method: 'GET'

}).then( ( res ) => {
    return res.json()

}).then( ( data ) => {

    // 產生btn
    for( let i = 0 ; i < data[ 0 ].length ; i++ ) {

        SkillBtnLs.insertAdjacentHTML( 'beforeend' ,
            `<button class="skill-btn-li __rad4px __tran100ms"
                value="${ data[ 0 ][ i ] }" onclick="SkillKind(${ i + 1 })">
                ${ data[ 0 ][ i ] }
            </button>`
        ) // IE 不支援
    }
    Skill_Btns = queAll( '.skill-btn-li' );

    // 產生list
    Skill_Array = data[ 1 ];
    Skill_Total = data[ 1 ].length;

    Skill_Array.sort( ( a , b ) => {
        return b[ 'Score' ] - a[ 'Score' ]
    });

    SkillHtml( '' );

    // 結束loading
    SkillLoad .classList.remove( '--show' );
    SkillBtnLs.classList.add( '--show' );
});

// Common --------------------------------------------------

// event 畫面縮放
window.onresize = () => {

    // Paint（ API: iro.js ）
    PaintResize();

    PaintPicker.resize( Paint_Width );

    // Skill（ API: circle.js ）
    SkillResize();

    Skill_Circle.forEach( el => {
        el.updateRadius( Skill_Radius );
        el.updateWidth ( Skill_Width );
    });
};