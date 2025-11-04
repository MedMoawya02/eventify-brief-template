//get data
let event=[];
let archive=[];
let btns_sidebar=document.querySelectorAll('.sidebar__btn');
let screens=document.querySelectorAll('.screen');

//data of stats-card
let total_event=document.getElementById('stat-total-events');
let seats_event=document.getElementById('stat-total-seats');
let total_price_event=document.getElementById('stat-total-price');

//data(form)
let formulaire=document.getElementById('event-form')
let input_title=document.getElementById('event-title');
let input_image=document.getElementById('event-image');
let input_description=document.getElementById('event-description');
let input_number=document.getElementById('event-seats');
let input_price=document.getElementById('event-price');
let btn_reset=document.getElementById('btn_reset');
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

//logic for form(add and clear (event section))
formulaire.addEventListener('submit',(e)=>{
    e.preventDefault();
    let nouveauEvent={
        title:input_title.value.toLowerCase(),
        image:input_image.value,
        description:input_description.value.toLowerCase(),
        number:parseInt(input_number.value),
        price:parseFloat(input_price.value)
    }
    event.push(nouveauEvent);
    //logic for:
        //Afficher les chiffres calculés depuis le tableau JS :
        //total d’événements
        //total de places
        //total théorique (somme des prix)
        total_event.innerHTML=event.length;
        console.log(event);
        console.log(nouveauEvent);
        //total seats
        const total_seats=event.reduce((total_event,nbr)=>{
            return total_event+nbr.number
        } ,0)
        console.log(total_seats);
        seats_event.innerHTML=total_seats;
        
          
})
btn_reset.addEventListener('click',function(){
    formulaire.reset();
})

    
