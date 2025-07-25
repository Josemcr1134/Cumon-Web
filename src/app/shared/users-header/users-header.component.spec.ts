import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersHeaderComponent } from './users-header.component';

describe('UsersHeaderComponent', () => {
  let component: UsersHeaderComponent;
  let fixture: ComponentFixture<UsersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
