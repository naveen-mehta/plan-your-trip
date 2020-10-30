const trainLines = [
    ["Flinders Street", "Richmond", "East Richmond", "Burnley", "Hawthorn", "Glenferrie"],
    ["Flagstaff", "Melbourne Central", "Parliament", "Richmond", "Kooyong", "Tooronga"],
    ["Southern Cross", "Richmond", "South Yarra", "Prahran", "Windsor"]
]

var originTrainLine = 0;
var destinationTrainLine = 0;
var finalRouteOriginLine = []
var finalRouteDestinationLine = []

function handleCheckRoute(origin, destination) {
    originLine = handleCheckLine(origin)
    stationIndexInOriginLine = handleCheckStationIndex(origin, originLine)
    
    destinationLine = handleCheckLine(destination)
    stationIndexInDestinationLine = handleCheckStationIndex(destination, destinationLine)

    //check richmond location in the array 
    let richmondIndexOrigin = trainLines[originLine].indexOf("Richmond")
    let richmondIndexDestination = trainLines[destinationLine].indexOf("Richmond")

    // push origin line stations in the route to final array for origins  
    if (stationIndexInOriginLine < richmondIndexOrigin) {
        for (let i = stationIndexInOriginLine; i <= richmondIndexOrigin; i++) {
            finalRouteOriginLine.push(trainLines[originLine][i])
        }
    } else {
        for (let i = stationIndexInOriginLine; i >= richmondIndexOrigin; i--) {
            finalRouteOriginLine.push(trainLines[originLine][i])
        }
    }
    // push the destination line stations in the route to final array for destinations 
    if (stationIndexInDestinationLine < richmondIndexDestination) {
        for (let i = richmondIndexDestination; i >= stationIndexInDestinationLine; i--) {
            finalRouteDestinationLine.push(trainLines[destinationLine][i])
        }
    } else {
        for (let i = richmondIndexDestination; i <= stationIndexInDestinationLine; i++) {
            finalRouteDestinationLine.push(trainLines[destinationLine][i])
        }
    }

    // check if origin and destination are in the same train line to handle final display
    if (originLine == destinationLine) {
        var finalRouteSameLine = finalRouteOriginLine.concat(finalRouteDestinationLine)
        handleDisplayFinalRoute([...new Set(finalRouteSameLine)]) //using set to remove duplicate richmond record. 
    } else {
        handleDisplayFinalRoute(finalRouteOriginLine, finalRouteDestinationLine)
    }
}

// returns station index in the respective train line
function handleCheckStationIndex(station, line) {
    if (line == 0) {
        return trainLines[0].indexOf(station)
    } else if (line == 1) {
        return trainLines[1].indexOf(station)
    } else {
        return trainLines[2].indexOf(station)
    }
}

// returns the train line containing the origin or destination
function handleCheckLine(station) {
    for (let i = 0; i < trainLines.length; i++) {
        if (trainLines[i].includes(station)) {
            if (i == 0) {
                return 0; //alamein
            } else if (i == 1) {
                return 1; // glen waverly
            } else {
                return 2; // sandingham
            }
        }
    }
}

// print final route
function handleDisplayFinalRoute(arr1, arr2) {
    // calculate stops
    var stops = arr1.length - 2

    if (arr2 == undefined) {
        // var displayFinalRoute = arr1[0]
        for (let i = 0; i < arr1.length - 1; i++) {
            arr1[i] = arr1[i]+" ----->"
        }
        arr1 = arr1.join(" ") 
        console.log(arr1) 
        document.querySelector("#display-route-1").textContent = arr1 
    } else {
        for (let i = 0; i < arr1.length - 1; i++) {
            arr1[i] = arr1[i]+" ----->"
        }
        for (let i = 0; i < arr2.length - 1; i++) {
            arr2[i] = arr2[i]+" ----->"
        }

        var arr1StringLength = 0
        for (let i = 0; i < arr1.length - 1; i++) {
            arr1StringLength += arr1[i].length
        }

        // calculate empty space 
        let emptySpace = ' '.repeat(arr1StringLength + 5) 

        arr1 = arr1.join(" ") 
        arr2 = arr2.join(" ") 

        console.log(...arr1)
        console.log(emptySpace + "||")
        console.log(emptySpace + arr2)

        document.querySelector("#display-origin").textContent = `Origin: ${origin}`
        document.querySelector("#display-destination").textContent = `Destination: ${destination}`
        document.querySelector("#display-route-1").textContent = arr1
        document.querySelector("#display-route-2").textContent = emptySpace + "||"
        document.querySelector("#display-route-3").textContent = emptySpace + arr2
        document.querySelector("#display-total-stops").textContent = `${stops} stops total`
    }
}

var origin = "East Richmond"
var destination = "Hawthorn"

// handleCheckRoute("Hawthorn", "Windsor")
handleCheckRoute(origin, destination)
// handleCheckRoute("Prahran", "Melbourne Central")
// handleCheckRoute("Southern Cross", "Flinders Street")
// handleCheckRoute("Richmond", "Kooyong")
// handleCheckRoute("Melbourne Central", "Parliament")

