'use strict';

// Slider --------------------------------------------------

!function() {

    // const
    const slider      = getId( 'Slider' ),
          sliderBoard = getId( 'SliderBoard' ),
          sliderPlay  = getId( 'SliderPlay' ),
          sliderPause = getId( 'SliderPause' ),
          sliderBtn   = queAll( '.slider-btn-li' ),
          sliderImg   = queAll( '.slider-img-li' );

    // var
    var _sliderTime = 0,
        _sliderAdd  = 1;

    // func 切換圖片
    function sliderReset( n ) {

        queOne( '.slider-btn-li.--run' ) .classList.remove( '--run' );
        queOne( '.slider-img-li.--show' ).classList.remove( '--show' );

        sliderBtn[ n ].classList.add( '--run' );
        sliderImg[ n ].classList.add( '--show' );

        _sliderTime = 0;
    }

    // func 輪播圖片
    function sliderTimer() {

        if ( _sliderTime < 30 ) {
            _sliderTime = _sliderTime + _sliderAdd

        } else {
            var i = sliderBtn.length;
            while ( i-- ) {
                if ( sliderBtn[ i ].classList.contains( '--run' ) ) {
                    i++;
                    i === sliderBtn.length ? i = 0 : null;
                    sliderReset( i );
                }
            }
        }
    }

    // event 播放/暫停
    sliderBoard.onclick = () => {

        slider     .classList.toggle( '--play' );
        sliderPlay .classList.toggle( '--show' );
        sliderPause.classList.toggle( '--show' );

        if ( slider.classList.contains( '--play' ) === true ) {
            _sliderAdd = 1

        } else {
            _sliderAdd = 0
        }
    }

    // event 點選切換
    sliderBtn.forEach( el => {
        el.onclick = () => {
            var i = sliderBtn.length;
            while ( i-- ) {
                sliderBtn[ i ] === el ? sliderReset( i ) : null;
            }
        }
    })

    // event 輪播切換
    setInterval( () => sliderTimer() , 100 )

}()

// Switch --------------------------------------------------

queAll( '.switch-btn' ).forEach( el => {
    el.onclick = () => {
        el.parentElement.classList.toggle( '--after' );
        el.parentElement.classList.toggle( '--before' );
    }
})

// blog --------------------------------------------------

!function() {

    // const 搜尋
    const blogBlock  = getId( 'BlogBlock' ),
          blogOption = getId( 'BlogOption' ),
          blogText   = getId( 'BlogText' ),
          blogClear  = getId( 'BlogClear' ),
          blogSearch = getId( 'BlogSearch' ),
          blogPrint  = getId( 'BlogPrint' );

    // const 清單
    const blogLs     = getId( 'BlogLs' ),
          blogAppend = getId( 'BlogAppend' ),
          blogLoad   = getId( 'BlogLoad' ),
          blogWarn   = getId( 'BlogWarn' );

    // const 全屏
    const blogFull  = getId( 'BlogFull' ),
          blogPrev  = getId( 'BlogPrev' ),
          blogNext  = getId( 'BlogNext' ),
          blogClose = getId( 'BlogClose' ),
          blogAside = getId( 'BlogAside' ),
          blogNum   = getId( 'BlogNum' ),
          blogName  = getId( 'BlogName' ),
          blogDate  = getId( 'BlogDate' ),
          blogTool  = getId( 'BlogTool' ),
          blogDesc  = getId( 'BlogDesc' ),
          blogImg   = getId( 'BlogImg' );

    // var 資料陣列
    var _blogKind  = [],
        _blogArray = [],
        _blogOrder = 0,
        _blogTotal = 0,
        _blogCount = 0;

    // var 資料請求
    var _blogPage = 0,
        _blogSort,
        _blogTool = [],
        _blogText;

    // func GET類別
    fetch( GAS( 'AKfycbycpeSbczbsH2gNn9PYSXI8C8NoIPXCOK9hTHCPh6HdL9UM_oPgnBEbRqpCKtqDPfJk' ) , {
        method: 'GET'

    }).then( res => {
        return res.json()
        
    }).then( data => {

        _blogKind = data;

        // 新增Dom
        for( let i = 0 ; i < data.length ; i++ ) {
            getId( 'BlogKind' ).insertAdjacentHTML( 'beforeend' ,
                `<li class="blog-kind-li">
                    <input type="checkbox" class="blog-kind-check" value="${ data[ i ][ 'Id' ] }" id="K-${ data[ i ][ 'Kind' ] }">
                    <label for="K-${ data[ i ][ 'Kind' ] }">${ data[ i ][ 'Kind' ] }</label>
                </li>`
            )
        }

        // 新增事件
        queAll( '.blog-kind-check' ).forEach( el => {
            el.onclick = () => el.toggleAttribute( 'checked' )
        })

        blogSearch.click()
    })

    // func GET資料
    function blogData( page , tool , text , sort ) {

        fetch( GAS( 'AKfycbwi9ZeGuMtffjXfcSHKdjPV0pard7uGyYkbHbFRRluxKmQD9Ii3K6YtumsAl0CrlEWh2g' ) + 
            `?len=12&page=${ page }&tool=${ tool }&text=${ text }&sort=${ sort }` , {
            method: 'GET'
    
        }).then( res => {
            return res.json()

        }).then( data => {
            _blogTotal = data.len;
            blogHtml( data.data );
        })
    }

    // func 輸出html
    function blogHtml( data ) {

        data.forEach( n => {

            // 編號
            while( n.Num.toString().length < 3 ) {
                n.Num = '0' + n.Num.toString()
            };

            // 類別
            _blogKind.forEach( el =>
                n.Kind = n.Kind.replace( el.Id.toString() , el.Kind )
            );
            n.Kind = n.Kind.replace( ',' , ' , ' );

            // 日期
            n.DateUpdate = dateTran( n.DateUpdate );
            
            // 新增Dom
            var m = '';
            if( deviceJudge() === false ) {
                m = `<div class="blog-li-cover __tran200ms">
                        <span class="blog-li-span __tran200ms">${ n.Title }</span>
                    </div>`
            }

            blogLs.insertAdjacentHTML( 'beforeend' ,
                `<li class="blog-li" data-order="${ _blogCount }" data-id="${ n.Id }">
                    <span class="blog-li-num">${ n.Num }</span>
                    <div class="blog-li-block">${ m }
                        <img class="blog-li-img __tran200ms" alt="${ n.Title }"
                            style="top:${ n.Top * 100 }%;left:${ n.Left * 100 }%;" src="${ n.Src }">
                    </div>
                    <span class="blog-li-name">${ n.Title }</span>
                    <span class="blog-li-tool">${ n.Kind }</span>
                    <span class="blog-li-date">${ n.DateUpdate }</span>
                </li>`
            );
            _blogArray.push( n );
            _blogCount++;
        });

        // 設定圖片
        queAll( '.blog-li-img' ).forEach( el => {
            el.onload = () => {
                if( el.offsetHeight > el.offsetWidth ) {
                    el.style.width  = '100%';
                    el.style.height = 'auto';
                } else {
                    el.style.width  = 'auto';
                    el.style.height = '100%';
                }
            }
        });

        // 新增事件
        queAll( '.blog-li' ).forEach( el =>
            el.addEventListener( 'click' , blogClick )
        );

        // 讀取完畢
        switch( true ) {

            case _blogTotal > _blogCount:
                blogAppend.classList.remove( '--hide' );
                break;

            case _blogTotal <= _blogCount:
                blogAppend.classList.add( '--hide' );
                break;
        }

        switch( true ) {

            case _blogTotal > 0:
                blogPrint.innerHTML = `${ _blogTotal }筆相符結果`;
                blogWarn.classList.remove( '--show' );
                break;

            case _blogTotal === 0:
                blogPrint.innerHTML = `未搜尋到相關資料`;
                blogWarn.classList.add( '--show' );
                break;
        }

        blogLoad.classList.remove( '--show' );
        blogSearch.disabled = false;
    };

    // event 搜尋功能 - 工具
    blogOption.onclick = () => {
        blogBlock.classList.toggle( '--show' )
    }

    // event 搜尋功能 - 排序
    queAll( '.blog-sort-li' ).forEach( el => {
        el.onclick = () => {
            queOne( '.blog-sort-li.--click' ).classList.remove( '--click' );
            el.classList.add( '--click' );
        }
    })

    // event 搜尋功能 - 文字
    blogText.onkeyup = function() {
        this.value === '' ?
            blogClear.classList.add( '--hide' ):
            blogClear.classList.remove( '--hide' );
     }

    // event 搜尋功能 - 清空
    blogClear.onclick = function() {
        this.classList.add( '--hide' );
        blogText.value = '';
    }

    // event 搜尋功能 - 搜尋
    blogSearch.onclick = () => {
        
        // 讀取畫面
        blogSearch.disabled = true;
        blogAppend.classList.add( '--hide' );
        blogLoad  .classList.add( '--show' );
        blogWarn  .classList.remove( '--show' );
        blogBlock .classList.remove( '--show' );
        blogLs   .innerHTML = '';
        blogPrint.innerHTML = '搜尋中...';

        // 搜尋條件
        _blogCount = 0;
        _blogPage  = 0;
        _blogArray = [];
        _blogTool  = [];
        queAll( '.blog-kind-check' ).forEach( el => {
            el.hasAttribute( 'checked' ) ?
                _blogTool.push( el.value ) :
                null ;
        });
        _blogTool.join( ',' );
        _blogText = blogText.value.toString().toLowerCase();
        _blogSort = queOne( '.blog-sort-li.--click' ).value;
        blogData( _blogPage , _blogTool , _blogText , _blogSort );
    }

    // event 顯示方式
    queAll( '.blog-find-array-btn' ).forEach( el => {
        el.onclick = () => {
            var cl = queOne( '.blog-find-array-btn.--click' );
            blogLs.classList.remove( cl.value );
            blogLs.classList.add( el.value );
            cl.classList.remove( '--click' );
            el.classList.add( '--click' );
            blogLs.scroll( 0 , 0 )
        }
    })

    // event 加載按鈕
    blogAppend.onclick = () => {
        _blogPage++;
        blogAppend.classList.add( '--hide' );
        blogLoad  .classList.add( '--show' );
        blogData( _blogPage , _blogTool , _blogText , _blogSort );
    }


    // func 開啟全屏
    function blogClick() {
        blogFull.classList.add( '--show' );
        html    .classList.add( '--lock' );
        _blogOrder = this.getAttribute( 'data-order' );
        blogOpen();
    }

    // func 全屏功能
    function blogOpen() {

        blogAside.scroll( 0 , 0 );

        var n = _blogArray[ _blogOrder ];
        blogNum .innerHTML = n.Num;
        blogName.innerHTML = n.Title;
        blogDate.innerHTML = n.DateUpdate;
        blogTool.innerHTML = n.Kind;
        blogDesc.innerHTML = n.Desc;
        blogImg.setAttribute( 'src' , n.Src );
        blogImg.setAttribute( 'alt' , n.Title );

        switch( true ) {

            case _blogTotal === 1:
                blogPrev.classList.add( '--lock' );
                blogNext.classList.add( '--lock' );
                break;

            case _blogOrder <= 0:
                blogPrev.classList.add( '--lock' );
                blogNext.classList.remove( '--lock' );
                break;

            case _blogOrder >= _blogCount - 1:
                blogPrev.classList.remove( '--lock' );
                blogNext.classList.add( '--lock' );
                break;
    
            default:
                blogPrev.classList.remove( '--lock' );
                blogNext.classList.remove( '--lock' );
                break;            
        }
    }

    // event 全屏 prev
    blogPrev.onclick = () => {
        _blogOrder--;
        blogOpen();
    }

    // event 全屏 next
    blogNext.onclick = () => {
        _blogOrder++;
        blogOpen();
    }

    // event 全屏 close
    blogClose.onclick = () => {
        blogFull.classList.remove( '--show' );
        html    .classList.remove( '--lock' );
    }

}()