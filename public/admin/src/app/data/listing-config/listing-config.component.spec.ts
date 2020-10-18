import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingConfigComponent } from './listing-config.component';

describe('ListingConfigComponent', () => {
  let component: ListingConfigComponent;
  let fixture: ComponentFixture<ListingConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
