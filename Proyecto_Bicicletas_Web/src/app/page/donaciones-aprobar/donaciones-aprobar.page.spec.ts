import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonacionesAprobarPage } from './donaciones-aprobar.page';

describe('DonacionesAprobarPage', () => {
  let component: DonacionesAprobarPage;
  let fixture: ComponentFixture<DonacionesAprobarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonacionesAprobarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonacionesAprobarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
