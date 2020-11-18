import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageTreeComponent } from './page-tree.component';

describe('PageTreeComponent', () => {
  let component: PageTreeComponent;
  let fixture: ComponentFixture<PageTreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
