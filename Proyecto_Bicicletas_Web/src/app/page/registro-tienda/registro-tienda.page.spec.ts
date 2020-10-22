import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroTiendaPage } from './registro-tienda.page';

describe('RegistroTiendaPage', () => {
  let component: RegistroTiendaPage;
  let fixture: ComponentFixture<RegistroTiendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroTiendaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
