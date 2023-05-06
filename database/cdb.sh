docker run -d -v /home/scien/couchdata:/opt/couchdb/data -v /home/scien/couchconfig:/opt/couchdb/etc/local.d -p 5984:5984 --network=couchnet couchdb
