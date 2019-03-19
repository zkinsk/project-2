# Superfecta

### Dogs Day Out - [link](https://dogs-day-out.herokuapp.com/)

- Team Members: Andrew Dawson, Alexa Oswald, Jacob Hughes, Scott Zinski

- Project Description: App to bring together dogs and dog owners, to meet at specific times, dates and parks.

- MVP:
  - Authentication/Login
  - Individual user accounts w/dog profiles
    - Dog Profiles viewable by other users
  - Search Function
    - Find owners by their dogs name
    - Find dogs by owners name (if you can remember it)
  - Calendar showing currently booked days
  - Playdate Events
    - Specific Dates
    - Specific Times
    - Selected Parks 
  - Chat messages for coordination
    - Each Chat participant has a viewable dog profile
    
Initial Wireframe Sketch: [CHECK IT OUT](https://xd.adobe.com/view/f894ea2c-7a16-44b1-54c8-8606e70de2d0-8ea5/screen/082e648c-b3b5-4164-aa31-7324eb758f95/Calendar-Day/)

### Technologies Used: 
1. Bulma
    - Responsive CSS Framework
    - Relatively Easy to use classes
1. Jquery
    - Easy access to the DOM for manipluation of screen content
1. Handlebars Templating
    - Easy templating engine
1. Firebase
    - Real Time database for instant chat messages
1. Sequelze
    - JS style acccess to MySQL database
1. Express
    - for HTML routing and API queries
1. Passport JS & bcrypt.js
    - Password protected user data
    - Middleway to verify user authentication before allowing access to various HTML routes
    - bcrypt.js to hash passwords before entering them into the database
1. Amazon AWS
    - Due to issues with storing images on Heroku, we upload our images to Amazon for file storage

**Addition Features**
- Creating a list of favorite dogs or owners to follow
- Searching dogs and owners and which parks and events they are signed up for
    





