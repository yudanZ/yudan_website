const { post } = require('jquery');
const { flatMap } = require('lodash');






// Authenticate via OAuth
function authenticateTumblr(){
    var tumblr = require('tumblr.js');

    var client = tumblr.createClient({
        consumer_key: 'yco8lCdrEGyGPDRpRWXgPq0Rm2FVPPGfkn8r6WkfErzbg4LTB7',
        consumer_secret: 'XSgCkWwpdXj7xWIdx3Cw6UyD0EuSfsn5BVQkgXWTJS5sfFiOO3',
        token: 'ghBvpqHd7ObEcukKhO3VEZ1xCnytX5mBCt8lUKOtMlhzw93CxZ',
        token_secret: 'j5VnhXIOgeDXq0VvQ6k0F8CIuK9Ky4EcSZsus8GJmGsteqaFzW'
    });
    return client;
}

const renderBlogContent = (item, element) => {
    var domElement = document.getElementById(element);
    const markup = `
    <div class="blog__header">
        <div class="blog__title">
            <h1><strong>${item.title}</strong></h1>
        </div>
        
    </div>
    
    <div class="blog__content">
        ${item.body}
    </div>
        `;
    //console.log(domElement);
    domElement.insertAdjacentHTML('beforeend', markup);
}

const renderSideBar = (item, element) => {
    var domElement = document.getElementById(element);
    const markup = `
        <li>
            <a class="posts_links" href="#${item.id}">${item.title}</a>
        </li>
    `;
    domElement.insertAdjacentHTML('beforeend', markup);
}

const clearContent = ( element ) => {
    var domElement = document.getElementById(element);
    domElement.innerHTML = '';
}

const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
};

const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}

const loadBlogContent =(event)=> {
    //Get ID from url
    //console.log(event.target.hash)
   const id = event.target.hash.replace('#', '');
   //console.log(id);
   if(id){
       clearContent('new-post');
       renderLoader(document.getElementById('new-post'));
       var post = getPostContentById(id, event.data.allPosts);
       //console.log(post)
       if(post){
            //console.log(post[0]);
            clearLoader();
            renderBlogContent(post[0],"new-post");
            highlightSelected(id);
       }
        
   }
}

const getPostContentById = (id, allPosts) => {
    //console.log(allPosts)
    //console.log(typeof id);
    var post = [];
    allPosts.forEach( element => {
        if(element.id === parseInt(id))
            //console.log(post)
            post.push(element);
    })

    return post;
}

const highlightSelected = id => {
    if(id){
        const resultsArr = Array.from(document.querySelectorAll('.posts_links'));
        resultsArr.forEach(el => {
            el.classList.remove('posts_links--active');
        });
        document.querySelector(`.posts_links[href="#${id}"]`).classList.add('posts_links--active');

    }
   
};


$(document).ready(function () {
   

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    //Detect window scroll and update navbar
    $(window).scroll( function(e){
        if($(document).scrollTop() > 120 ){
            $('.header__navbar').addClass("scroll");
        }else {
            $('.header__navbar').removeClass("scroll");
        }
    });

    var client = authenticateTumblr();
    //get user info
    client.userInfo(function (err, data) {
        //console.log(data.user.blogs[0])

        var blogName =  data.user.blogs[0].name;

        client.blogPosts(blogName,function(err, resp){
            if(resp){
                //console.log(resp.posts);
                var allPosts = resp.posts;
                var textPosts = [];
                allPosts.forEach(post => {
                    //console.log(post.type);
                    if(post.type === "text"){
                        textPosts.push(post);
                    }
                });
                //console.log(textPosts[0]);

                //render blog content
                let id = window.location.hash.replace('#', '');
                if(id){
                    var potsById = getPostContentById(id, textPosts);
                    renderBlogContent(potsById[0],"new-post");
                }else {
                    id = textPosts[0].id;
                    renderBlogContent(textPosts[0],"new-post");
                }
                
                //render sidebar
                textPosts.forEach(item => {
                    if(item.title)
                        renderSideBar(item, "sidebarList");
                })

                highlightSelected(id);

                //click sidebar title, then change blog content
               //window.addEventListener('hashchange',loadBlogContent(textPosts))
               
               //$('.blog').on("click", {allPosts: textPosts},loadBlogContent)
               $('#sidebarList').on('click',"a", {allPosts: textPosts},loadBlogContent);
               
            }else{
                console.log(err)
            }

        })

        
            
        
    });

    
   
   

    

});