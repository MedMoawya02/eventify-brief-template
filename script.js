//get data
let events ;
if(localStorage.getItem('events')){
    events=JSON.parse(localStorage.getItem('events'))
}else{
    events=[];
}
let archive = [];

let btns_sidebar = document.querySelectorAll('.sidebar__btn');
let screens = document.querySelectorAll('.screen');

//data of stats-card
let total_event = document.getElementById('stat-total-events');
let seats_event = document.getElementById('stat-total-seats');
let total_price_event = document.getElementById('stat-total-price');

//data(form)
let formulaire = document.getElementById('event-form')
let input_title = document.getElementById('event-title');
let input_image = document.getElementById('event-image');
let input_description = document.getElementById('event-description');
let input_number = document.getElementById('event-seats');
let input_price = document.getElementById('event-price');
let btn_reset = document.getElementById('btn_reset');
let image_event = document.getElementById('image_event');
let select = document.querySelector('#sort-events');

//data for variant section
let btn_add_variant = document.getElementById("btn-add-variant");
let variants_list = document.getElementById("variants-list");
let variant_name = document.querySelector('.variant-row__name');
let variant_qty = document.querySelector('.variant-row__qty');
let variant_number = document.querySelector('.variant-row__value');
let variant_type = document.querySelector('variant-row__type');

//data for table(page3)
let list_section = document.getElementById('event_list_section');
let table_body = document.querySelector('#events-table .table__body');
let search_bar = document.getElementById('search-events');
let rows = document.querySelectorAll('.table__row');

//data for table(page4)
let archive_section = document.querySelector('#archive-table .table__body')

//data for modal
let modal_section = document.getElementById('event-modal');
let modal_body = document.getElementById('modal-body');
let close_modal = document.querySelector('.modal__close');

// fonction pour l'affichage et la mise à jour 
function display() {
    // afficher le nombre des events
    total_event.innerHTML = events.length;
    console.log(events);

    //afficher la somme des places 
    /* const total_seats = events.reduce((total_event, ev) => {
        return total_event + ev.number
    }, 0) */
    let sum=0;
    for(let ev=0;ev<events.length;ev++){
        sum+=Number(events[ev].number);
    }
    
    console.log(sum);
    seats_event.innerHTML = sum;

    // total théorique 
    const total_price = events.reduce((total_price, ev) => { return total_price + ev.price }, 0)
    total_price_event.innerHTML = `${total_price} $`;

    //
    table_body.innerHTML = events.map((e, index) => `
        <tr class="table__row" data-index=${index}>
        <td>${index + 1}</td>
        <td class="table__title">${e.title}</td>
        <td>${e.number}</td>
        <td>${e.price} $</td>
        <td><ul>
            ${e.variants.map(v=>`<li>${v.name}</li><li>${v.qty}</li><li>${v.value}</li>`)}
        </ul></td>
        <td class="btns_form_actions">
        <button class="btn btn--small" data-action="details" data-event-id="${index}">Details</button>
        <button class="btn btn--small" data-action="edit" data-event-id="${index}">Edit</button>
        <button class="btn btn--danger btn--small" data-action="archive" data-event-id="${index}">Delete</button>
        </td>  
        </tr>`).join("");
};

//logic for changing the screen
btns_sidebar.forEach(btn =>
    btn.addEventListener('click', function () {
        btns_sidebar.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        if (btn == btns_sidebar[1]) {
            screens.forEach(screen => {
                screen.classList.remove('is-visible');
            })
            screens[1].classList.add("is-visible");
            display();
        }
        if (btn == btns_sidebar[2]) {
            screens.forEach(screen => {
                screen.classList.remove('is-visible');
            })
            screens[2].classList.add("is-visible");
            display();
        }
        if (btn == btns_sidebar[3]) {
            screens.forEach(screen => {
                screen.classList.remove('is-visible');
            })
            screens[3].classList.add("is-visible");
            display();
        }
        if (btn == btns_sidebar[0]) {
            screens.forEach(screen => {
                screen.classList.remove('is-visible');
            })
            screens[0].classList.add("is-visible");
            display();
        }
    })
)

//logic for form(add and clear (event section))
formulaire.addEventListener('submit', (e) => {
    e.preventDefault();

    //variant 
    let variants=[];
    const variant_rows=document.querySelectorAll('#variants-list .variant-row');
    variant_rows.forEach(row=>{
        let nouveau_variant={
            name:row.querySelector('.variant-row__name').value,
            qty:row.querySelector('.variant-row__qty').value,
            value:row.querySelector('.variant-row__value').value,
        };
        variants.push(nouveau_variant);
    })
    console.log(variants);
    
    let nouveauEvent = {
        title: input_title.value.toLowerCase(),
        image: input_image.value,
        description: input_description.value.toLowerCase(),
        number: parseInt(input_number.value),
        price: parseFloat(input_price.value),
        variants:variants,
    }


    events.push(nouveauEvent);
    localStorage.setItem('events',JSON.stringify(events))
    display();
})

//logic du btn supprimer et pousser dans tableau archive:
list_section.addEventListener('click', (e) => {
    console.log(e.target);
    
    //logique pour afficher le detail de chaque event
    if (e.target.dataset.action === "details") {
        const index = Number(e.target.dataset.eventId);
        const event_info = events[index];
        modal_section.classList.remove('is-hidden');
        modal_body.innerHTML = `
        <div class="container mt-4">
            <div class="card shadow-sm border-0 p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 fw-bold text-primary pt-3">🎟️ ${event_info.title}</h5>
                    <span class="badge bg-success mt-3 ">${event_info.price} $</span>
                </div>
                <p class="text-muted mb-0 mt-3">
                    <i class="bi bi-people"></i> Places disponibles : <strong>${event_info.number}</strong>
                </p>
            </div>
        </div>`;
        close_modal.addEventListener('click',()=>{
            modal_section.classList.add('is-hidden');
        })
    }
    //logique pour supprimer un event et pusser dans le tableau archive
    if (e.target.dataset.action === "archive") {
        const index = Number(e.target.dataset.eventId);
        if (index !== -1) {
            const [deletedEvent] = events.splice(index, 1);
            archive.push(deletedEvent);
            localStorage.events=JSON.stringify(events);
            display();
        }
    }

    //logique pour modifier un evenemnt 
    if (e.target.dataset.action === "edit") {
        modal_section.classList.remove('is-hidden');
        let index = Number(e.target.dataset.eventId);
        let ev = events[index];
        console.log(index);
        console.log(ev);
        modal_body.innerHTML = `
            <form id="edit_event_form">
            <div class="form__group">
                <label class="form__label" for="event-title">Event Title</label>
                <input type="text" id="event-new-title" class="input" value="${ev.title}">
            </div>
            <div class="form__group">
                <label class="form__label" for="event-title">Event Seats</label>
                <input type="text" id="event-new-seats" class="input" value="${ev.number}">
            </div>
            <div class="form__group">
                <label class="form__label" for="event-title">Event Price</label>
                <input type="text" id="event-new-price" class="input" value="${ev.price}">
            </div>
            <div class="form__group">
                <button type="submit" class="btn btn--primary" id="btn_modification">Modifier</button>
            </div>
            </form>
            `;
        document.getElementById('edit_event_form').addEventListener('submit', (e) => {
            e.preventDefault();
            ev.title = document.getElementById('event-new-title').value;
            ev.number = Number(document.getElementById('event-new-seats').value);
            ev.price = Number(document.getElementById('event-new-price').value);
            console.log("element modifiéee");
            modal_section.classList.add('is-hidden');
            localStorage.events=JSON.stringify(events);
            display();
        })

    };
})

console.log(events);
console.log(archive);

//pour vider le formulaire
btn_reset.addEventListener('click', function () {
    image_event.style.display = "none";
    formulaire.reset();
})

// logic pour afficher une image lorsque l'ajout d'un url
input_image.addEventListener('change', (e) => {
    input_value = e.currentTarget.value;
    if (!input_value == "") {
        image_event.style.display = "block";
        image_event.src = input_value;
    }
})

//variant logic
btn_add_variant.addEventListener('click', () => {
    variants_list.innerHTML += `<div class="variant-row">
                                        <input type="text" class="input variant-row__name" placeholder="Variant name (e.g., 'Early Bird')" />
                                        <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" />
                                        <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" />
                                        <select class="select variant-row__type">
                                            <option value="fixed">Fixed Price</option>
                                            <option value="percentage">Percentage Off</option>
                                        </select>
                                        <button type="button" class="btn btn--danger btn--small variant-row__remove">Remove</button>
                                    </div>`

    //logic pour supprimer un variant                               
    const variants_row = document.querySelectorAll("#variants-list .variant-row");
    variants_row.forEach(row => {
        const btn_variant_row_remove = row.querySelector('.variant-row .variant-row__remove');
        btn_variant_row_remove.addEventListener('click', function () {
            row.remove();
        })
    })
})

//Page 3
//logique pour le list des evenement(page3)
btns_sidebar[2].addEventListener('click', () => {
    display();
})

// logique pour faire un recherche 
search_bar.addEventListener('input', (e) => {
    //get data
    let rows = document.querySelectorAll('.table__body .table__row');
    let input = e.target.value.toLowerCase();

    rows.forEach(row => {
        const title_element = row.querySelector('.table__title');
        if (!title_element) { return; }
        const title_content = title_element.textContent.toLowerCase();

        if (title_content.includes(input)) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    })
})


//logique pour trier le tablaeu
select.addEventListener('change', (e) => {
    let option_selected = e.target.value;
    let options = document.querySelectorAll("#sort-events option");
    // trier par seats 
    /* events.sort((a,b)=>a.number - b.number);
    console.log(events); */

    //tri par seats sans utiliser sort();
    if (options[4].value == option_selected) {
        function triSeatBublleSort(evenement) {
            let n = evenement.length;
            let finished;
            do {
                finished = false;
                for (let i = 0; i < n - 1; i++) {
                    if (evenement[i].number > evenement[i + 1].number) {
                        let temp = evenement[i];
                        evenement[i] = evenement[i + 1];
                        evenement[i + 1] = temp;
                        finished = true
                    }
                }
            } while (finished);
            return evenement;
        }
        const eventsTries = triSeatBublleSort(events);
        console.log(eventsTries);
        display();
    }


    //tri par title aesc sans utiliser sort();
    if (options[0].value == option_selected) {
        function triTitleAescBublleSort(evenement) {
            let n = evenement.length;
            let finished;
            do {
                finished = false;
                for (let i = 0; i < n - 1; i++) {
                    if (evenement[i].title > evenement[i + 1].title) {
                        let temp = evenement[i];
                        evenement[i] = evenement[i + 1];
                        evenement[i + 1] = temp;

                        finished = true

                    }
                }
            } while (finished);
            return evenement;
        }
        const eventsTries = triTitleAescBublleSort(events);
        console.log(eventsTries);
        display();
    }


    //tri par title desc sans utiliser sort();
    if (options[1].value == option_selected) {
        function triTitleDescBublleSort(evenement) {
            let n = evenement.length;
            let finished;
            do {
                finished = false;
                for (let i = 0; i < n - 1; i++) {
                    if (evenement[i].title < evenement[i + 1].title) {
                        let temp = evenement[i];
                        evenement[i] = evenement[i + 1];
                        evenement[i + 1] = temp;
                        finished = true
                    }
                }
            } while (finished);
            return evenement;
        }
        const eventsTries = triTitleDescBublleSort(events);
        console.log(eventsTries);
        display();
    }


    //Tri price par ordre croissant
    if (options[2].value == option_selected) {
        function TriPriceAescBublleSort(evenement) {
            let n = evenement.length;
            let finished;
            do {
                finished = false;
                for (let i = 0; i < n - 1; i++) {
                    if (evenement[i].price > evenement[i + 1].price) {
                        let temp = evenement[i];
                        evenement[i] = evenement[i + 1];
                        evenement[i + 1] = temp;
                        finished = true;
                    }
                }
            } while (finished);
            return evenement;
        }
        TriPriceAescBublleSort(events);
        display();
    }

    //tri price par ordre dec
    if (options[3].value == option_selected) {
        function TriPriceDescBublleSort(evenement) {
            let n = evenement.length;
            let finished;
            do {
                finished = false;
                for (let i = 0; i < n - 1; i++) {
                    if (evenement[i].price < evenement[i + 1].price) {
                        let temp = evenement[i];
                        evenement[i] = evenement[i + 1];
                        evenement[i + 1] = temp;
                        finished = true;
                    }
                }
            } while (finished);
            return evenement;
        }
        TriPriceDescBublleSort(events);
        display();
    }
})

//logique pour afficher l'archive
btns_sidebar[3].addEventListener('click', () => {

    archive_section.innerHTML = archive.map((a, index) =>
        `
        <tr class="table__row" data-index=${index}>
        <td>${index + 1}</td>
        <td class="table__title">${a.title}</td>
        <td>${a.number}</td>
        <td>${a.price} $</td>
        <td class="btns_form_actions">
        <button class="btn btn--danger btn--small restore" data-action="archive" data-event-id="${index}">Restore</button>
        </td>  
        </tr>
    
        `
    )

    //logique pour restorer un evenement vers tableau events
    let btn_restore = document.querySelectorAll('.restore');
    btn_restore.forEach(btn => {
        let index = btn.dataset.eventId;
        btn.addEventListener('click', () => {
            let [restored] = archive.splice(index, 1);
            events.push(restored);
            btns_sidebar[2].click();
            localStorage.events=JSON.stringify(events);
            display();
        })
    })
   /*  display(); */
})

display();