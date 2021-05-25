import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNumerosGestionEditarComponent } from './popup-numeros-gestion-editar.component';

describe('PopupNumerosGestionEditarComponent', () => {
  let component: PopupNumerosGestionEditarComponent;
  let fixture: ComponentFixture<PopupNumerosGestionEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNumerosGestionEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNumerosGestionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
