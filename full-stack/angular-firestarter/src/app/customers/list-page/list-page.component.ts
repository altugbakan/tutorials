import { Component, OnInit } from '@angular/core';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  customers: Observable<DocumentData[]> | undefined;
  constructor(private seo: SeoService, private db: Firestore) {}

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'Customers List',
      description: 'A list filled with customers',
    });

    this.customers = collectionData(collection(this.db, 'customers'), {
      idField: 'id',
    });
  }
}
