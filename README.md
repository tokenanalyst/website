# website

## Node version

Please use node version 10.14.1.

Install nvm:

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

Install and use node version 10.14.1:

    nvm install 10.14.1 && nvm use 10.14.1

## Setup

* Clone the repo
* Install the now-cli (https://github.com/zeit/now-cli)
* Add the following contents to a `.env` in the root of the repo
`API_KEY=<Your Private API KEY>` and
`KAIKO_KEY=<Your Kaiko Key>`
This file is already excluded by git but just to be sure - NEVER COMMIT YOUR KEY

## Development

* `now dev`

## Deployment

* `now deploy`
