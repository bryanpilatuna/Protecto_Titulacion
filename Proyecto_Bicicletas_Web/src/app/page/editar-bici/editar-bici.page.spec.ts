import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarBiciPage } from './editar-bici.page';

describe('EditarBiciPage', () => {
  let component: EditarBiciPage;
  let fixture: ComponentFixture<EditarBiciPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarBiciPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarBiciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
