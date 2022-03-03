'use strict';

!function() {
    
    // Animate --------------------------------------------------

    // const
    const AnimateImg   = getId( 'AnimateImg' ),
          AnimateThumb = getId( 'AnimateThumb' ),
          AnimateBtn   = queAll( '.animate-btn' );

    // event 切換按鈕
    AnimateBtn.forEach( el => {

        el.onclick = () => {

            queOne( '.animate-btn.--click' ).classList.remove( '--click' );
            el.classList.add( '--click' );

            AnimateThumb.style.marginLeft = el.getAttribute( 'data-ani-loc' );
            
            AnimateImg.setAttribute( 'class' , el.value );
        }
    })

    // Paint --------------------------------------------------

    // const 畫板
    const Paint          = getId( 'Paint' ),
          PaintImg       = getId( 'PaintImg' ),
          PaintCanvas    = getId( 'PaintCanvas' ),
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
    var Paint_Array  = [],
        Paint_Total,
        Paint_Width,
        Paint_Height;

    // func 調色盤RWD
    function PaintResize() {

        var w = window.innerWidth;

        if ( w > 1200 ) {
            Paint_Width  = 300;
            Paint_Height = 200;
            
        } else if ( w > 600 ) {
            Paint_Width  = 250;
            Paint_Height = 200;

        } else if ( w > 480 ) {
            Paint_Width  = 200;
            Paint_Height = 200;

        } else {
            Paint_Width  = 200;
            Paint_Height = 150;
        }
    }
    PaintResize();

    // var 調色盤（ API: iro.js ）
    var PaintPicker = new iro.ColorPicker( '#PaintPicker' , {
        width:     Paint_Width,
        boxHeight: Paint_Height,
        color: getId( 'PaintPointer01' ).getAttribute( 'data-color-save' ),
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
    function PaintSet( get , set ) {

        PaintPointers.forEach( el => {

            var s = el.getAttribute( 'data-color-' + get ),
                n = el.getAttribute( 'data-color-class' );

            el.setAttribute( 'data-color-' + set , s );

            if ( get !== 'set' ) {
                queAll( '.' + n ).forEach( o => o.style.fill = s )
            }
        })
    }

    // func 取得資料 GET
    function PaintBrowse( n ) {

        fetch( GAS( 'AKfycbwM-_7NzFHj0roNK-didJ5Qp2gwcewU752sw4GNcY-8F9M_YMPdlAQWpiX4A1xvsNaVTg' ) , {
            method: 'GET'

        }).then( res => {
            return res.json()

        }).then( data => {
            Paint_Array = data;
            Paint_Total = data.length;

            // 處理排序
            Paint_Array.sort( ( a , b ) => {
        
                if( n === 'more' ) {
                    return a[ 'Watch' ] < b[ 'Watch' ] ? 1 : -1
        
                } else if( n === 'new' ) {
                    return a[ 'DateUpdate' ] > b[ 'DateUpdate' ] ? -1 : 1
                }
            });

            if ( PaintBlog.classList.contains( '--show' ) ) PaintHtml();
        })
    }

    // func 輸出html
    function PaintHtml() {

        PaintList.innerHTML = ''; // 防止接收多個 Response
    
        for ( let i = 0 ; i < Paint_Total ; i++ ) {
    
            var n          = Paint_Array[ i ],
                name       = n[ 'Name' ],
                watch      = n[ 'Watch' ],
                src        = n[ 'Src' ],
                dateupdate = n[ 'DateUpdate' ];
    
            var s = new Date( dateupdate ),
                y = ( s.getFullYear()  ).toString(),
                m = ( s.getMonth() + 1 ).toString(),
                d = ( s.getDate()      ).toString();
    
            if ( m.length < 2 ) m = '0' + m;
            if ( d.length < 2 ) d = '0' + d;
            dateupdate = y + '-' + m + '-' + d;
    
            PaintList.insertAdjacentHTML( 'beforeend' ,
                `<li class="paint-blog-li">
                    <div class="paint-blog-block __sha4px __rad12px" value="${ i }">
                        <img class="__imgresp" src="${ src }" alt=${ name }>
                        <div class="paint-blog-aside">
                            <div class="paint-blog-title">${ name }</div>
                            <div class="paint-blog-desc">
                                <span class="paint-blog-date">
                                    ${ dateupdate }
                                </span>
                                <span class="paint-blog-watch">
                                    <i class="fas fa-eye"></i>
                                    ${ watch }
                                </span>
                            </div>
                        </div>
                    </div>
                </li>`
            )
        };
        queAll( '.paint-blog-block' ).forEach( el => 
            el.addEventListener( 'click' , PaintClick )
        );

        PaintShow();
    }

    // func 顯示html
    function PaintShow() {

        PaintLoad.classList.remove( '--show' );

        queAll( '.paint-blog-li' ).forEach( el => el.classList.add( '--show' ) );

        PaintMore.disabled = false;
        PaintNew .disabled = false;
    }

    // func 套用圖庫＆回傳觀看次數 PUT
    function PaintClick() {

        var n = Paint_Array[ this.getAttribute( 'value' ) ],
            d = n[ 'Id' ];

        fetch( GAS( 'AKfycbyNtTQv_FOXq_jf4n6D-a4pnjH_EncrBlS9WXGiuNgWpaDZ4Zjj8zP-chm3DQZAyzdY' ) + '?type=watch&id=' + d , {
            method: 'POST'

        }).catch( err  => {
            alert( err )
        })

        for ( let i = 0 ; i < PaintPointers.length ; i++ ) {

            var s = n[ 'Clr' + i ],
                o = PaintPointers[ i ],
                c = o.getAttribute( 'data-color-class' );

            o.setAttribute( 'data-color-set' , s );
            
            queAll( '.' + c ).forEach( el =>
                el.style.fill = s
            )
        }

        Picker.hexString = queOne( '.paint-pointer-li.--click' ).getAttribute( 'data-color-set' );
        PaintBlog.classList.remove( '--show' );
        Html     .classList.remove( '--lock' );
        PaintList.innerHTML = '';
    }

    // func 圖庫：點選排序
    function PaintSort() {
        PaintList.innerHTML = '';
        PaintLoad.classList.add( '--show' );
        PaintMore.disabled = true;
        PaintNew .disabled = true;
    }

    // event 畫面縮放
    window.onresize = () => {

        // Paint（ API: iro.js ）（ 有修改prototype.resize ）
        PaintResize();
        PaintPicker.resize( Paint_Width , Paint_Height );
    };

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

    // event 上傳：送出 POST
    BtnSend.onclick = () => {

        var n = InputName.value,
            l = n.replace( /\s*/g , '' ).replace( /[^\x00-\xff]/g , 'xx' ).length;

        if ( l >= 4 && l <= 20 ) {

            var p = ( i ) => PaintPointers[ i ].getAttribute( 'data-color-save' ),
                s = new XMLSerializer().serializeToString( PaintImg ),
                b = 'data:image/svg+xml;base64,' + btoa( s );

            Html    .classList.remove( '--lock' );
            MsgNamed.classList.remove( '--show' );

            fetch( GAS( 'AKfycbzMcXYekQV2kc7LUPUhZ-sl3P8p-8NzIc3k3v83HkrtQJ1VFkuERCkdYUcTE5733n6O' ) , {
                method: 'POST',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
                body: JSON.stringify({
                    'name' : n,
                    'src'  : b,
                    'clr0' : p( 0 ),
                    'clr1' : p( 1 ),
                    'clr2' : p( 2 ),
                    'clr3' : p( 3 ),
                    'clr4' : p( 4 ),
                    'clr5' : p( 5 ),
                    'clr6' : p( 6 ),
                    'clr7' : p( 7 ),
                    'clr8' : p( 8 ),
                    'clr9' : p( 9 )
                })
        
            }).then( res => {
                return res.text()
        
            }).then( data => {

                Html.classList.add( '--lock' );

                if ( data === 'Success' ) {
                    MsgSuccess.classList.add( '--show' )

                } else if ( data === 'Warn' ) {
                    MsgNamed.classList.add( '--show' );
                    InputWarn.innerHTML = '已有相同名稱！';
                }

            }).catch( err => {
                MsgError.classList.add( '--show' );
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

        // 不支援：FB、IG
        if ( DeviceJudge( [ 'FBAN' , 'FBIOS' , 'Instagram' ] ) ) {

            alert( 'Facebook、Instagram 內建瀏覽器，不支援下載檔案！' );
        
        } else {

            var s = new XMLSerializer().serializeToString( PaintImg ),
                i = new Image();

            // 鎖按鈕
            PaintBtn.forEach( el => el.disabled = true );

            // 圖片轉 base64
            i.setAttribute( 'src' , 'data:image/svg+xml;base64,' + btoa( s ) );

            // 圖片讀完
            i.onload = () => {

                var a = document.createElement( 'a' ),
                    c = PaintCanvas.getContext( '2d' ),
                    w = i.width  * 3,
                    h = i.height * 3; 

                // canvas 繪圖
                PaintCanvas.width  = w;
                PaintCanvas.height = h;
                c.drawImage( i , 0 , 0 , w , h );

                // 下載圖片準備
                a.download = `BruceYuDesign ${ GetDate( '-' , true ) }.png`;
                a.href     = PaintCanvas.toDataURL( 'image/png' );

                // 開始動畫
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

        var x = Picker.hexString,
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
        
        queAll( '.' + n ).forEach( el => el.style.fill = x );
    })

    // event 調色：Hex blur 設定顏色
    PaintHex.onblur = function () {

        var v = this.value;

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

            var k = el.getAttribute( 'kind' ),
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

            var v = parseInt( el.value , 10 ),
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

    // 調色盤名稱
    PaintName.innerHTML = getId( 'PaintPointer01' ).getAttribute( 'data-color-name' );

    // 設定圖片顏色
    PaintPointers.forEach( el => {
        var c = el.getAttribute( 'data-color-class' ),
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
    var Skill_Array = [],
        Skill_Total;

    // GET
    Promise.all([
        GAS( 'AKfycbyho-aJp41o7tmxSKUwR6DqB9Z54fawKHrCijXJcmnDoH0euucF0TPT_NZdpgqHu9iT' ),
        GAS( 'AKfycbxLx2e6WSqDSTmkyoZWDZlJt2Wklz21qUEwi0d0By-e0o5l6L4HiUzs5Oqp7T01-Dg' )
    
    ].map( req =>
    
        fetch( req , {
            method: 'GET'
            
        }).then( res => {
            return res.json()
        })
    
    )).then( ary => {
        
        // 產生btn
        for( let i = 0 ; i < ary[ 1 ].length ; i++ ) {

            SkillBtnLs.insertAdjacentHTML( 'beforeend' ,
                `<button value="${ ary[ 1 ][ i ][ 'Id' ] }" class="skill-btn-li __rad4px __tran200ms">
                    ${ ary[ 1 ][ i ][ 'Kind' ] }
                </button>`
            )
        };

        queAll( '.skill-btn-li' ).forEach( el =>
            el.addEventListener( 'click' , SkillKind )
        );

        // 產生list
        Skill_Array = ary[ 0 ];
        Skill_Total = ary[ 0 ].length;

        Skill_Array.sort( ( a , b ) => {
            return b[ 'Score' ] - a[ 'Score' ]
        });

        queOne( '.skill-btn-li' ).classList.add( '--click' );
        SkillHtml( ary[ 1 ][ 0 ][ 'Id' ] );

        // 結束loading
        SkillLoad .classList.remove( '--show' );
        SkillBtnLs.classList.add( '--show' );
    });

    // func 切換類別
    function SkillKind() {

        SkillLs.innerHTML = '';
        SkillHtml( this.getAttribute( 'value' ) );

        queOne( '.skill-btn-li.--click' ).classList.remove( '--click' );
        this.classList.add( '--click' );
    }

    // func 產生html
    function SkillHtml( e ) {

        for( let i = 0 ; i < Skill_Total ; i++ ) {

            var n = Skill_Array[ i ],
                t  = n[ 'Title' ],
                d  = n[ 'Desc' ],
                k  = n[ 'Kind' ].toString(),
                s  = n[ 'Score' ],
                c  = SkillColor( s );

            if ( k.match( e ) ) {
                
                SkillLs.insertAdjacentHTML( 'beforeend' ,
                    `<li class="skill-li">
                        <div class="skill-li-box __tran200ms __rad12px __sha16px" value="${ i }">
                            <div class="skill-li-head">
                                <p class="skill-li-title">${ t }</p>
                                <p class="skill-li-desc">${ d }</p>
                            </div>
                            <div class="skill-li-body" id="Piechart${ i }">
                            </div>
                        </div>
                    </li>`
                );
                SkillPiechart( 'Piechart' + i , s , c );
            }
        };
        queAll( '.skill-li-box' ).forEach( el =>
            el.addEventListener( 'click' , SkillOpen )
        );
    }

    // func 開啟全屏
    function SkillOpen() {
        var n = Skill_Array[ this.getAttribute( 'value' ) ],
            t = n[ 'Title' ],
            d = n[ 'Desc' ],
            s = n[ 'Score' ],
            c = SkillColor( s );
        
        SkillPiechart( 'PiechartFull' , s , c );

        SkillTitle.innerHTML = t;
        SkillDesc .innerHTML = d;
        SkillFull.classList.add( '--show' );
        Html     .classList.add( '--lock' );
    }

    // func 顏色套用
    function SkillColor( v ) {

        var c;
            
        if ( v >= 80 ) {
            c = '#15BCAB'

        } else if ( v >= 60 ) {
            c = '#FEB53F'

        } else {
            c = '#FE5A5F'
        }
        return c
    }

    // func 產生圓餅圖
    function SkillPiechart( id , score , color ) {

        getId( id ).innerHTML =
            `<svg class="circle __imgresp" viewBox="0 0 120 120">
                <text class="circle-text" x="50%" y="50%">0</text>
                <circle class="circle-bot" r="54" cx="60" cy="60"></circle>
                <circle class="circle-top" r="54" cx="60" cy="60" style="stroke-dasharray: 0, 360; stroke: ${ color };"></circle>
            </svg>`;

        var x = queOne( `#${ id } .circle-text` ),
            c = queOne( `#${ id } .circle-top` ),
            t = 40,
            n = score / t,
            s = score * 3.39 / t,
            i = 1,
            e = setInterval( () => {

                if ( i <= t ) {
                    x.innerHTML = parseInt( n * i , 10 )
                    c.style.strokeDasharray = s * i + ',360';
                    i++;

                } else {
                    clearInterval( e );

                }
            } , 25 );
    }

    // event 關閉全屏
    SkillClose.onclick = () => {
        SkillFull.classList.remove( '--show' );
        Html     .classList.remove( '--lock' );
    }

}()