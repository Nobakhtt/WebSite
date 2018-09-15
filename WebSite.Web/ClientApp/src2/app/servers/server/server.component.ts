import {Component, OnDestroy, OnInit} from '@angular/core';
 
import {ServersService} from '../servers.service';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
 
@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
    server: { id: number, name: string, status: string };
    paramsSubscribtion: Subscription;
 
    constructor(private serversService: ServersService, private route: ActivatedRoute) {
    }
 
    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        this.paramsSubscribtion = this.route.params.subscribe(
            (params: Params) => {
                this.server = this.serversService.getServer(+params['id'])
            }
        );
        this.server = this.serversService.getServer(1);
    }
    ngOnDestroy(){
        this.paramsSubscribtion.unsubscribe();
    }
}