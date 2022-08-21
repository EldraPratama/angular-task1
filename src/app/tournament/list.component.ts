import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

// import { AccountService } from '../_services';
import { TournamentService } from '../_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;

    constructor(private tournamentService: TournamentService) {}

    ngOnInit() {
        this.tournamentService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.tournamentService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }
}