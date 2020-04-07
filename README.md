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

## CI/CD

We are leveraging Buddy for CI/CD. PRs will be merged to the 'staging' branch, which deploys to a dev site. We will do quick manual QA, then merge to 'master' to deploy to production.

## Database

The public datasource is updated on a daily basis. We manually review submissions for new test center locations (made thru a Google Form), and release the new test center updates daily.

We are seeking to automate this process. See the related Issue for more information.

# DEV OPS

Deployment is on a Rackspace VM in the Dallas region. We have a VM server image that can be duplicated for multi-host deployment, if needed. This instance sits behind a load balancer which holds the SSL certificate and does SSL termination. The load balancer only accepts HTTPS(443) traffic and redirects HTTP to HTTPS.

## Infrastructure

We currently have a single-server deployment for production, which sits behind a load balancing device. We have an identical development configuration.

We use GCP Cloud Storage to serve a static 'database' file (testSites.json).

## VM Instance Configuration
```
Configuration:

Base operating system: CentOS8

#skipping user account, security configuration, firewalld port rules

#sudo firewall-cmd --add-port=3000/tcp --permanent
#sudo service firewalld restart

sudo yum install git

curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -

sudo yum install node.js

sudo npm install -g pm2
```

Notes on checking deployment

```
# NOTE: In production deployment, SSH chain and key files are stored in the load balancer, and SSH termination happens at the load balancer. Traffic served by the server(s) is HTTP traffic on port 3000.

# Check if the service is running on local 3000 port:
# lsof -i :3000
# Check if service is externally exposed on a remote server:
# nc -vz HOST 3000
# (where HOST is host IP)
```

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
