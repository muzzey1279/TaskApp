const input = document.getElementById("input");
const button = document.getElementById("button");

function inputValue(){
    li.innerHTML = input.value;
}

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        button.classList.add("active"); 
        addTask();
  }
});

input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {  
        button.classList.remove("active");
  }
});

const list = document.getElementById("list");

function addTask(){
    if(input.value === ''){
        button.classList.remove("active");
        alert("Add a task!")
        
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = input.value;
        list.appendChild(li);
        li.appendChild(createEditButton());
        li.appendChild(createDeleteButton());
    }
    input.value='';
    saveData();
}
list.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.tagName === "EDIT"){
        makeEdit(e.target.parentElement);
    }
}, false);



function makeEdit(li) {
    const inputEdit = document.createElement('textarea');
    inputEdit.value = li.firstChild.textContent.trim();
    li.innerHTML = '';
    li.appendChild(inputEdit);


    const saveButton = document.createElement("saveButton");
    saveButton.textContent = "Save";
    li.appendChild(saveButton);
    
   saveButton.addEventListener("click", function() {
        const updatedText = inputEdit.value.trim();
        li.innerHTML = updatedText !== '' ? updatedText: li.innerHTML;
        li.appendChild(createEditButton());
        li.appendChild(createDeleteButton());
    });
    
    inputEdit.addEventListener('keydown', function(event) {
        if (event.key === "Enter") { 
            const updatedText = inputEdit.value.trim();
            li.innerHTML = updatedText !== '' ? updatedText: li.innerHTML;
            li.appendChild(createEditButton());
            li.appendChild(createDeleteButton());
        } 
    });
  inputEdit.focus();


      saveData();
    }

  function createEditButton() {
    const editButton = document.createElement("edit");
    editButton.innerHTML = "\u270e";
    return editButton;
  }

  function createDeleteButton(){
    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = "\u00d7";
    return deleteButton;
  }

function saveData(){
    localStorage.setItem("data", list.innerHTML);
}

function showList(){
   list.innerHTML = localStorage.getItem("data");
}

showList();