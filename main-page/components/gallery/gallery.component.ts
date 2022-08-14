import { isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @ViewChild("gallery", { static: false }) gallery!: ElementRef;
  @ViewChildren("row") rows!: QueryList<ElementRef>;
  @ViewChildren("rowRevers") rowsRevers!: QueryList<ElementRef>;
  screenTablet: boolean;
  s1: number;
  s2: number;
  s3: number;
  x: string | number;
  xEnd: number;

  // private x: number | string;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    this.onResize();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // GSAP Animations
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => {
        this.gallery.nativeElement;
        this.rows;
        this.rowsRevers;
        const galleryRows = gsap.utils.toArray(
          this.rows.toArray().map((items) => {
            return items.nativeElement;
          })
        );
        const galleryRowsRevers = gsap.utils.toArray(
          this.rowsRevers.toArray().map((items) => {
            return items.nativeElement;
          })
        );
        this.scroollfirstRow(galleryRows, false);
        this.scroollfirstRow(galleryRowsRevers, true);
      }, 2000);
    }
    this.onResize();
  }

  @HostListener("window: resize")
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.screenTablet = window.innerWidth <= 768;
    }
  }

  scroollfirstRow(itemsOneArr: any, revers: boolean) {
    itemsOneArr.forEach((items: any, index: number) => {
      const w = items;
      if (this.screenTablet) {
        this.s1 = 0.95;
        this.s2 = -0.9;
        this.s3 = 0.1;
      } else {
        this.s1 = 0.95;
        this.s2 = -0.25;
        this.s3 = 0.1;
      }

      if (index % 2) {
        this.x = "100%";
        this.xEnd =
          (w.scrollWidth - this.gallery.nativeElement.offsetWidth) * this.s1;
      } else {
        if (revers) {
          this.x = w.scrollWidth * this.s2;
          this.xEnd = 0;
        } else {
          this.x = w.scrollWidth * this.s3;
          if (this.screenTablet) {
            this.xEnd = -1460;
          } else {
            this.xEnd = -800;
          }
        }
      }
      //const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - this.gallery.nativeElement.offsetWidth) * this.s1] : [w.scrollWidth * (revers ? this.s2 : this.s3), 0];
      gsap.fromTo(
        w,
        { x: this.x },
        {
          x: this.xEnd,
          scrollTrigger: {
            trigger: this.gallery.nativeElement,
            scrub: 1.5,
          },
        }
      );
    });
  }
}
