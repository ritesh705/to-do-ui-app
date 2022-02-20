let tasks = [];
let updateId = '';

function initialize()
{
    $("#input-data-table").hide();
    $("#add-div-id").show();
    $("#save-div-id").hide();
    $('#update-div-id').hide();
    this.displayTasks();
};

function clear()
{
    document.getElementById('todo-display-id').innerHTML = '';
};

function showToDoForm()
{
    $("#add-div-id").hide();
    $("#save-div-id").show();
    $("#input-data-table").show();
    $('#update-div-id').hide();
    $("#name-id").val('');
    $("#description-id").val('');
    $("#date-id").val('');
}

function saveTask()
{
    var isValidate = validateInput();
    if(isValidate)
    {
        $("#add-div-id").show();
        $("#save-div-id").hide();
        $('#update-div-id').hide();
        $("#input-data-table").hide();
        this.clear();
        let id = this.getUniqueId();
        let task = {
            'id' : id,
            'name' : $("#name-id").val(),
            'description' : $("#description-id").val(),
            'date' : $("#date-id").val()
        };
        if(!tasks)
        {
            var tasks = [];
        }
		tasks.push(task);
        localStorage.clear();
        localStorage.setItem('todotasks', JSON.stringify(tasks));
    }
    this.displayTasks();
}

function deleteTask(id)
{
    tasks = JSON.parse(localStorage.getItem('todotasks'));
    tasks.forEach(function(task)
        {
            if(task.id == id)
            {
                let index = tasks.indexOf(task);
                tasks.splice(index, 1);
                localStorage.clear();
                localStorage.setItem('todotasks', JSON.stringify(tasks));
            }
        });
    this.displayTasks();
}

function activateUpdate()
{
    $("#add-div-id").hide();
    $("#save-div-id").hide();
    $('#update-div-id').show();
    $("#input-data-table").show();
}

function updateTask()
{
    let isValidate = validateInput();
    if(!isValidate)
    {
        return false;
    }
    $("#add-div-id").show();
    $('#update-div-id').hide();
    $("#input-data-table").hide();
    this.deleteTask(updateId);
    let task = {'id' : updateId,
                'name' : $("#name-id").val(),
                'description' : $("#description-id").val(),
                'date' : $("#date-id").val()
                };
    tasks = JSON.parse(localStorage.getItem('todotasks'));
    tasks.push(task);
    localStorage.clear();
    localStorage.setItem('todotasks', JSON.stringify(tasks));
    this.displayTasks();
}

function validateInput()
{
    let result = true;
    if(!$("#name-id").val())
    {
        alert("Name Missing!!!");
        result = false;
    }
    else if(!$("#description-id").val())
    {
        alert("Description Missing!!!");
        result = false;
    }
    else if(!$("#date-id").val())
    {
        alert("Date Missing!!!");
        result = false;
    }
    return result;
}

function displayTasks()
{
    this.clear();
    tasks = JSON.parse(localStorage.getItem('todotasks'));
    let div = document.getElementById('todo-display-id');
    let mainTable = document.createElement('table');
    let col01 = document.createElement('col');
    let col02 = document.createElement('col');
    col01.width = "250";
    col02.width = "250";
    mainTable.appendChild(col01);
    mainTable.appendChild(col02);
    let row1 = document.createElement('tr');
	
	if(tasks){
		tasks.forEach(function(task)
        {
            let column1 = document.createElement('td');
            let div1 = document.createElement('div');
            let table = this.generateTable(task);
            table.className = 'task-table';
            div1.appendChild(table);
            column1.appendChild(div1);
            row1.appendChild(column1);
        })
	}
	
    mainTable.appendChild(row1);
    div.appendChild(mainTable);
   /* $.each(tasks, function(i, task)
        {
            $("#todo-display-id").append(
                "<table><tr><th>To Do # "+task.id+"</th>"+
                "<th><button class=del onclick=deleteTask("+task.id+")>X</button></th></tr>"+
                "<tr><th>"+task.name+"</th></tr>"+
                "<tr><td>"+task.description+"</td></tr>"+
                "<tr><td>"+task.date+"</td></tr>"+
                "</table><br/>");            
        });*/
}

function getUniqueId()
{
    let random = Math.floor(Math.random()*1000);
    return random;
}

function generateTable(task)
{
   
    let table = document.createElement('table');
    table.align = 'center';
    let tableBody = document.createElement('tbody');

    let row = document.createElement('tr');

    let updateColumn = document.createElement('th');
    let updateButton = document.createElement('button');
    updateButton.className = 'updateButton';
    updateButton.onclick = function()
    {
        updateId = task.id;
        activateUpdate();
    }
    updateColumn.appendChild(updateButton);
    row.appendChild(updateColumn);

    let column = document.createElement('th');
    let button = document.createElement('button');
    button.innerHTML = 'X';
    button.className = 'del';
    button.onclick = function()
        {
           deleteTask(task.id);
        };
    column.appendChild(button);
    row.appendChild(column);
    tableBody.appendChild(row);


    let row01 = document.createElement('tr');
    let column01 = document.createElement('th');
    let text01 = document.createTextNode("Task Id # "+task.id);
    column01.appendChild(text01);
    row01.appendChild(column01);
    tableBody.appendChild(row01);

    let row02 = document.createElement('tr');
    let column11 = document.createElement('th');
    let text11 = document.createTextNode(task.name);
    column11.appendChild(text11);
    row02.appendChild(column11);
    tableBody.appendChild(row02);

    let row03 = document.createElement('tr');
    let column21 = document.createElement('td');
    let text21 = document.createTextNode(task.description);
    column21.appendChild(text21);
    row03.appendChild(column21);
    tableBody.appendChild(row03);
    
    table.appendChild(tableBody);

    return table;
    
}