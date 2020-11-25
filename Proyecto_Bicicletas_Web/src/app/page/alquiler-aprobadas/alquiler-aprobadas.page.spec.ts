import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlquilerAprobadasPage } from './alquiler-aprobadas.page';

describe('AlquilerAprobadasPage', () => {
  let component: AlquilerAprobadasPage;
  let fixture: ComponentFixture<AlquilerAprobadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquilerAprobadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlquilerAprobadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
