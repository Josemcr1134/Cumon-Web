import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBulksProcessComponent } from './list-bulks-process.component';

describe('ListBulksProcessComponent', () => {
  let component: ListBulksProcessComponent;
  let fixture: ComponentFixture<ListBulksProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBulksProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBulksProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
