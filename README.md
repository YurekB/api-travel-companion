As this this is a skeleton we need to dissociate the project from it's existing github repo. Steps:

1.  run "rm -rf .git" in the terminal -> this will delete git history
2.  Update project name is package.json -> this should be api-lowercase-hyphenated
3.  Run git init to create new git version
4.  npm i -> install all dependencies
5.  Create github repo and link
6.  Set up main and staging branches -> then your own to work on. Main and staging shouldn't be worked on locally.

Once you're sure this is on the new project, you can run sequelize cli commands to create the database

1. Create new database in phpMyAdmin
   a. Save the password, username etc and add to env file
2. npx sequelize-cli db:migrate -> this will build the database
3. If no errors, run tests

ENVs

1.  Please use the env names as they currently are. Remove any you don't need.
