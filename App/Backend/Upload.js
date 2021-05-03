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

const getUserProperties = async (collection, user) => {
  let places = [];
  await firestore()
    .collection(collection)
    .where('userId', '==', user)
    .get()
    .then((data) => {
      data.forEach((place) => {
        places.push(place.data());
      });
    });
  return places;
};

const fetchGoogleData = async (url, pt) => {
  let finalUrl = pt ? url + '&pagetoken=' + pt : url;
  let datas = [];
  await fetch(finalUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      datas = data;
      // if (data.next_page_token) {
      //   // setTimeout(() => {
      //   //   fetchUrl(url, data.next_page_token);
      //   // }, 2000);
      //   setMarker(data.next_page_token);
      // }
    });
  return datas;
};

const getPlaceDetails = async (placeId) => {
  let url =
    'https://maps.googleapis.com/maps/api/place/details/json?fields=website,formatted_phone_number,photo,price_level&key=AIzaSyCiXRGvZ23QernKQP4lnzH-8mdj2Zdb2fs&place_id=' +
    placeId;
  let detail = '';
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let photoUrls = [];
      if (data.result.photos) {
        for (const i in data.result.photos) {
          if (i == 10) {
            break;
          }
          let Url =
            'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
            data.result.photos[i].photo_reference +
            '&key=AIzaSyCiXRGvZ23QernKQP4lnzH-8mdj2Zdb2fs';
          photoUrls.push(Url);
        }
      }
      detail = {
        phone: data.result.formatted_phone_number
          ? data.result.formatted_phone_number
          : null,
        website: data.result.website ? data.result.website : null,
        Photos: photoUrls,
      };
    });
  return detail;
};

export default {
  getFirebaseData,
  getUserProperties,
  fetchGoogleData,
  getPlaceDetails,
};
