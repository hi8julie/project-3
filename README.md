# Dashboard: National Parks across the USA 

- The link to the Dashboard: https://hi8julie.github.io/project-3/

- The link to the Flask App: https://national-parks.onrender.com/

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
 - Leaflet https://leafletjs.com/index.html & Leaflet plugin ExtraMarkers https://github.com/coryasilva/Leaflet.ExtraMarkers

## Teammates 
 - Julie Eremeeva
 - Kathryn Kessler 
 - Elizabeth Hansen 

## Objective
&rarr; To create a dashboard with various information on the US National Parks for visitors, including visitation statistics, location, activities available, water/air quality, and entrance fee cost. The dashboard should be intuitive and easy to use for anyone interested. ​

## Data resources 
 - NPS Stats https://irma.nps.gov/Stats/Reports/National
 - NPS Data API https://www.nps.gov/subjects/digital/nps-data-api.htm
 
 ## Challenges
 - Inconsistent data across several endpoints (geojson/csv). We had to make 2 API calls within one script to get information we needed. ​
 - We faced issues while working with National Park Services API (couldn't filter the data). 

## Preview 
<img width="670" alt="parks-dashboard" src="https://user-images.githubusercontent.com/118202453/233524937-fee0d4e7-6fff-440a-a488-61614f42c68b.PNG">


