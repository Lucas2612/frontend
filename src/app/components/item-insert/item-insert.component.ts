import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/entity/item';

import { FormsModule } from '@angular/forms';
import { ItemService } from '../../service/item.service';
@Component({
  selector: 'app-item-insert',
  templateUrl: './item-insert.component.html',
  styleUrls: ['./item-insert.component.css']
})
export class ItemInsertComponent implements OnInit {

  novoItem = new Item();
  items;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  insertNewItem() {
    // Calling the service to insert new item
    this.itemService.insertNewItem(this.novoItem).
    subscribe(novoItem => this.items.push(novoItem));
  }
}
