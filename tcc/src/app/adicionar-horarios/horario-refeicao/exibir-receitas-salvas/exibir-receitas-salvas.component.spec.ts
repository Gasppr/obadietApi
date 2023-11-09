import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExibirReceitasSalvasComponent } from './exibir-receitas-salvas.component';

describe('ExibirReceitasSalvasComponent', () => {
  let component: ExibirReceitasSalvasComponent;
  let fixture: ComponentFixture<ExibirReceitasSalvasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirReceitasSalvasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExibirReceitasSalvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
