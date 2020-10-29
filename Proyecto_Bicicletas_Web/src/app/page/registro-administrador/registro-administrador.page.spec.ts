import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroAdministradorPage } from './registro-administrador.page';

describe('RegistroAdministradorPage', () => {
  let component: RegistroAdministradorPage;
  let fixture: ComponentFixture<RegistroAdministradorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAdministradorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroAdministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
