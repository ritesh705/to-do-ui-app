var tasks = [];
var updateId = '';

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
        var id = this.getUniqueId();
        var task = {'id' : id,
            'name' : $("#name-id").val(),
            'description' : $("#description-id").val(),
            'date' : $("#date-id").val()};
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
                var index = tasks.indexOf(task);
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
    var isValidate = validateInput();
    if(!isValidate)
    {
        return false;
    }
    $("#add-div-id").show();
    $('#update-div-id').hide();
    $("#input-data-table").hide();
    this.deleteTask(updateId);
    var task = {'id' : updateId,
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
    var result = true;
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
    tasks.forEach(function(task)
        {
            this.generateTable(task);
        })
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
    var random = Math.floor(Math.random()*1000);
    return random;
}

function generateTable(task)
{
    var div = document.getElementById('todo-display-id');
    var table = document.createElement('table');
    table.align = 'center';
    var tableBody = document.createElement('tbody');

    var row = document.createElement('tr');
    
    var updateColumn = document.createElement('th');
    var updateButton = document.createElement('button');
    updateButton.className = 'updateButton';
    updateButton.onclick = function()
    {
        updateId = task.id;
        activateUpdate();
    }
    updateColumn.appendChild(updateButton);
    row.appendChild(updateColumn);

    var column = document.createElement('th');
    var button = document.createElement('button');
    button.innerHTML = 'X';
    button.className = 'del';
    button.onclick = function()
        {
           deleteTask(task.id);
        };
    column.appendChild(button);
    row.appendChild(column);
    tableBody.appendChild(row);


    var row01 = document.createElement('tr');
    var column01 = document.createElement('th');
    var text01 = document.createTextNode("Task Id # "+task.id);
    column01.appendChild(text01);
    row01.appendChild(column01);
    tableBody.appendChild(row01);

    var row02 = document.createElement('tr');
    var column11 = document.createElement('th');
    var text11 = document.createTextNode(task.name);
    column11.appendChild(text11);
    row02.appendChild(column11);
    tableBody.appendChild(row02);

    var row03 = document.createElement('tr');
    var column21 = document.createElement('td');
    var text21 = document.createTextNode(task.description);
    column21.appendChild(text21);
    row03.appendChild(column21);
    tableBody.appendChild(row03);
    
    table.appendChild(tableBody);
    div.appendChild(table);

    var br = document.createElement('br');
    div.appendChild(br);
}