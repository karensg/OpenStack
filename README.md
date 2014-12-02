#Installation

At this moment we assume that [node](http://nodejs.org/) and [git](http://git-scm.com/book/en/Getting-Started-Installing-Git) are already installed on the machine.
0. Install imagemagick
brew install imagemagick

1. Install MongoDB.
See [MongoDB documentation](http://docs.mongodb.org/manual/installation/) for installation instructions on different environments
2. Start MongoDB process on default port 27017:

        mongod --port 27017
3. Clone the Github repository:

        git clone https://github.com/yetti4/OpenStack.git
4. Enter the OpenStack folder:

        cd OpenStack
5. Install the npm dependencies:

        npm install
6. Install the bower dependencies:

        bower install        
7. Build the distribution version:

        grunt build
8. Enter the Distribution folder:

        cd dist
9. Run the server in production mode:

        NODE_ENV=production npm start

Now the website is accessible on [http://localhost:8080/](http://localhost:8080/).



#REST API Documentation

{{url}} used for the REST API is [http://localhost:8080/api](http://localhost:8080/api).

##Get all contacts

URL `GET: {{url}}/contacts`

Possible response (200):
```json
[
{
_id: "543bc2f3f2167b31539cc5f8"
firstName: "Test"
lastName: "testen"
email: "testtesten@gmail.com"
mobile: "0123456789"
},
{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Test2"
lastName: "test"
email: "test2@gmail.com"
mobile: "0987654321"
}
]
```

##Get a contact

URL `GET: {{url}}/contacts/{id}`

Possible response (200):
```json
{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Test"
lastName: "testen"
email: "test@gmail.com"
mobile: "098765432"
}
```

##Create a contact

URL: `POST: {{url}}/contacts/`

All attributes are possible, for example:
- firstName (string) [optional]
- lastName: (string) [optional]
- email: (string) [optional]
- mobile: (sting) [optional]  

Response (201):

```json
{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Test"
lastName: "Testje"
email: "testen@gmail.com"
mobile: "1234567"
}
```

##Update a contact

URL: `PUT: {{url}}/contacts/{id}`

Attributes:

- firstName (string) [optional]
- lastName: (string) [optional]
- email: (string) [optional]
- mobile: (sting) [optional]

Response (204):
```
no body
```

##Delete a contact

URL: `DELETE: {{url}}/contacts/{id}`

Response (204):
```
no body
```

##Sort contacts

URL `GET: {{url}}/contacts?sort={attribute}|{-}[optional]{attribute}[optional]`

Add "-" before attribute for DESC sorting

Sample request: {{url}}/contacts?sort=lastName|-mobile

Possible response (200):
```json
[
{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Test"
lastName: "Testje"
email: "testen@gmail.com"
mobile: "1234567"
},{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Test"
lastName: "Testje"
email: "testen@gmail.com"
mobile: "1234567"
},{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Test"
lastName: "Testje"
email: "testen@gmail.com"
mobile: "1234567"
}
]
```

##Filter contacts

URL `GET: {{url}}/contacts?filter={attribute}::(value)|{attribute}::(value)[optional]`

Sample request: {{url}}/contacts?filter=lastName::Visser|firstName::Ruud

Possible response (200):
```json
[
{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Test"
lastName: "Testje"
email: "testen@gmail.com"
mobile: "1234567"
}
]
```

##Paginate contacts

URL `GET: {{url}}/contacts?offset=(int)&limit=(int)`

- offset: where to start
- limit: how many results

Sample request: {{url}}/contacts?offset=1&limit=1

Possible response (200):
```json
[
{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Test"
lastName: "Testje"
email: "testen@gmail.com"
mobile: "1234567"
}
]
```
