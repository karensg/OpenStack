#Installation

At this moment we assume that [node](http://nodejs.org/) and [git](http://git-scm.com/book/en/Getting-Started-Installing-Git) are already installed on the machine.

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
6. Start the server:

        npm start

Now the website is accessible on [http://localhost:3000/](http://localhost:3000/).

If you would like to change the port in Linux, run:

        export PORT=8080 && npm start
        
For Windows, run:

        set PORT=1234 && npm start

#REST API Documentation

##Get all contacts

URL `GET: {{url}}/contacts`

Possible response (200):
```json
[
{
_id: "543bc2f3f2167b31539cc5f8"
firstName: "Hylke"
lastName: "Visser"
email: "htdvisser@gmail.com"
mobile: "064512145"
},
{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Ruud"
lastName: "Visser"
email: "visser.rgm@gmail.com"
mobile: "0614504144"
},
{
_id: "543bcc281ca5ab49531d8ad1"
firstName: "Karens"
lastName: "Grigorjancs"
email: "k.grigorjancs@gmail.com"
mobile: "06123456789"
},
{
_id: "543bcc3e1ca5ab49531d8ad2"
firstName: "Jan"
lastName: "van de Kerkhof"
email: "jvdkerkhof@gmail.com"
mobile: "0687654321"
}
]
```

##Get a contact

URL `GET: {{url}}/contacts/{id}`

Possible response (200):
```json
{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Ruud"
lastName: "Visser"
email: "visser.rgm@gmail.com"
mobile: "0614504144"
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
firstName: "Ruud"
lastName: "Visser"
email: "visser.rgm@gmail.com"
mobile: "0614504144"
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
_id: "543bcc281ca5ab49531d8ad1"
firstName: "Karens"
lastName: "Grigorjancs"
email: "k.grigorjancs@gmail.com"
mobile: "06123456789"
},
{
_id: "543bc2f3f2167b31539cc5f8"
firstName: "Hylke"
lastName: "Visser"
email: "htdvisser@gmail.com"
mobile: "064512145"
},
{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Ruud"
lastName: "Visser"
email: "visser.rgm@gmail.com"
mobile: "0614504144"
},
{
_id: "543bcc3e1ca5ab49531d8ad2"
firstName: "Jan"
lastName: "van de Kerkhof"
email: "jvdkerkhof@gmail.com"
mobile: "0687654321"
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
firstName: "Ruud"
lastName: "Visser"
email: "visser.rgm@gmail.com"
mobile: "0644545471"
}
]
```

##Paginate contacts

URL `GET: {{url}}/contacts?offset=(int)&limit=(int)`

- offset: where to start
- limit: how many results

Sample request: {{url}}/contacts?offset=1&limit=2

Possible response (200):
```json
[
{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Ruud"
lastName: "Visser"
email: "visser.rgm@gmail.com"
mobile: "0644545471"
},
{
_id: "543bcc281ca5ab49531d8ad1"
firstName: "Karens"
lastName: "Grigorjancs"
email: "k.grigorjancs@gmail.com"
mobile: "06123456789"
}
]
```
