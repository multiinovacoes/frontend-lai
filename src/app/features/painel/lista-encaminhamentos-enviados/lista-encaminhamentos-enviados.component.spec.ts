import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEncaminhamentosEnviadosComponent } from './lista-encaminhamentos-enviados.component';

describe('ListaEncaminhamentosEnviadosComponent', () => {
  let component: ListaEncaminhamentosEnviadosComponent;
  let fixture: ComponentFixture<ListaEncaminhamentosEnviadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEncaminhamentosEnviadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEncaminhamentosEnviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
