import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DescagarAppPage } from './descagar-app.page';

describe('DescagarAppPage', () => {
  let component: DescagarAppPage;
  let fixture: ComponentFixture<DescagarAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescagarAppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DescagarAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
