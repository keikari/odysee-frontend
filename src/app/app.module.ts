import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TemplateComponent } from './template/send-templates/template.component';
import { MergeComponent } from './user/merge/merge.component';
import { ApproveComponent } from './user/approve/approve.component';
import { InviteComponent } from './user/invite/invite.component';
import { TaguserComponent } from './tag/taguser/taguser.component';
import { TagfileComponent } from './tag/tagfile/tagfile.component';
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
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { TagchannelComponent } from './tag/tagchannel/tagchannel.component';
import { PendingComponent } from './scams/pending.component';
import {AccordionModule} from 'primeng/accordion';
import { CountryCodesComponent } from './country-codes/country-codes.component';
import { SqlTemplatesComponent } from './template/sql-templates/sql-templates.component';
import { DeviceNotificationComponent } from './device-notification/device-notification.component';
import { AuditUserComponent } from './scams/audit-user.component';
import { UserDetailComponent } from './scams/user-detail/user-detail.component';
import { UserReviewComponent } from './scams/user-review/user-review.component';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import {
    BlockUIModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    TabViewModule,
    ToolbarModule,
    TreeTableModule
} from 'primeng';
/* Import the language you need to highlight */
import 'prismjs';
import 'prismjs/components/prism-sql.js';
import { PrismComponent } from './prism/prism.component';
import {DEFAULT_TIMEOUT, TimeoutInterceptor} from './timeout-interceptor';
import { PendingVerificationComponent } from './pending-verification/pending-verification.component';
import { ListReviewComponent } from './pending-verification/list-review/list-review.component';
import { ListDetailComponent } from './pending-verification/list-detail/list-detail.component';
import { VerificationToolbarComponent } from './pending-verification/list-detail/verification-toolbar/verification-toolbar.component';
import { DiscordComponent } from './pending-verification/list-detail/discord/discord.component';
import { FacebookComponent } from './pending-verification/list-detail/facebook/facebook.component';
import { LinkedinComponent } from './pending-verification/list-detail/linkedin/linkedin.component';
import { GithubComponent } from './pending-verification/list-detail/github/github.component';
import { FormDataComponent } from './pending-verification/list-detail/form-data/form-data.component';
import { LbryIncComponent } from './pending-verification/list-detail/lbry-inc/lbry-inc.component';
import { TwitterComponent } from './pending-verification/list-detail/twitter/twitter.component';


const appRoutes: Routes = [
  { path: 'templates/send', component: TemplateComponent },
  { path: 'templates/sql', component: SqlTemplatesComponent },
  { path: 'user/approve', component: ApproveComponent },
  { path: 'user/merge', component: MergeComponent },
  { path: 'user/invite', component: InviteComponent },
  { path: 'tag/user', component: TaguserComponent },
  { path: 'tag/file', component: TagfileComponent },
  { path: 'rewardcode', component: RewardCodeComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'status', component: StatusComponent },
  { path: 'tag/channel', component: TagchannelComponent },
  { path: 'admin/pending', component: PendingComponent },
  { path: 'admin/audit', component: AuditUserComponent },
  { path: 'admin/audit/:id', component: AuditUserComponent },
  { path: 'admin/countrycodes', component: CountryCodesComponent },
  { path: 'notifications', component: DeviceNotificationComponent },
  { path: 'admin/verification', component: PendingVerificationComponent },
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
    RewardCodeComponent,
    SettingsComponent,
    HomepageComponent,
    StatusComponent,
    TagchannelComponent,
    PendingComponent,
    CountryCodesComponent,
    SqlTemplatesComponent,
    PrismComponent,
    DeviceNotificationComponent,
    AuditUserComponent,
    UserDetailComponent,
    UserReviewComponent,
    PendingVerificationComponent,
    ListReviewComponent,
    ListDetailComponent,
    VerificationToolbarComponent,
    DiscordComponent,
    FacebookComponent,
    LinkedinComponent,
    GithubComponent,
    FormDataComponent,
    LbryIncComponent,
    TwitterComponent
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
        DropdownModule,
        CardModule,
        TableModule,
        CalendarModule,
        ContextMenuModule,
        DialogModule,
        InputMaskModule,
        AccordionModule,
        CodeHighlighterModule,
        InputSwitchModule,
        BlockUIModule,
        ProgressSpinnerModule,
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        ),
        ToolbarModule,
        TabViewModule,
        TreeTableModule,
        SplitButtonModule
    ],
  providers: [
    ApiService,
    MessageService,
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 900000 }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
