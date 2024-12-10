# Group-Project-3308
### Application Description:   
We are creating an interactive database of rock-climbing routes in the Boulder area. We are creating a website catered to college students interested in climbing, with the ability to browse local routes, search for specific routes, view a message board, and create user profiles. Once logged into their profile, users will be able to add new routes, review/rate routes, post to the message board, and find climbing partners.  
Our site will include a full database of climbs in the Boulder area pulled from MountainProject. Climbers will be able to add their own routes, provided they have proper documentation of the climbs.  

### Contributors:   
Arielan Palencia Li, Oliver Costello, Brie Brocato, Suhani Agarwal, Kristin Off  

### Technology Stack Used:   
HTML, CSS, PostgreSQL, Docker, NodeJS, Python, Mocha, Render, Express  

### Prerequisites:  
https://github.com/OpenBeta/climbing-data/tree/main  

### Instructions:
1. Clone the repository and make the following changes:  
  - Create a .env file in the ProjectSourceCode folder with the following information:  
      SESSION_SECRET="//YOUR SESSION SECRET\\"  
      POSTGRES_USER="//YOUR USER\\"  
      POSTGRES_PASSWORD="//YOUR PASSWORD\\"
      POSTGRES_DB="routes_db"  
      POSTGRES_HOST = "db"  
2. To run the application:  
- Go to your console and make sure you are in the ProjectSourceCode folder  
- Run docker compose up  
- Wait for the console to finish running tests and say "Server is listening on port 3000"  
- In your browser, go to localhost:3000  

### How to run tests:  
After cloning the repository and following the instructions listed above, the console will run the tests after "docker compose up" is run, and you can see them in the console.  

### Link:   
https://bouldering-buffs.onrender.com/home  

