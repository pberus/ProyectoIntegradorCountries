const {Country} = require("../db")
const getCountryMaxPopulationController = ()=>{
    const country = Country.findOne({
        where: {
            population: population > "10000000"
        }
    })
    return country
}

module.exports = getCountryMaxPopulationController