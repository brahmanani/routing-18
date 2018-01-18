import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { relative } from 'path';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowedit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(
      (queryParams:Params) => {
        this.allowedit = queryParams['allowedit'] === '1' ? true : false;
      }
    );
    
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }



  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  canDeactivate():Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowedit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved ){
      return confirm('do you want to discard the changes?')
    }else{
      return true;
    }
  }

}
