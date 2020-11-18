import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificacionAlquilerPage } from './notificacion-alquiler.page';

describe('NotificacionAlquilerPage', () => {
  let component: NotificacionAlquilerPage;
  let fixture: ComponentFixture<NotificacionAlquilerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionAlquilerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionAlquilerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
