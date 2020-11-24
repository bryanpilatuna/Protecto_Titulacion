import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BicisNodisponiblesPage } from './bicis-nodisponibles.page';

describe('BicisNodisponiblesPage', () => {
  let component: BicisNodisponiblesPage;
  let fixture: ComponentFixture<BicisNodisponiblesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicisNodisponiblesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BicisNodisponiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
