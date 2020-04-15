Environment: ${environment}
Bastion:
  Username: ec2-user
  Public IP: ${bastion_public_ip}

RDS:
  Cluster Endpoint: ${rds_cluster_endpoint}
  ClUSTER Instance Endpoints: ${rds_cluster_instance_endpoints}
  Cluster Reader Endpoint: ${rds_cluster_reader_endpoint}
  Cluster Master Username: ${rds_cluster_master_username}
  Cluster Password: ${rds_cluster_master_password}
