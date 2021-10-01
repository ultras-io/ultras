#!/bin/bash -x

REGION=$(curl 169.254.169.254/latest/meta-data/placement/availability-zone/ | sed 's/[a-z]$//')

cd /home/ec2-user

wget https://<ultras>-$REGION.s3.amazonaws.com/latest/install

chmod +x ./install

./install auto

