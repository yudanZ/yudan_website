
//IGQVJWQXFGSFY5QUNZAaTBOR25lZAFduSWgxMGltQzdjc3I3MHRVR1plNXdnM0dTUko1a2tLS21ROGNqYVNLLXVkLTY1OFc5cjNTN2lVLWtXdmEwSDdPaEpjakpYbFVXV2RCbVVWTWViSXZAWa1VpOTdhSwZDZD
//OAuth Consumer Key:yco8lCdrEGyGPDRpRWXgPq0Rm2FVPPGfkn8r6WkfErzbg4LTB7

function getOffSet() {
    var _offset = 450;
    var windowHeight = window.innerHeight;
    //console.log(windowHeight);
    if(windowHeight > 500) {
        _offset = 400;
    }
    if(windowHeight > 680) {
        _offset = 300
    }
    if(windowHeight > 830) {
        _offset = 210;
    }

    return _offset;
}

//getOffSet();

function setParallaxPosition($doc, multiplier, $object){
    var offset = getOffSet();
    
    var from_top = $doc.scrollTop(), bg_css = 'center ' + (multiplier * from_top -offset) + 'px';
    //console.log(from_top);

    $object.css({"background-position" : bg_css});
}

//parallax function
// Adapted based on https://codepen.io/roborich/pen/wpAsm 

var background_image_parallax = function($object, multiplier, forceSet){
    multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;

    multiplier = 1 - multiplier;
    var $doc = $(document);
    //console.log($doc);

    if(forceSet) {
        setParallaxPosition($doc, multiplier, $object);
    }else {
        $(window).scroll(function(){
            setParallaxPosition($doc, multiplier, $object);
        });
    }
};

var background_image_parallax_2 = function($object, multiplier){
    multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
    multiplier = 1 - multiplier;
    var $doc = $(document);
    $object.css({"background-attachment" : "fixed"});

    $(window).scroll(function(){
        if($(window).width() > 768) {
            var firstTop = $object.offset().top,
                pos = $(window).scrollTop(),
                yPos = this.Math.round((multiplier * (firstTop -pos)) - 186);
            var bg_css = 'center ' + yPos + 'px';
            $object.css({"background-position" : bg_css});
        } else {
            $object.css({"background-position" : "center"});
        }
    });
};

const renderItem = (item, domEmement) => {
    const markup = `
        <a href="${item.media_url}">
        <figure class="instragram__container__item">
        <img src="${item.media_url}" class="instragram__container__img" alt="">
        <figcaption>
            <h2>
            <i>${item.caption ? item.caption : ""}
            </i>
            </h2>
        </figcaption>
        </figure>
    </a>
        `;
        //console.log(domEmement)
    domEmement.insertAdjacentHTML('beforeend', markup);
}



$(document).ready( function(){

    

    //Header section - background Parallax
    background_image_parallax($(".header__parallax"), 0.30, false);
    

    //Detect window scroll and update navbar
    $(window).scroll( function(e){
        if($(document).scrollTop() > 120 ){
            $('.header__navbar').addClass("scroll");
        }else {
            $('.header__navbar').removeClass("scroll");
        }
    });

    //close mobile menu after click
    $('#tmNav a').on('click', function(){
        $('.navbar-collapse').removeClass('show');
    })

    // Scroll to corresponding section with animation
    $('#tmNav').singlePageNav({
        'easing': 'easeInOutExpo',
        'speed': 600,
        'filter':'.link-inner'
    });

     // Add smooth scrolling to all links
    // https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
  
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, 'easeInOutExpo', function(){
                window.location.hash = hash;
            });
        } // End if
    });

    //POP UP effect
    $('.instragram-container').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.simple-ajax-popup-align-top').magnificPopup({
        type: 'ajax',
        alignTop: true,
        overflowY: 'scroll' // as we know that popup content is tall we set scroll overflow by default to avoid jump
      });

    //Instagram slick effection

   

   

    //console.log(fields);

    //const request = await fetch(`https://graph.facebook.com/v3.3/${userId}/media?fields=${fields}&access_token=${accessToken}`)

    /**Get instagram stories using instagram API */ 
    //https://graph.instagram.com/17841401812340214/media?fields=id,media_type&access_token=IGQVJVS1ZAhSGc1TkpsVWFvTTJ3UmZAUblNoSXIyb0NUdW9LOW5Fa1ZAESmFSX1hnQ0xNaTF6ZA3VvQmJfaVNZASFlWb2IwWGd2aF9MWmM1ZAzBhUk9DZAG9CNTlJMnk0N3pRUFF1RGhRZAWFn
    
    var token = 'IGQVJYUGo4TC1ua0hWLXFGTzRONDdTTldsVHJtWEFwQXl2THRKeEVfMlMxZA0NoQUN3dTU0ZA0xlRHdSajdWMUZAlNlZAmTTdZAX2RfS0E4dTJ1WnpWbmljc1YzV0J3OTZAhNThEZA3FmbTdn', 
    userid = '17841401812340214';

    //num_photos = 10; // how much photos you want to get
    var myPhotos = [];
    var myMedia = [];
    var domElement = document.querySelector('.instragram-container');
    const fields = [
        'caption',
        'children{media_type,media_url,thumbnail_url}',
        'id',
        'media_type',
        'media_url',
        'permalink',
        'thumbnail_url',
        'timestamp'
        ].join(',');
    
    $.ajax( {
        url: `https://graph.instagram.com/${userid}/media?fields=${fields}&access_token=${token}`,
        dataType: 'jsonp',
        type: 'GET',
        data: {},
        success: function(data){
            //console.log(data);
            $.each(data.data, function( key, value){
                if(value.media_type === "IMAGE")
                {     
                    myPhotos.push(value);
                    //console.log(value);
                    //renderItem(value, domElement);
                } else if(value.media_type === "CAROUSEL_ALBUM"){
                    //console.log(value.children.data);
                    $.each(value.children.data, function( subKey, subValue){
                        if(subValue.media_type === "IMAGE"){
                            //console.log(subValue);
                            if(!subValue.caption) subValue.caption = value.caption;
                            //console.log(subValue);
                            myPhotos.push(subValue);
                            //renderItem(subValue, domElement);
                        }
                    })
                }

            })
            //console.log(myPhotos);
             //render images into HTML
            
             myPhotos.forEach( item => {
                var domElement = document.querySelector('.instragram-container');
                //console.log(domElement)
                renderItem(item, domElement);
            })

             //get slick effect on photos
            $('.instragram-container').slick({
                dots: true,
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 2,
                responsive: [
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 2 
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                        }
                    }
                ]
            });

            
        },
        error: function(data){
            console.log(data);
        }
    })

  
 
 

});