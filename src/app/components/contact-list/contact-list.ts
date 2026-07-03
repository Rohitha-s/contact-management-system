import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList {

  constructor(
    public contactService: ContactService,
    private router: Router
  ) {}

  editContact(contact: any) {
  this.contactService.editContact(contact);
  this.router.navigate(['/add-contact']);
  }

  deleteContact(id: number) {
  const confirmed = confirm('Are you sure you want to delete this contact?');
  if (confirmed) {
    this.contactService.deleteContact(id);
  }
  }

  searchText = '';
  get filteredContacts() {
  return this.contactService.contacts.filter(
    contact =>
    contact.name
    .toLowerCase()
    .includes(
      this.searchText.toLowerCase()
    )
  );
}
}