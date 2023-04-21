import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import database_key
import requests 
from flask_cors import cross_origin

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine(database_key)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Visitation = Base.classes.visitation


# 1. import Flask

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)


# 3. Define what to do when a user hits the index route

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Here's the Available Routes:<br/>"
        f"/api/v1.0/np-visitation<br/>"
        f"/api/v1.0/np-geojson<br/>"
    )

@app.route("/np-visitation")
@cross_origin() # allow all origins all methods.
def home():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Perform a query to retrieve the park data.
    results = session.query(Visitation).all()
    session.close()
    
    cols = ['park_id', 'state', 'national_park', 'visitation_2022', 'total_recreation_visitor_hours_2022', 'visitation_2021', 'total_recreation_visitor_hours_2021', 'visitation_2020', 'total_recreation_visitor_hours_2020']
    result = [{col: getattr(d, col) for col in cols} for d in results]
    return jsonify(result=result)

@app.route("/np-geojson")
@cross_origin() # allow all origins all methods.
def geojson(): 
    url = "https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson"
    response = requests.get(url).json()

    return response

if __name__ == "__main__":
    app.run(debug=True)
