# About Us

We are a band of volunteers and we'd love your help!

Our mission is two-fold:
1. Help people locate COVID-19 testing centers, learn the protocols of these centers, and seek testing if needed.
2. Help healthcare professionals and stakeholders create, manage, and support testing centers more effectively.

In both cases, we achieve this by collecting and organizing data, and providing this transparently. 

We do not intend to make any recommendations or opinionated statements. 

# The Team (Org chart)

- Tarryn Marcus: Marketing Manager (approves all website changes)
- Katherine Conaway: Content Lead (approves all website changes)
- Zach Boldyga: Organizer (approves all website changes)
- Tiago Almeida: DevOps, Client-side development
- Amy Nguyen: Branding (logo, color)

## Significant Contributions From:
- Nathan Boldyga: Content curation
- Antony Oparin: Technical advice / guidance

# Contributing

We'd love your help. Don't be shy, every day that goes by has a heavy cost!

For software-related work, please create or find a github issue. A project maintainer will coordinate with you to make sure someone else isn't already working on a particular task, and that the task is in-line with our vision. 

Once you are cleared to work on a feature, task, or bug, create a branch using the git feature-branch workflow. 

To have a project maintainer start to review your work, **open a PR to the 'staging' branch.**

# Technical Specs

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
