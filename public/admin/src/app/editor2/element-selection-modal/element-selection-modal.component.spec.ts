import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSelectionModalComponent } from './element-selection-modal.component';

describe('ElementSelectionModalComponent', () => {
  let component: ElementSelectionModalComponent;
  let fixture: ComponentFixture<ElementSelectionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementSelectionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
