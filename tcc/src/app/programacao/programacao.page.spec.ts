import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramacaoPage } from './programacao.page';

describe('ProgramacaoPage', () => {
  let component: ProgramacaoPage;
  let fixture: ComponentFixture<ProgramacaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProgramacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
