import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  characters: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            characters(page: 1, filter: { species: "Alien" }) {
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
