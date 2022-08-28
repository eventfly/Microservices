import pandas as pd
import csv
import json
import sys


import numpy as np
import math
from geopy.distance import geodesic

from sklearn.feature_extraction.text import TfidfVectorizer,CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics.pairwise import linear_kernel

from ast import literal_eval
import warnings
warnings.filterwarnings('ignore')


eventsData = sys.argv[1]

participantLng = sys.argv[2]
participantLat = sys.argv[3]

dfEvent = pd.read_json(eventsData)



def getVector(eventDesc):
    # create the transform
    vectorizer = TfidfVectorizer()
    # tokenize and build vocab
    # vectorizer.fit(eventDesc)

    # encode document
    # vector = vectorizer.transform([eventDesc[0]])

    vector = vectorizer.fit_transform(eventDesc)
    # print(vector)
    
    return vector


def getEventTfidfVector():
    
    allInfo = []

    for index, event in dfEvent.iterrows():
        tags = ''

        for tag in event['tags']:
            tags = tags + ' ' + tag['name']

        info = event['name'] + " " + tags.strip() + " " + event['description']
        allInfo.append(info)

    # print(allInfo)
    return getVector(allInfo)



def calculateProximity(participantLocation, eventLocation):
    eventLng = eventLocation[0]
    eventLat = eventLocation[1]

    participantLng = participantLocation[0]
    participantLat = participantLocation[1]

    # print(eventLng, eventLat, participantLng, participantLat) 

    eventCoordinates = (eventLat, eventLng)
    participantCoordinates = (participantLat, participantLng)

    distance = geodesic(participantCoordinates, eventCoordinates).km
    # print("distance: ", distance)
    return distance



def computeFeatures():

    boostScores = []

    for i, event in dfEvent.iterrows():
        org = event['organizer']
        boostScores.append(org['boost_factor'])

    participantLocation = [participantLng, participantLat]

    eventsTfidfVector = getEventTfidfVector()
    cosine_sim = linear_kernel(eventsTfidfVector, eventsTfidfVector)

    sim_scores_aggregated = []
    distanceInfos = []

    for index, event in dfEvent.iterrows():
        eventLocation = event['location']
        dist = calculateProximity(participantLocation, event['location'])
        distanceInfos.append(dist)

        if(dist <= 10):
            sim_scores = list(enumerate(cosine_sim[index]))
            sim_scores_aggregated.append(sim_scores)

    
    
    distanceSum = sum(distanceInfos)

    for idx, item in enumerate(distanceInfos):
        if item <= 10:
            distanceInfos[idx] = item / distanceSum
        else:
            distanceInfos[idx] = 1
    
    sim_scores_final = sim_scores_aggregated[0]

    itr = 1

    while itr < len(sim_scores_aggregated):
        score = sim_scores_aggregated[itr]

        for idx, item in enumerate(score):
            sim_scores_final[idx] = (idx, sim_scores_final[idx][1] + item[1])
        
        itr = itr + 1


    for idx, item in enumerate(sim_scores_final):

        score = 1 - distanceInfos[idx]
        score = score * boostScores[idx]
        sim_scores_final[idx] = (idx, score)
    

    sim_scores_final = sorted(sim_scores_final, key=lambda x: x[1], reverse=True)
    sim_scores_final = [a for a in sim_scores_final if a[1] > 0.000001]

    event_indices = [i[0] for i in sim_scores_final]

    # print(sim_scores_final)
    # print(event_indices)

    # print(dfEvent['name'].iloc[event_indices])
    print(dfEvent['id'].iloc[event_indices])
        



computeFeatures()