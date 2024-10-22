import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedLoanComponent } from './rejected-loan.component';

describe('RejectedLoanComponent', () => {
  let component: RejectedLoanComponent;
  let fixture: ComponentFixture<RejectedLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectedLoanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
