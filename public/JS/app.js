let submit = document.querySelector(".block-send");
let allInput = document?.querySelectorAll(".input-text")
let infoContact = document.querySelector(".info-contact")



window.addEventListener("DOMContentLoaded", (event) => {
    if(infoContact){
        getFetchContact()
    }
}) 

/*POST Block contact*/
submit?.addEventListener("submit", (event)  => {
    event.preventDefault()

    let arrayInputText = Array.from(allInput).map( 
        result => result.value
    )

    let [nameContact, phoneNumber] = arrayInputText

    allInput.forEach(result => {
        result.value = ""
    })
        
    fetch("http://localhost:4000/contact", 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify( {
            nameContact: nameContact,
            phoneNumber: phoneNumber
        })


    })

    //Each time that you send one contact, this will be redner whitin the node info-contact.
    getFetchContact()
})




function getFetchContact(){
    fetch("http://localhost:4000/contact/userContact")
    .then(response =>{
        if(!response.ok === 200){
           throw new Error("Error of status") 
        }
        
        return response.json()
    } )
    .then(parse => printDivContact(parse))
    .catch(err => console.log(err))
    
}


function printDivContact(valueParse){

    
    if(infoContact.hasChildNodes()){
        infoContact.innerHTML = "";
    }
    

    $fragment = document.createDocumentFragment();
    
    valueParse.map(element => {
        
        const li = document.createElement("p");

        li.textContent = `${element.nameContact}, ${element.phoneNumber} `;
        $fragment.appendChild(li);
    })


    infoContact.appendChild($fragment)
}