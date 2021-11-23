import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenstatComponent } from './tokenstat.component';

describe('TokenstatComponent', () => {
  let component: TokenstatComponent;
  let fixture: ComponentFixture<TokenstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenstatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
