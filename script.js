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
let image_event=document.getElementById('image_event');
//data for variant section
let btn_add_variant=document.getElementById("btn-add-variant");
let variants_list=document.getElementById("variants-list");
/* let variants_row=document.querySelectorAll("#variants-list .variant-row"); */
/* let btn_variant_row_remove=document.querySelectorAll('#variants-list .variant-row .variant-row__remove'); */




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
        const total_seats=event.reduce((total_event,ev)=>{
            return total_event+ev.number
        } ,0)
        console.log(total_seats);
        seats_event.innerHTML=total_seats;
        // total théorique 
        const total_price=event.reduce((total_price,ev)=>{return total_price+ev.price},0)
        total_price_event.innerHTML=`${total_price} $`;
        
})
btn_reset.addEventListener('click',function(){
    image_event.style.display="none";
    formulaire.reset();
})
// logic pour afficher une image lorsque l'ajout d'un url
input_image.addEventListener('change',(e)=>{
    input_value=e.currentTarget.value;
    if(!input_value==""){
        image_event.style.display="block";
        image_event.src=input_value;
    }
})
    
//variant logic
btn_add_variant.addEventListener('click',()=>{
    variants_list.innerHTML+=`<div class="variant-row">
                                        <input type="text" class="input variant-row__name" placeholder="Variant name (e.g., 'Early Bird')" />
                                        <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" />
                                        <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" />
                                        <select class="select variant-row__type">
                                            <option value="fixed">Fixed Price</option>
                                            <option value="percentage">Percentage Off</option>
                                        </select>
                                        <button type="button" class="btn btn--danger btn--small variant-row__remove">Remove</button>
                                    </div>`
    
    //logic pour supprimer un rowo                                
    const variants_row=document.querySelectorAll("#variants-list .variant-row");  
    variants_row.forEach(row=>{
    const btn_variant_row_remove=row.querySelector('.variant-row .variant-row__remove');  
    btn_variant_row_remove.addEventListener('click',function(){
    row.remove();
    }) })
})
                                
                              
                                
                           
                               


