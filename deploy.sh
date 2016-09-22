zip -r Code.zip node_modules/ *.js *.json
aws lambda update-function-code --function-name brutus --zip-file fileb://Code.zip
rm Code.zip