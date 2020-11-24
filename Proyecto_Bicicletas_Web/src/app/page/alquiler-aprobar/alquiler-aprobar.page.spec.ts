import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlquilerAprobarPage } from './alquiler-aprobar.page';

describe('AlquilerAprobarPage', () => {
  let component: AlquilerAprobarPage;
  let fixture: ComponentFixture<AlquilerAprobarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquilerAprobarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlquilerAprobarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
