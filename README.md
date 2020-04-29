# About Us

We are a band of volunteers and we'd love your help!

**Our mission: Drive the use of designated testing centers for COVID-19 testing in the US.**

We are doing this through:

1. Building and maintaining the best tool for people to find a COVID-19 testing center, determine eligibility, and plan their trip.
2. Implementing a wide variety of small initiatives to enhance our understanding of testing centers, extend our reach, and provide more complete and up-to-date data.


# Contributing

Please see our contributor documentation: https://docs.google.com/document/d/1japXUwtShwC1xyJJdMLuCQH2eMSVpoyjH-uoNnjR0C0/edit?usp=sharing


# The Team (Org chart)

## Contributors
- Tarryn Marcus: Digital Marketing, Website
- Katherine Conaway: Content Creation
- Tiago Almeida: Software Engineer
- Amy Nguyen: Branding, Logo, Color
- Zach Boldyga: Software Engineer
- Nathan Boldyga: Content curation
- Antony Oparin: Technical advice / guidance
- Any many more... We'll do our best to upload all of these soon!

## Project Maintainers (approvals)
- Tarryn Marcus
- Katherine Conaway
- Zach Boldyga
- Shwetha Hariharan

# Technical Specs
This technical documentation is rapidly evolving and may be out of sync. We will do our best to keep this up-to-date with a rough overview of the architecture so that newcomers can get up-to-speed quickly.

## Docker Compose

To get a local environment up and running use [Docker Compose](https://docs.docker.com/compose/install/). You will need [Docker](https://docs.docker.com/get-docker/) for this.

> docker-compose up

Wait for the build to complete and the db to come up. Usually in a new terminal run:

> docker-compose exec api npx sequelize-cli db:migrate

You should see output like:

```
npx: installed 80 in 7.635s

Sequelize CLI [Node: 12.16.2, CLI: 5.5.1, ORM: 5.21.6]

Loaded configuration file "src/server/db/config/config.js".
Using environment "development".
== 20200424025602-create-user: migrating =======
== 20200424025602-create-user: migrated (0.031s)
```

From here you can get to the API server.

```
curl localhost:5000/ping
pong
```

## CI/CD

We are leveraging Circle CI for CI/CD. PRs will be merged to the 'staging' branch, which deploys to [https://staging.get-tested-covid19.org/](https://staging.get-tested-covid19.org/). We will do quick manual QA, then merge to 'master' to deploy to production.

![CI](./Documentation/images/gtcv19ci.svg)

## Database

The public datasource is updated on a daily basis. We manually review submissions for new test center locations (made thru a Google Form), and release the new test center updates daily.

We are seeking to automate this process. See the related Issue for more information.

## Infrastructure

We currently have two environments. Staging and Production are deploy with Terraform via Circle CI.  Both environments use [AWS Fargate](https://aws.amazon.com/fargate/) behind an [AWS Application LoadBalancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html). We are starting to use an AWS Relational Database Service endpoint using Aurora with Postgres compatability.  

## App Deployment

```
git clone (this repository)
npm install
npm run build
pm2 serve ./build 3000 --spa
```

TODO: Still making adjustments to the infrastructure. May need to add iptables rules to these steps.

## Local Docker Development

```
npm run docker:build
npm run docker:run
```

## Deployment Notes

- The load balancer points to port 3000 on the VM instance.
- Adding additional instances is easy. Deploy a new VM thru Rackspace w/ the saved image, run app deployment steps, point load balancer to additional server.

## testSites.json Serving

The 'database' is a JSON file, served from GCP Cloud Storage. The file has the following properties:
- Caching is set to 7200 second expiration
- CORS for http://localhost:3000 and https://get-tested-covid19.org

If the size of the file gets large, we have two options to speed up download:
- gzip before uploading to GCP Cloud Storage, set the gzip headers properly. e.g. 70% compression feasible.
- JSON minification/uglification is another option. Probably not needed / not as useful as gzip.
