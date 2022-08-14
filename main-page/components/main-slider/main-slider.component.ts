import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from "@angular/core";
import { NgAnimateScrollService } from "@core/services/ng-animate-scroll.service";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { isPlatformBrowser } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { ConstructorModalComponent } from "src/app/components/constructor-form/components/constructor-modal/constructor-modal.component";

const sliders = [
  {
    id: 1,
    pretext: "свой",
    name: "Бад",
    class: "bad",
    smallImg: "miracle-small",
    bigImg: "miracle",
  },
  {
    id: 2,
    pretext: "свой",
    name: "Спортпит",
    class: "sport",
    smallImg: "spoon",
    bigImg: "sport",
  },
  {
    id: 3,
    pretext: "",
    name: "Детское питание",
    class: "baby",
    smallImg: "SmartKid-small",
    bigImg: "SmartKid",
  },
  {
    id: 4,
    pretext: "свою",
    name: "Косметика",
    class: "cosmetic",
    smallImg: "cosmetic-small",
    bigImg: "cosmetic",
  },
  {
    id: 5,
    pretext: "свои",
    name: "Напитки",
    class: "juice",
    smallImg: "juice-small",
    bigImg: "juice",
  },
];

export const config: SwiperConfigInterface = {
  loop: true,
  speed: 650,
  centeredSlides: true,
  slidesPerView: "auto",
  initialSlide: 1,
  slideToClickedSlide: true,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  pagination: {
    el: ".steps-bullets",
    bulletClass: "swiper--bullet",
    bulletActiveClass: "active",
    clickable: true,
    renderBullet(index, className) {
      return (
        '<button class="bullets--item ' +
        className +
        '"><span class="bullets--item--text">' +
        sliders[index].name +
        '</span><span class="bullets--item--dot"></span></button>'
      );
    },
  },
  navigation: {
    nextEl: ".steps-next",
    prevEl: ".steps-prev",
  },
};

@Component({
  selector: "app-main-slider",
  templateUrl: "./main-slider.component.html",
  styleUrls: ["./main-slider.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSliderComponent implements OnInit, AfterViewInit {
  @Output() finishLoadImages = new EventEmitter<boolean>();
  readonly sliderConfig: SwiperConfigInterface = config;

  activeSliderIndex: number;
  pretext!: string;
  name!: string;
  sliderImages: any;
  complitedImagesCount = 0;
  complitedLoadImages: boolean;
  isBrowser = false;

  constructor(
    public scrollService: NgAnimateScrollService,
    @Inject(PLATFORM_ID) private platformId: any,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activeSliderIndex = 1;
    this.sliderImages = sliders;
    this.selectSliderName(this.activeSliderIndex);
    this.imagesComplited();
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
      this.cd.detectChanges();
    }
  }

  scrollToForm() {
    this.scrollService.scrollToElement("questions_form", 450);
  }

  selectSliderName(index: number): void {
    this.pretext = this.sliderImages[index].pretext;
    this.name = this.sliderImages[index].name;
    this.activeSliderIndex = index;
    this.cd.detectChanges();
  }

  imagesComplited() {
    this.complitedImagesCount++;
    this.complitedLoadImages = this.complitedImagesCount >= 10;
    this.finishLoadImages.emit(true);
  }
}

