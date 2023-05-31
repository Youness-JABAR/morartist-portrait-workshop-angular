import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {FormControl, FormGroup} from '@angular/forms';

// import Swiper core and required modules
import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {





  title = 'angularFrontend';

//  the prices **************************************************
  sizes = [
    {name: '30X40', price: 40},
    {name: '40X50', price: 60},
    {name: '50X60', price: 80},
    {name: '60X70', price: 100},

  ];
  styles = [
    {name: 'photo on canvas', price: 40},
    {name: 'collage', price: 60},


  ];

  form = new FormGroup({
    size: new FormControl(this.sizes[0]),
    style: new FormControl(this.styles[0]),
    gift: new FormControl(0),
  });
  sizePrice =0
  calculatePrice(){
    this.sizePrice=this.form.value.size.price + this.form.value.style.price + (this.form.value.gift ? 10:0)
  }


  showMenu = false;
    config: SwiperOptions = {
      slidesPerView: 1,
      spaceBetween: 50,
      navigation: true,
      pagination: { clickable: true },
      scrollbar: { draggable: true },
      cssMode: true,
      breakpoints: {
        // when window width is >= 320px
        568: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 480px
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 10
        }
      }
    };

    // change colors of nav while scrolling  *******************
    sections = document.querySelectorAll<HTMLElement>('section[id]');

    scrollActive() {
      this.sections = document.querySelectorAll<HTMLElement>('section[id]');
      const scrolly = window.pageYOffset;
      this.sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 300;
        const sectionId = current.getAttribute('id');

        if (scrolly > sectionTop && scrolly <= sectionTop + sectionHeight) {
          const elt = document.querySelector(
            '.nav__menu a[href*=' + sectionId + ']'
          ) as HTMLElement;

          elt.classList.add('active-link');
        } else {
          const elt = document.querySelector(
            '.nav__menu a[href*=' + sectionId + ']'
          ) as HTMLElement;
          elt.classList.remove('active-link');
        }
      });
    }

  // SCROLL HEADER JS ***************************************
  scrollHeader() {
    const scrolly = window.pageYOffset;

    const nav = document.getElementById('header') as HTMLElement;
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (scrolly >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
  }

  // SCROLL up JS ***************************************

  scrollUp() {
    const scrolly = window.pageYOffset;

    const scrollUp = document.getElementById('scroll-up') as HTMLElement;
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scro
    if (scrolly >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
  }
  // pictures tabs ***************************************

  ngOnInit() {
    this.calculatePrice()
    window.addEventListener('scroll', this.scrollActive);
    window.addEventListener('scroll', this.scrollHeader);
    window.addEventListener('scroll', this.scrollUp);

    const tabs = document.querySelectorAll<HTMLDataElement>('[data-target]'),
      tabContents = document.querySelectorAll<HTMLDataElement>('[data-content]');

    tabs.forEach((tab) => {
      const target_id = tab.dataset.target as unknown as keyof HTMLElementTagNameMap ;

      tab.addEventListener('click', () => {

        const target = document.querySelector(target_id) as HTMLElement ;

        tabContents.forEach((tabContent) => {
          tabContent.classList.remove('catalog__active');
        });
        target.classList.add('catalog__active');
        tabs.forEach(tab => {
          tab.classList.remove('catalog__active');
        });
        tab.classList.add('catalog__active');
      });
    });
  }
  constructor(private translateService: TranslateService) {}

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }
}
function scroftactive(arg0: string, scroftactive: any) {
  throw new Error('Function not implemented.');
}
