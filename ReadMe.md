## Project34 API

## Calls:

**Action:** Fetch all data \
**Method:** GET \
**URL:** http://localhost:3000/api/data/
**Result:**

````json
[
  {
    "first_name": "John",
    "last_name": "Doe",
    "time": 1676817750577,
    "email": "john.doe@example.com",
    "age": 30
  },
  {
    "age": 30,
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "time": 1676817746276,
    "first_name": "Ruben"
  }
]
````

**Action:** Fetch specific info from a specific document using the *document_id* and *field_name* \
**Method:** GET \
**URL:** http://localhost:3000/api/data/document_id/field_name \
**Example:** http://localhost:3000/api/data/Gjd0nyWca0l67eJ6XmCJ/time \
**Result:**

````json
{
  "data": 1676817746276
}
````

**Action:** Fetch all info where the WHERE clause is equal to true \
**Method:** GET \
**URL:** http://localhost:3000/api/data/field_name/value/operator \
**Example:** http://localhost:3000/api/data/first_name/john/== \
**Result:**

````json
{
  "first_name": "John",
  "age": 30,
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "time": 1676817750577
}
````