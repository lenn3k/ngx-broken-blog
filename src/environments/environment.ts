// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  backEndUrl: '//localhost:8080/api/v1',
  keycloak: {
    realm: 'Brokenblog',
    url: 'https://keycloak-jworks.origin.ordina-jworks.io/auth/realms/Brokenblog',
    clientId: 'web_app',
    registration: 'https://keycloak-jworks.origin.ordina-jworks.io/auth/realms/Brokenblog/login-actions/registration?client_id=web_app'
  }
};
