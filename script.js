//get data
let event=[];
let archive=[];
let btns_sidebar=document.querySelectorAll('.sidebar__btn');
let screens=document.querySelectorAll('.screen');


//logic for changing the screen
btns_sidebar.forEach(btn=>
    btn.addEventListener('click',function(){   
        btns_sidebar.forEach(b=>b.classList.remove('is-active'));
        btn.classList.add('is-active');
        if(btn==btns_sidebar[1]){
            screens[0].classList.remove("is-visible");
            screens[1].classList.add("is-visible");
        }
        if(btn==btns_sidebar[2]){
            screens[0].classList.remove("is-visible");
            screens[1].classList.remove("is-visible");
            screens[2].classList.add("is-visible");
        }
        if(btn==btns_sidebar[3]){
            screens[0].classList.remove("is-visible");
            screens[1].classList.remove("is-visible");
            screens[2].classList.remove("is-visible");
            screens[3].classList.add("is-visible");
        }
         if(btn==btns_sidebar[0]){
            screens[0].classList.add("is-visible");
            screens[1].classList.remove("is-visible");
            screens[2].classList.remove("is-visible");
            screens[3].classList.remove("is-visible");
        }
        
    })

    
)


