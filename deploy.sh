echo "Jump to app folder"
cd /home/ubuntu/eggreat-service

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Restart App"
pm2 restart eggreat-service