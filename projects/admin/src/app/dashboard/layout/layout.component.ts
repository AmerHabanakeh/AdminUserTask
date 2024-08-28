import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../manage-users/services/users.service';
import { ThemeServiceService } from '../../core/theme/theme-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  ngOnInit(): void {
    this.getUserData();
  }


  lang: any = "";
  userData: any;
  isDropdownOpen = false;
  isMobileMenuOpen = false;

  constructor(private translate: TranslateService, private router: Router, private userService: UsersService, private themeService: ThemeServiceService) {
    this.lang = this.translate.currentLang;
  }

  getUserData() {
    let token = JSON.stringify(localStorage.getItem("token"));
    this.userData = JSON.parse(window.atob(token.split('.')[1]));
  }


  changeLanguage() {
    console.log(this.lang)
    if (this.lang == "en") {
      localStorage.setItem("lang", "ar");
    }
    else {
      localStorage.setItem("lang", "en");
    }
    window.location.reload()
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem("token");
  }

  toggleDropdown(event: MouseEvent) {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.stopPropagation();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.isDropdownOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
