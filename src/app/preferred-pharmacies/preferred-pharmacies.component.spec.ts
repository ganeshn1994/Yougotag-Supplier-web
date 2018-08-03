import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredPharmaciesComponent } from './preferred-pharmacies.component';

describe('PreferredPharmaciesComponent', () => {
  let component: PreferredPharmaciesComponent;
  let fixture: ComponentFixture<PreferredPharmaciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferredPharmaciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredPharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
