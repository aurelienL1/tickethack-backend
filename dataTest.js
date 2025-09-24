const fakeTrips = [
  {
    departure: "Lyon",
    arrival: "Bruxelles",
    date: "2025-09-23T08:08:06.551+00:00",
    _id: "68d259169fe376ad76d75489",
    price: 122,
  },
  {
    departure: "Paris",
    arrival: "Lyon",
    date: "2025-09-23T08:25:36.062+00:00",
    _id: "68d259169fe376ad76d7548a",
    price: 137,
  },
];

const fakeTrip = {
  departure: "Paris",
  arrival: "Lyon",
  date: "2025-09-23T08:25:36.062+00:00",
  _id: "68d259169fe376ad76d7548a",
  price: 137,
};

const fakeTripsId = ["68d259169fe376ad76d75489", "68d259169fe376ad76d7548a"];

const fakeCart = {
  _id: "68d39b8d5293f83468cbd1da",
  trips: [
    {
      departure: "Nice",
      arrival: "Lyon",
      date: "2025-09-23T08:08:06.551Z",
      price: 122,
      _id: "68d259169fe376ad76d75489",
    },
    {
      departure: "Paris",
      arrival: "Bruxelles",
      date: "2025-09-23T11:22:21.590Z",
      price: 98,
      _id: "68d259169fe376ad76d75495",
    },
  ],
};

const fakeSearch = {
  departure: "Paris",
  arrival: "Lyon",
  date: "22025-09-23T08:25:36.062+00:00",
};

module.exports = { fakeTrips, fakeTripsId, fakeCart, fakeTrip, fakeSearch };
