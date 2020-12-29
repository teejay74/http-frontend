export default class Request {
  constructor(server) {
    this.server = server;
  }

  async createTicket(name, description) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    return fetch(`${this.server}?method=createTicket`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((response) => response);
  }

  async editTicket(id, name, description) {
    const formData = new FormData();
    formData.append('editId', id);
    formData.append('name', name);
    formData.append('description', description);

    return fetch(`${this.server}?method=editTicket`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.text())
      .then((response) => response);
  }

  async allTickets() {
    return fetch(`${this.server}?method=allTickets`)
      .then((data) => data.json())
      .then((data) => data);
  }

  async descriptionTicket(id) {
    const params = new URLSearchParams();
    params.append('id', id);
    return fetch(`${this.server}?method=ticketById&${params}`)
      .then((data) => data.text())
      .then((data) => data);
  }

  async toggleStatus(id, status) {
    const params = new URLSearchParams();
    params.append('id', id);
    params.append('status', status);
    return fetch(`${this.server}?method=toggleStatus&${params}`)
      .then((data) => data.text())
      .then((data) => data);
  }

  async deleteTicket(id) {
    const params = new URLSearchParams();
    params.append('id', id);
    return fetch(`${this.server}?method=deleteTicket&${params}`)
      .then((data) => data.text())
      .then((data) => data);
  }
}
