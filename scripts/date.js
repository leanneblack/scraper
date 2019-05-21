let makeDate = function() {
  let d = new Date();

  //holds formatted date
  let formattedDate = "";

  //add month add one because months start at 0 index
  formattedDate += d.getMonth() + 1 + "-";

  //add day
  formattedDate += d.getDate() + "-";

  //add year
  formattedDate += d.getFullYear();

  return formattedDate;
};

module.exports = makeDate;
