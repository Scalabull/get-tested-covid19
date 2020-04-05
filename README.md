# About Us

We are a band of volunteers and we'd love your help!

Our mission is two-fold:
1. Help people locate COVID-19 testing centers, learn the protocols of these centers, and seek testing if needed.
2. Help healthcare professionals and stakeholders create, manage, and support testing centers more effectively.

In both cases, we achieve this by collecting and organizing data, and providing this transparently. 

We do not intend to make any recommendations or opinionated statements. 

# Contributing

We'd love your help. Don't be shy, every day that goes by has a heavy cost!

Due to a large influx of contributor requests, we now have a robust contribution workflow, documented here: https://drive.google.com/file/d/15AKOek3_IeKS3gOxy8_mOvzm49eVx95H/view?usp=sharing . Please reference this document to understand how different contributors fit into the organization.

For first time contributors, we would love to meet with you via video conference / phone call! https://calendly.com/get-tested-covid19/get-tested-covid-19-project-sync?month=2020-04

You can also join our Slack, where most of the project-related communication is now happening: gettestedcovid-19.slack.com .

For ideas that reach the 'implementation' phase, efforts will be fully managed inside of GitHub, primarily in the GitHub Issues - with a high-level overview of task progress visible in GitHub Projects. We ask that all contributors claim their Issues before doing work to avoid collisions / conflicting efforts :)

For work in progress, you can interact with Project Managers by opening a Pull Request **to the 'staging' branch.**

## Ethos

Since this is a volunteer project with a rapidly growing number of participants, we want to take special precautions to ensure that our work continues to follow the mission guidelines and that contributors feel valued and rewarded for their work! Please keep the following in mind:

- We will always adhere to our contribution process. Ideas/efforts that aren't approved by the Project Maintainers should not be implemented. Approval is dependent on our approval checklist guidelines: https://drive.google.com/file/d/1MMJCawwQWlC1fgXhWU_Kgqyi0OWmI7cN/view?usp=sharing, and the disgression of the Project Maintainers.

- For this project, supportiveness of our community is more important than critical feedback. If someone is struggling with an effort, explore how you can be supportive of their work. Open source is a great way for people to learn new skills and network!

## Where you can find us:

Primary Communication: Slack: gettestedcovid-19.slack.com

Project Management: GitHub Issues and GitHub Projects

Primary Email: info@get-tested-covid19.org

Video Call w/ Organizers: https://calendly.com/get-tested-covid19/get-tested-covid-19-project-sync?month=2020-04

Public Documents: https://drive.google.com/drive/folders/1jUMZZUvFeKywRVdMcaqAyzpnXsLVr8oP?usp=sharing

Instagram: https://www.instagram.com/get_tested_covid19/

# The Team (Org chart)

## Project Maintainers (approvals)
- Tarryn Marcus
- Katherine Conaway
- Zach Boldyga
- Tentative: Shwetha Hariharan

## Project Managers (code reviews, requirements documentation)
- Zach Boldyga

## Implementation Team
- Tarryn Marcus: Digital Marketing, Website
- Katherine Conaway: Content Creation
- Tiago Almeida: Software Engineer
- Amy Nguyen: Branding, Logo, Color
- Zach Boldyga: Software Engineer
- Nathan Boldyga: Content curation
- Antony Oparin: Technical advice / guidance

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
