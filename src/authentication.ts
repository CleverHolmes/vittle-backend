// @ts-nocheck

import { ServiceAddons } from "@feathersjs/feathers";
import {
  AuthenticationService,
  JWTStrategy,
  AuthenticationRequest,
} from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import {
  OAuthStrategy,
  OAuthProfile,
  expressOauth,
} from "@feathersjs/authentication-oauth";
import axios from "axios";

import { Application } from "./declarations";

declare module "./declarations" {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

class FacebookStrategy extends OAuthStrategy {
  async getProfile(authResult: AuthenticationRequest, _params: any) {
    // This is the oAuth access token that can be used
    // for Facebook API requests as the Bearer token
    //console.log(authResult);

    const accessToken = authResult.access_token;

    const { data } = await axios.get("https://graph.facebook.com/me", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        // There are
        fields: "id,name,email,picture",
      },
    });

    //console.log("DATA");
    //console.log(data);

    return data;
  }

  async getEntityData(profile: OAuthProfile, existing: any, params: any) {
    // `profile` is the data returned by getProfile
    const baseData = await super.getEntityData(profile, existing, params);

    console.log(baseData)
    //console.log("BASE DATA");
    //console.log(baseData);

    const firstName = profile.name.split(" ")[0];
    const lastName = profile.name.split(" ")[1] || "";

    return {
      ...baseData,
      email: profile.email,
      firstName,
      lastName,
      language: "EN",
      picture: profile.picture.data,
    };
  }
}

export default function (app: Application) {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());
  //@ts-ignore
  authentication.register("facebook", new FacebookStrategy());

  app.use("/authentication", authentication);

  //@ts-ignore
  app.configure(expressOauth());
}
