// Initializes the `postal-codes` service on path `/postal-codes`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { PostalCodes } from './postal-codes.class';
import createModel from '../../models/postal-codes.model';
import hooks from './postal-codes.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'postal-codes': PostalCodes & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/postal-codes', new PostalCodes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('postal-codes');

  service.hooks(hooks);
}
