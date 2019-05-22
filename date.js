//jshint esversion: 6

//This is a self-created module!


exports.getDate = function() {

  const today = new Date();

  const options = {

    weekday: "long",
    day: "numeric",
    month: "long"

  };

  return today.toLocaleDateString("en-US", options);


}

exports.getDay = function() {

  const today = new Date();

  const options = {

    weekday: "long",

  };

  return today.toLocaleDateString("en-US", options);


}
