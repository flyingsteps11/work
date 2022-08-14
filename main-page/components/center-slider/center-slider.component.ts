import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { MatDialog } from "@angular/material/dialog";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { NgAnimateScrollService } from "@core/services/ng-animate-scroll.service";
import { VideoModalComponent } from "./video-modal/video-modal.component";
import { CarouselModalComponent } from "./carousel-modal/carousel-modal.component";

export const swiperConfig: SwiperConfigInterface = {
  slidesPerView: 1,
  preloadImages: true,
  // slideToClickedSlide: false,
  preventClicks: true,
  preventClicksPropagation: false,
  pagination: {
    el: ".video-bullets",
    bulletClass: "swiper--bullet",
    bulletActiveClass: "active",
    clickable: true,
    renderBullet(index, className) {
      return (
        '<button class="bullets--item ' +
        className +
        '"><span class="bullets--item--text">' +
        index +
        '</span><span class="bullets--item--dot"></span></button>'
      );
    },
  },
};

@Component({
  selector: "app-center-slider",
  templateUrl: "./center-slider.component.html",
  styleUrls: ["./center-slider.component.scss"],
})
export class CenterSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("horizontalScrollBlock", { static: false })
  horizontalBlock!: ElementRef;
  @ViewChildren("section") sections!: QueryList<ElementRef>;
  @ViewChild("videoPlayer", { static: false }) videoPlayer: ElementRef;
  @ViewChild("videoModal", { static: false }) videoModal: ElementRef;

  @Output() finishLoadImages = new EventEmitter<boolean>();
  @Output() playVideo: EventEmitter<any> = new EventEmitter<any>();
  complitedImagesCount = 0;
  complitedLoadImages: boolean;
  screenwidth!: number;
  gsapDiv: any;
  sectionsG: any;
  offsetGsap: number;
  screenTablet: boolean;
  sliderImages = [
    {
      id: 1,
      src: "slide2",
      title: "1 <span>млн</span>",
      classDef: "text1",
      text: `Высокая скорость. Каждый час производим 1 000 000+ капсул, таблеток и саше-пакетов.`,
      button: false,
    },
    {
      id: 2,
      src: "slide3",
      title: ">60",
      classDef: "text2",
      text: `60+ патентов. Не имеющие аналогов технологии и рецептуры для создания уникальных продуктов.`,
      button: false,
    },
    {
      id: 3,
      src: "slide4",
      title: "1800 <span>м2</span>",
      title_large: true,
      classDef: "text3",
      text: `Современное производство. Новейший производственный комплекс в экологически чистом районе Тверской области.`,
      button: true,
    },
  ];
  readonly swiper: SwiperConfigInterface = swiperConfig;
  isVideoActive: boolean;
  videoBg: string;

  constructor(
    private dialog: MatDialog,
    public cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) protected document: any,
    public scrollService: NgAnimateScrollService
  ) {}

  ngOnInit(): void {
    this.onResize();
    // this.checkIn();
  }

  ngAfterViewInit(): void {
    this.onResize();
    this.checkIn();
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }

  checkIn(): void {
    if (isPlatformBrowser(this.platformId)) {
      // GSAP Animations
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => {
        this.gsapDiv = this.horizontalBlock.nativeElement;
        this.sections;
        this.sectionsG = gsap.utils.toArray(
          this.sections.toArray().map((section) => {
            return section.nativeElement;
          })
        );
        this.ScrollAnimations(this.sectionsG, this.gsapDiv);
      }, 250);
    }
  }

  ScrollAnimations(sectionsArr: any, div: any) {
    gsap.to(sectionsArr, {
      xPercent: -100 * (sectionsArr.length - 1),
      ease: "none",
      scrollTrigger: {
        start: this.offsetGsap.toString() + "px",
        trigger: div,
        pin: true,

        scrub: true,
        snap: 1 / (sectionsArr.length - 1),
        end: "+=3500",
        // markers: true,
        invalidateOnRefresh: true,
      },
    });
    gsap.set(sectionsArr, { zIndex: (i) => i + 1 });
  }

  @HostListener("window:resize")
  // tslint:disable-next-line:typedef
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.screenwidth = window.innerWidth;
      this.screenTablet = this.screenwidth <= 1279;
      if (this.screenTablet) {
        this.offsetGsap = 0;
      } else {
        if (this.screenwidth > 1279 && this.screenwidth < 1920) {
          this.offsetGsap = -79;
        } else {
          this.offsetGsap = -104;
        }
      }
    }
  }

  startVideo() {
    this.isVideoActive = true;

    if (this.screenwidth > 1279) {
      ScrollTrigger.getAll().forEach((st) => st.disable(true));
      this.scrollService.scrollToElement("videoMobileDesc", 500);
      this.document
        .getElementsByTagName("html")[0]
        .classList.add("no-body-scroll");
      this.playVideo.emit(true);
      // this.offsetGsap = 0;
      // this.videoPlayer.nativeElement.stop();
    } else {
      this.openVideoModal();
    }
  }

  closeVideo() {
    this.isVideoActive = false;
    // this.document.getElementsByTagName('html')[0].classList.remove('no-body-scroll');
    // this.document.getElementsByTagName('body')[0].classList.remove('no-body-scroll');
    if (this.screenwidth > 1279) {
      ScrollTrigger.getAll().forEach((st) => st.enable(true));
      this.document
        .getElementsByTagName("html")[0]
        .classList.remove("no-body-scroll");
      this.playVideo.emit(false);
      // this.offsetGsap = -167;
      // this.videoPlayer.nativeElement.play();
    } else {
      this.document
        .getElementsByTagName("html")[0]
        .classList.remove("no-body-scroll");
    }
  }

  openVideoModal() {
    this.dialog.open(VideoModalComponent, {
      backdropClass: "callback__dialog",
      panelClass: ["materials-dialog-container", "video"],
    });
  }

  openCarouselModal() {
    this.dialog.open(CarouselModalComponent, {
      backdropClass: "callback__dialog",
      panelClass: ["materials-dialog-container", "carousel"],
    });
  }

  imagesComplited() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.complitedImagesCount++;
        this.complitedLoadImages = this.complitedImagesCount >= 2;
        this.finishLoadImages.emit(this.complitedLoadImages);
      }, 50);
    }
  }
}

// !!! Gsap Only for screen >= 1280 !!!!
