import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UserDetailComponent } from "./pages/user-detail/user-detail.component";

//  /dashboard/users
const routes: Routes = [
    {
        path : '',
        component:  UsersComponent
    },
    {
        path: ':idUser',
        component: UserDetailComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsersRoutingModule {}
