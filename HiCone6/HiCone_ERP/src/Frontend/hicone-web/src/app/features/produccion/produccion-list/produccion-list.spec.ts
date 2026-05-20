import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionListComponent } from './produccion-list';

describe('ProduccionListComponent', () => {
  let component: ProduccionListComponent;
  let fixture: ComponentFixture<ProduccionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduccionListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduccionListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

