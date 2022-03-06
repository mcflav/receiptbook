import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayReceiptComponent } from './display-receipt.component';

describe('DisplayReceiptComponent', () => {
  let component: DisplayReceiptComponent;
  let fixture: ComponentFixture<DisplayReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
