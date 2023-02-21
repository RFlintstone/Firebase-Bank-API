## Project34 API

## Calls:
**Action:** Insert data \
**Method:** POST \
**URL:** http://localhost:3000/api/insert \
**Expected Body:** 

````json
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "iban": "NL54INGB1587926199",     // This will count as the document ID
    "age": 30
}
````
**Result:**
````json
{
    "state": "added document"
}
````
**Note:** You won't have to pass 'time' as that will automatically be added


**Action:** Fetch all data \
**Method:** GET \
**URL:** http://localhost:3000/api/data/
**Result:**

````json
[
  {
    "first_name": "John",
    "last_name": "Doe",
    "time": "21-02-2023 - 00:00:00",
    "email": "john.doe@example.com",
    "age": 30
  },
  {
    "first_name": "Jane",
    "last_name": "Doe",
    "time": "21-02-2023 - 00:00:00",
    "email": "jane.doe@example.com",
    "age": 30
  }
]
````

**Action:** Fetch specific info from a specific document using the *document_id* and *field_name* \
**Method:** GET \
**URL:** http://localhost:3000/api/data/document_id/field_name \
**Example:** http://localhost:3000/api/data/NL77INGB8057339330/time \
**Result:**

````json
{
  "data": "21-02-2023 - 00:00:00"
}
````

**Action:** Fetch all info where the WHERE clause is equal to true \
**Method:** GET \
**URL:** http://localhost:3000/api/data/field_name/value/operator \
**Example:** http://localhost:3000/api/data/first_name/John/== \
**Result:**

````json
{
  "first_name": "John",
  "last_name": "Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "time": "21-02-2023 - 00:00:00"
}
````