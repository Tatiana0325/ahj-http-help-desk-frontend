export default class Products {
  constructor() {
    this.products = [];
  }

  async getAll() {
    const tickets = await fetch(
      "https://ahj-http-help-desk-backend.herokuapp.com/?method=allTickets"
    );
    return tickets.json();
  }

  async save(product) {
    await fetch("https://ahj-http-help-desk-backend.herokuapp.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  }

  async delete(id) {
    await fetch(`https://ahj-http-help-desk-backend.herokuapp.com/?id=${id}`, {
      method: "DELETE",
    });
  }

  async find(id) {
    const tickets = await fetch(
      `https://ahj-http-help-desk-backend.herokuapp.com/?method=ticketById&id=${id}`
    );
    return tickets.json();
  }

  async update(product) {
    await fetch("https://ahj-http-help-desk-backend.herokuapp.com/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  }

  async status(id) {
    await fetch("https://ahj-http-help-desk-backend.herokuapp.com/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: true }),
    });
  }
}
