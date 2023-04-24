import * as authentication from "@feathersjs/authentication";
import slugify from "./hooks/slugify";
import getProducts from "./hooks/getProducts";
import getProductSearch from "./hooks/getProductSearch";
import getProductConvertToObjectId from "./hooks/getProductConvertToObjectId";
import getSingleProduct from "./hooks/getSingleProduct";
// Don't remove this comment. It's needed to format import lines nicely.
const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [
      // authenticate('jwt')
    ],
    find: [getProducts, getProductSearch],
    get: [getSingleProduct],
    create: [slugify],
    update: [slugify, getProductConvertToObjectId],
    patch: [slugify, getProductConvertToObjectId],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
