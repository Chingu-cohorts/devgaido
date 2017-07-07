# [![devGaido version][devgaido-image]][devgaido-url]

[![build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

devGaido provides a guided learning experience through the Web Development 
ecosystem. This application provides supplies a progressive path towards 
acquiring web development skills. But it also provides a motivation towards a
goal as well as a means of tracking progress tracking.

[Features](#features) | [Installation](#installation) | [Usage](#usage) | [Examples](#examples) | [Command-line options](#options) | [Configuration](#configuration) | [Authors](#authors) |
[License](#license)

![screenshot]()

## Features

 - **Predefined Learning Paths** Predefined learning paths guide the user in
 a journal to acquire or strengthen understanding of a particular topic in
 the web development ecosystem.
 - **Tracking & Monitoring** devGaido tracks the users's progress on the 
 Dashboard screen in the form of 
 [burndown charts](https://en.wikipedia.org/wiki/Burn_down_chart) 
 and progress metrics that are straightforward and simple to understand.
 - **Security:** Authentication is provided through integration with Auth0 to 
 provide the user with the option of specifying application-specific 
 credentials or integration with either GitHub or Google for authentication.

## Installation

```bash
$ yarn
```

## Usage

| Command           | Purpose                           |
|:------------------|:----------------------------------|
| yarn start        | Start                             |
| yarn build        | Build application                 |
| yarn build:client | Build client                      |
| yarn build:server | Build server                      |
| yarn dev          | Start development client & server |
| yarn dev:server   | Start development client          |
| yarn dev:client   | Start development server          |
| yarn analyzesize  | Analyze bundle sizes              |

### Examples

Stay tuned

### Options

 - `TBD`: Stay tuned.

## Configuration

The devGaido project folder is organized in the following manner:

```
/devgaido - Application root folder containing global configuration
            and settings files.
  /src - Application source files
    /client - Frontend application source
      /actions - Redux global app action handlers
      /assets - Client asset files
      /pages - One subdirectory for each page containing .jsx files including 
               page-specific actions and reducers.
      /reducers - Redux global app reducer handlers
      /style - Style sheet files
    /server - Backend application source
      /models - Data model files
      /services - Microservices
```

## Authors

- [Francesco Agnoletto](https://github.com/kornil)
- [Oussama Bouguerne](https://github.com/codejunky)
- [Erik Hos](https://github.com/mrhos)
- [Kim Kwanka](https://github.com/kimkwanka)
- [Matt Leonard](https://github.com/matty22)
- [Chance McAllister](https://github.com/tropicalchancer)
- [Jim Medlock](https://github.com/jdmedlock)

## License

[MIT](https://tldrlegal.com/license/mit-license)

[devgaido-image]: https://cdn.rawgit.com/Chingu-cohorts/devgaido/refactor/style/src/client/assets/img/devGaidoLogo.svg
[devgaido-url]: https://github.com/Chingu-cohorts/devgaido
[travis-image]: https://img.shields.io/travis/yoshuawuyts/vmd/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/vmd
[downloads-image]: https://github.com/paulrobertlloyd/socialmediaicons/blob/master/github-32x32.png?raw=true
[downloads-url]: https://github.com/Chingu-cohorts/devgaido
[standard-image]: https://github-media-downloads.s3.amazonaws.com/GitHub-Logos.zip
[standard-url]: https://github.com/feross/standard
[emoji-cheat-sheet]: http://www.emoji-cheat-sheet.com/
