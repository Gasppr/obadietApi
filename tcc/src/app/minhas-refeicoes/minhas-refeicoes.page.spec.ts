import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasRefeicoesPage } from './minhas-refeicoes.page';

describe('MinhasRefeicoesPage', () => {
  let component: MinhasRefeicoesPage;
  let fixture: ComponentFixture<MinhasRefeicoesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MinhasRefeicoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
