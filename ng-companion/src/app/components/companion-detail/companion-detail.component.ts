import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SAMPLE_COMPANIONS, SAMPLE_MATCH, SAMPLE_USER } from 'src/app/data/sample-companions';
import { CompanionsService } from 'src/app/services/companions.service';
import { CompanionDetails } from 'src/app/types';

@Component({
  selector: 'wdc-companion-detail',
  templateUrl: './companion-detail.component.html',
  styleUrls: ['./companion-detail.component.scss'],
})
export class CompanionDetailComponent implements OnInit {
  public details$: Observable<CompanionDetails>;

  constructor(private route: ActivatedRoute, private service: CompanionsService) {}

  ngOnInit() {
    const allCompanions = [SAMPLE_USER, SAMPLE_MATCH, ...SAMPLE_COMPANIONS];
    this.details$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.service.getDetails(id)),
    );
  }
}
