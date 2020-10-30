import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteAdministradorPage } from './cliente-administrador.page';

describe('ClienteAdministradorPage', () => {
  let component: ClienteAdministradorPage;
  let fixture: ComponentFixture<ClienteAdministradorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteAdministradorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteAdministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
