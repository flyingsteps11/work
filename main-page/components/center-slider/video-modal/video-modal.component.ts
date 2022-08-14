import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-video-modal",
  templateUrl: "./video-modal.component.html",
  styleUrls: ["./video-modal.component.scss"],
})
export class VideoModalComponent implements OnInit, AfterViewInit {
  videoBg: string;
  screenWidth: number;
  isActive: boolean;
  @ViewChild("videoModal", { static: false }) videoModal: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<VideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.onResize();
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  @HostListener("window:resize")
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 576) {
        this.videoBg = "npo-main-mobile576";
      } else if (this.screenWidth >= 576 && this.screenWidth < 769) {
        this.videoBg = "npo-main-mobile768";
      } else if (this.screenWidth >= 769 && this.screenWidth < 993) {
        this.videoBg = "npo-main-mobile992";
      } else {
        this.videoBg = "npo-main-mobile1280";
      }
    }
  }

  playPause(): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.videoModal.nativeElement.stop();
    } else {
      this.videoModal.nativeElement.play();
    }
  }
}
