import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormPage } from './contact-form-page';

describe('ContactFormPage', () => {
  let component: ContactFormPage;
  let fixture: ComponentFixture<ContactFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
