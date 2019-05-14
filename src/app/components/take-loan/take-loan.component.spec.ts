import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeLoanComponent } from './take-loan.component';

describe('TakeLoanComponent', () => {
  let component: TakeLoanComponent;
  let fixture: ComponentFixture<TakeLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
