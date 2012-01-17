# Introduction

Tasty is a simple bookmarking web service in the spirit of del.icio.us. Actually it's just something I threw together to experiment with creating a RESTful web service using Node.js and MongoDB.

# Setup

The following command will create a database named **tasty**, a collection named **bookmarks**, and fill that collection with some initial data.

`mongoimport -d tasty -c bookmarks initial-data.json`

# Service Description

## Bookmarks ##

The bookmark object looks like this.

```
{  
    "_id" : "4f149facf3ab85b7f2c576f1",  
    "name" : "Example Site",  
    "url" : "http://example-site.com",  
    "description" : "This is an example site"  
}
```

And the API looks like this.

| **Request**             | **Description**                                             |
| ----------------------- | ----------------------------------------------------------- |
| GET /bookmarks          | Returns a collection of all bookmarks __*__                 |
| GET /bokmarks/`:id`     | Returns the bookmark specified by the `:id` parameter __*__ |
| POST /bookmarks         | Creates a new bookmark                                      |
| PUT /bookmarks/`:id`    | Updates the bookmark specified by the `:id` parameter       |
| DELETE /bookmarks/`:id` | Deletes the bookmark specified by the `:id` parameter       |

__*__ Results can be filtered with the fields parameter (see below)

## Fields Parameter

The fields parameter allows you to determine which fields should be included in the response. The default is to return all fields, and the `_id` is always returned.

The following example will only return the `name` and `url` (and `_id`) fields.

`GET /bookmarks?fields=name,url`


## Client

No client is provided at this time however here are some curl commands for testing functionality.

Create new bookmark

```
curl \
  -X POST \
  -d "name=Example%20Site" \
  -d "url=http%3A%2F%2Fexample-site.com" \
  -d "description=This%20is%20an%20example%20site" \
  127.0.0.1:8080/bookmarks
```

Retrieve specified bookmark

```
curl -X GET 127.0.0.1:8080/bookmarks/BOOKMARK_ID
```

Update specified bookmark

```
curl \
  -X PUT \
  -d "name=Example%20Site" \
  -d "url=http%3A%2F%2Fexample-site.com" \
  -d "description=This%20is%20an%20example%20site" \
  127.0.0.1:8080/bookmarks/BOOKMARK_ID
```

Delete specified bookmark

```
curl -X DELETE 127.0.0.1:8080/bookmarks/BOOKMARK_ID
```

# License

Copyright (c) 2012 Ethan Zimmerman, http://thebinarypenguin.com

Licensed under the MIT License
