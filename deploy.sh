#!/bin/bash

npm run build
rsync -a ./build ubuntu@whale.drkbl.com:/home/ubuntu/whale-fe
rsync -a ./sh/whale-fe.service ubuntu@whale.drkbl.com:/home/ubuntu/
ssh ubuntu@whale.drkbl.com 'sudo cp /home/ubuntu/whale-fe.service /etc/systemd/system && sudo systemctl reenable whale-fe.service && sudo systemctl restart whale-fe.service'
