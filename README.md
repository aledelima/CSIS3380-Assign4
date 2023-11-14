# REST API Exercise Lab

## Goal
Create a simple API using ExpressJS, and execute some CRUD operations.

## Tasks
1. Create a local REST API server.
2. Create a local data file in JSON format.
3. Manually populate the data file with some data based on [Mockaroo.com](https://www.mockaroo.com/) or other APIs such as [randomuser.me](https://randomuser.me/api/?results=5) (5 JSON objects are generated; you can generate more). For this exercise, simplify the data to three properties: `id`, `email`, and `username`. Use some random ids for your first 5 records.

    For example:
    ```json
    [
      {
        "id": 123,
        "email": "a123@mail123.com",
        "username": "id123"
      },
      { /* ... */ },
      { /* ... */ },
      { /* ... */ },
      { /* ... */ }
    ]
    ```

4. Use the `record.js` file provided during the lesson (some minor modifications needed to match the attribute names).
5. Write your API for different endpoints to perform CRUD and test with Postman or other tools.
    a. `GET /getusers` for getting all users and attributes.
    b. `GET /getuser/id` for getting all repositories for a specific id.
    c. `GET /getrandomuser` for getting one random user.
    d. `POST /newuser` for creating a new repository.
    e. `PUT /user/:id` for updating a repository with username.
    f. `DELETE /user/:id` for deleting a repository with username.

6. Implement error checking and test.
7. Submit to the provided Blackboard link for 2 marks.

**Note:** All submissions get 1 mark regardless of whether they are correct or not. You need to complete the task and self-evaluate. If you believe you did the job right, you can claim your 1 extra point. If you claim your mark, your code will be evaluated. If your code doesn't work, you lose the 1 mark for the submission.