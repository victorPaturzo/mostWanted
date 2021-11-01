"use strict";

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      searchResults = searchByEyeColor(people);
      searchResults = searchByOccupation(searchResults);
      searchResults = searchByGender(searchResults);
      searchResults = searchByDob(searchResults);
      searchResults = searchByHeightWeight(searchResults);
      break;
    default:
      app(people); // restart app
      break;
  }
  displayPeople(searchResults);
  searchResults = selectResult(searchResults);
  mainMenu(searchResults, people);
}

function selectResult(results) {
  alert("Select the individual of which you would like to learn more:" + "\n");
  return searchByName(results);
  
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " +
      person[0].firstName +
      " " +
      person[0].lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      displayFamily(person);
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter Functions
//#region


//Filter Function Search for Full Name
let foundPerson;
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
  });
  displayPerson(foundPerson);
  return foundPerson;
}

//Filter Function Search for Eye Color
function searchByEyeColor(people) {

  let eyeColorAsk = promptFor("Would you like to search by eye color? Yes or No.", autoValid,yesNo).toLowerCase()
  switch (eyeColorAsk){
    case "yes":
      let eyeColor = promptFor("What is the person's eye color?", autoValid);
      let foundPerson = people.filter(function (potentialMatch) {
        if (potentialMatch.eyeColor === eyeColor) {
          return true;
        } else {
          return false;
        }
      });
      return foundPerson;
      // break;
    default:
      return people;
  }
}

// Filter Function for Search by Occupation 
function searchByOccupation(people) {

  let occupationAsk = promptFor("Would you like to search by occupation? Yes or No.", autoValid, yesNo).toLowerCase()
  switch (occupationAsk){
    case "yes":
      let occupation = promptFor("What is the person's occupation?", autoValid);
      let foundPerson = people.filter(function (potentialMatch) {
        if (potentialMatch.occupation === occupation) {
          return true;
        } else {
          return false;
        }
      });
      return foundPerson;
      // break;
    default:
      return people;
  }
}

// Filter Function for Search by Gender
function searchByGender(people) {

  let genderAsk = promptFor("Would you like to search by gender? Yes or No.", autoValid, yesNo).toLowerCase()
  switch (genderAsk){
    case "yes":
      let gender = promptFor("What is the person's gender? Male or Female.", autoValid);
      let foundPerson = people.filter(function (potentialMatch) {
        if (potentialMatch.gender === gender) {
          return true;
        } else {
          return false;
        }
      });
      return foundPerson;
      // break;
    default:
      return people;
  }

}

// Filter Function for Search by Date of Birth 
function searchByDob(people) {

  let dobAsk = promptFor("Would you like to search by date of birth? Yes or No.", autoValid, yesNo).toLowerCase()
  switch (dobAsk){
    case "yes":
      let dob = promptFor("What is the person's date of birth? Enter as m/d/yyyy.", autoValid);
      let foundPerson = people.filter(function (potentialMatch) {
        if (potentialMatch.dob === dob) {
          return true;
        } else {
          return false;
        }
      });
      return foundPerson;
      // break;
    default:
      return people;
  }

}

// Filter Function for Search by Height & Weight
function searchByHeightWeight(people) {

  let heightWeightAsk = promptFor("Would you like to search by height and weight? Yes or No.", autoValid, yesNo).toLowerCase()
  switch (heightWeightAsk){
    case "yes":
      let height = parseInt(promptFor("What is the person's height in inches (in)?", autoValid));
      let weight = parseInt(promptFor("What is the person's weight in pounds (lb)?", autoValid));
      let foundPerson = people.filter(function (potentialMatch) {
        if (potentialMatch.height === height &&
          potentialMatch.weight === weight) {
          return true;
        } else {
          return false;
        }
      });
      return foundPerson;
      // break;
    default:
      return people;
  }

}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.

  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Gender: " + person[0].gender + "\n";
  personInfo += "DOB: " + person[0].dob + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0.].weight + "\n";
  personInfo += "Eye Color: " + person[0.].eyeColor + "\n";
  personInfo += "Occupation: " + person[0.].occupation + "\n";
  alert(personInfo);
}

function displayFamily(person){
  let familyInfo = "Parent(s): " + person[0].parents + "\n";
  familyInfo += "Spouse: " + person[0].currentSpouse + "\n";
  alert(familyInfo);
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  let response;
  do {
    response = prompt(question);
    isValid = autoValid();
  } while (response === "" || isValid === false);
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {}

//#endregion

//Custom Functions
//#region

function searchBySingleCriterion(people) {
  let filteredCriterion = promptFor("What criterion would you like to search by?\n\n" + '1 for Eye Color\n' + '2 for Gender\n' + '3 for Occupation\n' + '4 for Height & Weight\n' + '5 for Date of Birth\n', autoValid);
  switch(filteredCriterion){
    case "1":
      searchByEyeColor(people);
    break;
    case "2":
      searchByGender(people);
    break;
    case "3":
      searchByOccupation(people);
    break;
    case "4":
      searchByHeightWeight(people);
    break;
    case "5":
      searchByDob(people);
    break;
    default:
      app(people);
    break;
    }
}


//#endregion