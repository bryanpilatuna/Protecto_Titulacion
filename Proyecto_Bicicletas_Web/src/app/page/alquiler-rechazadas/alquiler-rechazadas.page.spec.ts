import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlquilerRechazadasPage } from './alquiler-rechazadas.page';

describe('AlquilerRechazadasPage', () => {
  let component: AlquilerRechazadasPage;
  let fixture: ComponentFixture<AlquilerRechazadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquilerRechazadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlquilerRechazadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
