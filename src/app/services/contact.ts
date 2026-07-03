import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  // get the contacts
  contacts: Contact[] =
JSON.parse(
localStorage.getItem('contacts') || '[]'
);
  // adding contacts
  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.saveContacts();
  }
  // deleting contacts
  deleteContact(id: number) {
    this.contacts = this.contacts.filter(
      contact => contact.id !== id
    );
    this.saveContacts();
  }
  // saving the contacts
  saveContacts() {

  localStorage.setItem(
    'contacts',
    JSON.stringify(this.contacts)
  );
  }
  // editing contacts
  selectedContact:any = null;
  editContact(contact:any){
  this.selectedContact = {...contact};
  }
  // updating contacts
  updateContact(updated:any){
  const index =
  this.contacts.findIndex(
    c => c.id === updated.id
  );
  if(index !== -1){
    this.contacts[index] = updated;
    this.saveContacts();
  }
  }
}