#!/bin/bash

rsync -a -e "ssh -i sheng-macbook.pem" ../build ubuntu@54.183.210.91:/home/ubuntu/whale-fe
rsync -a -e "ssh -i sheng-macbook.pem" ./whale-fe.service ubuntu@54.183.210.91:/home/ubuntu/
ssh -i sheng-macbook.pem ubuntu@54.183.210.91 'sudo cp /home/ubuntu/whale-fe.service /etc/systemd/system && sudo systemctl reenable whale-fe.service && sudo systemctl restart whale-fe.service'
