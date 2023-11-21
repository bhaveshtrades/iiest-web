import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPanelComponent } from './setting-panel.component';

describe('SettingPanelComponent', () => {
  let component: SettingPanelComponent;
  let fixture: ComponentFixture<SettingPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingPanelComponent]
    });
    fixture = TestBed.createComponent(SettingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
