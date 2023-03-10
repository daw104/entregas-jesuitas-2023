import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarMisPeticionesComponent } from './actualizar-mis-peticiones.component';

describe('ActualizarMisPeticionesComponent', () => {
  let component: ActualizarMisPeticionesComponent;
  let fixture: ComponentFixture<ActualizarMisPeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarMisPeticionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarMisPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
