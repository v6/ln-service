## Installation Instructions ##

PREREQUISITES: 
               Please have `git` installed, and have a working github account, [preferably with SSH access](https://help.github.com/articles/connecting-to-github-with-ssh/). 
               Please also make sure that you have npm installed, too. The best way to install it for personal use is [NVM](https://github.com/creationix/nvm#verify-installation). 
               You'll also need `node.js` version v7.7.4 or later. You can install the latest `node.js` via [NVM](https://github.com/creationix/nvm#verify-installation) by the following command: `$ nvm install node`
               Willingness to report bugs? 

The following worked correctly on an Ubuntu 16.04 server: 

    $ nvm install node
    $ mkdir -p ~/projects/lninterfaces
    $ cd ~/projects/lninterfaces
    $ ls
    $ git clone git@github.com:alexbosworth/ln-service.git
    $ git clone https://github.com/alexbosworth/ln-service.git
    $ ls
    $ cd ln-service
    $ ls
    $ npm install             ##  This installs the app.
    $ npm install -g nodemon  ##  This is a utility to start the app and watch its source code for changes.
    $ nodemon app.js          ##  This starts the app and watches its source code for changes.
    $ curl localhost:10553    ##  This tests to see whether the app is up.
