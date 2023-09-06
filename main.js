

//Assigning elements to variables
const form = document.querySelector(`#my-form`);
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPhone = document.getElementById("phone");
const userDate = document.getElementById("date");
const tableBody = document.getElementById(`tablebody`);


// ON SUBMIT FUNCTION 
async function onSubmit(e){
    e.preventDefault();
//creating person object
    const person = {
        userName: userName.value,
        userEmail : userEmail.value ,
        userPhone : userPhone.value,
        userDate : userDate.value

    }
    console.log(JSON.stringify(person));

//add to server 
await axios.post(`https://crudcrud.com/api/207d3e85f71f4cae87e97b510471b967/userdata`, { person })
  .then((res) => {
    console.log(`${res.data.person.userName} added`);
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
  //print on browser by get 
  axios.get(`https://crudcrud.com/api/207d3e85f71f4cae87e97b510471b967/userdata`)
  .then((res) => { 
    console.log(`date feched for printing`);
    showOutput(res);
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
    
}

// ON EDITORDELETE FUNCTION 
function onEditorDelete(e){
    e.preventDefault();
    // get data from server
    const btnId = e.target.id;
  //WHEN CLICK EDIT BUTTON
if (e.target && e.target.classList.contains("editbtn")){
    console.log(e.target);
//get from server 
axios
.get(`https://crudcrud.com/api/207d3e85f71f4cae87e97b510471b967/userdata/${btnId}`)
.then(res=>{
    editing(res);
    console.log(res);
    console.log(`${res.data.person.userName} ready for editing`);
})
.catch(err=>console.error(err));

//delete from server 
axios
.delete(`https://crudcrud.com/api/207d3e85f71f4cae87e97b510471b967/userdata/${btnId}`)
.then(res=>console.log(`This id : ${btnId}  data deleted`))
.catch(err=> console.error(err));

//delete from browser
e.target.parentElement.parentElement.remove();
//replace values for editing 
function editing(res){
    const editperson = res.data.person;
    userName.value= editperson.userName;
    userEmail.value = editperson.userEmail;
    userPhone.value = editperson.userPhone;
    userDate.value = editperson.userDate;
}
}
// WHEN CLICK DELETE BUTTON 
if (e.target && e.target.classList.contains("delbtn")){
//remove from server 
axios
.delete(`https://crudcrud.com/api/207d3e85f71f4cae87e97b510471b967/userdata/${btnId}`)
.then(res=>console.log(`This id : ${btnId} data deleted`))
.catch(err=> console.error(err));
//remove from browser
e.target.parentElement.parentElement.remove();

}
}


// Event listeners

document.querySelector('input[type="submit"]').addEventListener('click',onSubmit);
tableBody.addEventListener('click',onEditorDelete);

function showOutput(res){
    console.log(res.data);
    tableBody.innerHTML=tableBody.children[0].outerHTML;
    res.data.forEach((ele,index) => {
        const tr = document.createElement(`tr`);
        tr.className = 'nowrap';
        const val = ele.person;
        const userId = ele._id;
        const txt = `
        <td>${index+1}</td>
        <td>${val.userName}</td>
        <td>${val.userEmail}</td>
        <td>${val.userPhone}</td>
        <td>${val.userDate}</td>
        <td>
            <button class="btn btn-success editbtn" id = ${userId}>
                edit
            </button>
        </td>
        <td>
            <button class="btn btn-danger delbtn" id = ${userId}>
                delete
            </button>
        </td>
        `;
        //appending details to table
        tr.innerHTML+=txt;
        tableBody.appendChild(tr);   
    });
        // reinitiate to blank
        userName.value = '';
        userEmail.value = '';
        userPhone.value = '';
        userDate.value = '';
}

axios
.get(`https://crudcrud.com/api/207d3e85f71f4cae87e97b510471b967/userdata`)
.then((res) => { 
  console.log(`!1 st time printing`);
  showOutput(res);
  console.log(res);
})
.catch((err) => {
  console.error(err);
});