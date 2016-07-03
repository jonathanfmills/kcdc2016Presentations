use CrewMember;


var crewMembers = [
{ "_id" : ObjectId(), "Name" : "bob", "Likes" : [ "chicken", "bacon", "meatloaf", "veg" ] },
{ "_id" : ObjectId(), "Name" : "jan", "Likes" : [ "soup", "sushi", "sandwich", "bacon" ] },
{ "_id" : ObjectId(), "Name" : "kim", "Likes" : [ "waffle", "bacon", "salad", "potato", "mac-n-cheese", "noodle", "veg" ] },
{ "_id" : ObjectId(), "Name" : "ogg", "Likes" : [ "salad", "pizza", "spaghetti", "veg" ] },
{ "_id" : ObjectId(), "Name" : "sid", "Likes" : [ "veg", "coffee" ] },
{ "_id" : ObjectId(), "Name" : "lex", "Likes" : [ "spaghetti" ] }];

var spots = [
{ "_id" : ObjectId(), "Name" : "Pizza Joe", "Features" : [ "pizza", "salad", "spaghetti", "veg" ], "Address" : "123 Main St." },
{ "_id" : ObjectId(), "Name" : "Salad Heaven", "Features" : [ "salad", "soup", "veg", "mac-n-cheese" ], "Address" : "532 Hope Ave." },
{ "_id" : ObjectId(), "Name" : "Subs-n-More", "Features" : [ "salad", "sandwich", "veg" ], "Address" : "490 Lincoln Blvd." },
{ "_id" : ObjectId(), "Name" : "Corenr Diner", "Features" : [ "coffee", "bacon", "burger", "meatloaf", "mac-n-cheese", "pizza", "waffle" ], "Address" : "204 Main st." },
{ "_id" : ObjectId(), "Name" : "Ten Yen", "Features" : [ "soup", "noodle", "sushi", "yakotori", "veg" ], "Address" : "960 Hope Ave." },
{ "_id" : ObjectId(), "Name" : "House Roast", "Features" : [ "chicken", "potato", "waffle", "coffee" ], "Address" : "324 Lincoln Blvd." }];



var pipeline = [
  { "$unwind": "$Likes"},
  {
    "$lookup": {
      "from": "Spot",
      "localField": "Likes",
      "foreignField": "Features",
      "as": "What"
    }
  },
  { "$unwind": "$What" },
  {
    "$group": {
      "_id": "$What.Name",
      "Peeps": {
        "$push": "$Name"
      }
    }
  },
  {
    "$project": {
      "Peeps": 1,
      "N": {
        "$size": "$Peeps"
      }
    }
  },
  { "$sort": {"N": -1, "_id": 1 }}
]


db.CrewMember.insert(crewMembers);
db.Spot.insert(spots);

db.CrewMember.aggregate(pipeline);
