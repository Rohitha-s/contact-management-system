import { Component } from '@angular/core';
import { ContactList } from '../../components/contact-list/contact-list';

@Component({
  selector: 'app-contact-list-page',
  standalone: true,
  imports: [ContactList],
  template: `
    <app-contact-list></app-contact-list>
  `
})
export class ContactListPage {}

