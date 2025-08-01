import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesDashboardComponent } from './deliveries-dashboard.component';

describe('DeliveriesDashboardComponent', () => {
  let component: DeliveriesDashboardComponent;
  let fixture: ComponentFixture<DeliveriesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveriesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveriesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
