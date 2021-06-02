Mock API 

Lightweight, open-source mock-API creator. No app installations needed (Mockend). Data stored on [JSONBin](https://jsonbin.io).

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
    "employer": "https://api.jsonbin.io/b/5f3ec430514ec5112d09ff47/",
    "trainingInstitute": "https://api.jsonbin.io/b/5f3ec8b9514ec5112d0a027d/",
    "awardingBody": "https://api.jsonbin.io/b/5f3ec9e9993a2e110d322ba9/",
    "assessmentAgency": "https://api.jsonbin.io/b/5f3eca274d8ce411137c8ae2/",
    "course": "https://api.jsonbin.io/b/5f3ee674514ec5112d0a18a2/",
    "batch": "https://api.jsonbin.io/b/5f3eca624d8ce411137c8b09/",
    "qp": "https://api.jsonbin.io/b/5f3ecc9d4d8ce411137c8c83/",
    "vacancy": "https://api.jsonbin.io/b/5f3eccbd993a2e110d322d9e/"
}
```
- **idFields**
```
idFields = {
    "trainee": "trainee_id",
    "employer": "employer_id",
    "trainingInstitute": "training_centre_id",
    "awardingBody": "awarding_body_id",
    "assessmentAgency": "assessment_agency_id",
    "course": "classroom_id",
    "batch": "batch_id",
    "qp": "qp_code",
    "vacancy": "job_vacancy_id"
}
```

- **paths**

```
paths = ['/trainee', '/employer', '/trainingInstitute', '/awardingBody', '/assessmentAgency', '/course', '/batch', '/qp', '/vacancy';`
```

- That's it! No code needed. Test the APIs using cURL, or Postman.
