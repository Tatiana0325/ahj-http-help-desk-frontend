import Products from "./Products";
import CreateForm from "./CreateForm";

export default class Controller {
  constructor() {
    this.container = document.querySelector(".container");
    this.products = new Products();
    this.click = false;
  }

  start() {
    this.products.getAll().then((data) => {
      this.table(data);
      this.saveProduct();
      this.deleteProduct();
      this.changeProduct();
      this.addInfoProduct();
    });
  }

  getProduct(data) {
    this.tbody = document.createElement("tbody");
    data.forEach((elem) => {
      const tr = document.createElement("tr");
      tr.classList.add("ticket");
      tr.id = elem.id;
      tr.dataset.status = elem.status;
      tr.dataset.description = elem.descriptionStatus;
      tr.innerHTML = `
      <td><div class="info"><div></td>
      <td class="name">${elem.name}</td>
      <td class="data">${elem.created}</td>
      <td class="action">
        <div class="action-update">✎</div>
        <div class="action-delete">X</div>
      </td>`;
      if (elem.status) {
        tr.querySelector(".info").textContent = "V";
      }
      this.tbody.appendChild(tr);
    });
    return this.tbody;
  }

  table(products) {
    const table = this.container.querySelector(".all-tickets");
    table.innerHTML = `
    ${this.getProduct(products).outerHTML}
		`;

    return table;
  }

  saveProduct() {
    const button = this.container.querySelector(".add-ticket");

    button.addEventListener("click", (event) => {
      event.preventDefault();

      const form = CreateForm.createForm("Добавить тикет");
      this.container.insertAdjacentElement("beforeend", form);

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = form.querySelector(".short-description");
        const info = form.querySelector(".long-description");

        if (name.value !== "" && info.value !== "") {
          this.products.save({
            name: name.value,
            description: info.value,
          });

          name.value = "";
          info.value = "";
          this.container.removeChild(form);
          this.start();
        }
      });

      form.addEventListener("reset", (event) => {
        this.container.removeChild(form);
      });
    });
  }

  deleteProduct() {
    const cont = this.container.querySelector(".all-tickets");

    cont.addEventListener("click", (event) => {
      event.preventDefault();

      if (event.target.classList.contains("action-delete")) {
        let delForm = CreateForm.deleteForm();
        this.container.insertAdjacentElement("beforeend", delForm);
        let id = event.target.closest(".ticket").id;

        delForm.addEventListener("submit", (event) => {
          event.preventDefault();

          this.products.delete(id);
          this.container.removeChild(delForm);
          this.start();
        });

        delForm.addEventListener("reset", (event) => {
          event.preventDefault();

          this.container.removeChild(delForm);
        });
      }
    });
  }

  changeProduct() {
    const chcont = document.querySelector(".all-tickets");

    chcont.addEventListener("click", (event) => {
      event.preventDefault();

      if (event.target.classList.contains("action-update")) {
        let chForm = CreateForm.createForm("Изменить тикет");
        this.container.insertAdjacentElement("beforeend", chForm);

        let id = event.target.closest(".ticket").id;
        this.products.find(id).then((elem) => {
          const name = chForm.querySelector(".short-description");
          const info = chForm.querySelector(".long-description");
          name.value = elem.name;
          info.value = elem.description;

          chForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (name.value !== elem.name || info.value !== elem.description) {
              this.products.update(elem);
            }

            this.container.removeChild(chForm);
            this.start();
          });
        });

        chForm.addEventListener("reset", (event) => {
          event.preventDefault();

          this.container.removeChild(chForm);
        });
      }
    });
  }

  addInfoProduct() {
    const addIn = this.container.querySelector(".all-tickets");

    addIn.addEventListener("click", (event) => {
      event.preventDefault();

      if (event.target.classList.contains("name")) {
        if (!this.click) {
          this.click = true;

          let infoTr = document.createElement("div");
          infoTr.classList.add("info-text");

          let id = event.target.closest(".ticket").id;
          this.products.find(id).then((elem) => {
            infoTr.textContent = elem.description;
          });

          let tr = event.target.closest(".ticket").querySelector(".name");
          tr.insertAdjacentElement("beforeend", infoTr);
        } else {
          this.click = false;

          let contTr = event.target.closest(".ticket").querySelector(".name");
          let el = contTr.querySelector(".info-text");

          if (el !== null) {
            contTr.removeChild(el);
          }
        }
      }
    });
  }

  changeStatus() {
    const chStatus = this.container.querySelector(".all-tickets");

    chStatus.addEventListener("click", (event) => {
      event.preventDefault();

      if (event.target.classList.contains("info")) {
        if (event.target.classList.contains("info").textContent === "") {
          this.shang = true;
          event.target.textContent = "V";
          let id = event.target.closest(".ticket").id;
          this.products.status(id);
        }
      }
    });
  }
}
