#!/bin/bash

token=`/bin/tar -cz --exclude .git -C /SummitApp .|ssh -q test@code.corvisacloud.com`
clear

echo "Starting Test Runner..."
ssh -t test@code.corvisacloud.com "$token --test"
echo