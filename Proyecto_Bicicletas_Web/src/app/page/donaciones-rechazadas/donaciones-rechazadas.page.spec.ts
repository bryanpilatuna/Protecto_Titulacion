import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonacionesRechazadasPage } from './donaciones-rechazadas.page';

describe('DonacionesRechazadasPage', () => {
  let component: DonacionesRechazadasPage;
  let fixture: ComponentFixture<DonacionesRechazadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonacionesRechazadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonacionesRechazadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
