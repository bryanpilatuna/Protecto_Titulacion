import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TiendaAdministradorPage } from './tienda-administrador.page';

describe('TiendaAdministradorPage', () => {
  let component: TiendaAdministradorPage;
  let fixture: ComponentFixture<TiendaAdministradorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaAdministradorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TiendaAdministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
