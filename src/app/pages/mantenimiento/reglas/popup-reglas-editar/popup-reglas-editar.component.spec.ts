import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupReglasEditarComponent } from './popup-reglas-editar.component';

describe('PopupReglasEditarComponent', () => {
  let component: PopupReglasEditarComponent;
  let fixture: ComponentFixture<PopupReglasEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupReglasEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupReglasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
