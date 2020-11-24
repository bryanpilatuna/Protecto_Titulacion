import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BicisMantenimientoPage } from './bicis-mantenimiento.page';

describe('BicisMantenimientoPage', () => {
  let component: BicisMantenimientoPage;
  let fixture: ComponentFixture<BicisMantenimientoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicisMantenimientoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BicisMantenimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
