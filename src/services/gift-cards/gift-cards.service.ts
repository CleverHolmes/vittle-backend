// Initializes the `gift-cards` service on path `/gift-cards`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { GiftCards } from './gift-cards.class';
import createModel from '../../models/gift-cards.model';
import hooks from './gift-cards.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'gift-cards': GiftCards & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gift-cards', new GiftCards(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gift-cards');

  service.hooks(hooks);
}
