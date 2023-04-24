// Initializes the `plans` service on path `/plans`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Plans } from './plans.class';
import createModel from '../../models/plans.model';
import hooks from './plans.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'plans': Plans & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/plans', new Plans(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('plans');

  service.hooks(hooks);
}
