import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {


  lang: any = ""
  constructor(private translate: TranslateService) {
    this.lang = this.translate.currentLang;
  }

  mobileMenuOpen = false;
  isDropdownOpen = false;
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('translate-y-0', this.mobileMenuOpen);
      mobileMenu.classList.toggle('-translate-y-full', !this.mobileMenuOpen);
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  changeLanguage() {
    if (this.lang == "en") {
      localStorage.setItem("lang", "ar");
    }
    else {
      localStorage.setItem("lang", "en");
    }
    window.location.reload()
  }
}
