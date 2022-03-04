// 1. DOM - komma åt element ?
const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')
const productTableBody = document.getElementById('productTableBody')
const submitNewButton = document.getElementById('submitNewButton')
const newName =  document.getElementById('newName')

const listLink = document.getElementById('listLink')
const newLink = document.getElementById('newLink')

function showSection(sectionsId){
    if(sectionsId == 'sectionList'){
        sectionList.style.display = "block";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionNew'){
        sectionList.style.display = "none";
        sectionNew.style.display = "block";
        sectionEdit.style.display = "none";
    }
}

newLink.addEventListener("click",()=>{ 
        showSection('sectionNew');    
  });

  listLink.addEventListener("click",()=>{ 
    showSection('sectionList');    
});


submitNewButton.addEventListener("click",()=>{ 
    items.push(newName.value);
    renderTr(newName.value);
    showSection('sectionList');    
});


function renderTr(item){
    let template = `<tr><td>${item}</td></tr>`
    productTableBody.innerHTML = productTableBody.innerHTML + template;
} 
// 
items = ["Stefan", "Kalle", "Lisa" ] ;
items.forEach( (item) => {
    renderTr(item);
}  );


//Loopa den
// för varje skapa tr, för varje skapa td:s 
//lägga in den nya tr:n som ett barn till  productTableBody

  

showSection('sectionList');

// 2. funktion showSection
// 3. events = händelsestyrd programmering
//      vid klick på länk -> showSection
// 4. arrayer med strängar
// 5. foreach!
// 6. classes - Product 
//      samt new:a in i array
// 7. 
