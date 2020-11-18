import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StaticFieldsComponent } from './static-fields.component';

describe('StaticFieldsComponent', () => {
  let component: StaticFieldsComponent;
  let fixture: ComponentFixture<StaticFieldsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
