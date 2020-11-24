import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BicisDisponiblesPage } from './bicis-disponibles.page';

describe('BicisDisponiblesPage', () => {
  let component: BicisDisponiblesPage;
  let fixture: ComponentFixture<BicisDisponiblesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicisDisponiblesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BicisDisponiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
