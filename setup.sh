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

npm install
cd client && npm install
cd ../ 
npm start # Start the local server  