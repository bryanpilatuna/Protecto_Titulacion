import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisBicisPage } from './mis-bicis.page';

describe('MisBicisPage', () => {
  let component: MisBicisPage;
  let fixture: ComponentFixture<MisBicisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisBicisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisBicisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
