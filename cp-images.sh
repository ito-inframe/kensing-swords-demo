for f in `cat /tmp/images`
do
aws s3 cp s3://prod-kensing-hermit-stor-kensinguploadsbucket738f-s5mya81hgule/public/images/$f . --profile evo-dev  
done
