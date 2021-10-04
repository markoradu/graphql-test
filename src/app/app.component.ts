import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  characters: any[] = [];
  length = 600;
  pageSize = 20;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            characters(page: 1) {
              results {
                name
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.characters = result?.data?.characters?.results;
      });
  }

  change(event: PageEvent): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            characters(page: ${event.pageIndex + 1}) {
              results {
                name
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.characters = result?.data?.characters?.results;
      });
  }
}
