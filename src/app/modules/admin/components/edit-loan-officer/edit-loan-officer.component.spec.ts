import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoanOfficerComponent } from './edit-loan-officer.component';

describe('EditLoanOfficerComponent', () => {
  let component: EditLoanOfficerComponent;
  let fixture: ComponentFixture<EditLoanOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLoanOfficerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLoanOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
