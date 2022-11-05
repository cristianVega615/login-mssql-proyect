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
/*General click event */

let data = null;
document.addEventListener("click", (event) => {
  let name = document.querySelector(".nameContact");
  let phone = document.querySelector(".numberPhone");
  let divBtn = document.querySelector(".container-btn");

  //They are the button that it will be used
  if (event.target.matches(".btn-update *")) {
    name.setAttribute("contenteditable", true);
    phone.setAttribute("contenteditable", true);
    divBtn.innerHTML = `
    <button class="btn-success"><i class="fa-solid fa-check"></i></button>
    <button class="btn-failure"><i class="fa-sharp fa-solid fa-xmark"></i></button>`;

    data = {
      contentName: name.textContent,
      contentPhone: phone.textContent,
    };
  }

  if (event.target.matches(".btn-delete *")) {
    //We delete a node del document we are using event delegation.

    crudElection(event, name, phone);

    let buttonParent = event.target.parentNode.parentNode;
    let parentDiv = buttonParent.parentNode.getAttribute("class");
    let nodeChild = document.querySelector(`.${parentDiv}`);

    buttonParent.parentNode.parentNode.removeChild(nodeChild);
  }

  if (event.target.matches(".btn-success *")) {
    changeContentBtn(name, phone, divBtn);

    let dataSucess = {
      contentName: name.textContent,
      contentPhone: phone.textContent,
    };

    fetch(`http://localhost:4000/contact/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataSucess),
    });
  }
  if (event.target.matches(".btn-failure *")) {
    let dataName = data.contentName;
    let dataPhone = data.contentPhone;

    name.textContent = dataName;
    phone.textContent = dataPhone;

    changeContentBtn(name, phone, divBtn);
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
  } catch (error) {
    console.log(error);
  }

  getFetchContact();
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

  valueParse.map((element, key) => {
    const li = document.createElement("div");
    li.classList.add(`div-${key}`);

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

async function crudElection(event, name, phone) {
  try {
    let urlPart;
    name = name.textContent;
    phone = phone.textContent;

    console.log(name, phone);

    let data = {
      nameContact: name,
      phoneNumber: phone,
    };

    if (event.target.matches(".btn-update *")) {
      urlPart = "update";
    }
    if (event.target.matches(".btn-delete *")) {
      urlPart = "delete";
    }
    fetch(`http://localhost:4000/contact/${urlPart}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}

function changeContentBtn(name, phone, divBtn) {
  name.setAttribute("contenteditable", false);
  phone.setAttribute("contenteditable", false);

  divBtn.innerHTML = `
    <button class="btn-update"><i class="fa-solid fa-pen"></i></button>
    <button class="btn-delete"><i class="fa-solid fa-trash"></i></button> `;
}
