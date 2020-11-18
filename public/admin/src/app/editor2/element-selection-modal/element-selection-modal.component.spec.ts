import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementSelectionModalComponent } from './element-selection-modal.component';

describe('ElementSelectionModalComponent', () => {
  let component: ElementSelectionModalComponent;
  let fixture: ComponentFixture<ElementSelectionModalComponent>;

  beforeEach(waitForAsync(() => {
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
