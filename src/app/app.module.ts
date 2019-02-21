import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { RestService } from './rest.service';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
import { ToastModule } from 'primeng/toast';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { MergeComponent } from './user/merge/merge.component';
import { ApproveComponent } from './user/approve/approve.component';
import { InviteComponent } from './user/invite/invite.component';
import { TaguserComponent } from './tag/taguser/taguser.component';
import { TagfileComponent } from './tag/tagfile/tagfile.component';
import { TerminalComponent } from './terminal/terminal.component';
import { ChipsModule } from 'primeng/chips';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TerminalModule } from 'primeng/terminal';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RewardCodeComponent } from './reward-code/reward-code.component';
import { SettingsComponent } from './settings/settings.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { InplaceModule } from 'primeng/inplace';
import { StatusComponent } from './status/status.component';


const appRoutes: Routes = [
  { path: 'terminal', component: TerminalComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'user/approve', component: ApproveComponent },
  { path: 'user/merge', component: MergeComponent },
  { path: 'user/invite', component: InviteComponent },
  { path: 'tag/user', component: TaguserComponent },
  { path: 'tag/file', component: TagfileComponent },
  { path: 'rewardcode', component: RewardCodeComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'status', component: StatusComponent },
  { path: '', component: StatusComponent}];

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    MergeComponent,
    ApproveComponent,
    InviteComponent,
    TaguserComponent,
    TagfileComponent,
    TerminalComponent,
    RewardCodeComponent,
    SettingsComponent,
    HomepageComponent,
    StatusComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    ChipsModule,
    RadioButtonModule,
    TerminalModule,
    PasswordModule,
    InputTextareaModule,
    SidebarModule,
    CheckboxModule,
    DataViewModule,
    InplaceModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [RestService, MessageService, TerminalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
