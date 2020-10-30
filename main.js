var originSelect = document.querySelector('#origin'); 
var destinationSelect = document.querySelector('#destination'); 
var origin; 
var destination;

var stations = ["Flinders Street", "East Richmond", "Burnley", "Hawthorn", "Glenferrie", "Flagstaff", "Melbourne Central", "Parliament", "Richmond", "Kooyong", "Tooronga",
"Southern Cross", "Richmond", "South Yarra", "Prahran", "Windsor"]

handleCreateDropdownMenu()

function handleCreateDropdownMenu() {
    createOptions(originSelect)
    createOptions(destinationSelect)
}

function createOptions(select) {
    for (var i = 0; i < stations.length; i++) {
        var newOption = document.createElement('option')   
        newOption.innerText = stations[i]
        select.add(newOption)
    }
}

function handleUpdateRoute(event) {
    if (event.target.id == "origin") {
        origin = event.target.value
    } else {
        destination = event.target.value
    }
    if (origin && destination) {
        handleCheckRoute(origin, destination)
    } 
}

