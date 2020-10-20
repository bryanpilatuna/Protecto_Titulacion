import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UbitiendaInvitadoPage } from './ubitienda-invitado.page';

describe('UbitiendaInvitadoPage', () => {
  let component: UbitiendaInvitadoPage;
  let fixture: ComponentFixture<UbitiendaInvitadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbitiendaInvitadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UbitiendaInvitadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
