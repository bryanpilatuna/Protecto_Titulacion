import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditClientePage } from './edit-cliente.page';

describe('EditClientePage', () => {
  let component: EditClientePage;
  let fixture: ComponentFixture<EditClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
