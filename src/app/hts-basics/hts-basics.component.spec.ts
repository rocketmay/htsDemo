import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtsBasicsComponent } from './hts-basics.component';

describe('HtsBasicsComponent', () => {
  let component: HtsBasicsComponent;
  let fixture: ComponentFixture<HtsBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtsBasicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtsBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
