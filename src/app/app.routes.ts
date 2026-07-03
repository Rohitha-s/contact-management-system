import { Routes } from '@angular/router';

export const routes: Routes = [
  {
  path: '',
  loadComponent: () =>
    import('./pages/home/home')
    .then(m => m.Home)
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/contact-list-page/contact-list-page')
      .then(m => m.ContactListPage)
  },
  {
    path: 'add-contact',
    loadComponent: () =>
      import('./pages/contact-form-page/contact-form-page')
      .then(m => m.ContactFormPage)
  }
];