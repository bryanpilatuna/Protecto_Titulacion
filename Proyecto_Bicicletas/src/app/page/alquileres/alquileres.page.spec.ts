import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlquileresPage } from './alquileres.page';

describe('AlquileresPage', () => {
  let component: AlquileresPage;
  let fixture: ComponentFixture<AlquileresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquileresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlquileresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
