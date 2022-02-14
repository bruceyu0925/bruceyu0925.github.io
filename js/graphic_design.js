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

                if ( SliderBtn[ i ] === el ) SliderReset( i );
            }
        }
    })

    // event 輪播切換
    setInterval( () => SliderTimer() , 100 )

    // Switch --------------------------------------------------

    // const
    const SwitchBtn = queAll( '.switch-btn' );

    // event 點選切換
    SwitchBtn.forEach( el => {

        el.onclick = () => {

            el.parentElement.classList.toggle( '--after' );
            el.parentElement.classList.toggle( '--before' );
        }
    })

    // Blog --------------------------------------------------

    // const 搜尋
    const BlogAi       = getId( 'BlogAi' ),
          BlogPs       = getId( 'BlogPs' ),
          BlogSort     = getId( 'BlogSort' ),
          BlogSortIcon = queAll( '.blog-find-sort-state' ),
          BlogText     = getId( 'BlogText' ),
          BlogClear    = getId( 'BlogClear' ),
          BlogSearch   = getId( 'BlogSearch' );

    // const 狀態
    const BlogPrint    = getId( 'BlogPrint' ),
          BlogBigpic   = getId( 'BlogBigpic' ),
          BlogList     = getId( 'BlogList' );

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

    // var 搜尋功能
    var Blog_Ai,
        Blog_Ps,
        Blog_Sort,
        Blog_Text;

    // var 搜尋結果
    var Blog_Array = [],
        Blog_Order,
        Blog_Total,
        Blog_Count;

    // func Ajax請求
    function BlogData() {

        fetch( GAS( 'AKfycbxwwozBbZ4CYTLcPWSQlEsvB1EDmCtj8Wr9KnVnuCEELt4AC7f1mmuqSDNM0Dh2E2It' ) , {
            method: 'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body: JSON.stringify({
                'ai'   : Blog_Ps,
                'ps'   : Blog_Ai,
                'sort' : Blog_Sort,
                'text' : Blog_Text
            })

        }).then( ( res ) => {
            return res.json()

        }).then( ( data ) => {
            Blog_Array = data;
            Blog_Total = data.length;
            BlogHtml();
        })
    }

    // func 輸出html
    function BlogHtml() {

        Blog_Count = queAll( '.blog-li' ).length;

        for ( let i = 0 ; i < 12 ; i++ ) {

            if ( Blog_Count < Blog_Total ) {

                var n     = Blog_Array[ Blog_Count ],
                    num   = n[ 'Num' ],
                    name  = n[ 'Name' ],
                    date  = n[ 'Date' ],
                    tool  = n[ 'Tool' ],
                    src   = n[ 'Src' ],
                    style = n[ 'Style' ];
                            
                var m = 
                    `<div class="blog-li-cover __tran200ms">
                        <span class="blog-li-span __tran200ms">${ name }</span>
                    </div>`;

                if ( DeviceJudge() === true ) m = '';

                BlogLs.insertAdjacentHTML( 'beforeend' ,
                    `<li class="blog-li" value="${ Blog_Count }">
                        <span class="blog-li-num">${ num }</span>
                        <div class="blog-li-block">
                            ${ m }
                            <img class="blog-li-img __tran200ms __imgresp"
                                alt="${ name }" style="${ style }" src="${ src }" width="349" height="494">
                        </div>
                        <span class="blog-li-name">${ name }</span>
                        <span class="blog-li-tool">${ tool }</span>
                        <span class="blog-li-date">${ date }</span>
                    </li>`
                );
                Blog_Count++;
            }
        }
        queAll( '.blog-li' ).forEach( el => 
            el.addEventListener( 'click' , BlogClick )    
        );

        BlogShow();
    };

    // func 顯示html
    function BlogShow() {

        setTimeout( () => {

            BlogLoad.classList.remove( '--show' );

            queAll( '.blog-li' ).forEach( el => el.classList.add( '--show' ) );
            
            BlogJudge();

            BlogSearch.disabled = false;

        } , 1000 )
    }

    // func 判斷資料
    function BlogJudge() {

        // 判斷資料數量
        if ( Blog_Total === 0 ) {
            BlogPrint.innerHTML = `未搜尋到相關資料`;
            BlogWarn.classList.add( '--show' );

        } else {
            BlogPrint.innerHTML = `${ Blog_Total }筆相符結果`;
            BlogWarn.classList.remove( '--show' );
        }

        // 判斷是否還有資料
        if ( Blog_Total <= Blog_Count ) {
            BlogAppend.classList.add( '--hide' )

        } else {
            BlogAppend.classList.remove( '--hide' )
        }
    }

    // func 開啟全屏
    function BlogClick() {
        BlogFull.classList.add( '--show' );
        Html    .classList.add( '--lock' );
        Blog_Order = this.getAttribute( 'value' );
        BlogOpen();
    }

    // func 全屏功能
    function BlogOpen() {

        BlogAside.scroll( 0 , 0 );

        var n = Blog_Array[ Blog_Order ],
            num  = n[ 'Num' ],
            name = n[ 'Name' ],
            date = n[ 'Date' ],
            tool = n[ 'Tool' ],
            desc = n[ 'Desc' ],
            src  = n[ 'Src' ],
            alt  = n[ 'Name' ];

        BlogNum .innerHTML = num;
        BlogName.innerHTML = name;
        BlogDate.innerHTML = date;
        BlogTool.innerHTML = tool;
        BlogDesc.innerHTML = desc;
        
        BlogImg.setAttribute( 'src' , src );
        BlogImg.setAttribute( 'alt' , alt );

        if ( Blog_Total === 1 ) {
            BlogPrev.classList.add( '--lock' );
            BlogNext.classList.add( '--lock' );

        } else if ( Blog_Order <= 0 ) {
            BlogPrev.classList.add( '--lock' );
            BlogNext.classList.remove( '--lock' );

        } else if ( Blog_Order >= Blog_Count - 1 ) {
            BlogPrev.classList.remove( '--lock' );
            BlogNext.classList.add( '--lock' );
            
        } else {
            BlogPrev.classList.remove( '--lock' );
            BlogNext.classList.remove( '--lock' );
        }
    }

    // event 搜尋功能 - Illustrator
    BlogAi.onclick = function () {

        this.classList.toggle( '--on' );

        if ( this.classList.contains( '--on' ) ) {
            this.value = 'Illustrator'

        } else {
            this.value = '-'
        }
    }

    // event 搜尋功能 - Photoshop
    BlogPs.onclick = function () {

        this.classList.toggle( '--on' );

        if ( this.classList.contains( '--on' ) ) {
            this.value = 'Photoshop'

        } else {
            this.value = '-'
        }
    }

    // event 搜尋功能 - sort
    BlogSort.onclick = () => {

        BlogSortIcon.forEach( el => el.classList.toggle( '--show' ) );

        var v = queOne( '.blog-find-sort-state.--show' ).getAttribute( 'data-blog-sort' );

        BlogSort.value = v;
    }

    // event 搜尋功能 - input
    BlogText.onkeyup = () => {

        if ( BlogText.value === '' ) {
            BlogClear.classList.remove( '--show' )

        } else {
            BlogClear.classList.add( '--show' )
        }
    }

    // event 搜尋功能 - clear
    BlogClear.onclick = () => {
        BlogText.value = '';
        BlogClear.classList.remove( '--show' );
    }

    // event 搜尋功能 - search
    BlogSearch.onclick = () => {

        BlogSearch.disabled = true;

        Blog_Ps   = BlogPs  .value;
        Blog_Ai   = BlogAi  .value;
        Blog_Sort = BlogSort.value;
        Blog_Text = BlogText.value.toLowerCase();

        BlogAppend.classList.add( '--hide' );
        BlogLoad  .classList.add( '--show' );
        BlogWarn  .classList.remove( '--show' );
        BlogLs    .innerHTML = '';
        BlogPrint .innerHTML = '搜尋中...';

        BlogData();
    }

    // event 顯示方式 - big picture
    BlogBigpic.onclick = () => {
        BlogBigpic.classList.add( '--click' );
        BlogList  .classList.remove( '--click' );
        BlogLs    .classList.add( '--bigpic' );
        BlogLs    .classList.remove( '--list' );
    }

    // event 顯示方式 - list
    BlogList.onclick = () => {
        BlogBigpic.classList.remove( '--click' );
        BlogList  .classList.add( '--click' );
        BlogLs    .classList.remove( '--bigpic' );
        BlogLs    .classList.add( '--list' );
        BlogLs    .scroll( 0 , 0 );
    }

    // event 加載按鈕
    BlogAppend.onclick = () => {
        BlogAppend.classList.add( '--hide' );
        BlogLoad  .classList.add( '--show' );
        BlogHtml();
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

    // 搜尋
    BlogSearch.click();

}()