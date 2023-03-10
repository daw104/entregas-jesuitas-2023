import { TestBed } from '@angular/core/testing';

import { MyPeticionService } from './my-peticion.service';

describe('MyPeticionService', () => {
  let service: MyPeticionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPeticionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
