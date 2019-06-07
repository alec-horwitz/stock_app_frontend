# Stock_App_Frontend



This is frontend that I'm using as a side project to learn about the stock market and the basics of building graphs with D3. Eventually I plan to build a backend api to generate suggestions on what stock should be sold or bought. This backend will be intended as a way for me to learn how to make mechine learning algorithms with python and then learn how to make it into an api with django.


For more information on the planning phases of this project checkout my blog posts here:

 * Phase 0: https://alecthedeveloper.wordpress.com/2019/03/25/a-d3-mechine-learning-and-django-project-phase-0/. 
 * Phase 1: https://alecthedeveloper.wordpress.com/2019/04/15/a-d3-mechine-learning-and-django-project-phase-1/.
 * Phase 2: https://alecthedeveloper.wordpress.com/2019/06/06/a-d3-mechine-learning-and-django-project-phase-2-and-other-new-developments/


Below are some screenshots of the app looks on a mobile divice:
 
![menu page](./Menu_Page.png)

![graph page](./Graph_Page.png)

![settings page](./Settings_Page.png)

![suggestions page](./Suggestions_Page.png)


Set Up
------
To run this project locally fork and clone this project, create a Quandl account and get your api key by following these instructions from the Quandl documentation: https://docs.quandl.com/docs#section-authentication

navigate to the root directory of this project and then in the src folder create a file called Secrets.js and add the following line to that file:

         export const API_KEY = "YOUR_QUANDLE_API_KEY_HERE"

where YOUR_API_KEY_HERE is your Quandl api key.

Then in terminal navigate to the root directory of this project run the following commands in terminal: 

          npm install
          npm start
          
npm then should print out the port you need to go to on localhost to view the app.


Known Bugs/Issues
-----------------

The graphs are not finished. This means there are a few problems that are worth noting about the app in it's current state:
       
 * Sometimes the app will crash do to a timing issue (this will be addressed after the backend is completed)
 * There is no code yet for line graphs so in place of line graphs the app just creates bar charts (I'll get to this when after I fix the app crashing bug)
 * The functionallity of these graphs are limited to just showing the must reacent opening and closing prices of each stock which isn't terribly useful (I'll get to that as soon as I make a line graph)
