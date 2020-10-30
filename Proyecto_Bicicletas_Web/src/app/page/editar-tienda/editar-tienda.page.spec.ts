import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarTiendaPage } from './editar-tienda.page';

describe('EditarTiendaPage', () => {
  let component: EditarTiendaPage;
  let fixture: ComponentFixture<EditarTiendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTiendaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
