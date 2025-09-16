import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencesModalComponent } from './evidences-modal.component';

describe('EvidencesModalComponent', () => {
  let component: EvidencesModalComponent;
  let fixture: ComponentFixture<EvidencesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvidencesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidencesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
