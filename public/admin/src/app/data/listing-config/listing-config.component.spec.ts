import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListingConfigComponent } from './listing-config.component';

describe('ListingConfigComponent', () => {
  let component: ListingConfigComponent;
  let fixture: ComponentFixture<ListingConfigComponent>;

  beforeEach(waitForAsync(() => {
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
