import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaViewerComponent } from './mapa-viewer.component';

describe('MapaViewerComponent', () => {
  let component: MapaViewerComponent;
  let fixture: ComponentFixture<MapaViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
