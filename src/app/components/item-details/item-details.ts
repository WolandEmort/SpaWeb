import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '@core/models/product.interface';
import { DataService } from '@core/services/data.service';
import { environment } from 'environments/environment'; // 💡 Ваш імпорт

@Component({
    selector: 'app-item-details',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './item-details.html',
    styleUrls: ['./item-details.css']
})
export class ItemDetailsComponent implements OnInit {
    public item: IProduct | undefined;
    public readonly currency: string = environment.currency;
    public readonly notFoundBuy: string = environment.notFoundBuy;
    public readonly buyText: string = environment.buyText;
    public readonly noneBuyText: string = environment.noneBuyText;
    public readonly backClick: string = environment.backClick;
    public readonly backClickCatalog: string = environment.backClickCatalog;
    public readonly brandText: string = environment.brandText;
    public readonly categoryText: string = environment.categoryText;
    public readonly volumeText: string = environment.volumeText;
    public readonly detailsText: string = environment.detailsText;


    constructor(
        private route: ActivatedRoute,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const idString = params.get('id');
            if (idString) {
                const id = Number(idString);
                this.dataService.getItemById(id).subscribe(product => {
                    this.item = product;
                });
            }
        });
    }
}