import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';
import { canComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit,canComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit:boolean=false;
  changedSaved:boolean=false;

  constructor(private serversService: ServersService , private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(
      (queryParams:Params)=>{
        this.allowEdit= (queryParams['allowEdit'] ==='allow')? true:false;
      }
    );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id']
    this.server = this.serversService.getServer(id);
    this.route.params
    .subscribe((params:Params)=>{
      this.server=this.serversService.getServer(+params['id'])
    })
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changedSaved=true;
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  canDeactivate():boolean | Observable<boolean> | Promise<boolean>{
    if(!this.allowEdit) {return true}
    if((this.serverName !==this.server.name || this.serverStatus!==this.server.status) && this.changedSaved===false){
      return confirm('Do you want to Discard this Changes ?')
    }else{
      return true;
    }
  }

}
