let submit = document.querySelector(".send");
let allInput = document?.querySelectorAll(".input-text");
let infoContact = document.querySelector(".info-contact");
let clock = document.querySelector(".clock");

window.addEventListener("DOMContentLoaded",  async(event) => {
  if (infoContact) {
    
    let getValues = await fetch("http://localhost:4000/contact/userContact");
    let valueArray = await getValues.json();
    getFetchContact(valueArray);
  }

  if (clock) {
    timeReal();
  }
});
/*General click event */

let data = null;
document.addEventListener("click", (event) => {
 

  if(event.target.matches(".user-id")){
    let inner = document.querySelector(".nav_inner");

    inner.classList.toggle("nav_inner-show")
  }

  //They are the button that it will be used
  if (event.target.matches(".btn-update *")) {

    let dataNode = sliceAttribute(event.target);

    data = {
      contentName: dataNode[0].textContent,
      contentPhone:dataNode[1].textContent,
    };
    dataNode[0].classList.add("border-edit")
    dataNode[1].classList.add("border-edit")

  }

  if (event.target.matches(".btn-delete *")) {
    //We delete a node del document we are using event delegation.
    
    let valueDivConten = valueDivContent(event.target);
    let name = valueDivConten[0];    
    let phone = valueDivConten[1];
    let divBtn = valueDivConten[2];
    let indexDiv = returnIndexDiv(name.parentNode)
    
    
    let dataSucess = {
      contentName: name.textContent,
      indexDiv: indexDiv,
      contentPhone: phone.textContent,
    };

    fetch(`http://localhost:4000/contact/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataSucess),
    });


    let buttonParent = event.target.parentNode.parentNode;
    let parentDiv = buttonParent.parentNode.getAttribute("class");
    let nodeChild = document.querySelector(`.${parentDiv}`);
    
    buttonParent.parentNode.parentNode.removeChild(nodeChild);
  }
  
  if (event.target.matches(".btn-success *")) {
    let node = event.target
    
    let valueDivConten = valueDivContent(node);
    let name = valueDivConten[0];    
    let phone = valueDivConten[1];
    let divBtn = valueDivConten[2];
    let indexDiv = returnIndexDiv(name.parentNode)

    changeContentBtn(name, phone, divBtn);

    let dataSucess = {
      contentName: name.textContent,
      indexDiv: indexDiv,
      contentPhone: phone.textContent,
    };

    fetch(`http://localhost:4000/contact/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataSucess),
    });
  
    name.classList.remove("border-edit")
    phone.classList.remove("border-edit");

  }

  if (event.target.matches(".btn-failure *")) {
    let dataName = data.contentName;
    let dataPhone = data.contentPhone;

    let valueDivConten = valueDivContent(event.target);
    let name = valueDivConten[0];    
    let phone = valueDivConten[1];
    let divBtn = valueDivConten[2];

    name.textContent = dataName;
    phone.textContent = dataPhone;

    changeContentBtn(name, phone, divBtn);


    name.classList.remove("border-edit");
    phone.classList.remove("border-edit");
  }
});

/*POST Block contact*/
submit?.addEventListener("click", async (event) => {
  event.preventDefault();
  
  let arrayInputText = Array.from(allInput).map((result) => result.value);
  
  let [nameContact, phoneNumber] = arrayInputText;
  
  allInput.forEach((result) => {
    result.value = "";
  });
  
  try {
    let getValues = await fetch("http://localhost:4000/contact/userContact");
    let valueArray = await getValues.json();
    fetch("http://localhost:4000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameContact: nameContact,
        indexDiv: `contact-${crypto.randomUUID()}`,
        phoneNumber: phoneNumber,
      }),
    });
    
    //Each time that you send one contact, this will be redner whitin the node info-contact.
  } catch (error) {
    console.log(error);
  }
  getFetchContact()
});

async function getFetchContact() {
  let getValues = await fetch("http://localhost:4000/contact/userContact");
    let valueArray = await getValues.json();
   printDivContact(valueArray);

}

function printDivContact(valueParse) {
  if (infoContact.hasChildNodes()) {
    infoContact.innerHTML = "";
  }

  valueParse.map((element) => {
    const li = document.createElement("div");
    li.classList.add(`div-${element.div_content}`);

    li.innerHTML = `<div class="nameContact">${element.nameContact}</div> 
    <div class="numberPhone">${element.phoneNumber}</div>
    <div class="container-btn">
    <button class="btn-update"><i class="fa-solid fa-pen"></i></button>
    <button class="btn-delete"><i class="fa-solid fa-trash"></i></button> 
    </div>
    `;

    infoContact.appendChild(li);
  });
}

/* functionality of the clock, it will show the real time*/

function timeReal() {
  let date = new Date();
  let hours =
    date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
  let minutes =
    date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;

  clock.innerHTML = `${hours}:${minutes}`;

  setInterval(() => {
    let date = new Date();
    let hours =
      date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
    let minutes =
      date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;

    clock.innerHTML = `${hours}:${minutes}`;
  }, 1000);
}

/*Validation of the input text, only numbers*/

function validNumberInput(event) {
  if ((event.keyCode < 47 || event.keyCode > 57) && event.keyCode != 13) {
    event.returnValue = false;
  }
}


function changeContentBtn(name, phone, divBtn) {
  name.setAttribute("contenteditable", false);
  phone.setAttribute("contenteditable", false);

  divBtn.innerHTML = `
    <button class="btn-update"><i class="fa-solid fa-pen"></i></button>
    <button class="btn-delete"><i class="fa-solid fa-trash"></i></button> `;
}
function sliceAttribute(node){
  let parentDiv = node.parentNode.parentNode.parentNode.children;
  let sliceParentDivEdit = Array.from(parentDiv).slice(0,2)
  let containerBtn = Array.from(parentDiv).slice(2,3)[0]
  sliceParentDivEdit.forEach(element => {
    element.setAttribute("contenteditable", true);
  })

  containerBtn.innerHTML = `
     <button class="btn-success"><i class="fa-solid fa-check"></i></button>
     <button class="btn-failure"><i class="fa-sharp fa-solid fa-xmark"></i></button>
  ` 

  return sliceParentDivEdit;
}

function valueDivContent(node){

  let parentDiv = node.parentNode.parentNode.parentNode.children;
  let sliceParentDivEdit = Array.from(parentDiv)

  return sliceParentDivEdit;
}

function returnIndexDiv(node){
  let attribute = node.getAttribute("class");
  return attribute.slice(4, attribute.length);
}