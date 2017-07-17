# [![devGaido version][devgaido-image]][devgaido-url]

devGaido provides a guided learning experience through the Web Development 
ecosystem by providing those new to the craft with predefined pathas to aid in
achieving web development skills. For experienced developers it provides a 
a means of filling in skill gaps around specific technologies, libraries, and
languages.

You can find devGaido at [www.devgaido.com](http://www.devgaido.com).

[Features](#features) | [Development](#development) | [Runtime](#runtime) | [Authors](#authors) |
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

## Development

### Built With

The main libraries used in the development of devGaido are React, React Router,
Redux, and Stylus. For a complete list of libraries consult the `package.json`
file.

### Git Branches

- master: Only updated from PR's from the development branch for release. This
branch always reflects the current production release.
- development: Reflects the candidate code for the next release. Developers
work in developer branches, which are then pulled into this branch. All code
pulled into this branch must be tested and undergo peer review as part of the
PR process.
- developer branches: Are individual branches created by each developer when
they are working on changes and bug fixes. There are 4 basic types of branches: 
bug, feature, refactor and style, after the type comes the name, it should 
specify on top of the branch type. For example feature/course-review. Consult
the wiki for more details and examples.

### Usage

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
| yarn screenshots  | Capture Screenshots of Lesson URLs | 
| yarn test         | Initiate tests and validations    |

### Configuration

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
    /test - Mocha tests and validations of JSON files
      /testdata - Data files designed to exercise the tests and validations
```

## Runtime

### Built With

devGaido's runtime architecture leverages the following to achieve performance,
availability, and ease of deployment:

- CDN: A content delivery network (CDN) is used to reduce the amount of time 
necessary to serve up images and other static content.
- Nginx: Is a web server providing security (HTTPS), compression,
and load balancing.
- Docker: Docker containers house devGaido's application components that make
devGaido easier to deploy and manage.
- Travic CI: An automation platform integrated with GitHub that is used to
automatically deploy devGaido to the production server(s) when changes are 
made and successfully tested.

## Authors

- [Francesco Agnoletto](https://github.com/kornil)
- [Erik Hos](https://github.com/mrhos)
- [Kim Kwanka](https://github.com/kimkwanka)
- [Chance McAllister](https://github.com/tropicalchancer)
- [Jim Medlock](https://github.com/jdmedlock)

## License

[MIT](https://tldrlegal.com/license/mit-license)

[devgaido-image]: https://cdn.rawgit.com/Chingu-cohorts/devgaido/refactor/style/src/client/assets/img/devGaidoLogo.svg
[devgaido-url]: https://github.com/Chingu-cohorts/devgaido
