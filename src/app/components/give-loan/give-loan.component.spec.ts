import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveLoanComponent } from './give-loan.component';

describe('GiveLoanComponent', () => {
  let component: GiveLoanComponent;
  let fixture: ComponentFixture<GiveLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
