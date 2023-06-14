import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperacaoPage } from './recuperacao.page';

describe('RecuperacaoPage', () => {
  let component: RecuperacaoPage;
  let fixture: ComponentFixture<RecuperacaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecuperacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
