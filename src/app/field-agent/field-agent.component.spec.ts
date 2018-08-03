import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldAgentComponent } from './field-agent.component';

describe('FieldAgentComponent', () => {
  let component: FieldAgentComponent;
  let fixture: ComponentFixture<FieldAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
