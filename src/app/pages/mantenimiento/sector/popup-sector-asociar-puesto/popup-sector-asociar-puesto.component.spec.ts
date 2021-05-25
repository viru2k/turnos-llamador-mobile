import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSectorAsociarPuestoComponent } from './popup-sector-asociar-puesto.component';

describe('PopupSectorAsociarPuestoComponent', () => {
  let component: PopupSectorAsociarPuestoComponent;
  let fixture: ComponentFixture<PopupSectorAsociarPuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSectorAsociarPuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSectorAsociarPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
