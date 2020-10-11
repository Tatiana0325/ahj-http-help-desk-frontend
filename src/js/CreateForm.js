export default class CreateForm {	
	static createForm(name) {
		const form = document.createElement('div');
		form.classList.add('form-ticket');
		form.innerHTML = `
		<div class="title">${name}</div>
		<form class="change-ticket">
			<div class="ticket-info">
				<div class="header">Краткое описание</div>
				<input type="text" class="short-description">

				<div class="header">Подробное описание</div>
				<input type="text" class="long-description">
			</div>

			<div class="button-class">
				<button type="reset" class="reset-ticket">Отмена</button>
				<button type="submit" class="save-ticket">Ok</button>
			</div>
		</form>`;

		return form;
	}

	static deleteForm() {
		const delForm = document.createElement('div');
		delForm.classList.add('form-delete-ticket');

		delForm.innerHTML = ` <div class="title">Удалить тикет</div>
		<form class="delete-ticket">
			<div class="ticket-info">
				Вы действительно хотите удалить тикет? Это действие необратимо.
			</div>

			<div class="button-class">
				<button type="reset" class="reset-ticket">Отмена</button>
				<button type="submit" class="save-ticket">OK</button>
			</div>
		</form>`;

		return delForm;
	}
}
