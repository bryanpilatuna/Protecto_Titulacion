import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTiendaPage } from './edit-tienda.page';

describe('EditTiendaPage', () => {
  let component: EditTiendaPage;
  let fixture: ComponentFixture<EditTiendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTiendaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
