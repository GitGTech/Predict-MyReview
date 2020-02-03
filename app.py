import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template,url_for,request
from flask_sqlalchemy import SQLAlchemy
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.externals import joblib




app = Flask(__name__)

# rendering templates for all html pages
@app.route("/")
def index():
#     """Return the homepage."""
    return render_template("index.html")




@app.route('/predict',methods=['POST'])
def predict():
     amazon= pd.read_csv("static/data/amazon_Reviews.csv")
     X1=amazon['reviews.text'].values.astype('U')
     y1=amazon['review_rating']
     X1_train, X1_test, y1_train, y1_test = train_test_split(X1, y1, test_size=0.33, random_state=42)

     vectorizer= TfidfVectorizer()
     X1_train_vectors=vectorizer.fit_transform(X1_train)
     X1_test_vectors = vectorizer.transform(X1_test)


     model_nb = MultinomialNB()
     model_nb.fit(X1_train_vectors,y1_train)
     model_nb.predict(X1_test_vectors)

     filename = 'NaiveBayesModel.pkl'
     joblib.dump(model_nb, filename)
     NB_model = open('NaiveBayesModel.pkl','rb')
     NB_model_loaded = joblib.load(NB_model)


    
    
    
     if request.method == "POST":
          message = request.form["message"]
          data = [message]
          vect = vectorizer.transform(data)
          my_prediction = NB_model_loaded.predict(vect)
     return render_template('result.html',prediction = my_prediction)


@app.route("/data")
def datatabicon():
     return render_template("data_table.html")



@app.route("/precision")
def precisionicon():
     return render_template("precision.html")


@app.route("/predictor")
def predictoricon():
     return render_template("predictor.html")

@app.route("/model")
def modelicon():
     return render_template("model.html")

# @app.route("/timeframeheatmap")
# def heatmap():
#      return render_template("heatmap.html")
   
    

# @app.route("/current2019")
# def choroplethmap():
#      return render_template("choroplethmap.html")
   

# @app.route("/gundata")
# def data():
#      return render_template("gundata.html")
   

if __name__ == "__main__":
     app.run(debug=True)
    