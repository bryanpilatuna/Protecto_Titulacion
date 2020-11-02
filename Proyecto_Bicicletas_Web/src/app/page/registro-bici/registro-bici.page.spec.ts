import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroBiciPage } from './registro-bici.page';

describe('RegistroBiciPage', () => {
  let component: RegistroBiciPage;
  let fixture: ComponentFixture<RegistroBiciPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroBiciPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroBiciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
