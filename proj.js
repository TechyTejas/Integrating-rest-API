//const listItem = document.getElementById("items")

async function submitHandler(event) {
    try {
        event.preventDefault();
        const price = document.getElementById('price').value;
        const item = document.getElementById('item').value;
        const category = document.getElementById('types').value;

        const obj = { price, item, category }

        await axios.post("https://crudcrud.com/api/0fd30fc4985648fcb4a8758ce82e5a6b/Itemlist", obj);
        displayItemOnScreen();
        event.target.reset();
    }
    catch (err) {
        console.log(err);
    }
}

async function displayItemOnScreen() {
    const listItem=document.getElementById('items');
    listItem.innerHTML="";
    const response = await axios.get("https://crudcrud.com/api/0fd30fc4985648fcb4a8758ce82e5a6b/Itemlist")
    let appoinments = response.data
    for (let i = 0; i < appoinments.length; i++) {
        const appointment = appoinments[i];

        const newItem = document.createElement('li');

        //create delbtn
        const deletebtn = document.createElement('input')
        deletebtn.type = 'button';
        deletebtn.value = 'Delete';
        deletebtn.onclick = async () => {
            await axios.delete(`https://crudcrud.com/api/0fd30fc4985648fcb4a8758ce82e5a6b/Itemlist/${appointment._id}`)
            listItem.removeChild(newItem);
        }


        newItem.textContent = appointment.price + '-' + appointment.item + '-' + appointment.category;
        
        console.log(appointment)
        newItem.appendChild(deletebtn);
        listItem.appendChild(newItem);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayItemOnScreen()
})