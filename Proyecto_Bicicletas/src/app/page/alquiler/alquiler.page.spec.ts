import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlquilerPage } from './alquiler.page';

describe('AlquilerPage', () => {
  let component: AlquilerPage;
  let fixture: ComponentFixture<AlquilerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquilerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlquilerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
