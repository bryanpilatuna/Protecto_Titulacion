import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuTiendaPage } from './menu-tienda.page';

describe('MenuTiendaPage', () => {
  let component: MenuTiendaPage;
  let fixture: ComponentFixture<MenuTiendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTiendaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
