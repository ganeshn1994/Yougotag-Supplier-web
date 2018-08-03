import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowYourMedicineComponent } from './know-your-medicine.component';

describe('KnowYourMedicineComponent', () => {
  let component: KnowYourMedicineComponent;
  let fixture: ComponentFixture<KnowYourMedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowYourMedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowYourMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
