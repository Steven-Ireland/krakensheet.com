#!/bin/bash

curl -X PUT http://admin:admin@localhost:5984/feats
curl -X PUT http://admin:admin@localhost:5984/traits
curl -X PUT http://admin:admin@localhost:5984/races
curl -X PUT http://admin:admin@localhost:5984/spells
curl -X PUT http://admin:admin@localhost:5984/users
curl -X PUT http://admin:admin@localhost:5984/classes
curl -X PUT http://admin:admin@localhost:5984/sheets
curl -X PUT http://admin:admin@localhost:5984/sessions
