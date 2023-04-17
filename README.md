# Dashboard: National Parks across the USA 

![shutterstock_404137699](https://user-images.githubusercontent.com/118202453/230911730-8851be6f-171f-45bc-8ece-4206def9411c.jpg)

## Dependencies 
### Flask-powered app 

 - import numpy as np
 - import sqlalchemy
 - from sqlalchemy.ext.automap import automap_base
 - from sqlalchemy.orm import Session
 - from sqlalchemy import create_engine, func
 - from config import database_key (a key to connect to Postgres)
 - import requests 
 - from flask_cors import cross_origin
 - from flask import Flask, jsonify

### Database
PostgreSQL 12 https://www.postgresql.org/

### JavaScript
 - D3 Library https://d3js.org/
 - Leaflet https://leafletjs.com/index.html & Leaflet plugin Awesome-markers https://github.com/lennardv2/Leaflet.awesome-markers

## Teammates 
 - Julie Eremeeva
 - Kathryn Kessler 
 - Elizabeth Hansen 

## Objective
&rarr; Create a dashboard that accumulates data on the US National Parks to make it easier for campers to choose a park to visit.

## Data resources 
 - NPS Stats https://irma.nps.gov/Stats/Reports/National
 - NPS Data API https://www.nps.gov/subjects/digital/nps-data-api.htm

