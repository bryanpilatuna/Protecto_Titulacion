import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonarPage } from './donar.page';

describe('DonarPage', () => {
  let component: DonarPage;
  let fixture: ComponentFixture<DonarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
