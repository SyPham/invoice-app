import { AccountSystem } from './../../shared/_models/account';
import { AuthenticationService } from '../../../app/shared/_services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { navItems } from '../../_nav';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AppSidebarComponent } from '@coreui/angular';
import { Role } from '../../../app/shared/_constants/role';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  account: AccountSystem;
  @ViewChild('appSidebar') appSidebar: AppSidebarComponent;

  constructor(private authenticationService: AuthenticationService,
    public translate: TranslateService
    ) {
    this.authenticationService.account.subscribe(x => this.account = x);
  }
  ngOnInit(): void {
    if (this.authenticationService.accountValue.roleCode === Role.MEMBER) {
      this.navItems = this.navItems.filter(x => x.url.includes('search-invoice'));
    }
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.use(lang);
      this.navItems = navItems.map(items => { this.translates(items); return items; });
    }
  }
  translates(item): void {
    if ('name' in item) {
      const trans = this.translate.instant(`${item.name}`);
      if (trans !== `${item.name}`) {
        item.name = trans;
      }
    }
    if (item.children && item.children.length > 0) {
      item.children.map((child: any) => this.translates(child));
    }
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    this.authenticationService.logout();
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    location.reload();
  }
}
