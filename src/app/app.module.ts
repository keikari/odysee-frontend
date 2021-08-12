import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ButtonModule} from 'primeng/button';
import {AppComponent} from './app.component';
import {ApiService} from './services/api.service';
import {MessagesModule} from 'primeng/messages';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {TemplateComponent} from './template/send-templates/template.component';
import {MergeComponent} from './user/merge/merge.component';
import {ApproveComponent} from './user/approve/approve.component';
import {InviteComponent} from './user/invite/invite.component';
import {TaguserComponent} from './tag/taguser/taguser.component';
import {TagfileComponent} from './tag/tagfile/tagfile.component';
import {ChipsModule} from 'primeng/chips';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TerminalModule} from 'primeng/terminal';
import {PasswordModule} from 'primeng/password';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RewardCodeComponent} from './reward-code/reward-code.component';
import {SettingsComponent} from './settings/settings.component';
import {HomepageComponent} from './homepage/homepage.component';
import {SidebarModule} from 'primeng/sidebar';
import {CheckboxModule} from 'primeng/checkbox';
import {DataViewModule} from 'primeng/dataview';
import {InplaceModule} from 'primeng/inplace';
import {StatusComponent} from './status/status.component';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {InputMaskModule} from 'primeng/inputmask';
import {TagchannelComponent} from './tag/tagchannel/tagchannel.component';
import {PendingComponent} from './scams/pending.component';
import {AccordionModule} from 'primeng/accordion';
import {CountryCodesComponent} from './country-codes/country-codes.component';
import {SqlTemplatesComponent} from './template/sql-templates/sql-templates.component';
import {DeviceNotificationComponent} from './device-notification/device-notification.component';
import {AuditUserComponent} from './scams/audit-user.component';
import {UserDetailComponent} from './scams/user-detail/user-detail.component';
import {UserReviewComponent} from './scams/user-review/user-review.component';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {
  BlockUIModule, ChartModule, InputNumberModule,
  InputSwitchModule, MultiSelectModule, OverlayPanelModule, PanelModule,
  ProgressSpinnerModule, SelectButtonModule,
  SplitButtonModule,
  TabViewModule,
  ToolbarModule,
  TreeTableModule,
  TriStateCheckboxModule,
} from 'primeng';
/* Import the language you need to highlight */
import 'prismjs';
import 'prismjs/components/prism-sql.js';
import {PrismComponent} from './prism/prism.component';
import {DEFAULT_TIMEOUT, TimeoutInterceptor} from './timeout-interceptor';
import {PendingVerificationComponent} from './pending-verification/pending-verification.component';
import {ListReviewComponent} from './pending-verification/list-review/list-review.component';
import {ListDetailComponent} from './pending-verification/list-detail/list-detail.component';
import {VerificationToolbarComponent} from './pending-verification/list-detail/verification-toolbar/verification-toolbar.component';
import {DiscordComponent} from './pending-verification/list-detail/discord/discord.component';
import {FacebookComponent} from './pending-verification/list-detail/facebook/facebook.component';
import {LinkedinComponent} from './pending-verification/list-detail/linkedin/linkedin.component';
import {GithubComponent} from './pending-verification/list-detail/github/github.component';
import {FormDataComponent} from './pending-verification/list-detail/form-data/form-data.component';
import {LbryIncComponent} from './pending-verification/list-detail/lbry-inc/lbry-inc.component';
import {TwitterComponent} from './pending-verification/list-detail/twitter/twitter.component';
import {RetentionComponent} from './retention/retention.component';
import {ChannelFactorComponent} from './channel-factor/channel-factor.component';
import {YtQueueComponent} from './yt-queue/yt-queue.component';
import {ReportsComponent} from './reports/reports.component';
import { SearchComponent } from './search/search.component';
import {LighthouseService} from './services/lighthouse.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import {AuthGuard} from './shared/auth.guard';

const appRoutes: Routes = [
  {path: 'templates/send', component: TemplateComponent, canActivate: [AuthGuard]},
  {path: 'templates/sql', component: SqlTemplatesComponent, canActivate: [AuthGuard]},
  {path: 'user/approve', component: ApproveComponent, canActivate: [AuthGuard]},
  {path: 'user/merge', component: MergeComponent, canActivate: [AuthGuard]},
  {path: 'user/invite', component: InviteComponent, canActivate: [AuthGuard]},
  {path: 'tag/user', component: TaguserComponent, canActivate: [AuthGuard]},
  {path: 'tag/file', component: TagfileComponent, canActivate: [AuthGuard]},
  {path: 'reward-code', component: RewardCodeComponent, canActivate: [AuthGuard]},
  {path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'status', component: StatusComponent, canActivate: [AuthGuard]},
  {path: 'tag/channel', component: TagchannelComponent, canActivate: [AuthGuard]},
  {path: 'admin/pending', component: PendingComponent, canActivate: [AuthGuard]},
  {path: 'admin/audit', component: AuditUserComponent, canActivate: [AuthGuard]},
  {path: 'admin/audit/:id', component: AuditUserComponent, canActivate: [AuthGuard]},
  {path: 'admin/country-codes', component: CountryCodesComponent, canActivate: [AuthGuard]},
  {path: 'notifications', component: DeviceNotificationComponent, canActivate: [AuthGuard]},
  {path: 'admin/verification', component: PendingVerificationComponent, canActivate: [AuthGuard]},
  {path: 'retention', component: RetentionComponent, canActivate: [AuthGuard]},
  {path: 'channel-factor', component: ChannelFactorComponent, canActivate: [AuthGuard]},
  {path: 'admin/yt-queue', component: YtQueueComponent, canActivate: [AuthGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: '', component: StatusComponent}];

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
    TwitterComponent,
    RetentionComponent,
    ChannelFactorComponent,
    YtQueueComponent,
    ReportsComponent,
    SearchComponent,
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
    SplitButtonModule,
    PanelModule,
    InputNumberModule,
    MultiSelectModule,
    ConfirmDialogModule,
    SelectButtonModule,
    OverlayPanelModule,
    TriStateCheckboxModule,
    ChartModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:4200', 'https://api.odysee.com', 'https://commander.lbry.com'],
        sendAccessToken: true
      }
    }),
  ],
  providers: [
    ApiService,
    MessageService,
    LighthouseService,
    ConfirmationService,
    AuthGuard,
    [{provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true}],
    [{provide: DEFAULT_TIMEOUT, useValue: 1500000}],
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
