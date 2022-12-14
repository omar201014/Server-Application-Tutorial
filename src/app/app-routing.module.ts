import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { canDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { serverResolve } from "./servers/server/server-resolve.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes:Routes = [
    {path:'' , component:HomeComponent ,pathMatch:'full'} ,
  
    {path:'users' ,component:UsersComponent ,children:[
      {path:':id/:name' ,component:UserComponent}
    ]},
    
    {path:'servers' ,canActivateChild:[AuthGuard],component:ServersComponent ,children:[
      {path:':id', component:ServerComponent , resolve:{serverReslover:serverResolve}},
      {path:':id/edit',canDeactivate:[canDeactivateGuard] ,component:EditServerComponent}
    ]},
  
    // {path:'not-found' ,component:PageNotFoundComponent},
    {path:'not-found' ,component:ErrorPageComponent ,data:{message:'Error: 404 not found'}},
    {path:'**' , redirectTo:'/not-found'}
    
  ]


@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]

}) 

export class AppRoutingModule{

}
