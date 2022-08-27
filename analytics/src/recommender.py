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
participantData = sys.argv[2]

participantLng = sys.argv[3]
participantLat = sys.argv[4]

dfEvent = pd.read_json(eventsData)
dfParticipant = pd.read_json(participantData)

# print(participantLat, participantLng)

# for index, event in dfEvent.iterrows():
#     print(event['id'])

# for i, row in dfParticipant.iterrows():
#     pastEvents = row['events']
#     print(pastEvents)


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

    pastEvents = []

    for i, row in dfParticipant.iterrows():
        pastEvents = row['events']
        
    # print(pastEvents)

    distanceInfos = []
    participantLocation = [participantLng, participantLat]

    for i, event in dfEvent.iterrows():
        dist = calculateProximity(participantLocation, event['location'])
        distanceInfos.append(dist)

    distanceSum = sum(distanceInfos)

    for idx, item in enumerate(distanceInfos):
        distanceInfos[idx] = item / distanceSum

    # print(distanceInfos)

    eventsTfidfVector = getEventTfidfVector()
    cosine_sim = linear_kernel(eventsTfidfVector, eventsTfidfVector)

    sim_scores_aggregated = []

    for pastEvent in pastEvents:
        idx = -1
        for index, event in dfEvent.iterrows():
            if event['id'] == pastEvent:
                idx = index
                break

        # print(idx)

        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores_aggregated.append(sim_scores)
    
    
    sim_scores_final = sim_scores_aggregated[0]
    # print(sim_scores_final)

    itr = 1

    while itr < len(sim_scores_aggregated):
        score = sim_scores_aggregated[itr]

        for idx, item in enumerate(score):
            sim_scores_final[idx] = (idx, sim_scores_final[idx][1] + item[1])
        
        itr = itr + 1


    for idx, item in enumerate(sim_scores_final):

        score = 0.7 * (item[1] / len(sim_scores_aggregated)) + 0.3 * (1 - distanceInfos[idx])
        sim_scores_final[idx] = (idx, score)
    

    sim_scores_final = sorted(sim_scores_final, key=lambda x: x[1], reverse=True)
    sim_scores_final = sim_scores_final[0:5]
    event_indices = [i[0] for i in sim_scores_final]
    # print(event_indices)

    # print(dfEvent['name'].iloc[event_indices])
    print(dfEvent['id'].iloc[event_indices])
        



computeFeatures()