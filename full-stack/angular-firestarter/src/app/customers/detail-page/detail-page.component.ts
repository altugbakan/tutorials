import { Component, OnInit } from '@angular/core';
import {
  DocumentData,
  DocumentSnapshot,
  Firestore,
  doc,
  docSnapshots,
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
  customer: Observable<DocumentSnapshot<DocumentData>> | undefined;

  constructor(
    private route: ActivatedRoute,
    private db: Firestore,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');

    this.customer = docSnapshots(
      doc(this.db, `customers/${this.customerId}`)
    ).pipe(
      tap((doc) => {
        const data = doc.data()!;
        this.seo.generateTags({
          title: data['name'],
          description: data['description'],
          image: data['image'],
        });
      })
    );
  }
}
