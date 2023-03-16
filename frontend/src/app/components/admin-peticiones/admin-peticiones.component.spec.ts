import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPeticionesComponent } from './admin-peticiones.component';

describe('AdminPeticionesComponent', () => {
  let component: AdminPeticionesComponent;
  let fixture: ComponentFixture<AdminPeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPeticionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
