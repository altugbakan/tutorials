import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLoginComponent } from './email-login.component';

describe('EmailLoginComponent', () => {
  let component: EmailLoginComponent;
  let fixture: ComponentFixture<EmailLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailLoginComponent]
    });
    fixture = TestBed.createComponent(EmailLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
