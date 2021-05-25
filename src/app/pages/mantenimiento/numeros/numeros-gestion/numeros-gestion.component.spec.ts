import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerosGestionComponent } from './numeros-gestion.component';

describe('NumerosGestionComponent', () => {
  let component: NumerosGestionComponent;
  let fixture: ComponentFixture<NumerosGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumerosGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumerosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
