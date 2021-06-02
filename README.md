# Mock-API 

Lightweight, open-source mock-API creator. Store data on [JSONBin](https://jsonbin.io), provide a URL to it and provide a `path` to listen to. That's it. 

### Usage
- Download the repository, and the Git Shell on Windows.
- Navigate to the repository folder `cd/mock-api`
- `npm install -g nodemon`
- `nodemon index.js`

### Extending the API for more resources

- Create new JSON Bin [here](https://jsonbin.io/) and add it to the `jsonBin` array - for instance, `https://api.jsonbin.io/b/5f3a5c31b88c04101cf59111/latest`.
- Add resource names to `paths` and unique ID fields to the `idFields ` array.

- Examples:

- **jsonBin**
```
jsonBin = {
    "trainee": "https://api.jsonbin.io/b/5f3ec0ca514ec5112d09fcb6/",
    "your_object": "your_json_bin_url" 
    ...
}
```
- **idFields**
```
idFields = {
    "trainee": "trainee_id",
    "your_object": "unique_id_field"
]
}
```

- **paths**

```
paths = ['/trainee', '/your_object'];`
```

- That's it! No code needed. Test the APIs using cURL, or Postman.
