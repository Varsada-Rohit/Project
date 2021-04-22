import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {geohashQueryBounds, distanceBetween} from 'geofire-common';

const getFirebaseData = async (collection, latitude, longitude, distance) => {
  const bounds = geohashQueryBounds([latitude, longitude], distance);
  let promises = [];
  for (const b of bounds) {
    const q = firestore()
      .collection(collection)
      .orderBy('geohash')
      .startAt(b[0])
      .endAt(b[1]);

    promises.push(q.get());
  }
  let data = [];

  await Promise.all(promises).then(async (snapshots) => {
    const matchingDocs = [];
    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const lat = await doc.get('Location')._latitude;
        const lng = await doc.get('Location')._longitude;

        const distanceInKm = distanceBetween([lat, lng], [latitude, longitude]);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= distance) {
          matchingDocs.push(doc);
        }
      }
    }
    // setFirebaseData(firebaseData.concat(matchingDocs));
    matchingDocs.forEach((doc) => {
      data.push(doc.data());
    });
  });
  return data;
};

const getUserProperties = async (user) => {
  let places = [];
  await firestore()
    .collection('PG')
    .where('userId', '==', user)
    .get()
    .then((data) => {
      data.forEach((place) => {
        places.push(place.data());
      });
    });
  return places;
};

export default {
  getFirebaseData,
  getUserProperties,
};
