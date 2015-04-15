#!/bin/bash

sleep 1
token=`tar -cz --exclude .git .|ssh -q test@code.corvisacloud.com`
clear

echo "Starting Test Runner..."
ssh -t test@code.corvisacloud.com "$token --test"
echo