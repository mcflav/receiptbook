import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantDisplayComponent } from './accountant-display.component';

describe('AccountantDisplayComponent', () => {
  let component: AccountantDisplayComponent;
  let fixture: ComponentFixture<AccountantDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountantDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
