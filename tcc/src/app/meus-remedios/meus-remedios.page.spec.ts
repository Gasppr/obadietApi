import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeusRemediosPage } from './meus-remedios.page';

describe('MeusRemediosPage', () => {
  let component: MeusRemediosPage;
  let fixture: ComponentFixture<MeusRemediosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeusRemediosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
