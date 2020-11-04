import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TiendaAlquilerPage } from './tienda-alquiler.page';

describe('TiendaAlquilerPage', () => {
  let component: TiendaAlquilerPage;
  let fixture: ComponentFixture<TiendaAlquilerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaAlquilerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TiendaAlquilerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
