#Installation

#REST API Documentation

##Get all contacts

URL `GET: {{url}}/contacts`

Possible response (200):
```
[
-{
_id: "543bc2f3f2167b31539cc5f8"
firstName: "Hylke"
lastName: "Visser"
email: "htdvisser@gmail.com"
mobile: "064512145"
}
-{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Ruud"
lastName: "Visser"
email: "visser.rgm@gmail.com"
mobile: "0614504144"
}
-{
_id: "543bcc281ca5ab49531d8ad1"
firstName: "Karens"
lastName: "Grigorjancs"
email: "k.grigorjancs@gmail.com"
mobile: "06123456789"
}
-{
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
```
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

Attributes:
`
- firstName (string) [optional]
- lastName: (string) [optional]
- email: (string) [optional]
- mobile: (sting) [optional]
`

Possible response (201):
```
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
`
- firstName (string) [optional]
- lastName: (string) [optional]
- email: (string) [optional]
- mobile: (sting) [optional]
`

Possible response (204):
```
```

##Delete a contact @TODO

URL: `DELETE: {{url}}/contacts/{id}`

Possible response (204):
```
```

##Sort contacts

URL `GET: {{url}}/contacts?sort={attribute}|{-}[optional]{attribute}[optional]`

Add "-" before attribute to toggle ASC or DESC

Possible response (200):
```
[
-{
_id: "543bcc281ca5ab49531d8ad1"
firstName: "Karens"
lastName: "Grigorjancs"
email: "k.grigorjancs@gmail.com"
mobile: "06123456789"
}
-{
_id: "543bc2f3f2167b31539cc5f8"
firstName: "Hylke"
lastName: "Visser"
email: "htdvisser@gmail.com"
mobile: "064512145"
}
-{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Ruud"
lastName: "Visser"
email: "visser.rgm@gmail.com"
mobile: "0614504144"
}
-{
_id: "543bcc3e1ca5ab49531d8ad2"
firstName: "Jan"
lastName: "van de Kerkhof"
email: "jvdkerkhof@gmail.com"
mobile: "0687654321"
}
]
```

##Filter contacts

URL `GET: {{url}}/contacts?filter={attribute}::(string)|{attribute}::(string)[optional]`

Possible response (200):
```
[
-{
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

Possible response (200):
```
[
-{
_id: "543bcc121ca5ab49531d8ad0"
firstName: "Ruud"
lastName: "Visser"
email: "visser.rgm@gmail.com"
mobile: "0644545471"
}
-{
_id: "543bcc281ca5ab49531d8ad1"
firstName: "Karens"
lastName: "Grigorjancs"
email: "k.grigorjancs@gmail.com"
mobile: "06123456789"
}
]
```

