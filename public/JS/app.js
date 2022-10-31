let submit = document.querySelector(".send");
let allInput = document?.querySelectorAll(".input-text");
let infoContact = document.querySelector(".info-contact");
let clock = document.querySelector(".clock");

window.addEventListener("DOMContentLoaded", (event) => {
  if (infoContact) {
    getFetchContact();
  }

  if (clock) {
    timeReal();
  }
});
document.addEventListener("click", event => {

  if(event.target.matches(".btn-update *")){

    crudElection(event)
  }

  if(event.target.matches(".btn-delete *")){
    //We delete a node del document we are using event delegation.


    crudElection(event)

    let buttonParent = event.target.parentNode;
    let parentDiv = (buttonParent.parentNode).getAttribute("class");
    let nodeChild = document.querySelector(`.${parentDiv}`)

    buttonParent.parentNode.parentNode.removeChild(nodeChild)

    

  }
}) 

/*POST Block contact*/
submit?.addEventListener("click", async (event) => {
  event.preventDefault();

  let arrayInputText = Array.from(allInput).map((result) => result.value);

  let [nameContact, phoneNumber] = arrayInputText;

  allInput.forEach((result) => {
    result.value = "";
  });

  try {
    fetch("http://localhost:4000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameContact: nameContact,
        phoneNumber: phoneNumber,
      }),
    });
  
    //Each time that you send one contact, this will be redner whitin the node info-contact.
    getFetchContact();
    
  } catch (error) {
    console.log(error) 
  }

});

function getFetchContact() {
  fetch("http://localhost:4000/contact/userContact")
    .then((response) => {
      if (!response.ok === 200) {
        throw new Error("Error of status");
      }

      return response.json();
    })
    .then((parse) => printDivContact(parse))
    .catch((err) => console.log(err));
}

function printDivContact(valueParse) {
  if (infoContact.hasChildNodes()) {
    infoContact.innerHTML = "";
  }

  $fragment = document.createDocumentFragment();

  valueParse.map((element, key) => {
    const li = document.createElement("div");
    li.classList.add(`div-${key}`);

    li.innerHTML = `<p class="nameContact">${element.nameContact}</p> 
    <p class="numberPhone">${element.phoneNumber}</p>
    <button class="btn-update"><i class="fa-solid fa-pen"></i></button>
    <button class="btn-delete"><i class="fa-solid fa-trash"></i></button> 
    `;

    $fragment.appendChild(li);
  });

  infoContact.appendChild($fragment);
}

/* functionality of the clock, it will show the real time*/

function timeReal() {
  let date = new Date();
    let hours = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`
    let minutes = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`

  clock.innerHTML = `${hours}:${minutes}`;

  setInterval(() => {
    let date = new Date();
    let hours = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`
    let minutes = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`

    clock.innerHTML = `${hours}:${minutes}`;
  }, 1000);
}



/*Validation of the input text, only numbers*/

function validNumberInput(event){
  if ((event.keyCode < 47 || event.keyCode > 57) && event.keyCode != 13){
    event.returnValue = false;
  }


}


async function crudElection (event){
  
  try {
    let name = document.querySelector(".nameContact").textContent;
    let phone = document.querySelector(".numberPhone").textContent;
    let urlPart;
  
    if(event.target.matches(".btn-update *")){
      urlPart = "update"
    }
    if(event.target.matches(".btn-delete *")){
      urlPart = "delete";
    }
    fetch(`http://localhost:4000/contact/${urlPart}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameContact: name,
        phoneNumber: phone,
      }),
    });
    
  } catch (error) {
    console.log(error)
  }


}