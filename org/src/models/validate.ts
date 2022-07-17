const mongoose = require('mongoose')
const urlRegex = require('url-regex-safe');
const moment = require('moment')

moment().format()

const { isEmail, isMobilePhone } = require('validator')


const validateURL = (url: string) => {
    if (!urlRegex({ exact: true }).test(url)) {
        throw new mongoose.Error('Invalid Image Url');
    }
}

const validateEmail = (email: string) => {
    if (!isEmail(email)) {
        throw new mongoose.Error('Invalid Email');
    }
}

const validatePhone = (phone: string) => {
    if (!isMobilePhone(phone)) {
        throw new mongoose.Error('Invalid Phone Number');
    }
}

const validateAge = (date: Number) => {
    let now = moment();
    let birthDate = moment(date);
    let age = moment.duration(now.diff(birthDate)).asYears();

    if (age < 18) {
        throw new mongoose.Error('User must be at least 18 year old');
    }
}

const validateCoords = (coordinates: { longitude: number; latitude: number; }) => {
    // longitude must be within bounds
    if (coordinates.longitude > 180 || coordinates.longitude < -180) {
        throw new mongoose.Error('Invalid longitude');
    }
    // latitude must be within bounds
    if (coordinates.latitude > 90 || coordinates.latitude < -90) {
        throw new mongoose.Error('Invalid latitude');
    }
}

const validateMinMax = (object: { min: number; max: number; }) => {
    if (object.min > object.max) {
        throw new mongoose.Error('Invalid Min Max Value');
    }
}

const validateString = (string: { trim: () => { (): any; new(): any; length: number; }; } | null) => {
    if (string != null && string.trim().length === 0) {
        throw new mongoose.Error('String can not be empty');
    }
}

const validateRole = (role: string) => {
    if (role != 'SuperAdmin' && role != 'Moderator' && role != 'Submoderator' && role != 'Viewer') {
        throw new mongoose.Error('Invalid Role')
    }
}

const validatePassword = (password: string) => {
    //var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    var lowerCase = /^(?=.*[a-z])$/
    var upperCase = /^(?=.*[A-Z])$/
    var digit = /^(?=.*[0-9])$/
    var specialCase = /^(?=.*[!@#$%^&*])$/

    if (!digit.test(password)) {
        throw new mongoose.Error('Password should contain atleast one digit')
    }
    else if (!lowerCase.test(password)) {
        throw new mongoose.Error('Password should contain atleast one lower case letter')
    }

    else if (!upperCase.test(password)) {
        throw new mongoose.Error('Password should contain atleast one upper case letter')
    }

    else if (!specialCase.test(password)) {
        throw new mongoose.Error('Password should contain atleast one special character. For example: !@#$%^&*')
    }
}


module.exports = {
    validateAge,
    validateEmail,
    validatePhone,
    validateURL,
    validateCoords,
    validateMinMax,
    validateString,
    validateRole,
    validatePassword
}