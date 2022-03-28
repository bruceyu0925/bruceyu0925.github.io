'use strict';

!function() {

    // Slider --------------------------------------------------

    // const
    const Slider      = getId( 'Slider' ),
          SliderBoard = getId( 'SliderBoard' ),
          SliderPlay  = getId( 'SliderPlay' ),
          SliderPause = getId( 'SliderPause' ),
          SliderBtn   = queAll( '.slider-btn-li' ),
          SliderImg   = queAll( '.slider-img-li' );

    // var
    var Slider_Len  = SliderBtn.length,
        Slider_Time = 0,
        Slider_Add  = 1;

    // func 切換圖片
    function SliderReset( n ) {

        queOne( '.slider-btn-li.--run' ) .classList.remove( '--run' );
        queOne( '.slider-img-li.--show' ).classList.remove( '--show' );

        SliderBtn[ n ].classList.add( '--run' );
        SliderImg[ n ].classList.add( '--show' );

        Slider_Time = 0;
    }

    // func 輪播圖片
    function SliderTimer() {

        if ( Slider_Time < 30 ) {
            Slider_Time = Slider_Time + Slider_Add

        } else {
            var i = Slider_Len;
            while ( i-- ) {
                if ( SliderBtn[ i ].classList.contains( '--run' ) ) {
                    i++;
                    i === SliderBtn.length ? i = 0 : null;
                    SliderReset( i );
                }
            }
        }
    }

    // event 播放/暫停
    SliderBoard.onclick = () => {

        Slider     .classList.toggle( '--play' );
        SliderPlay .classList.toggle( '--show' );
        SliderPause.classList.toggle( '--show' );

        if ( Slider.classList.contains( '--play' ) === true ) {
            Slider_Add = 1

        } else {
            Slider_Add = 0
        }
    }

    // event 點選切換
    SliderBtn.forEach( el => {
        el.onclick = () => {
            var i = Slider_Len;
            while ( i-- ) {
                SliderBtn[ i ] === el ? SliderReset( i ) : null;
            }
        }
    })

    // event 輪播切換
    setInterval( () => SliderTimer() , 100 )

    // Switch --------------------------------------------------

    queAll( '.switch-btn' ).forEach( el => {
        el.onclick = () => {
            el.parentElement.classList.toggle( '--after' );
            el.parentElement.classList.toggle( '--before' );
        }
    })

    // Blog --------------------------------------------------

    // const 搜尋
    const BlogBlock  = getId( 'BlogBlock' ),
          BlogOption = getId( 'BlogOption' ),
          BlogText   = getId( 'BlogText' ),
          BlogClear  = getId( 'BlogClear' ),
          BlogSearch = getId( 'BlogSearch' ),
          BlogPrint  = getId( 'BlogPrint' );

    // const 清單
    const BlogLs       = getId( 'BlogLs' ),
          BlogAppend   = getId( 'BlogAppend' ),
          BlogLoad     = getId( 'BlogLoad' ),
          BlogWarn     = getId( 'BlogWarn' );

    // const 全屏
    const BlogFull     = getId( 'BlogFull' ),
          BlogPrev     = getId( 'BlogPrev' ),
          BlogNext     = getId( 'BlogNext' ),
          BlogClose    = getId( 'BlogClose' ),
          BlogAside    = getId( 'BlogAside' ),
          BlogNum      = getId( 'BlogNum' ),
          BlogName     = getId( 'BlogName' ),
          BlogDate     = getId( 'BlogDate' ),
          BlogTool     = getId( 'BlogTool' ),
          BlogDesc     = getId( 'BlogDesc' ),
          BlogImg      = getId( 'BlogImg' );

    // var 資料陣列
    var Blog_Kind  = [],
        Blog_Array = [],
        Blog_Order = 0,
        Blog_Total = 0,
        Blog_Count = 0;

    // var 資料請求
    var Blog_Page = 0,
        Blog_Sort,
        Blog_Tool = [],
        Blog_Text;

    // func GET類別
    fetch( GAS( 'AKfycbycpeSbczbsH2gNn9PYSXI8C8NoIPXCOK9hTHCPh6HdL9UM_oPgnBEbRqpCKtqDPfJk' ) , {
        method: 'GET'

    }).then( res => {
        return res.json()
        
    }).then( data => {

        Blog_Kind = data;

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

        BlogSearch.click()
    })

    // func GET資料
    function BlogData( page , tool , text , sort ) {

        fetch( GAS( 'AKfycbwi9ZeGuMtffjXfcSHKdjPV0pard7uGyYkbHbFRRluxKmQD9Ii3K6YtumsAl0CrlEWh2g' ) + 
            `?len=12&page=${ page }&tool=${ tool }&text=${ text }&sort=${ sort }` , {
            method: 'GET'
    
        }).then( res => {
            return res.json()

        }).then( data => {
            Blog_Total = data.len;
            BlogHtml( data.data );
        })
    }

    // func 輸出html
    function BlogHtml( data ) {

        data.forEach( n => {

            // 編號
            while( n.Num.toString().length < 3 ) {
                n.Num = '0' + n.Num.toString()
            };

            // 類別
            Blog_Kind.forEach( el =>
                n.Kind = n.Kind.replace( el.Id.toString() , el.Kind )
            );
            n.Kind = n.Kind.replace( ',' , ' , ' );

            // 日期
            n.DateUpdate = dateTran( n.DateUpdate );
            
            // 新增Dom
            var m = '';
            if( DeviceJudge() === false ) {
                m = `<div class="blog-li-cover __tran200ms">
                        <span class="blog-li-span __tran200ms">${ n.Title }</span>
                    </div>`
            }

            BlogLs.insertAdjacentHTML( 'beforeend' ,
                `<li class="blog-li" data-order="${ Blog_Count }" data-id="${ n.Id }">
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
            Blog_Array.push( n );
            Blog_Count++;
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
            el.addEventListener( 'click' , BlogClick )    
        );

        // 讀取完畢
        switch( true ) {

            case Blog_Total > Blog_Count:
                BlogAppend.classList.remove( '--hide' );
                break;

            case Blog_Total <= Blog_Count:
                BlogAppend.classList.add( '--hide' );
                break;
        }

        switch( true ) {

            case Blog_Total > 0:
                BlogPrint.innerHTML = `${ Blog_Total }筆相符結果`;
                BlogWarn.classList.remove( '--show' );
                break;

            case Blog_Total === 0:
                BlogPrint.innerHTML = `未搜尋到相關資料`;
                BlogWarn.classList.add( '--show' );
                break;
        }

        BlogLoad.classList.remove( '--show' );
        BlogSearch.disabled = false;
    };

    // event 搜尋功能 - 工具
    BlogOption.onclick = () => {
        BlogBlock.classList.toggle( '--show' )
    }

    // event 搜尋功能 - 排序
    queAll( '.blog-sort-li' ).forEach( el => {
        el.onclick = () => {
            queOne( '.blog-sort-li.--click' ).classList.remove( '--click' );
            el.classList.add( '--click' );
        }
    })

    // event 搜尋功能 - 文字
    BlogText.onkeyup = function() {
        this.value === '' ?
            BlogClear.classList.add( '--hide' ):
            BlogClear.classList.remove( '--hide' );
     }

    // event 搜尋功能 - 清空
    BlogClear.onclick = function() {
        this.classList.add( '--hide' );
        BlogText.value = '';
    }

    // event 搜尋功能 - 搜尋
    BlogSearch.onclick = () => {
        
        // 讀取畫面
        BlogSearch.disabled = true;
        BlogAppend.classList.add( '--hide' );
        BlogLoad  .classList.add( '--show' );
        BlogWarn  .classList.remove( '--show' );
        BlogBlock .classList.remove( '--show' );
        BlogLs   .innerHTML = '';
        BlogPrint.innerHTML = '搜尋中...';

        // 搜尋條件
        Blog_Count = 0;
        Blog_Page  = 0;
        Blog_Array = [];
        Blog_Tool  = [];
        queAll( '.blog-kind-check' ).forEach( el => {
            el.hasAttribute( 'checked' ) ?
                Blog_Tool.push( el.value ) :
                null ;
        });
        Blog_Tool.join( ',' );
        Blog_Text = BlogText.value.toString().toLowerCase();
        Blog_Sort = queOne( '.blog-sort-li.--click' ).value;
        BlogData( Blog_Page , Blog_Tool , Blog_Text , Blog_Sort );
    }

    // event 顯示方式
    queAll( '.blog-find-array-btn' ).forEach( el => {
        el.onclick = () => {
            var cl = queOne( '.blog-find-array-btn.--click' );
            BlogLs.classList.remove( cl.value );
            BlogLs.classList.add( el.value );
            cl.classList.remove( '--click' );
            el.classList.add( '--click' );
            BlogLs.scroll( 0 , 0 )
        }
    })

    // event 加載按鈕
    BlogAppend.onclick = () => {
        Blog_Page++;
        BlogAppend.classList.add( '--hide' );
        BlogLoad  .classList.add( '--show' );
        BlogData( Blog_Page , Blog_Tool , Blog_Text , Blog_Sort );
    }


    // func 開啟全屏
    function BlogClick() {
        BlogFull.classList.add( '--show' );
        Html    .classList.add( '--lock' );
        Blog_Order = this.getAttribute( 'data-order' );
        BlogOpen();
    }

    // func 全屏功能
    function BlogOpen() {

        BlogAside.scroll( 0 , 0 );

        var n = Blog_Array[ Blog_Order ];
        BlogNum .innerHTML = n.Num;
        BlogName.innerHTML = n.Title;
        BlogDate.innerHTML = n.DateUpdate;
        BlogTool.innerHTML = n.Kind;
        BlogDesc.innerHTML = n.Desc;
        BlogImg.setAttribute( 'src' , n.Src );
        BlogImg.setAttribute( 'alt' , n.Title );

        switch( true ) {

            case Blog_Total === 1:
                BlogPrev.classList.add( '--lock' );
                BlogNext.classList.add( '--lock' );
                break;

            case Blog_Order <= 0:
                BlogPrev.classList.add( '--lock' );
                BlogNext.classList.remove( '--lock' );
                break;

            case Blog_Order >= Blog_Count - 1:
                BlogPrev.classList.remove( '--lock' );
                BlogNext.classList.add( '--lock' );
                break;
    
            default:
                BlogPrev.classList.remove( '--lock' );
                BlogNext.classList.remove( '--lock' );
                break;            
        }
    }

    // event 全屏 prev
    BlogPrev.onclick = () => {
        Blog_Order--;
        BlogOpen();
    }

    // event 全屏 next
    BlogNext.onclick = () => {
        Blog_Order++;
        BlogOpen();
    }

    // event 全屏 close
    BlogClose.onclick = () => {
        BlogFull.classList.remove( '--show' );
        Html    .classList.remove( '--lock' );
    }

}()