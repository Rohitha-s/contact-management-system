import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ContactService } from '../../services/contact';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule
}
from '@danielmoncada/angular-datetime-picker';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgSelectComponent,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})

export class ContactForm{
  editingContactId: number | null = null;

  get f() {
  return this.contactForm.controls;
  }

  ngOnInit(){
  if(this.contactService.selectedContact){
    const contact=this.contactService.selectedContact;
    this.editingContactId=contact.id;
    this.contactForm.patchValue({
        name:contact.name,
        phone:contact.phone,
        email:contact.email,
        gender:contact.gender,
        dob:contact.dob,
        address:contact.address
    });
  }
}
  

genders = [
  { name: 'Male' },
  { name: 'Female' },
  { name: 'Other' }
];

  constructor(
    private contactService: ContactService,
    private router: Router
  ){}

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    gender: new FormControl(null),
    dob: new FormControl(''),
    address: new FormControl('')
  });

  formSubmitted = false;
  addContact() {
    this.formSubmitted = true;
    if(this.contactForm.invalid){
      this.contactForm.markAllAsTouched();
      return;
    }

    const contact = {
      id: this.editingContactId ?? Date.now(),
      name: this.contactForm.value.name ?? '',
      phone: this.contactForm.value.phone ?? '',
      email: this.contactForm.value.email ?? '',
      gender: this.contactForm.value.gender ?? '',
      dob: this.contactForm.value.dob ?? '',
      address: this.contactForm.value.address ?? ''
    };
    if(this.editingContactId){
      this.contactService.updateContact(contact);
    }
    else{
      this.contactService.addContact(contact);
    }
    this.contactService.selectedContact=null;
    this.contactForm.reset();
    this.editingContactId=null;
    
    // Redirect to Contact List page
    this.router.navigate(['/contacts']);
  }

  loadContact(contact: any) {
  this.editingContactId = contact.id;
  this.contactForm.patchValue({
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    gender: contact.gender,
    dob: contact.dob,
    address: contact.address
  });
  }
}