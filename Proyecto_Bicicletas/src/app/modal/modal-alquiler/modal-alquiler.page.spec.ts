import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalAlquilerPage } from './modal-alquiler.page';

describe('ModalAlquilerPage', () => {
  let component: ModalAlquilerPage;
  let fixture: ComponentFixture<ModalAlquilerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAlquilerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAlquilerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
