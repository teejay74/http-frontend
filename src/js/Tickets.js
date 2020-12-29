export default class Tickets {
  constructor() {
    this.list = document.getElementById('tickets_conteiner');
  }

  showTickets(tickets) {
    this.list.textContent = '';

    tickets.forEach((el) => {
      const ticket = document.createElement('tr');
      ticket.dataset.id = el.id;
      ticket.dataset.status = el.status;
      const status = el.status === true ? 'done' : 'todo';
      const tdTicketStatus = document.createElement('td');
      const spanStatus = document.createElement('span');
      const tdTicketContent = document.createElement('td');
      const divTicketName = document.createElement('div');
      const divTooltip = document.createElement('div');
      const tdTicketDate = document.createElement('div');
      const tdTicketActions = document.createElement('td');
      const spanEditBtn = document.createElement('span');
      const spanTextBtnEdit = document.createElement('span');
      const spanDelBtn = document.createElement('span');
      const spanTextBtnDel = document.createElement('span');

      tdTicketStatus.className = 'ticket-status';
      spanStatus.className = status;
      tdTicketContent.className = 'ticket-content';
      divTicketName.className = 'ticket-name';
      divTooltip.className = 'ticket-tooltip';
      tdTicketDate.className = 'ticket-date';
      tdTicketActions.className = 'ticket-actions';
      spanEditBtn.className = 'edit-button';
      spanTextBtnEdit.className = 'text-btn';
      spanDelBtn.className = 'delete-button';
      spanTextBtnDel.className = 'text-btn';

      tdTicketStatus.append(spanStatus);
      divTicketName.textContent = el.name;
      tdTicketContent.append(divTicketName);
      tdTicketContent.append(divTooltip);
      tdTicketDate.textContent = el.created;
      spanTextBtnEdit.textContent = 'Edit';
      spanEditBtn.append(spanTextBtnEdit);
      tdTicketActions.append(spanEditBtn);
      spanTextBtnDel.textContent = 'Delete';
      spanDelBtn.append(spanTextBtnDel);
      tdTicketActions.append(spanDelBtn);
      ticket.append(tdTicketStatus);
      ticket.append(tdTicketContent);
      ticket.append(tdTicketDate);
      ticket.append(tdTicketActions);
      this.list.appendChild(ticket);
    });
  }
}
