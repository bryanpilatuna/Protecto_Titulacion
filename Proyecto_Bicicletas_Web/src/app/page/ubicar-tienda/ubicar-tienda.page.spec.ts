import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UbicarTiendaPage } from './ubicar-tienda.page';

describe('UbicarTiendaPage', () => {
  let component: UbicarTiendaPage;
  let fixture: ComponentFixture<UbicarTiendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicarTiendaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UbicarTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
