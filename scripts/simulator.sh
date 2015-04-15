#!/bin/bash

sleep 1
token=`tar -cz --exclude .git .|ssh -o "StrictHostKeyChecking no" -o "PasswordAuthentication no" -q test@code.corvisacloud.com`
clear

echo "Running Simulator..."
ssh -o "StrictHostKeyChecking no" -o "PasswordAuthentication no" -t test@code.corvisacloud.com "$token"
echo