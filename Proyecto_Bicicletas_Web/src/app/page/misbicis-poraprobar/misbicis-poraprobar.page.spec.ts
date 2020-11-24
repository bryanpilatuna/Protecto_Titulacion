import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisbicisPoraprobarPage } from './misbicis-poraprobar.page';

describe('MisbicisPoraprobarPage', () => {
  let component: MisbicisPoraprobarPage;
  let fixture: ComponentFixture<MisbicisPoraprobarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisbicisPoraprobarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisbicisPoraprobarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
