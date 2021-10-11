# WORK FLOWY

## Run the project.

	1. Start backend
		
		*Just double click "Server start.bat" file,
		*Or move in to the server folder and then run "npm run dev" command.

	2. Start frontend
		
		*Just double click "Client start.bat" file,
		*Or move into the workflow folder and then run "npm start" command.

## Structure of this project.

	1. **Structure for frontend

		*- Developed with React

		*- GraphQL consumer : Apollo
		
		*- Components
		
			*-> Main Component ( Root Component ) : index.js
			*-> Component for Login : src/components/Login
			*-> Components for displaying and modifying
		
				*=> Component for the main task page : src/components/tasks/MainTasks.js
				*=> Component for displaying and modifying : src/components/tasks/TaskDetail.js, 
										src/components/tasks/Task.js
	
	2. **Structure for backend

		*- Used Database : MongoDB
		*- Query Language : GraphQL, Mongoose
		*- based language : javascript
		*- Backend framework : Express
		*- Used Library : Node.js
		*- Used API : RESTful API, GraphQL

		*- MongoDB

			*-> Model : server/api/model 

		*- Contents for GraphQL : server/graphql

			*-> GraphQL Schema : server/graphql/Schema.graphql
			*-> GraphQL Resolvers : server/graphql/resolvers

		*- Contents for RESTful API : server/api (just for user)
			*-> Controller : server/api/controller
			*-> API Route :  server/api/Route
		
		*- Constructing Server : server/express.js, 
								server/server.js

## Using this project

	### Running after this project, user could add remove or modify the tasks that he/she wants.

	**1. Add tasks

		*Just type in the title of task and press 'Enter', then the user could make subtask in it.
	
	**2. Modify tasks

		*- Type in the task to change 
		*- Press 'Tab' to make the task move into the above task.
		*- Press 'Shift + Tab' to make the task move forward, so user could change the state of it.
		*- Press 'Backspace' on the untitled task, that task will be removed.

	**3. Displaying tasks

		*If the user clicks the small triangle button, it can expand/fold the tasks.
		*If the user clicks the small circle button, it only shows the detailed tasks of it.

## GitHub

	The source code of this project can be found in https://github.com/wonderfulsoldier/workflowy