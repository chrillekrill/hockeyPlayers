// 1. DOM - komma åt element ?
const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')

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

  

showSection('sectionList')

// 2. funktion showSection
// 3. events = händelsestyrd programmering
//      vid klick på länk -> showSection
// 4. arrayer med strängar
// 5. foreach!
// 6. classes - Product 
//      samt new:a in i array
// 7. 
