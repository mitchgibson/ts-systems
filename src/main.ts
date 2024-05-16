import './style.css'
import { Application, HttpModule, RouterModule } from 'pig-fwk';
import {env} from './env';
import { routes } from './routes.ts';
import { Root } from './components/Route.component.ts';

const app = new Application(Root);

app.modules([
    [RouterModule, routes],
    HttpModule,
]);

app.provide([
]);

app.env(env);

app.bootstrap("#app");
