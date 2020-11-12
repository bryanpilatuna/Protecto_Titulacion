import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallenotificacionPage } from './detallenotificacion.page';

describe('DetallenotificacionPage', () => {
  let component: DetallenotificacionPage;
  let fixture: ComponentFixture<DetallenotificacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallenotificacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallenotificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
