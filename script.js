$(document).ready(function () {
    let tasks = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    };

    // Load tasks for the selected day
    function loadTasks(day) {
        $('#tasks').empty();
        tasks[day].forEach((task, index) => {
            $('#tasks').append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${task}</span>
                    <div>
                        <button class="btn btn-sm btn-warning edit-task" data-index="${index}">Edit</button>
                        <button class="btn btn-sm btn-danger delete-task" data-index="${index}">Delete</button>
                    </div>
                </li>
            `);
        });
    }

    // Show tasks for the selected day
    $('.list-group-item-action').click(function () {
        const day = $(this).data('day');
        $('#day-heading').text(`${day.charAt(0).toUpperCase() + day.slice(1)} Tasks`);
        $('#task-list').show();
        loadTasks(day);

        // Handle task addition
        $('#add-task-form').off('submit').on('submit', function (e) {
            e.preventDefault();
            const task = $('#task-input').val().trim();
            if (task) {
                tasks[day].push(task);
                $('#task-input').val('');
                loadTasks(day);
            }
        });

        // Handle task deletion
        $(document).on('click', '.delete-task', function () {
            const index = $(this).data('index');
            tasks[day].splice(index, 1);
            loadTasks(day);
        });

        // Handle task editing
        $(document).on('click', '.edit-task', function () {
            const index = $(this).data('index');
            const newTask = prompt('Edit your task:', tasks[day][index]);
            if (newTask !== null) {
                tasks[day][index] = newTask.trim();
                loadTasks(day);
            }
        });
    });
});