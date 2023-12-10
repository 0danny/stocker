const Log = (object, caller = "Unknown", last = "") => {
    //Get the current time to put in the console log.
    const time = new Date().toLocaleTimeString()

    console.log(`[${time}][${caller}]: ${object}`, last)
}

export default Log
