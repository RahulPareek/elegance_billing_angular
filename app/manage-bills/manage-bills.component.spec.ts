import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBillsComponent } from './manage-bills.component';

describe('ManageBillsComponent', () => {
  let component: ManageBillsComponent;
  let fixture: ComponentFixture<ManageBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
