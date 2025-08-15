for f in `cat /tmp/parms0`
do
echo ----$f
aws s3 ls s3://$f --profile evo-dev --recursive | grep -v '/$' 
done
