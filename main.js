let x = 0;
class Todo {
    constructor(task) {
        this.id = x++;
        this.task = task;
    }
}
let todos = [];
let completedList = [];
let removedList = [];


window.onload = function () {
    creatingInputHtml();


    let todo = new Todo('Äta');
    let todo2 = new Todo('Skita');
    let todo3 = new Todo('Spy');

    todos.push(todo);
    todos.push(todo2);
    todos.push(todo3);

    createHtml();
    createDoneList();


};

function createTodo() {

    let newTodo = document.getElementById("userInput").value;
    let todo = new Todo(newTodo);
    todos.push(todo);
    let empty = document.getElementById('userInput');
    empty.value = "";

    createHtml();

};

function createHtml() {
    let ulTag = document.getElementById('ulTag');
    ulTag.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {

        let taskDiv = document.createElement('div');
        taskDiv.className = 'taskDiv';
        ulTag.appendChild(taskDiv);

        let tasks = document.createElement('li');
        tasks.className = 'tasks';
        tasks.innerHTML = todos[i].task;
        taskDiv.appendChild(tasks);

        let checkbtn = document.createElement('button');
        checkbtn.type = 'button';
        checkbtn.className = 'checkbtn';
        checkbtn.innerHTML = '<i class="fas fa-check"></i>';
        checkbtn.addEventListener('click', () => {
            taskDone(todos[i]);
        })
        taskDiv.appendChild(checkbtn);

        let trashbtn = document.createElement('button');
        trashbtn.type = 'button';
        trashbtn.className = 'trashbtn';
        trashbtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashbtn.addEventListener('click', () => { removeTodo(todos[i]) });
        taskDiv.appendChild(trashbtn);

    }
};

function sortingFunction() {
    todos.sort((a, b) => {
        let todoA = a.task.toLowerCase();
        let todoB = b.task.toLowerCase();
        if (todoA < todoB) {
            return -1;
        }
        if (todoA > todoB) {
            return 1;
        }
        return 0;
    })
    createHtml();
};

function taskDone(todo) {

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == todo.id) {
            let todosDone = todos.splice(i, 1);
            createHtml();
            createDoneList();

            for (let i = 0; i < todosDone.length; i++) {
                completedList.push(todosDone[i]);
                createHtml();
                createDoneList();
            }
        }
    }
};

function moveBackFunction(todo) {

    for (let i = 0; i < completedList.length; i++) {
        if (completedList[i].id == todo.id) {
            let toDosBack = completedList.splice(i, 1);
            createHtml();
            createDoneList();

            for (let i = 0; i < toDosBack.length; i++) {
                todos.push(toDosBack[i]);
                console.log(todos);
                createHtml();
                createDoneList();
            }
        }
    }
};

function removeCheckedTodo(todo) {

    for (let i = 0; i < completedList.length; i++) {
        if (completedList[i].id == todo.id) {
            completedList.splice(i, 1);
            createDoneList();

        }
    }
};


function removeTodo(todo) {

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == todo.id) {
            todos.splice(i, 1);
            createHtml();
        }
    }
};

function createDoneList() {

    let completedUl = document.getElementById('completedUl');
    completedUl.innerHTML = "";

    for (let i = 0; i < completedList.length; i++) {

        let taskDiv = document.createElement('div');
        taskDiv.className = 'taskDiv';
        completedUl.appendChild(taskDiv);

        let tasks = document.createElement('li');
        tasks.className = 'tasks';
        tasks.innerHTML = completedList[i].task;
        taskDiv.appendChild(tasks);

        let checkbtn = document.createElement('button');
        checkbtn.type = 'button';
        checkbtn.className = 'checkbtn';
        checkbtn.innerHTML = '<i class="fas fa-undo"></i>';
        checkbtn.addEventListener('click', () => {
            moveBackFunction(completedList[i]);
        })
        taskDiv.appendChild(checkbtn);

        let trashbtn = document.createElement('button');
        trashbtn.type = 'button';
        trashbtn.className = 'doneTrash';
        trashbtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashbtn.addEventListener('click', () => { removeCheckedTodo(completedList[i]) });
        taskDiv.appendChild(trashbtn);

    };
};


function creatingInputHtml() {
    let inputContainer = document.createElement('div');
    inputContainer.id = 'inputDiv';
    document.body.appendChild(inputContainer);

    let text = document.createElement('p');
    text.id = 'text';
    text.innerHTML = 'TODOLIST';
    inputContainer.appendChild(text);

    let theInput = document.createElement('input');
    theInput.id = 'userInput';
    theInput.type = 'text';
    theInput.placeholder = 'Add new ToDos';
    inputContainer.appendChild(theInput);

    let userbtn = document.createElement('button');
    userbtn.id = 'userbtn';
    userbtn.type = 'button';
    userbtn.innerHTML = '<i class="fas fa-plus"></i>';
    inputContainer.appendChild(userbtn);

    let container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);

    let section = document.createElement('section');
    section.id = 'section';
    container.appendChild(section);

    let heading1 = document.createElement('p');
    heading1.id = 'heading1';
    heading1.innerHTML = 'Tasks';
    section.appendChild(heading1);

    let sorting = document.createElement('button');
    sorting.type = 'button';
    sorting.id = 'sorting';
    sorting.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
    section.appendChild(sorting);

    let ulTag = document.createElement('ul');
    ulTag.id = 'ulTag';
    container.appendChild(ulTag);

    userbtn.addEventListener('click', (e) => {
        
        if (userInput.value == '' || userInput.value == null) {
            theInput.placeholder = 'Cannot be empty!';
            theInput.className = 'error';
        }
        else {
            createTodo();
        }
    });

    let heading2 = document.createElement('p');
    heading2.innerHTML = 'Done';
    heading2.id  = 'heading2';
    container.appendChild(heading2);

    let completedUl = document.createElement('ul');
    completedUl.id = 'completedUl';
    container.appendChild(completedUl);

    sorting.addEventListener('click', sortingFunction);
};

