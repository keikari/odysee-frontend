import { TestBed, async } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {Toast, ToastItem} from 'primeng/toast';
import {Menubar, MenubarSub} from 'primeng/menubar';
import {Card, Checkbox, InputText, MenuItem, Messages, MessageService, MessagesModule, Sidebar} from 'primeng/primeng';
import {SettingsComponent} from './settings/settings.component';
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AppModule} from './app.module';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
