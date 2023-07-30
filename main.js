let input = document.querySelector('.input');
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let arrayOfTasks = [];
var counter = 0;
if (window.localStorage.getItem("tasks")) {
   arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}


getTasksFromLocalStorage();

submit.addEventListener("click", function (e) {
    if (input.value !== "") {
        addTaskToArray(input.value);

        input.value = "";
    } 
    
    

});

// submit.addEventListener("keyPress", function (e) {
//     if (input.value !== null) {
//         addTaskToArray(input.value);

//         input.value = "";
//     }
// });

tasksDiv.addEventListener("click", function (e) {
  if (e.target.classList == "delete") {
      e.target.parentElement.parentElement.remove();
      deleteFromLocalStorgeWith(e.target.parentElement.parentElement.getAttribute("data-id"));
  }
});

tasksDiv.addEventListener("click", function (e) {
    if (e.target.parentElement.parentElement.classList.contains("task")) {
        togleStateTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));
        e.target.parentElement.parentElement.classList.toggle("done");
    }


});

function addTaskToArray(taskText) {
   const task = {
        id: counter++,
       title: taskText,
       complated:false,
     }
   
    // push Tasks To Array Of Tasks
    arrayOfTasks.push(task);
   
    // Add Tasks As Elemnets To Page
    addElementsToPageForm(arrayOfTasks);

    //add Tasks To Local Storge
    addTasksToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageForm(arrayOfTasks) {
    tasksDiv.innerText = "";

    arrayOfTasks.forEach((task) => {

       

        let btnContainer = document.createElement("div");
        btnContainer.classList.add("btnContainer");
        btnContainer.style.display = "flex";
        btnContainer.style.justifyContent = "space-between";

      

        let div = document.createElement("div");
        div.classList.add("task");
        div.setAttribute("data-id", task.id);
        if (isArabic(task.title)) {
            // div.innerHTML = document.createTextNode(`<div dir="rtl">${task.title}</div>`).textContent;
         }
        div.innerHTML = document.createTextNode(`<div>${task.title}</div>`).textContent;

        
        if (task.complated) {
          div.className = "task done";
        }
        
        var deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete");

        var doneBtn = document.createElement("button");
        doneBtn.innerText = "Done";
        doneBtn.classList.add("doneBtn");

        btnContainer.appendChild(doneBtn);
        btnContainer.appendChild(deleteBtn);
        div.appendChild(btnContainer);
        tasksDiv.appendChild(div);
    });

}

function addTasksToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getTasksFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        var tasks = JSON.parse(data);
         addElementsToPageForm(tasks);
    }
   
}

function deleteFromLocalStorgeWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addTasksToLocalStorageFrom(arrayOfTasks);
}


function togleStateTaskWith(taskId) {
 
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].complated == false ? (arrayOfTasks[i].complated = true) : (arrayOfTasks[i].complated = false);
        }
    }
    
         
    addTasksToLocalStorageFrom(arrayOfTasks);
}

function isArabic(text) {
  var arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
  return arabicPattern.test(text);
}