#!/bin/bash

npm run build
rsync -a ./build ubuntu@54.183.210.91:/home/ubuntu/whale-fe
rsync -a ./sh/whale-fe.service ubuntu@54.183.210.91:/home/ubuntu/
ssh ubuntu@54.183.210.91 'sudo cp /home/ubuntu/whale-fe.service /etc/systemd/system && sudo systemctl reenable whale-fe.service && sudo systemctl restart whale-fe.service'
