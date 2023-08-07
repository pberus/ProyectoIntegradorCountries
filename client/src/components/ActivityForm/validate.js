const regexNotNumbers = /^[^\d]+$/;
const regexNumbers = /^[0-9]+$/;

const validate = ({ name, difficulty, duration, season, countriesId }) => {
    const errors = {}

    if (!name) {
        errors.name = "The name cannot be empty"
    } else if (!regexNotNumbers.test(name)){
        errors.name = "The name cannot have numbers"
    } else if (name.length > 20){
        errors.name = "The name cannot have more than 20 characters"
    }

    if (!difficulty){
        errors.difficulty = "You must select an option"
    }

    if (!duration){
        errors.duration = "The duration cannot be empty"
    } else if (!regexNumbers.test(duration)){
        errors.duration = "Duration can only have numbers, and positive"
    } else if (duration > 24) {
        errors.duration = "Duration cannot be greater than 24 hours"
    }

    if (!season){
        errors.season = "You must select an option"
    }

    if (!countriesId){
        errors.countriesId = "You must select an option"
    }

    return errors
};

export default validate;
