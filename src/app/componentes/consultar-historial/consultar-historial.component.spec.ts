import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarHistorialComponent } from './consultar-historial.component';

describe('ConsultarHistorialComponent', () => {
  let component: ConsultarHistorialComponent;
  let fixture: ComponentFixture<ConsultarHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
