var parks = [
  {
    name: "Barker Field",
    lat: 37.5391116,
    lon: -77.4842119
  },
  {
    name: "Churchill Dog Park",
    lat: 37.5239282,
    lon: -77.4126637
  },
  {
    name: "Phideaux Dog Park",
    lat: 37.5198621,
    lon: -77.483193
  },
  {
    name: "Northside Dog Park",
    lat: 37.5977001,
    lon: -77.4436564
  },
  {
    name: "Rockwood Park",
    lat: 37.4469508,
    lon: -77.5840857
  }
];

$("#parkSeeds").click(function(){
  console.log("Park Seeds being added");
  parks.forEach( (park) => {
    $.post("/api/park/seeds",{
      name: park.name,
      lat: park.lat,
      lon: park.lon
    }).then( (response) => {
    console.log(response);
    });
  })
});