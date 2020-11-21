#Install Dependencies

echo "SETTING UP DEPENDENCIES"
if [ "$(uname)" == "Darwin" ]; then
    pwd
    echo "RUNNING UNDER MAC OSX" 
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    pwd
    echo "RUNNING UNDER a linux distro"
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    cd
    echo "RUNNING UNDER Windows"
fi


i=1
sp="/-\|"
echo -n ' '
while [ $i -lt 100000 ]
do
    printf "\b${sp:i++%${#sp}:1}"
done

echo
echo

echo "Is this development or production? (d for dev, p for prod)"
read node_env


if [ $node_env == "d" ]; then
  node_env="development"
else
  node_env="production"
fi

sleep 2
echo
echo "What is your Twitter Consumer API?"
read consumer_api

sleep 2
echo
echo "What is your Twitter Secret API"
read consumer_secret

sleep 5

# npm start # Start the local server  

printf 'IP=localhost\nPORT=3001\nNODE_ENV=%s\nTWITTER_CONSUMER_API_KEY=%s\nTWITTER_CONSUMER_API_SECRET=%s\n' $node_env $consumer_api $consumer_secret > .env


npm install
cd client && npm install
cd ../ 
npm start # start server