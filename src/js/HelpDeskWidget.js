import Tickets from './Tickets';
import Request from './Request';

export default class HelpDeskWidget {
  constructor() {
    this.request = new Request('https://task-http.herokuapp.com/');
    this.ticketList = new Tickets();
    this.form = document.forms.edit;
    this.formHeader = this.form.querySelector('.form-header');
    this.modal = document.forms.modal;
    this.addButton = document.querySelector('.header-button');
    this.formTitle = document.querySelector('.form-header');
    this.name = document.getElementById('input_name');
    this.description = document.getElementById('input_description');
    this.save = document.getElementById('save_button');
    this.cancel = document.getElementById('cancel_button');
    this.saveModal = document.getElementById('save_modal_button');
    this.cancelModal = document.getElementById('cancel_modal_button');
    this.editTicket = null;
    this.deletedTicket = null;
    this.checkedTicket = null;
  }

  async init() {
    this.ticketList.showTickets(await this.request.allTickets());
    this.events();
  }

  async events() {
    this.addButton.addEventListener('click', () => {
      this.showModal(this.form);
      this.formHeader.innerText = 'Добавить тикет';
    });
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      (async () => {
        if (e.currentTarget.checkValidity()) {
          if (this.editTicket) {
            await this.request.editTicket(this.editTicket.dataset.id, this.name.value, this.description.value);
            this.editTicket = null;
          } else {
            await this.request.createTicket(this.name.value, this.description.value);
          }
          this.form.reset();
          this.form.classList.remove('edit-active');
          this.ticketList.showTickets(await this.request.allTickets());
        }
      })();
    });
    this.modal.addEventListener('submit', (e) => {
      e.preventDefault();
      (async () => {
        await this.request.deleteTicket(this.deletedTicket.dataset.id);
        this.modal.classList.remove('modal-active');
        this.ticketList.showTickets(await this.request.allTickets());
      })();
    });
    this.cancel.addEventListener('click', (e) => {
      e.preventDefault();
      this.editTicket = null;
      this.form.reset();
      this.form.classList.remove('edit-active');
    });
    this.cancelModal.addEventListener('click', (e) => {
      e.preventDefault();
      this.deletedTicket = null;
      this.modal.classList.remove('modal-active');
    });
    this.ticketList.list.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-button')) {
        this.showModal(this.form);
        this.formHeader.innerText = 'Изменить тикет';
        this.editTicket = e.target.parentElement.parentElement;
        this.name.value = this.editTicket.querySelector('.ticket-name').innerText;
        const description = this.editTicket.querySelector('.ticket-tooltip').innerText;
        if (description === '') {
          (async () => {
            this.description.value = await this.request.descriptionTicket(this.editTicket.dataset.id);
          })();
        } else {
          this.description.value = description;
        }
      }
      if (e.target.classList.contains('delete-button')) {
        this.deletedTicket = e.target.parentElement.parentElement;
        this.showModal(this.modal);
      }
      if (e.target.classList.contains('ticket-name') || e.target.classList.contains('ticket-tooltip')) {
        const ticket = e.target.parentElement.parentElement;

        const description = e.target.parentElement.querySelector('.ticket-tooltip');
        if (description.innerText === '') {
          (async () => {
            description.innerText = await this.request.descriptionTicket(ticket.dataset.id);
          })();
        } else {
          description.innerText = '';
        }
      }
      if (e.target.classList.contains('done') || e.target.classList.contains('todo')) {
        this.checkedTicket = e.target.parentElement.parentElement;
        const status = this.checkedTicket.dataset.status !== 'true';
        (async () => {
          await this.request.toggleStatus(this.checkedTicket.dataset.id, status);
          this.ticketList.showTickets(await this.request.allTickets());
        })();
      }
    });
  }

  showModal(el) {
    const element = el;
    if (element.classList.contains('edit')) {
      element.classList.add('edit-active');
    } else {
      this.modal.classList.add('modal-active');
    }
    element.style.top = '100px';
    element.style.left = `${(element.offsetParent.offsetWidth / 2) - (element.offsetWidth / 2)}px`;
  }
}
