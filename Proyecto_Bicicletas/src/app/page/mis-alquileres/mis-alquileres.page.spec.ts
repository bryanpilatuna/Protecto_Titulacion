import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisAlquileresPage } from './mis-alquileres.page';

describe('MisAlquileresPage', () => {
  let component: MisAlquileresPage;
  let fixture: ComponentFixture<MisAlquileresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisAlquileresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisAlquileresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
