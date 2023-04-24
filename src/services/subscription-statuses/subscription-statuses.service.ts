// Initializes the `subscription-statuses` service on path `/subscription-statuses`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { SubscriptionStatuses } from './subscription-statuses.class';
import createModel from '../../models/subscription-statuses.model';
import hooks from './subscription-statuses.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'subscription-statuses': SubscriptionStatuses & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/subscription-statuses', new SubscriptionStatuses(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('subscription-statuses');

  service.hooks(hooks);
}
