import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Iniciov2Page } from './iniciov2.page';

describe('Iniciov2Page', () => {
  let component: Iniciov2Page;
  let fixture: ComponentFixture<Iniciov2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Iniciov2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
