import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { UserController } from './controllers/user.controller';
import { HealthController } from './controllers/health.controller';
import { AssistantController } from './controllers/assistant.controller';
import { GroupController } from './controllers/group.controller';
import { InfoBlobController } from './controllers/info-blob.controller';
import { QueryController } from './controllers/query.controller';

validateEnv();

const app = new App([IndexController, UserController, HealthController, AssistantController, GroupController, InfoBlobController, QueryController]);

app.listen();
