'use strict';

// Animate --------------------------------------------------
!function() {
    
    // const
    const animateImg   = getId( 'AnimateImg' ),
          animateThumb = getId( 'AnimateThumb' ),
          animateBtn   = queAll( '.animate-btn' );

    // event 切換按鈕
    animateBtn.forEach( el => {

        el.onclick = () => {

            queOne( '.animate-btn.--click' ).classList.remove( '--click' );
            el.classList.add( '--click' );

            animateThumb.style.marginLeft = el.getAttribute( 'data-ani-loc' );
            
            animateImg.setAttribute( 'class' , el.value );
        }
    })

}()

// Paint --------------------------------------------------
!function() {

    // const 畫板
    const paint          = getId( 'Paint' ),
          paintImg       = getId( 'PaintImg' ),
          paintCanvas    = getId( 'PaintCanvas' ),
          paintPointers  = queAll( '.paint-pointer-li' );

    // const 功能鍵
    const paintUpload    = getId( 'PaintUpload' ),
          paintDownload  = getId( 'PaintDownload' ),
          paintEdit      = getId( 'PaintEdit' ),
          paintReset     = getId( 'PaintReset' ),
          paintCancel    = getId( 'PaintCancel' ),
          paintApply     = getId( 'PaintApply' ),
          paintBtn       = queAll( '.paint-btn-li' );

    // const 浮動視窗：上傳
    const msgNamed       = getId( 'MsgNamed' ),
          msgSuccess     = getId( 'MsgSuccess' ),
          msgError       = getId( 'MsgError' ),
          btnCancel      = getId( 'BtnCancel' ),
          btnSend        = getId( 'BtnSend' ),
          btnSuccess     = getId( 'BtnSuccess' ),
          btnError       = getId( 'BtnError' ),
          inputName      = getId( 'InputName' ),
          inputWarn      = getId( 'InputWarn' );

    // const 浮動視窗：圖庫
    const paintLibrary   = getId( 'PaintLibrary' ),
          paintBlog      = getId( 'PaintBlog' ),
          paintMore      = getId( 'PaintMore' ),
          paintNew       = getId( 'PaintNew' ),
          paintList      = getId( 'PaintList' ),
          paintLoad      = getId( 'PaintLoad' ),
          paintClose     = getId( 'PaintClose' );

    // const 調色功能
    const paintBody      = getId( 'PaintBody' ),
          paintName      = getId( 'PaintName' ),
          paintPalette   = getId( 'PaintPalette' ),
          paintColorcode = getId( 'PaintColorcode' ),
          paintHex       = getId( 'PaintHex' ),
          paintR         = getId( 'PaintR' ),
          paintG         = getId( 'PaintG' ),
          paintB         = getId( 'PaintB' ),
          paintH         = getId( 'PaintH' ),
          paintS         = getId( 'PaintS' ),
          paintL         = getId( 'PaintL' ),
          paintInput     = queAll( '.paint-input-li > input' ),
          paintNum       = queAll( '.paint-input-num' );

    // var
    var _paintArray  = [],
        _paintTotal,
        _paintWidth,
        _paintHeight;

    // func 調色盤RWD
    function paintResize() {

        var w = window.innerWidth;

        switch( true ) {

            case w > 1200:
                _paintWidth  = 300;
                _paintHeight = 200;
                break;

            case w > 600:
                _paintWidth  = 250;
                _paintHeight = 200;
                break;

            case w > 480:
                _paintWidth  = 200;
                _paintHeight = 200;
                break;

            default:
                _paintWidth  = 200;
                _paintHeight = 150;
                break;
        }
    }
    paintResize();

    // var 調色盤（ API: iro.js ）
    var paintPicker = new iro.ColorPicker( '#PaintPicker' , {
        width:     _paintWidth,
        boxHeight: _paintHeight,
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
    var picker = paintPicker.color;

    // func 返回設定
    function paintSet( get , set ) {

        paintPointers.forEach( el => {

            var s = el.getAttribute( 'data-color-' + get ),
                n = el.getAttribute( 'data-color-class' );

            el.setAttribute( 'data-color-' + set , s );

            if ( get !== 'set' ) {
                queAll( '.' + n ).forEach( o => o.style.fill = s )
            }
        })
    }

    // func 取得資料 GET
    function paintBrowse( n ) {

        fetch( GAS( 'AKfycbwM-_7NzFHj0roNK-didJ5Qp2gwcewU752sw4GNcY-8F9M_YMPdlAQWpiX4A1xvsNaVTg' ) , {
            method: 'GET'

        }).then( res => {
            return res.json()

        }).then( data => {
            _paintArray = data;
            _paintTotal = data.length;

            // 處理排序
            _paintArray.sort( ( a , b ) => {
        
                if( n === 'more' ) {
                    return a[ 'Watch' ] < b[ 'Watch' ] ? 1 : -1
        
                } else if( n === 'new' ) {
                    return a[ 'DateUpdate' ] > b[ 'DateUpdate' ] ? -1 : 1
                }
            });

            if ( paintBlog.classList.contains( '--show' ) ) paintHtml();
        })
    }

    // func 輸出html
    function paintHtml() {

        paintList.innerHTML = ''; // 防止接收多個 Response
    
        for ( let i = 0 ; i < _paintTotal ; i++ ) {
    
            var n          = _paintArray[ i ],
                name       = n[ 'Name' ],
                watch      = n[ 'Watch' ],
                src        = n[ 'Src' ],
                dateupdate = n[ 'DateUpdate' ];

            dateupdate = dateTran( dateupdate , '-' , false );
    
            paintList.insertAdjacentHTML( 'beforeend' ,
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
            el.addEventListener( 'click' , paintClick )
        );

        paintShow();
    }

    // func 顯示html
    function paintShow() {

        paintLoad.classList.remove( '--show' );

        queAll( '.paint-blog-li' ).forEach( el => el.classList.add( '--show' ) );

        paintMore.disabled = false;
        paintNew .disabled = false;
    }

    // func 套用圖庫＆回傳觀看次數 PATCH
    function paintClick() {

        var n = _paintArray[ this.getAttribute( 'value' ) ],
            d = n[ 'Id' ];

        fetch( GAS( 'AKfycbyNtTQv_FOXq_jf4n6D-a4pnjH_EncrBlS9WXGiuNgWpaDZ4Zjj8zP-chm3DQZAyzdY' ) + '?id=' + d , {
            method: 'POST'

        }).catch( err  => {
            alert( err )
        })

        for ( let i = 0 ; i < paintPointers.length ; i++ ) {

            var s = n[ 'Clr' + i ],
                o = paintPointers[ i ],
                c = o.getAttribute( 'data-color-class' );

            o.setAttribute( 'data-color-set' , s );
            
            queAll( '.' + c ).forEach( el =>
                el.style.fill = s
            )
        }

        picker.hexString = queOne( '.paint-pointer-li.--click' ).getAttribute( 'data-color-set' );
        paintBlog.classList.remove( '--show' );
        Html     .classList.remove( '--lock' );
        paintList.innerHTML = '';
    }

    // func 圖庫：點選排序
    function paintSort() {
        paintList.innerHTML = '';
        paintLoad.classList.add( '--show' );
        paintMore.disabled = true;
        paintNew .disabled = true;
    }

    // event 畫面縮放
    window.onresize = () => {

        // paint（ API: iro.js ）（ 有修改prototype.resize ）
        paintResize();
        paintPicker.resize( _paintWidth , _paintHeight );
    };

    // event 上傳鍵
    paintUpload.onclick = () => {
        inputName.value = '';
        inputWarn.innerHTML = '';
        Html    .classList.add( '--lock' );
        msgNamed.classList.add( '--show' );
    }

    // event 上傳：取消
    btnCancel.onclick = () => {
        Html    .classList.remove( '--lock' );
        msgNamed.classList.remove( '--show' );
    }

    // event 上傳：送出 POST
    btnSend.onclick = () => {

        var n = inputName.value,
            l = n.replace( /\s*/g , '' ).replace( /[^\x00-\xff]/g , 'xx' ).length;

        if ( l >= 4 && l <= 20 ) {

            var p = i => paintPointers[ i ].getAttribute( 'data-color-save' ),
                s = new XMLSerializer().serializeToString( paintImg ),
                b = 'data:image/svg+xml;base64,' + btoa( s );

            html    .classList.remove( '--lock' );
            msgNamed.classList.remove( '--show' );

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

                html.classList.add( '--lock' );

                if ( data === 'Success' ) {
                    msgSuccess.classList.add( '--show' )

                } else if ( data === 'Warn' ) {
                    msgNamed.classList.add( '--show' );
                    inputWarn.innerHTML = '已有相同名稱！';
                }

            }).catch( err => {
                msgError.classList.add( '--show' );
            })

        } else {
            inputWarn.innerHTML = '不符合命名規範！';
        }
    }

    // event 上傳：成功
    btnSuccess.onclick = () => {
        msgSuccess.classList.remove( '--show' );
        html      .classList.remove( '--lock' );
    }

    // event 上傳：失敗
    btnError.onclick = () => {
        msgError.classList.remove( '--show' );
        html    .classList.remove( '--lock' );
    }

    // event 下載鍵
    paintDownload.onclick = () => {

        // 不支援：FB、IG
        if ( deviceJudge( [ 'FBAN' , 'FBIOS' , 'Instagram' ] ) ) {

            alert( 'Facebook、Instagram 內建瀏覽器，不支援下載檔案！' );
        
        } else {

            var s = new XMLSerializer().serializeToString( paintImg ),
                i = new Image();

            // 鎖按鈕
            paintBtn.forEach( el => el.disabled = true );

            // 圖片轉 base64
            i.setAttribute( 'src' , 'data:image/svg+xml;base64,' + btoa( s ) );

            // 圖片讀完
            i.onload = () => {

                var a = document.createElement( 'a' ),
                    c = paintCanvas.getContext( '2d' ),
                    w = i.width  * 3,
                    h = i.height * 3; 

                // canvas 繪圖
                paintCanvas.width  = w;
                paintCanvas.height = h;
                c.drawImage( i , 0 , 0 , w , h );

                // 下載圖片準備
                a.download = `BruceYuDesign ${ dateTran( null , '-' , true ) }.png`;
                a.href     = paintCanvas.toDataURL( 'image/png' );

                // 開始動畫
                paintCanvas.classList.add( '--show' );

                setTimeout( () => {

                    a.click();
                    paintBtn.forEach( el => el.disabled = false );
                    paintCanvas.classList.remove( '--show' );

                } , 1250 );
            }
        }
    }

    // event 編輯鍵
    paintEdit.onclick = () => {
        paint.classList.add( '--edit' )
    }

    // event 編輯：重設
    paintReset.onclick = () => {
        paintSet( 'reset' , 'set' );
        picker.hexString = queOne( '.paint-pointer-li.--click' ).getAttribute( 'data-color-set' );
    }

    // event 編輯：取消
    paintCancel.onclick = () => {
        paint.classList.remove( '--edit' );
        paintSet( 'save' , 'set' );
        picker.hexString = queOne( '.paint-pointer-li.--click' ).getAttribute( 'data-color-set' );
    }

    // event 編輯：確定
    paintApply.onclick = () => {
        paint.classList.remove( '--edit' );
        paintSet( 'set' , 'save' );
    }

    // event 圖庫：開啟
    paintLibrary.onclick = () => {
        paintSort();
        paintBlog.classList.add( '--show' );
        html     .classList.add( '--lock' );
        paintBrowse( queOne( '.paint-blog-btn.--click' ).value );
    }

    // event 圖庫：排序 最多人
    paintMore.onclick = () => {
        paintSort();
        paintMore.classList.add( '--click' );
        paintNew .classList.remove( '--click' );
        paintBrowse( 'more' );
    }

    // event 圖庫：排序 最新
    paintNew.onclick = () => {
        paintSort();
        paintMore.classList.remove( '--click' );
        paintNew .classList.add( '--click' );
        paintBrowse( 'new' );
    }

    // event 圖庫：關閉
    paintClose.onclick = () => {
        paintBlog.classList.remove( '--show' );
        html     .classList.remove( '--lock' );
        paintList.innerHTML = '';
    }

    // event 畫板：點選
    paintPointers.forEach( el => {
        el.onclick = () => {

            queOne( '.paint-pointer-li.--click' ).classList.remove( '--click' );
            el.classList.add( '--click' );

            var c = el.getAttribute( 'data-color-set' ),
                n = el.getAttribute( 'data-color-name' );

            paintName.innerHTML = n;
            picker   .hexString = c;
        }
    })

    // event 調色：調色盤模式（ mobile ）
    paintPalette.onclick = () => {
        paintBody.classList.add( '--palette' )
        paintBody.classList.remove( '--colorcode' )
    }

    // event 調色：色碼表模式（ mobile ）
    paintColorcode.onclick = () => {
        paintBody.classList.remove( '--palette' )
        paintBody.classList.add( '--colorcode' )
    }

    // event 調色：調色盤（ API: iro.js ）
    paintPicker.on( [ 'color:change' , 'color:init' ] , () => {

        var x = picker.hexString,
            r = picker.red,
            g = picker.green,
            b = picker.blue,
            h = parseInt( picker.hue        , 10 ),
            s = parseInt( picker.saturation , 10 ),
            l = parseInt( picker.value      , 10 ),
            o = queOne( '.paint-pointer-li.--click' ),
            n = o.getAttribute( 'data-color-class' );

        paintHex.value = x.replace( '#' , '' );
        paintR  .value = r;
        paintG  .value = g;
        paintB  .value = b;
        paintH  .value = h;
        paintS  .value = s;
        paintL  .value = l;

        o.setAttribute( 'data-color-set' , x );
        
        queAll( '.' + n ).forEach( el => el.style.fill = x );
    })

    // event 調色：Hex blur 設定顏色
    paintHex.onblur = function () {

        var v = this.value;

        try {
            picker.hexString = v

        } catch {
            v = ( picker.hexString ).replace( '#' , '' );
            this.value = v;
        }
    }

    // event 調色：Hex keyup 防呆機制
    paintHex.onkeyup = function () {
        this.value = this.value.replace( /[^a-fA-F0-9]|_/ig , '' )
    }


    // event 調色：RGB、HSL
    paintNum.forEach( el => {

        // blur 設定顏色
        el.onblur = () => {

            var k = el.getAttribute( 'kind' ),
                n = el.getAttribute( 'name' ),
                v = el.value;

            if ( v === '' ) {
                v = 0;
                el.value = 0;
            }

            picker.setChannel( k , n , v );
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
    paintInput.forEach( el => {
        el.onkeydown = ( e ) => {
            e.keyCode === 13 ? el.blur() : null ;
        }
    })

    // 調色盤名稱
    paintName.innerHTML = getId( 'PaintPointer01' ).getAttribute( 'data-color-name' );

    // 設定圖片顏色
    paintPointers.forEach( el => {
        var c = el.getAttribute( 'data-color-class' ),
            s = el.getAttribute( 'data-color-save' );
        queAll( '.' + c ).forEach( o => o.style.fill = s );
    })

}()

// skill --------------------------------------------------
!function() {

    // const 
    const skillBtnLs = getId( 'SkillBtnLs' ),
          skillLs    = getId( 'SkillLs' ),
          skillLoad  = getId( 'SkillLoad' ),
          skillFull  = getId( 'SkillFull' ),
          skillTitle = getId( 'SkillTitle' ),
          skillDesc  = getId( 'SkillDesc' ),
          skillClose = getId( 'SkillClose' );

    // var
    var _skillArray = [],
        _skillTotal;

    // GET
    Promise.all([
        GAS( 'AKfycbyho-aJp41o7tmxSKUwR6DqB9Z54fawKHrCijXJcmnDoH0euucF0TPT_NZdpgqHu9iT' ),
        GAS( 'AKfycby8aq_1Ln1-CB73CqJ-ABcM-gi2vaEheFnf6ou0aVZncs0fmskGGIjuXngYeAEEBBlf' )
    
    ].map( req =>
    
        fetch( req , {
            method: 'GET'
            
        }).then( res => {
            return res.json()
        })
    
    )).then( ary => {
        
        // 產生btn
        for( let i = 0 ; i < ary[ 1 ].length ; i++ ) {

            skillBtnLs.insertAdjacentHTML( 'beforeend' ,
                `<button value="${ ary[ 1 ][ i ][ 'Id' ] }" class="skill-btn-li __rad4px __tran200ms">
                    ${ ary[ 1 ][ i ][ 'Kind' ] }
                </button>`
            )
        };

        queAll( '.skill-btn-li' ).forEach( el =>
            el.addEventListener( 'click' , skillKind )
        );

        // 產生list
        _skillArray = ary[ 0 ];
        _skillTotal = ary[ 0 ].length;

        _skillArray.sort( ( a , b ) => {
            return b[ 'Score' ] - a[ 'Score' ]
        });

        queOne( '.skill-btn-li' ).classList.add( '--click' );
        skillHtml( ary[ 1 ][ 0 ][ 'Id' ] );

        // 結束loading
        skillLoad .classList.remove( '--show' );
        skillBtnLs.classList.add( '--show' );
    });

    // func 切換類別
    function skillKind() {

        skillLs.innerHTML = '';
        skillHtml( this.getAttribute( 'value' ) );

        queOne( '.skill-btn-li.--click' ).classList.remove( '--click' );
        this.classList.add( '--click' );
    }

    // func 產生html
    function skillHtml( e ) {

        for( let i = 0 ; i < _skillTotal ; i++ ) {

            var n = _skillArray[ i ],
                t  = n[ 'Title' ],
                d  = n[ 'Desc' ],
                k  = n[ 'Kind' ].toString(),
                s  = n[ 'Score' ],
                c  = skillColor( s );

            if ( k.match( e ) ) {
                
                skillLs.insertAdjacentHTML( 'beforeend' ,
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
                skillPiechart( 'Piechart' + i , s , c );
            }
        };
        queAll( '.skill-li-box' ).forEach( el =>
            el.addEventListener( 'click' , skillOpen )
        );
    }

    // func 開啟全屏
    function skillOpen() {
        var n = _skillArray[ this.getAttribute( 'value' ) ],
            t = n[ 'Title' ],
            d = n[ 'Desc' ],
            s = n[ 'Score' ],
            c = skillColor( s );
        
        skillPiechart( 'PiechartFull' , s , c );

        skillTitle.innerHTML = t;
        skillDesc .innerHTML = d;
        skillFull.classList.add( '--show' );
        html     .classList.add( '--lock' );
    }

    // func 顏色套用
    function skillColor( v ) {

        switch( true ) {

            case v >= 80:
                return '#15BCAB';

            case v >= 60:
                return '#FEB53F';

            default:
                return '#FE5A5F';
        }
    }

    // func 產生圓餅圖
    function skillPiechart( id , score , color ) {

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
    skillClose.onclick = () => {
        skillFull.classList.remove( '--show' );
        html     .classList.remove( '--lock' );
    }

}()