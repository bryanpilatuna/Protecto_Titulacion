import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlquilerDonacionPage } from './alquiler-donacion.page';

describe('AlquilerDonacionPage', () => {
  let component: AlquilerDonacionPage;
  let fixture: ComponentFixture<AlquilerDonacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquilerDonacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlquilerDonacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
