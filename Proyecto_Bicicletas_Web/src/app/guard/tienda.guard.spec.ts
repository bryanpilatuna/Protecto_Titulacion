import { TestBed } from '@angular/core/testing';

import { TiendaGuard } from './tienda.guard';

describe('TiendaGuard', () => {
  let guard: TiendaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TiendaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
