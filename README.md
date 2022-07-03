# Robot Race

Based on a board game.

Forked from [this commit](https://github.com/nick-ng/pig-dice-game/tree/3a89a39beeec72fe83670879c23086d5988af42e) of [pig-card-game](https://github.com/nick-ng/pig-card-game).

## Development

1. `npm install`
2. `docker-compose up -d` - For local redis environment
3. `npm start`
4. Navigate to one of the following:
   - http://localhost:3232/test.html
   - http://localhost:3232/test-ws.html

## Forking (on different GitHub account)

1. Click the fork button

## Forking (on same or different GitHub account)

1. Create new empty repository on GitHub (or whatever)
2. `git clone https://github.com/nick-ng/robot-race.git <new-repo> && cd <new-repo>`
3. Change `robot-race` to whatever you want and change my name to your name or something.
4. `git add . && git commit -m "anything. this will get squashed in the next step"`
5. `git reset $(git commit-tree HEAD^{tree} -m "forked https://github.com/nick-ng/robot-race")`
6. `git remote remove origin`
7. `git remote add origin <url-of-repo-you-made>`
8. `git push --set-upstream origin main`
9. Change branch permissions etc.

## Deploying to Heroku

1. Create an empty Heroku App. Note the app's name
2. Get your Heroku API key from https://dashboard.heroku.com/account
3. On GitHub repo for your fork, go to the Settings and click on Secrets > Actions
4. Add 3 new repository secrets
   - `HEROKU_API_KEY`: API key from above
   - `HEROKU_APP_NAME`: App name from above
   - `HEROKU_EMAIL`: Email address of your Heroku account
5. Push a commit to the `main` branch.

## ToDos

Check this [GitHub Project](https://github.com/users/nick-ng/projects/1) for details.
