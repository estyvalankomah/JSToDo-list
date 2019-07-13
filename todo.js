let inputValue = document.getElementById('input').value; 

//UI Class
class UI{
    static displayTodo(){
        const tasks = Store.getTasks();

        tasks.forEach((task) => UI.addTaskToList(task));
    }

    static addTaskToList(task){
        const list = document.querySelector('#todos');
        const row = document.createElement('li');
        const todoText = document.createElement('span');
        todoText.innerHTML = task;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "Remove";
        deleteBtn.className = "deleteBtn";
        row.appendChild(todoText);
        row.appendChild(deleteBtn);
        list.appendChild(row);
    }

    static removeTask(el){
        if(el.classList.contains('deleteBtn')){
            el.parentElement.remove();
        }
    }

    static clearInput(){
        document.querySelector('#input').value = '';
    }
}
//Store Class
class Store{
    static getTasks(){
        let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
        
        return tasks;
    }

    static addTask(task){
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
        console.log(tasks.length);
    }

    static removeTask(el){
        const tasks = Store.getTasks();

        tasks.forEach((task) =>{
            if(task === el.previousElementSibling.textContent){
                tasks.splice(tasks.indexOf(task), 1);
            }
        });

        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
}

//Display Tasks
document.addEventListener('DOMContentLoaded', UI.displayTodo);

//Add a Task
document.querySelector('#addBtn').addEventListener('click', (e) => {
    let inputValue = document.getElementById('input').value;
    
    //Add todo to UI
    UI.addTaskToList(inputValue);

    //Add task to store
    Store.addTask(inputValue);

    //Clear input
    UI.clearInput();

});

//Delete a Task
document.querySelector('#todos').addEventListener('click',(e) => {
    //Remove todo from UI
    UI.removeTask(e.target);

    //Remove todo from store
    Store.removeTask(e.target);
});

//Clear All Tasks
document.querySelector('#clearBtn').addEventListener('click',() =>{
    localStorage.clear();

    const list = document.querySelector('#todos');

    while (list.firstChild) {
        list.removeChild(list.firstChild)
      }
})