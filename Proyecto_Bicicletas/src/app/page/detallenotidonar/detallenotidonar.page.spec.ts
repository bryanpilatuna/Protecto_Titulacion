import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallenotidonarPage } from './detallenotidonar.page';

describe('DetallenotidonarPage', () => {
  let component: DetallenotidonarPage;
  let fixture: ComponentFixture<DetallenotidonarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallenotidonarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallenotidonarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
