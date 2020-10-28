import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuClientePage } from './menu-cliente.page';

describe('MenuClientePage', () => {
  let component: MenuClientePage;
  let fixture: ComponentFixture<MenuClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
