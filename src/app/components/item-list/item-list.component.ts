import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import { Item } from 'src/app/entity/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list-table.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items;

  constructor(private itemService: ItemService) {

   }

  ngOnInit() {
    this.listItems();
  }

  listItems() {
    this.itemService.getItemList().subscribe(
      data => {
        this.items = data;
      }
    );
  }

}
