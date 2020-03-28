# Sponsorship

We are interested in sponsorship, and may run a gofundme or equivalent campaign. Funds or sponsorship may help with:
- Legal guidance
- Server costs (either $ or sponsorship by a cloud hosting provider)
- Compensating volunteers. Many people have lost jobs right now, this seems like reasonable short-term work.

# Contributing

We are all currently volunteers. Many of us have day jobs and are doing this on-the-side.

We'd love your help!

For software-related work, please create or find a github issue. A project maintainer will coordinate with you to make sure someone else isn't already working on a particular task. 

Once you are cleared to work on a feature, task, or bug, create a branch using the git feature-branch workflow. Create a PR when you have made some progress. A maintainer will review PRs when they are ready to be merged. 

## Thanks to all of the following contributors (as of March 27, 2020)!
- Katherine Conaway
- Tarryn Marcus
- Nathan Boldyga
- Tiago Almeida 
- Zach Boldyga


## CI/CD

Currently deployments are manual. Tiago will be creating a CI/CD pipeline.


## Database

The public datasource is updated on a daily basis. We manually review submissions for new test center locations (made thru a Google Form), and release the new test center updates daily.

We will probably need to automate this process so that test center information is more real-time.

## Infrastructure

We need to adjust to a more robust deployment.

## Mobile optimization

Mobile version of app is slightly disfunctional. 

## React client-side

- Our application is only displaying some of the fields from our dataset. We need to add more fields in our search results.

- We should include a leaflet.js map for more clear search results and national-scope view.

## Overall content

A major potential value-add might be in helping new communities to set up test centers. We can provide these communities with resources. We can link them to other community test centers. We can provide transparency so that communities can share best practices with one another.


# DEV OPS

Deployment is on a Rackspace VM in the Dallas region. We have a VM server image that can be duplicated for multi-host deployment, if needed. This instance sits behind a load balancer which holds the SSL certificate and does SSL termination. The load balancer only accepts HTTPS(443) traffic and redirects HTTP to HTTPS.

## VM Instance Configuration
Configuration:

CentOS7
Node.js LTS install (Version 12.x)
Install latest git
Install CertBot

npm install -g pm2

## App Deployment

git clone (this repository)
npm install
npm run build
pm2 serve ./build 3000 --spa

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
