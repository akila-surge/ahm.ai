import { registerAs } from '@nestjs/config';

export interface PreventConfig {
  smartyStreetsApiKey: string;
  searsConnectionApiKey: string;
  shsGraphqlUrl: string;
  searsCleanApiUrl: string;
  searsConnectionApiUrl: string;
  smartyStreetsApiUrl: string;
}

export const preventConfig = registerAs(
  'prevent',
  (): PreventConfig => ({
    smartyStreetsApiKey: process.env.SMARTY_STREETS_API_KEY ?? '',
    searsConnectionApiKey: process.env.SEARS_CONNECTION_API_KEY ?? '',
    shsGraphqlUrl:
      process.env.SHS_GRAPHQL_URL ?? 'https://api.searshomeservices.com/graphql',
    searsCleanApiUrl:
      process.env.SEARS_CLEAN_API_URL ?? 'https://www.searsclean.com/api',
    searsConnectionApiUrl:
      process.env.SEARS_CONNECTION_API_URL ?? 'https://www.searsconnection.com/api',
    smartyStreetsApiUrl:
      process.env.SMARTY_STREETS_API_URL ?? 'https://us-zipcode.api.smarty.com',
  }),
);
