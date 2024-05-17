import './style.css'
import { Application, HttpModule, Inject, RouterModule } from 'pig-fwk';
import {env} from './env';
import { routes } from './routes.ts';
import { Root } from './components/Root.component.ts';
import { TokenizerModule } from './domain/systems/tokenizer/Tokenizer.module.ts';
import { LoggerModule } from './domain/systems/logger/Logger.module.ts';
import { LoggerSystem } from './domain/systems/logger/LoggerSystem.ts';

const app = new Application(Root);

app.modules([
    [RouterModule, routes],
    HttpModule,
    LoggerModule,
    TokenizerModule,
]);

app.provide([

]);

app.env(env);

app.bootstrap("#app");

Inject<LoggerSystem>(LoggerSystem).start();