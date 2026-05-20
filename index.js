let frm = document.getElementById("frm");
let tbody = document.getElementById("tbody");

let users = [];
let editIndex = -1;

/* Load Data from LocalStorage */
window.onload = () => {
    let oldData = localStorage.getItem("crudUsers");

    if(oldData){
        users = JSON.parse(oldData);
        displayData();
    }
};

/* Form Submit */
frm.addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("i1").value.trim();
    let age = document.getElementById("i2").value.trim();

    /* Validation */
    if(name === "" || age === ""){
        alert("Please fill all fields");
        return;
    }

    if(isNaN(age)){
        alert("Age must be a number");
        return;
    }

    let userObj = {
        name,
        age
    };

    /* Update */
    if(editIndex !== -1){
        users[editIndex] = userObj;
        editIndex = -1;

        document.getElementById("btn").innerText = "Save";
    }
    else{
        /* Create */
        users.push(userObj);
    }

    saveData();
    displayData();

    frm.reset();
});

/* Display Data */
function displayData(){

    tbody.innerHTML = "";

    users.forEach((user, index) => {

        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>

                <td>
                    <button onclick="editData(${index})" class="editBtn">
                        Edit
                    </button>

                    <button onclick="deleteData(${index})" class="deleteBtn">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

/* Save to LocalStorage */
function saveData(){
    localStorage.setItem("crudUsers", JSON.stringify(users));
}

/* Delete */
function deleteData(index){

    let confirmDelete = confirm("Delete this data?");

    if(confirmDelete){
        users.splice(index, 1);

        saveData();
        displayData();
    }
}

/* Edit */
function editData(index){

    let user = users[index];

    document.getElementById("i1").value = user.name;
    document.getElementById("i2").value = user.age;

    editIndex = index;

    document.getElementById("btn").innerText = "Update";
}