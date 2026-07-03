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
import { AbstractControl, ValidationErrors } from '@angular/forms';


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

// phone number validator
  onPhoneInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  // Keep only digits
  const numbersOnly = input.value.replace(/\D/g, '');
  // Maximum 10 digits
  const phone = numbersOnly.substring(0, 10);
  input.value = phone;
  this.contactForm.patchValue(
    { phone: phone },
    { emitEvent: false }
  );
}

// age validator
ageValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const dob = new Date(control.value);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age >= 18 ? null : { underAge: true };
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
    dob: new FormControl('', [Validators.required,this.ageValidator.bind(this)]),
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