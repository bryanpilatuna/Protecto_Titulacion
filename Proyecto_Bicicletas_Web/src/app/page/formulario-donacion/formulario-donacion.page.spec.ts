import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioDonacionPage } from './formulario-donacion.page';

describe('FormularioDonacionPage', () => {
  let component: FormularioDonacionPage;
  let fixture: ComponentFixture<FormularioDonacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioDonacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioDonacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
