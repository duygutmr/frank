## How to develop locally

Make sure you have gulp installed on your machine. Execute:

    gulp && npm run serve

Visit <http://localhost:4545> to see see the website on your browser.

## How to deploy the changes

[Netlify](https://www.netlify.com/) picks up the changes as soon as a change is made to master. No manuel deployment needed.

Basically, netlify runs `gulp` to build the project and spits out the `dist` folder where all the static files resides.