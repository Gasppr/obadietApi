import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cadastro1Page } from './cadastro1.page';

describe('Cadastro1Page', () => {
  let component: Cadastro1Page;
  let fixture: ComponentFixture<Cadastro1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Cadastro1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
