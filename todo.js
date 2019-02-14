var tasks = [];

function initialize()
{
    $("#input-data-table").hide();
    $("#add-div-id").show();
    $("#save-div-id").hide();
}

function clear()
{
    document.getElementById('todo-table').innerHTML = '';
};

function showToDoForm()
{
    $("#add-div-id").hide();
    $("#save-div-id").show();
    $("#input-data-table").show();
    $("#todo-id").val('');
    $("#name-id").val('');
    $("#description-id").val('');
    $("#date-id").val('');
}

function saveTask()
{
    $("#add-div-id").show();
    $("#save-div-id").hide();
    $("#input-data-table").hide();
    this.clear();
    var task = {'id' : $("#todo-id").val(),
                'name' : $("#name-id").val(),
                'description' : $("#description-id").val(),
                'date' : $("#date-id").val()};
    tasks.push(task);
    this.displayTasks();
}

function displayTasks()
{
    $.each(tasks, function(i, task)
        {
            $("#todo-table").append(
                "<tr><td>Id</td><td>"+task.id+"</td></tr>"+
                "<tr><td>Name</td><td>"+task.name+"</td></tr>"+
                "<tr><td>Description</td><td>"+task.description+"</td></tr>"+
                "<tr><td>Date</td><td>"+task.date+"</td></tr>");
        });
}