# Social Network API

## Table of Contents

- [Description](#Description)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)
- [Questions](#questions)

## Description

This is a back-end application for a Social Netwrok web where users can post thoughts, create friends list, and react to other users' thoughts. The technologies used afe Express.js, a MongoDB for database, Mongoose ODM, and JavaScript. I also used Moment.js to get the date and time format. Data was created usint Insomnia.

## Technologies

- Express.js
- Node.js
- JavaScript
- Moment.js
- MongoDB
- Mongoose
- Mongoose validator

## Installation

1. Git clone repository to local machine via integrated terminal in Visual Studios (VS).

2. Run npm install to download dependencies.

3. Start the application with npm run start command in terminal

## Usage

This application can be used to create new user with username and email, add friends, post thoughts and add reactions to the thoughts. It also has features to delete users with their thoughts, update users with thoughts, and delete and/or reactions.

- GET/POST routes
  - http://localhost:3001/api/users 
  - http://localhost:3001/api/thoughts

- PUT/DELETE routes: (update or delete by id)
  - http://localhost:3001/api/users/:id
  - http://localhost:3001/api/thoughts/:id

- POST/DELETE route (friends and reactions by id)
  - http://localhost:3001/api/users/:id/friends/:friendId 
  - http://localhost:3001/api/thoughts/:id/reactions 

## Contribution

In order to contribute to this application, please contact the author via email.

## License

MIT License Copyright (c) 2022 [meskyA] 


Permission is herby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limiation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject following coditions: 

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Questions

Please contact the author at:

- email: [mesky@gmail.com]
- GitHub profile: [https://github.com/meskyA]

## Walk-through videos 
- [User-routes](https://drive.google.com/file/d/1bGm6aezmlEgQoI-W42BN4TtqRAJLeBcB/view)
- [Thought-routes]
- [Friend-routes]
- [Reaction-Routes]

## Screen-shots

- [Image](Assets/image-demo-2.png)
- [Image](Assets/image-demo-3.png)
- [Image](Assets/image-demo-4.png)
- [Image](Assets/image-demo.png)




