var tasks = [];

function initialize()
{
    $("#input-data-table").hide();
    $("#add-div-id").show();
    $("#save-div-id").hide();
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
        this.displayTasks();
    }
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

function updateTask(id)
{
    tasks = JSON.parse(localStorage.getItem('todotasks'));
    tasks.forEach(function(task)
        {
            if(task.id == id)
            {
                var index = tasks.indexOf(task);
                tasks.splice(index, 1);
                var id = this.getUniqueId();
                var task = {'id' : id,
                            'name' : $("#name-id").val(),
                            'description' : $("#description-id").val(),
                            'date' : $("#date-id").val()
                            };
                localStorage.clear();
                localStorage.setItem('todotasks', JSON.stringify(tasks));
            }
        });
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
    var tableBody = document.createElement('tbody');

    var row01 = document.createElement('tr');
    var column01 = document.createElement('th');
    var text01 = document.createTextNode(task.id);
    column01.appendChild(text01);
    row01.appendChild(column01);

    var column02 = document.createElement('th');
    var button = document.createElement('button');
    button.innerHTML = 'X';
    button.id = 'del';
    button.onclick = function()
        {
           deleteTask(task.id);
        };
    column02.appendChild(button);
    row01.appendChild(column02);
    tableBody.appendChild(row01);

    var row02 = document.createElement('tr');
    var column11 = document.createElement('th');
    var text11 = document.createTextNode(task.name);
    column11.appendChild(text11);
    row02.appendChild(column11);
    tableBody.appendChild(row01);

    var row03 = document.createElement('tr');
    var column21 = document.createElement('td');
    var text21 = document.createTextNode(task.description);
    column21.appendChild(text21);
    row03.appendChild(column21);
    tableBody.appendChild(row03);
    
    table.appendChild(tableBody);
    div.appendChild(table);
}