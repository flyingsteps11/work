import { isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { PageService } from "@core/services/page.service";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("sumbitOnMainPage", { static: false })
  sumbitOnMainPage: ElementRef;
  @ViewChild("containerTrust", { static: false }) containerTrust: ElementRef;
  @ViewChild("centerSlider", { static: false }) centerSlider: ElementRef;

  isLoadingEnd: boolean; // Need for preloader
  @Input() complitedLoadMainImages: boolean;
  @Input() complitedLoadCenterImages: boolean;
  @Input() animationEnd: boolean;
  positionScrollToTop: number;

  initialTop: number;
  displayBtn: boolean;
  static callCounter: number = 0;
  animationCall: boolean;
  hiddenScrollToTopNumber: number;
  changeButtonColor: boolean;
  centerSlideroffsetTop: number;
  centerSlideroffsetBottom: number;

  hideScrollToTopButtons: boolean;
  advantagesList = [
    {
      icon: "advantage1",
      title: "Быстро",
      text: "Старт работ — сразу",
      number: "01",
    },
    {
      icon: "advantage2",
      title: "Без затрат на строительство и оборудование",
      text: "Выпуск на наших мощностях",
      number: "02",
    },
    {
      icon: "advantage3",
      title: "Надежно",
      text: "Нужные объемы <br/>в установленные сроки",
      number: "03",
    },
    {
      icon: "advantage4",
      title: "Под вашим брендом",
      text: "Все процессы берем на себя",
      number: "04",
    },
    {
      icon: "advantage5",
      title: "Качество мирового уровня",
      text: "Сертификация  ISO 22000:2018, лабораторный контроль, экспорт продуктов в страны ЕС",
      number: "05",
    },
    {
      icon: "advantage6",
      title: "Вам не нужны складские помещения",
      text: "Храним выпущенную продукцию у себя",
      number: "06",
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private pageService: PageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pageService.isMainPage = true;
    MainPageComponent.callCounter++;
    this.animationCall = MainPageComponent.callCounter <= 1;
  }

  ngOnDestroy(): void {
    this.pageService.isMainPage = false;
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
    this.onWindowScroll();
    this.calcPosition();
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      let scroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.displayBtn = scroll >= this.positionScrollToTop;
      this.changeButtonColor =
        scroll >= this.centerSlideroffsetTop &&
        scroll < this.centerSlideroffsetBottom;
    }
  }

  @HostListener("window:resize")
  calcPosition() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const screen = window.innerWidth >= 1920 ? 78 : 36;
        const submitRequest = this.sumbitOnMainPage.nativeElement.offsetHeight;
        this.positionScrollToTop =
          this.sumbitOnMainPage.nativeElement.getBoundingClientRect().top -
          window.innerHeight +
          submitRequest +
          screen;
        this.hiddenScrollToTopNumber =
          this.containerTrust.nativeElement.getBoundingClientRect().top -
          window.innerHeight;
        this.centerSlideroffsetTop =
          this.centerSlider.nativeElement.getBoundingClientRect().top -
          window.innerHeight +
          100;
        this.centerSlideroffsetBottom =
          this.centerSlider.nativeElement.getBoundingClientRect().top -
          window.innerHeight +
          this.centerSlider.nativeElement.offsetHeight;
      }, 250);
    }
  }

  //for preloader

  loadImagesMainSlider(value) {
    this.complitedLoadMainImages = value;
  }

  loadImagesCenterSlider(value) {
    this.complitedLoadCenterImages = value;
  }

  finishAnimation(value): void {
    this.animationEnd = value;
    if (
      this.complitedLoadCenterImages &&
      this.animationEnd &&
      this.complitedLoadMainImages
    ) {
      this.isLoadingEnd = true;
    } else {
      this.isLoadingEnd = false;
    }
    this.cd.detectChanges();
  }

  hideSumbitbuttons(value: any) {
    this.hideScrollToTopButtons = value;
    if (!value) {
      this.centerSlider.nativeElement.scrollIntoView();
    }
  }
}
