//jQuery file for the index.hbs file
(function () {


//Calling the  getTasksListAndDisplay() as the page loads
getTasksListAndDisplay();

//Validating the formData before submission
$("#createTaskForm").submit(function(e){

    e.preventDefault();

    const form = e.target();

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taskName: form.taskname.value,
            description: form.taskdescr.value,
            timeDue: form.due_date.value
        })

}).then((data) => {

    if (data.status === 400){

        alert ("Sorry! Your task cannot be created.")

    } else {
        //Calling the function
        getTasksListAndDisplay();
    }

});

})
//End

//Declaring the getTasksListAndDisplay function
function getTasksListAndDisplay(){

    //AJAX call to fetch tasks list from the backend
    $.get('/tasks').done(function(data) {

        console.log(data)

        //Display the data
        $("#task_list").dataTable({
            destroy	: true,
            stateSave: true,
            data 	: data,
            columns : [
               {'data' : '_id', 
                   "render": function ( data, type, row ) {
                       return '<button type="button" id=editTask-'+data+' class="btn-xs btn-primary editTask" data-toggle="modal" data-target="#editCreateTaskModal" data-backdrop="static" data-keyboard="false" value='+row._id+'>'+data+'</button>';
                   }
               },
               {'data' : 'taskName' },
               {'data' : 'description' },
               {'data' : 'timeDue'},
               {'data' : 'timeLeft'},
               {'data' : 'completed'},
               {'data' : '_id', 
                   "render": function ( data, type, row ) {
                       return '<button type="button" id=deleteTask-'+data+' class="btn-xs btn-primary deleteTask" data-toggle="modal" data-target="#" data-backdrop="static" data-keyboard="false" value='+row._id+'>'+data+'</button>';
                   }
               },
            ]
        })
    })

};
//End

//Edit Task method
//Start




//End

//Delete Task method
//Start





//End

})();