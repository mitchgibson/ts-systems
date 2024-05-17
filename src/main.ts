import './style.css'
import { Application, HttpModule, RouterModule } from 'pig-fwk';
import {env} from './env';
import { routes } from './routes.ts';
import { Root } from './components/Route.component.ts';
import { TokenizerSystemModule } from './domain/systems/tokenizer/TokenizerSystem.module.ts';

const app = new Application(Root);

app.modules([
    [RouterModule, routes],
    HttpModule,
    TokenizerSystemModule,
]);

app.provide([

]);

app.env(env);

app.bootstrap("#app");