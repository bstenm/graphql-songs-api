
# Graphql Songs Api

[![Build Status](https://travis-ci.org/bstenm/graphql-songs-api.svg?branch=master)](https://travis-ci.org/bstenm/graphql-songs-api) [![Known Vulnerabilities](https://snyk.io/test/github/bstenm/graphql-songs-api/badge.svg?targetFile=package.json)](https://snyk.io/test/github/bstenm/graphql-songs-api?targetFile=package.json) [![Coverage Status](https://coveralls.io/repos/github/bstenm/graphql-songs-api/badge.svg?branch=master)](https://coveralls.io/github/bstenm/graphql-songs-api?branch=master) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=bstenm/graphql-songs-api)](https://dependabot.com)

##### Note:
This api only serves the songs metadata, the client will have to know the base path to where the song files are stored and recontructs the whole absolute path from the song name: e.g. "My Song Tilte" => https://basepath/My+Song+TItle.mp3

#### Development

Launch the server in development mode, it compiles Typescript and lints your code on save:
```
> yarn watch
```

#### Testing

Lints your code and runs the tests with jest on save:
```
> yarn test
```

#### Continuous Integration

On every push Travis CI will:
- Check for vulnerabilities
- Run the tests
- Run the build process
- Deploy to the Heroku staging and production sites
- Take a snapshot of your application dependencies for Snyk to alert you in case of any newly found vulnerabilities

See result in action :
```
> curl -XGET -H 'Content-Type:application/graphql'  -d '{ songs{ title } }' https://graphql-songs-api-staging.herokuapp.com
```
