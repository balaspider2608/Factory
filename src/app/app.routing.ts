import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CustomGraphComponent } from './custom-graph/custom-graph.component';
import { Routes} from '@angular/router';

export const appRoutes: Routes = [
        {path:'home', component: HomeComponent},   
        {path:'login', component: LoginComponent},
        {path:'dashboard', component: CustomGraphComponent},  
    ]  


