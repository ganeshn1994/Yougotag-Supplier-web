import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyorderComponent } from './pharmacyorder.component';

describe('PharmacyorderComponent', () => {
  let component: PharmacyorderComponent;
  let fixture: ComponentFixture<PharmacyorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
