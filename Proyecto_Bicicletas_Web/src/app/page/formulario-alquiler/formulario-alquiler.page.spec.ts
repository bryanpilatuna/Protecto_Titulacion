import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioAlquilerPage } from './formulario-alquiler.page';

describe('FormularioAlquilerPage', () => {
  let component: FormularioAlquilerPage;
  let fixture: ComponentFixture<FormularioAlquilerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAlquilerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioAlquilerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
