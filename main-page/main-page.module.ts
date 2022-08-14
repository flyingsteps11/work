import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainPageComponent } from "./main-page.component";
import { RouterModule, Routes } from "@angular/router";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { CenterSliderComponent } from "./components/center-slider/center-slider.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { VideoModalComponent } from "./components/center-slider/video-modal/video-modal.component";
import { CoreModule } from "@core/core.module";
import {
  IconModule,
  PreloaderModule,
  ProductCarouselModule,
  QuestionsFormModule,
  SubmitRequestModule,
} from "@ui";
import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks,
} from "ng-lazyload-image"; // <-- include ScrollHooks
import { MatDialogModule } from "@angular/material/dialog";
import { SwiperModule } from "ngx-swiper-wrapper";
import { AnimateOnScrollModule, ScrollService } from "ng2-animate-on-scroll";
import { NgAnimateScrollService } from "@core/services/ng-animate-scroll.service";
import { ScrollToTopModule } from "src/app/ui/scroll-to-top/scroll-to-top.module";
import { CarouselModalComponent } from "./components/center-slider/carousel-modal/carousel-modal.component";

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    pathMatch: "full",
    data: {
      meta: {
        title: "НПО-Бит",
      },
    },
  },
];

@NgModule({
  declarations: [
    MainPageComponent,
    MainSliderComponent,
    CenterSliderComponent,
    GalleryComponent,
    VideoModalComponent,
    CarouselModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    LazyLoadImageModule,
    SubmitRequestModule,
    IconModule,
    MatDialogModule,
    SwiperModule,
    AnimateOnScrollModule,
    QuestionsFormModule,
    ScrollToTopModule,
    PreloaderModule,
    ProductCarouselModule,
  ],
  exports: [
    MainSliderComponent,
    CenterSliderComponent,
    GalleryComponent,
    VideoModalComponent,
    CarouselModalComponent,
  ],
  providers: [
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
    NgAnimateScrollService,
    ScrollService,
  ],
})
export class MainPageModule {}
