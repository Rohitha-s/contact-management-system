import { Component } from '@angular/core';
import { ContactForm } from '../../components/contact-form/contact-form';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-contact-form-page',
  standalone: true,
  imports: [ContactForm,RouterLink],
  templateUrl: './contact-form-page.html',
  styleUrl: './contact-form-page.css'
})
export class ContactFormPage {}