# Commander

This project is used as a user interface for LBRY Inc APIs commonly used by the growth team. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The above requires ng to be installed. You can also connect this directly to webstorm to make your life easy, however in case you want to do it:

`npm install @angular/cli@7.3.1` after which you can run `ng serve` as suggested.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

There are 3 files generated with the following suffices, `.css` for styling, `.html` for structure, nested components, etc and `.ts` which is for the business logic. Once created it needs to be linked to the router in `app.module.ts` as referenced below:

```angular2
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
```

Variables for the business logic are bound in `.html`. It uses `[(ngModel)]="primary"` as seen below:

```angular2
<input class="p-col-7 p-justify-center" type="text" pInputText placeholder="Enter user id" style="margin:10px" [(ngModel)]="primary">
```

You can also see below and example of how to call methods in the logic based on responses:

```angular2
<p-button label="Submit" icon="pi pi-check" iconPos="left" (onClick)="inviteUser($event)"></p-button>
```

The response is `onClick` and it is bound to the `inviteUser` function defined in the `.ts` file. There is also code click through features on Webstorm for [Angular](https://angular.io).

The second thing to note is the icon property. There are two kinds of icons supported, [Font Awesome](https://fontawesome.com) denoted with `fa fa-<iconname>`, and the [PrimeNg Icons](https://www.primefaces.org/primeng/#/icons) denoted `pi pi-<iconname>`. 

[PrimeNg](https://www.primefaces.org/primeng) is used for the ui components. There is a wide selection fully featured components and very in depth directions on how to use them. 

Below is an example where we are using the [`p-chips`](https://www.primefaces.org/primeng/#/chips) component:

```angular2
<p-chips placeholder="Enter emails" [(ngModel)]="emails" [allowDuplicate]="false"></p-chips>
```

You will notice `allowDuplicate`. This is listed as a property of the PrimeNg component. To set these you can use values or variables, just be sure to put them in brackets.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

There are also different environments that can be put into npm scripts in the package.json. We have one for the production envronment. See there to see how the site is deployed. Since this is a SPA special settings are required on the web server. We are using caddy so the below rewrite is required:

```json
rewrite {
    to {path} {path}/ /
  }
```

This lets caddy know to redirect path requests from the browser to the Angular application. 

## Contributing

Contributions to this project are welcome, encouraged, and compensated. For more details, see [lbry.io/faq/contributing](https://lbry.io/faq/contributing)

The `master` branch is regularly built and deployed.

## Running unit tests

Developers are strongly encouraged to write unit tests for new code, and to submit new unit tests for old code. Unit tests can be compiled and run with: `ng test` from the source directory.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## License

This project is private. All rights reserved.

## Security

We take security seriously. Please contact security@lbry.io regarding any issues you may encounter.
Our PGP key is [here](https://keybase.io/lbry/key.asc) if you need it.

## Contact

The primary contact for this project is [@Tiger5226](https://github.com/tiger5226) (beamer@lbry.io)
