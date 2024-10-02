# Project Description

This project was written using ReactJS, TypeScript and MaterialUI. 

For global state management I have chosen React Context API, because I think the data will not be changed too often and therefore I didn't have to download Redux as a third party library. It is always better if the code bundle stays smaller. 

For smaller devices - breakpoints xs and sm - I added three vertical dots icon on right side of header for the Fix Header button. It is a toggle button between position fixed and static, I found it a useful feature and therefore I implemented it. 

On a Movie detail page I added the star symbol next to the rating because I think it is better than putting it next to Movie title especially for smaller devices because title can be relatively long and the icon wouldn't fit well there. For screens larger than 1200 pixels I put the Star icon in the same line as the movie title. 

Many movie records have N/A as a poster value, therefore images don't show all the time. I decided to show a Title instead in that case. Search for 'Winnetou' and see pages 2 - 4 for this use case. 

For styling I like to use CSS modules, because I like to have my CSS code in external files. At the projects we used to style with styled() method from MUI. I used CSS modules from beginning, but later I switched from CSS variables in external .css files to the custom MUI theme and therefore I used makeStyles(). I think is important to stay consistent, but I would like to show you all three ways of styling in this project therefore I will leave my 
.module.css files as it is. 

I try to not put JavaScript code into JSX, I rather do my calculation before rendering JSX and put only the result of calculations into JSX code. I also try to avoid inline styling. Occasionally a short code with sx={} or style={} can be forgiven, if using other methods would not be very beneficial. I think it is a matter of agreement among team members on concrete project, which method they will all adhere to. 

# Project structure

I put basically all files into src folder. In src - components I have all my components, further divided into UI, layout and movie. Every component has its own folder, where are both .tsx and 
.css files 
Special pages components are in pages folder in src 

In src - helpers folder I have some util methods. I use to put my data types like interfaces, enums, types and constants into src - model. In src - store I have my context API. 
Outside of those folders are only few files, App.tsx - our root component, index.tsx where our application starts, index.css with some global styles and some configuration files: tsconfig.json, package.json, package-lock.json, gitignore file and this readme file. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
