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

function validateInput()
{
    var result = true;
    if(!$("#name-id").val())
    {
        alert("Name Missing!!!");
        result = false;
    }
    if(!$("#description-id").val())
    {
        alert("Description Missing!!!");
        result = false;
    }
    if(!$("#date-id").val())
    {
        alert("Date Missing!!!");
        result = false;
    }
    return result;
}

function displayTasks()
{
    this.clear();
    var tasks = JSON.parse(localStorage.getItem('todotasks'));
    $.each(tasks, function(i, task)
        {
            $("#todo-display-id").append(
                "<table><tr><th>To Do # "+task.id+"</th>"+
                "<th><button class=del onclick=deleteTask("+task.id+")>X</button></th></tr>"+
                "<tr><th>"+task.name+"</th></tr>"+
                "<tr><td>"+task.description+"</td></tr>"+
                "<tr><td>"+task.date+"</td></tr>"+
                "</table><br/>");
        });
}

function getUniqueId()
{
    var random=Math.floor(Math.random()*1000); 
    return random;
}