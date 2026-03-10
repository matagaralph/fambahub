import { ServiceCollection } from '@circulo-ai/di';
import { viatorModule } from './modules/viator.module';
import { coreModule } from './modules/core.module';

const services = new ServiceCollection()
  .addModule(coreModule)
  .addModule(viatorModule);

export const provider = services.build();

provider.validateGraph({ throwOnError: true });
