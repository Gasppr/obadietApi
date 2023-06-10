import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cadastro3Page } from './cadastro3.page';

describe('Cadastro3Page', () => {
  let component: Cadastro3Page;
  let fixture: ComponentFixture<Cadastro3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Cadastro3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
