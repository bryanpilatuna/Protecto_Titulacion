import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TiendaDonacionPage } from './tienda-donacion.page';

describe('TiendaDonacionPage', () => {
  let component: TiendaDonacionPage;
  let fixture: ComponentFixture<TiendaDonacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaDonacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TiendaDonacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
