
async function submitHandler(event) {
    try {
        event.preventDefault();
        const price = document.getElementById('price').value;
        const item = document.getElementById('item').value;
        const category = document.getElementById('typess').value;

        const obj = { price, item, category }

        await axios.post("https://crudcrud.com/api/543751b925074bf1863cf1c521a04cd2/Itemlist", obj);
        displayItemOnScreen();
        event.target.reset();
    }
    catch (err) {
        console.log(err);
    }
}

async function displayItemOnScreen() {
    //selector tags
    const a=document.getElementById("elect");
    const b=document.getElementById("skinc");
    const c=document.getElementById("foody");


    //ul tags 
    const Ele=document.getElementById('ele');
    const Skin=document.getElementById('skin');
    const Food=document.getElementById('food');
    
    //ul tags
    Ele.innerHTML="";
    Skin.innerHTML="";
    Food.innerHTML="";

    const response = await axios.get("https://crudcrud.com/api/543751b925074bf1863cf1c521a04cd2/Itemlist")
    let lists = response.data
    for (let i = 0; i < lists.length; i++) {
        const order = lists[i];

        const newItem = document.createElement('li');

        //create delbtn
        const deletebtn = document.createElement('input')
        deletebtn.type = 'button';
        deletebtn.value = 'Delete';
        deletebtn.onclick = async () => {
            await axios.delete(`https://crudcrud.com/api/543751b925074bf1863cf1c521a04cd2/Itemlist/${appointment._id}`)

           
            if(order.category==a.value){
                Ele.removeChild(newItem)
            }
            else if(order.typess==b.value){
                Skin.removeChild(newItem)
            }
            else{
                Food.removeChild(newItem);
            }
        }

    if(order.category==a.value){
        Ele.appendChild(newItem)
    }
    else if(order.category==b.value){
        Skin.appendChild(newItem)
    }
    else{
        Food.appendChild(newItem);
    }
    
    newItem.textContent = order.price + '-' + order.item + '-' + order.category;
        
    newItem.appendChild(deletebtn);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayItemOnScreen()
})