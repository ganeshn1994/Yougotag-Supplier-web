import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JanitramComponent } from './janitram.component';

describe('JanitramComponent', () => {
  let component: JanitramComponent;
  let fixture: ComponentFixture<JanitramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JanitramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JanitramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
