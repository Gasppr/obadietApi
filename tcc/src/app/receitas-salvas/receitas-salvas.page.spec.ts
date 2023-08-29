import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceitasSalvasPage } from './receitas-salvas.page';

describe('ReceitasSalvasPage', () => {
  let component: ReceitasSalvasPage;
  let fixture: ComponentFixture<ReceitasSalvasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReceitasSalvasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
