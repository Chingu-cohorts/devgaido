# [![devGaido][devgaido-image]][devgaido-url]

devGaido provides a guided learning experience through the Web Development 
ecosystem by providing those new to the craft with predefined paths to aid in
achieving web development skills. For experienced developers it provides a 
a means of filling in skill gaps around specific technologies, libraries, and
languages.

You can find devGaido at [www.devgaido.com](http://www.devgaido.com).

[Features](#features) | [Development](#development) | [Runtime](#runtime) | [Authors](#authors) |
[License](#license) | [Release Notes](releasenotes.md)

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
| yarn screenshots  | Capture screenshots of all lessons |
| yarn screenshots new | Capture screenshots of all lessons with no screenshot |
| yarn screenshots lesson-id | Capture screenshot for specified lesson id |
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
      /pages - One subdirectory for each page containing .jsx files
      /reducers - Redux global app reducer handlers
      /style - Style sheet files
    /server - Backend application source
      /models - Data model files
      /services - Microservices
    /test - Mocha tests and validations of JSON files
      /testdata - Data files designed to exercise the tests and validations
```

#### Models - Curriculum JSON Format

The core curriculum (subjects, paths, courses, and lessons) are maintained in a set of four
JSON files which are passed from the server to clients running the devGaido application
when the user session is started.

Each JSON envelope contains one or more sets of "version-n.n" objects. The
first, "version-1.0", is the original version. Subsequent versions are added
with new version numbers and contain only the new or modified attributes.

##### src/server/models/corepaths.json
```
  {
    "path-identifier" : { <-- Unique path identifier. Max of 24 chars.
      "version-n.n": {    <-- Semantic version to track changes
        "name": "...",        <-- Short path name
        "description": "...", <-- Path description. Must describe the knowledge
                                  the user should expect to achieve from taking
                                  the courses in this path.
        "courseIds": [        <-- Array of unique course id's contained in the path.
                                  Course id's can be referenced in more than one path.
          "...",                  <-- Course id
        ],
      },
      "version-1.0": {...}    <-- Original version
    }
  }
```
##### src/server/models/corecourses.json
```
  {
    "course-identifier" : { <-- Unique path identifier. Max of 24 chars.
      "version-n.n": {      <-- Semantic version to track changes
        "name": "...",        <-- Short course name
        "description": "...", <-- Course description must define the objective
                                  of the course and what the user can expect to
                                  gain from it.
        "lessonIds": [        <-- Array of lesson ids included in the course
         "...",                   <-- Lesson identifier
       ],
      },
      "version-1.0": {...}    <-- Original version
   }
  }
```
##### src/server/models/corelessons.json
```
  {
    "path-identifier" : {     <-- Unique lesson identifier. Max of 24 chars.
      "version-n.n": {        <-- Semantic version to track changes
        "source": "...",          <-- Textual definition of the lessons origin (e.g. P1XT)
        "name": "...",            <-- Short lesson name
        "description": "...",     <-- Lesson description. This should describe
                                      the lesson, as well as what knowledge will
                                      be provided to the user.
        "type": "...",            <-- Lesson type categorizes the medium used to
                                      transmit the information (e.g. reading, video, etc.)
        "instructions": "...",    <-- For "type": "Project" this describes what
                                      is expected of the user
        "resources":[["resource-description","resource-url"],...],
                                  <-- For "type": "Project" this defines relevant
                                      supplemental material
        "subjects: ["..."]..,     <-- An array of subject names this lesson is
                                      associated with.
        "externalSource": "...",  <-- Defines the url of the lesson
        "estimatedTime": "short|medium|long", 
                                  <-- Defines the estimated amount of
                                      time required to complete the lesson.
                                      Acceptable values are:
                                      - short: 4 hours or less
                                      - medium: 16 hours or less
                                      - long: >16 hours
      },
      "version-1.0": {...}    <-- Original version
   },
  }
```
##### src/server/models/coresubjects.json
```
  {
    "subject-identifier" : { <-- Unique subject identifier. Max of 24 chars.
      "version-n.n": {        <-- Semantic version to track changes
        "type": "...",        <-- Subject type which categorizes the associated
                                  subject material (e.g. CSS, HTML, Javascript, etc.)
        "focusArea": "...",   <-- Subject focus area based on a specific webdev
                                  role (e.g. Frontend, Backend, Fullstack, etc.)
        "name": "...",        <-- Short subject name
        "description": "...", <-- Subject description describing the associated
                                  subject material and how it relates to the
                                  webdev role.
        "releaseNo": "...",   <-- Defines the release number for the associated
                                  technology the subject may be based on (e.g.
                                  Angular2 vs. Angular4)
        "authorityURL": "...", <-- For specific technologies the subject is based
                                  on this notes the URL of the authorative
                                  source. For example, for Google's Material
                                  Design this would be www.materialdesign.io.
      },
      "version-1.0": {...}    <-- Original version
   },
  }
```

## Runtime

A separate repo is used to manage application runtime components. For more information about the devGaido devops environment please consult [devGaido DevOps](https://github.com/Chingu-cohorts/devgaido_devops)

## Authors

- [Francesco Agnoletto](https://github.com/kornil)
- [Erik Hos](https://github.com/mrhos)
- [Kim Kwanka](https://github.com/kimkwanka)
- [Chance McAllister](https://github.com/tropicalchancer)
- [Jim Medlock](https://github.com/jdmedlock)
- [Nick Papasavvas](https://github.com/nickolaos77)

## License

[MIT](https://tldrlegal.com/license/mit-license)

[devgaido-image]: https://cdn.rawgit.com/Chingu-cohorts/devgaido/development/src/client/assets/img/devGaidoLogo.svg
[devgaido-url]: https://github.com/Chingu-cohorts/devgaido
