import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-carousel-modal",
  templateUrl: "./carousel-modal.component.html",
  styleUrls: ["./carousel-modal.component.scss"],
})
export class CarouselModalComponent implements OnInit {
  productionImages = [
    { name: "product10" },
    { name: "product11" },
    { name: "product12" },
    { name: "product13" },
    { name: "product14" },
  ];

  constructor(
    public dialogRef: MatDialogRef<CarouselModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
