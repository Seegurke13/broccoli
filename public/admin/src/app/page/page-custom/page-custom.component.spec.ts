import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCustomComponent } from './page-custom.component';

describe('PageCustomComponent', () => {
  let component: PageCustomComponent;
  let fixture: ComponentFixture<PageCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
