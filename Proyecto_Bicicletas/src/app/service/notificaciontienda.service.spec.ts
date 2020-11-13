import { TestBed } from '@angular/core/testing';

import { NotificaciontiendaService } from './notificaciontienda.service';

describe('NotificaciontiendaService', () => {
  let service: NotificaciontiendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificaciontiendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
