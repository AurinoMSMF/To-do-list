
const to_do_form	 = document.getElementById('to-do-form');
const task			 = document.getElementById('task');
const edit_form      = document.getElementById('edit-form');
const edit_task	     = document.getElementById('edit-task');
const to_do_list     = document.getElementById('to-do-list');
const cancel_edition = document.getElementById('cancel-edition');

let old_task; 

const createToDo = function (task_sent){
	const div_to_do			 = document.createElement("div");
	const content_to_do		 = document.createElement("h3");
	const buttons_span		 = document.createElement("span");

	const done_button		 = document.createElement("button");
	done_button.classList.add("end-task");
	done_button.innerHTML    = '<i class="fa-solid fa-check"></i>'; 
	
	const edit_button		 = document.createElement("button");
	edit_button.classList.add("edit-task");
	edit_button.innerHTML    = '<i class="fa-solid fa-pencil"></i>';
	
	const exclude_button     = document.createElement("button");
	exclude_button.classList.add("exclude-task");
	exclude_button.innerHTML = '<i class="fa-solid fa-xmark"></i>';

	div_to_do.classList.add("to-do");

	buttons_span.appendChild(done_button);
	buttons_span.appendChild(edit_button);
	buttons_span.appendChild(exclude_button);

	content_to_do.innerText = task_sent;
	div_to_do.appendChild(content_to_do);
	div_to_do.appendChild(buttons_span);

	to_do_list.appendChild(div_to_do);

	task.value = "";

	task.focus();

}

const updateToDo = function(edited_task_value) {
	const all_to_dos = document.querySelectorAll(".to-do");
	all_to_dos.forEach( current_to_do => {
		let to_do_task = current_to_do.querySelector("h3");
		if(to_do_task.innerText === old_task)
		{
			to_do_task.innerText = edited_task_value;
		}
	});
}

const showAndHideForms = function() {
	edit_form.classList.toggle("hide");
	to_do_form.classList.toggle("hide");
	to_do_list.classList.toggle("hide");
};

const checkListSize = function() {
	if(to_do_list.children.length == 1)
	{
		to_do_list.classList.remove("hide");
	}
}

to_do_form.addEventListener("submit", event => {

	event.preventDefault();
	
	const task_sent = task.value; 

	if(task_sent){
		checkListSize();
		createToDo(task_sent);
	}

});

edit_form.addEventListener("submit", event => {

	event.preventDefault();
	
	const edited_task_value = edit_task.value; 

	if(edited_task_value){
		updateToDo(edited_task_value);
	}

	showAndHideForms();

});

/*Listener para os botões*/

document.addEventListener("click", event => {
	const button_element = event.target;
	const span_element   = button_element.parentNode;
	const to_do_element  = span_element.parentNode;

	let to_do_content;

	if(to_do_element && span_element && to_do_element.querySelector("h3"))
	{
		to_do_content = to_do_element.querySelector("h3").innerText;
	}

	if(button_element.classList.contains("end-task"))
	{
		to_do_element.classList.toggle("done");
	}

	if(button_element.classList.contains("edit-task"))
	{
		showAndHideForms();

		edit_task.value = to_do_content;
		old_task		= to_do_content;
	}

	if(button_element.classList.contains("exclude-task"))
	{
		checkListSize();
		to_do_element.remove();
	}

	console.log(button_element);


});

cancel_edition.addEventListener("click", event => {
	event.preventDefault();

	showAndHideForms();
});
