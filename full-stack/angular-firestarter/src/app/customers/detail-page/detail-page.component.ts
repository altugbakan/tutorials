import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionChanges,
  collectionData,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  customerId: string | null = null;
  customer: Observable<any> | undefined;

  constructor(
    private route: ActivatedRoute,
    private db: Firestore,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');

    const q = query(
      collection(this.db, 'boards'),
      where('uid', '==', this.customerId)
    );
    this.customer = collectionData(q).pipe(
      tap((cust) =>
        this.seo.generateTags({
          title: cust[0]['name'],
          description: cust[0]['bio'],
          image: cust[0]['image'],
        })
      )
    );
  }
}
