### Skills-Stack Mock API 

# Usage
- Download the repository, and the Git Shell on Windows.
- Navigate to the repository folder `cd/Downloads/skills-stack-mock-api`
- `npm install -g nodemon`
- `nodemon index.js`

# Extending the API for more resources

- Create new JSON Bin like [here!](https://jsonbin.io/) and replace `https://api.jsonbin.io/b/5f3a5c31b88c04101cf59111/latest` with its API URL.
- Replicate the functions and paths created for `/trainee` with functions and paths for the new resource. 
- ```server.get('/trainee') -> server.get('/new-resource') ```
