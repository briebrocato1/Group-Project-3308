# Group-Project-3308
### Application Description:   
Our project is a website designed to connect and support climbers in the Boulder area by offering a comprehensive, interactive climbing resource. The platform allows users to explore an easy-to-use database of local climbing routes, which includes detailed descriptions, ratings, and reviews. Users can search for routes based on various criteria and contribute to the database by adding new routes with proper documentation.  

To foster a sense of community, the site features a message board where climbers can plan and organize meetups. Climbers can post about upcoming outings, invite others to join, and coordinate details like time and location. This makes it simple to find climbing partners, arrange group climbs, and share adventures with others.  

Key features include:  

- A searchable database of climbing routes in the Boulder area, including contributions from the MountainProject database.  
- User profiles that enable logged-in users to add routes, rate and review climbs, and participate in the community.  
- A message board for planning meetups and connecting with fellow climbers.  
By combining route discovery, user-generated contributions, and tools for community engagement, the platform supports climbers of all skill levels. Whether you're a college student exploring climbing for the first time or an  
experienced climber looking to connect with others, our website is a hub for sharing knowledge, planning adventures, and building connections within the Boulder climbing community.  

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

