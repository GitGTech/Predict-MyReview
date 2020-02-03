//////////////////////////////////////////////
/* DATA TABLE */
//////////////////////////////////////////////

console.log("READING CSV FILE")
// csv file 
csv_file = 'data/amazon_data_small_clean.csv'
  
// Grab the data with d3
d3.csv(csv_file).then(data => 
//d3.json(jsonData).then(data => 
{
  //Loop through data
//   data.forEach( row => {

//     // console.log(row)
//     var rating_predict = row.review_rating;
//     var rating_score = row.reviews_rating_score;
//     var brand = row.brand;
//     var categories = row.Categories;
//     var manufacturer = row.manufacturer;
//     var date = row.reviews_date;
//     var recommed = row.reviews_doRecommend;
//     var text = row.reviews_text;
//     var title = row.reviews_title;


//     console.log("")
//     // if (text && rating) 
//     // {
//     //   console.log(text)
//     // }
//     // console.log(text)

    
//   })
  
    // console.log(data)

    var tableData = data;

    // Selecting tbody element of html
    var tbody = d3.select("tbody");

    // Function to add data - to HTML Table
    function addRow(item){
    // Creating a new row into table element
    var row = tbody.append("tr");
    // Reading value in the object and then inserting that values into table row.
    Object.values(item).forEach(value => row.append("td").text(value))   
}


// Calling a function 'addRow'for each item of an array 'tableData'
tableData.forEach(addRow);
});


//// Using the UFO dataset provided in the form of an array of JavaScript objects,
//// write code that appends a table to your web page and
//// then adds new rows of data for each UFO sighting.


// from data.js
// var tableData = data;

// // Selecting tbody element of html
// var tbody = d3.select("tbody");

// // Function to add data - to HTML Table
// function addRow(item){
//     // Creating a new row into table element
//     var row = tbody.append("tr");
//     // Reading value in the object and then inserting that values into table row.
//     Object.values(item).forEach(value => row.append("td").text(value))   
// }


// // Calling a function 'addRow'for each item of an array 'tableData'
// tableData.forEach(addRow);




////////////////////////////////////////////////////
/* Level 2: Multiple Search Categories (Optional) */
////////////////////////////////////////////////////

//// Using multiple input tags and/or select dropdowns, 
//// write JavaScript code so the user can to set multiple filters and 
//// search for UFO sightings using the following criteria based on the table columns



function selectedOption(searchOption, inputValue)
{
  console.log(searchOption, inputValue);
  // Filter the data
  var filteredData = tableData.filter(item => item[searchOption] === inputValue)
  console.log(filteredData);
  //Clear the table
  tbody.html("");
  // Calls addroe function for each item of filteredData
  filteredData.forEach(addRow);
  // Id default option is selected, shows all data
  if (searchOption === 'defaultoption'){
    tableData.forEach(addRow);
    // Input box gets clear once default option is selected
    d3.select("#inputBox").property("value","");
  }
}


function getData(newValue) {
    // Fetching user input
    var dataInputField = d3.select("#inputBox");
    var inputValue = dataInputField.property("value");
    console.log(inputValue);

    var searchValue = ""

    switch (newValue) {
        case "date/time":
            searchValue = "datetime"
            console.log(searchValue);
            break;
        case "city":
            searchValue = "city"
            console.log(searchValue);
            break;
        case "state":
            searchValue = "state"
            console.log(searchValue);
            break;
        case "country":
            searchValue = "country"
            console.log(searchValue);
            break;
        case "shape":
            searchValue = "shape"
            console.log(searchValue);
            break;  
        case "defaultoption":
            searchValue = 'defaultoption';
            inputValue = '';    
            break;
        default:
            //selectedOption(newValue);
            break;
            
    }   
    console.log(searchValue, inputValue);
    // Calling function with selected option and user input value
    selectedOption(searchValue, inputValue);
  }
  


