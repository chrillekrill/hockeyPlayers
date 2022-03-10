const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')
const productTableBody = document.getElementById('productTableBody')
const submitNewButton = document.getElementById('submitNewButton')
const submitEditButton = document.getElementById('submitEditButton')

const newName =  document.getElementById('newName')
const newAge =  document.getElementById('newAge')
const newJersey =  document.getElementById('newJersey')
const newBorn =  document.getElementById('newBorn')

const nameHeader =  document.getElementById('name')
const ageHeader =  document.getElementById('age')
const jerseyHeader =  document.getElementById('jersey')
const bornHeader =  document.getElementById('born')
// const trHeader =  document.querySelectorAll('#trHeader th')

const editName =  document.getElementById('editName')
const editAge =  document.getElementById('editAge')
const editJersey =  document.getElementById('editJersey')
const editBorn = document.getElementById('editBorn')

const listLink = document.getElementById('listLink')
const newLink = document.getElementById('newLink')

const search = document.getElementById('search')

const url = "https://hockeyplayers.systementor.se/christoffer.korell@student.kyh.se/player";

class HockeyPlayer {
    constructor(id,name,jersey,age,born) {
        this.id = id;
        this.name = name;
        this.jersey = jersey
        this.age = age;
        this.born = born;
    }
}

let hockeyplayers = [];

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
    else if(sectionsId == 'sectionEdit'){
        sectionList.style.display = "none";
        sectionNew.style.display = "non";
        sectionEdit.style.display = "block";
    }
}
//en eventlistener för alla headers
// document.querySelectorAll('#trHeader th')
// .forEach(e => e.addEventListener("click", () => {
//     hockeyplayers.sort((a,b) => (a[e.id] > b[e.id]) ? 1 : -1)

//     productTableBody.innerHTML = '';
//     hockeyplayers.forEach((item) => {
//         renderTr(item);
//     });
// }))

var elements = document.querySelectorAll("#trHeader th");

elements.forEach(item => {
    item.addEventListener("click", () => {
        sortElement(item);
    })
})
let temp = null;
let ascending = false;
function sortElement(element) {
    

    if(!ascending || temp != element.id){
        hockeyplayers.sort((a,b) => (a[element.id] > b[element.id]) ? 1 : -1)
        temp = element.id;
        ascending = true;
    } else {
        hockeyplayers.sort((a,b) => (a[element.id] < b[element.id]) ? 1 : -1)
        ascending = false;
    }
    productTableBody.innerHTML = '';
    hockeyplayers.forEach((item) => {
        renderTr(item);
    });
}

search.addEventListener("keyup", (e) => {
    const lowercasesearch = e.target.value.toLowerCase();

    const filteredList = hockeyplayers.filter((player) => {
        return player.name.toLowerCase().includes(lowercasesearch)
    })

    productTableBody.innerHTML = '';
    filteredList.forEach((item) => {
        renderTr(item);
    });
})

newLink.addEventListener("click",()=>{ 
        showSection('sectionNew');
  });

listLink.addEventListener("click",()=>{ 
    showSection('sectionList');    
});


submitNewButton.addEventListener("click",()=>{
    addPlayer();    
});

let editingHockeyplayer = null

function editProduct(id) {
    editingHockeyplayer = hockeyplayers.find((item) => item.id == id)

    editName.value = editingHockeyplayer.name;
    editJersey.value = editingHockeyplayer.jersey;
    editAge.value = editingHockeyplayer.age;
    editBorn.value = editingHockeyplayer.born;

    showSection('sectionEdit')
}

function deleteProduct(id) {
    
    let indexOfProduct = hockeyplayers.findIndex(x => x.id === id)

    hockeyplayers.splice(indexOfProduct, 1)

    productTableBody.innerHTML = '';
    hockeyplayers.forEach((item) => {
        renderTr(item)
    })
}

submitEditButton.addEventListener("click",() => {
    
    const editedPlayer = {
        id: editingHockeyplayer.id,
        namn: editName.value,
        jersey: editJersey.value,
        age: editAge.value,
        born: editBorn.value
    }

    const reqParams = {
        headers:{
            'Content-Type': 'application/json'
        },       
        method:"PUT",
        body:JSON.stringify(editedPlayer)
    };
    
    fetch(url + "/" + editingHockeyplayer.id, reqParams)
    .then(res => {
        refreshPlayers();
        showSection('sectionList');  
    })
})

function renderTr(product){
    let jsCallEdit = `editProduct(${product.id})`
    let jsCallDelete = `deleteProduct(${product.id})`

    let template = `<tr>
                        <td>${product.name}</td>
                        <td>${product.age}</td>
                        <td>${product.jersey}</td>
                        <td>${product.born}</td>
                        <td><a href="#" onclick="${jsCallEdit}">Edit</a> <a href="#" onclick="${jsCallDelete}">Delete</a></td>
                    </tr>`
    productTableBody.innerHTML += template;
} 

function addPlayer() {
    const newPlayer = {
        namn: newName.value,
        age: newAge.value,
        jersey: newJersey.value,
        born: newBorn.value
    };

    const reqParams = {
        headers:{
            'Content-Type': 'application/json'
        },       
        method:"POST",
        body:JSON.stringify(newPlayer)
    };
    fetch(url,reqParams)
        .then(res=>res.json())
        .then(data=>{
            const player = new HockeyPlayer(
                data.id,
                newName.value,
                newJersey.value, 
                newAge.value,
                newBorn.value
                )

            hockeyplayers.push(player); 
            renderTr(player);
            showSection('sectionList');    
        })
}

function refreshPlayers() {
    hockeyplayers = [];
    productTableBody.innerHTML = '';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(player => {
            p = new HockeyPlayer(
                player.id,
                player.namn,
                player.jersey, 
                player.age,
                player.born 
            )
            hockeyplayers.push(p)
        })
        hockeyplayers.forEach((item) => {
            renderTr(item)
        })
    })
}

refreshPlayers();

showSection('sectionList');

//pls fix stefan 
function testDelete() {

    fetch(url + "/" + 73,{method: 'DELETE'})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}
