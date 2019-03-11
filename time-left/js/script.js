/* ========================================================================
 * Data
 * ======================================================================== */

var countries = [
    {'name': 'Japan', 'male': 80.5, 'female': 86.8},
    {'name': 'Switzerland', 'male': 81.3, 'female': 85.3},
    {'name': 'Singapore', 'male': 80.0, 'female': 86.1},
    {'name': 'Australia', 'male': 80.9, 'female': 84.8},
    {'name': 'Spain', 'male': 80.1, 'female': 85.5},
    {'name': 'Iceland', 'male': 81.2, 'female': 84.1},
    {'name': 'Italy', 'male': 80.5, 'female': 84.8},
    {'name': 'Israel', 'male': 80.6, 'female': 84.3},
    {'name': 'Sweden', 'male': 80.7, 'female': 84.0},
    {'name': 'France', 'male': 79.4, 'female': 85.4},
    {'name': 'South Korea', 'male': 78.8, 'female': 85.5},
    {'name': 'Canada', 'male': 80.2, 'female': 84.1},
    {'name': 'Luxembourg', 'male': 79.8, 'female': 84.0},
    {'name': 'Netherlands', 'male': 80.0, 'female': 83.6},
    {'name': 'Norway', 'male': 79.8, 'female': 83.7},
    {'name': 'Malta', 'male': 79.7, 'female': 83.7},
    {'name': 'New Zealand', 'male': 80.0, 'female': 83.3},
    {'name': 'Austria', 'male': 79.0, 'female': 83.9},
    {'name': 'Ireland', 'male': 79.4, 'female': 83.4},
    {'name': 'United Kingdom', 'male': 79.4, 'female': 83.0},
    {'name': 'Belgium', 'male': 78.6, 'female': 83.5},
    {'name': 'Finland', 'male': 78.3, 'female': 83.8},
    {'name': 'Portugal', 'male': 78.2, 'female': 83.9},
    {'name': 'Germany', 'male': 78.7, 'female': 83.4},
    {'name': 'Greece', 'male': 78.3, 'female': 83.6},
    {'name': 'Slovenia', 'male': 77.9, 'female': 83.7},
    {'name': 'Denmark', 'male': 78.6, 'female': 82.5},
    {'name': 'Cyprus', 'male': 78.3, 'female': 82.7},
    {'name': 'Chile', 'male': 77.4, 'female': 83.4},
    {'name': 'Costa Rica', 'male': 77.1, 'female': 82.2},
    {'name': 'United States', 'male': 76.9, 'female': 81.6},
    {'name': 'Cuba', 'male': 76.9, 'female': 81.4},
    {'name': 'Czech Republic', 'male': 75.9, 'female': 81.7},
    {'name': 'Maldives', 'male': 76.9, 'female': 80.2},
    {'name': 'Qatar', 'male': 77.4, 'female': 80.0},
    {'name': 'Croatia', 'male': 74.7, 'female': 81.2},
    {'name': 'Albania', 'male': 75.1, 'female': 80.7},
    {'name': 'Panama', 'male': 74.7, 'female': 81.1},
    {'name': 'Brunei', 'male': 76.3, 'female': 79.2},
    {'name': 'Estonia', 'male': 72.7, 'female': 82.0},
    {'name': 'Poland', 'male': 73.6, 'female': 81.3},
    {'name': 'Bosnia and Herzegovina', 'male': 75.0, 'female': 79.7},
    {'name': 'United Arab Emirates', 'male': 76.4, 'female': 78.6},
    {'name': 'Uruguay', 'male': 73.3, 'female': 80.4},
    {'name': 'Bahrain', 'male': 76.2, 'female': 77.9},
    {'name': 'Mexico', 'male': 73.9, 'female': 79.5},
    {'name': 'Slovakia', 'male': 72.9, 'female': 80.2},
    {'name': 'Oman', 'male': 75.0, 'female': 79.2},
    {'name': 'Antigua and Barbuda', 'male': 74.1, 'female': 78.6},
    {'name': 'Argentina', 'male': 72.7, 'female': 79.9},
    {'name': 'Jamaica', 'male': 73.9, 'female': 78.6},
    {'name': 'Ecuador', 'male': 73.5, 'female': 79.0},
    {'name': 'China', 'male': 74.6, 'female': 77.6},
    {'name': 'Montenegro', 'male': 74.1, 'female': 78.1},
    {'name': 'Bahamas', 'male': 72.9, 'female': 79.1},
    {'name': 'Vietnam', 'male': 71.3, 'female': 80.7},
    {'name': 'Hungary', 'male': 72.3, 'female': 79.1},
    {'name': 'Turkey', 'male': 72.6, 'female': 78.9},
    {'name': 'Macedonia', 'male': 73.5, 'female': 77.8},
    {'name': 'Algeria', 'male': 73.8, 'female': 77.5},
    {'name': 'Serbia', 'male': 72.9, 'female': 78.4},
    {'name': 'Iran', 'male': 74.5, 'female': 76.6},
    {'name': 'Peru', 'male': 73.1, 'female': 78.0},
    {'name': 'Barbados', 'male': 73.1, 'female': 77.9},
    {'name': 'Tunisia', 'male': 73.0, 'female': 77.8},
    {'name': 'Saint Lucia', 'male': 72.6, 'female': 77.9},
    {'name': 'Malaysia', 'male': 72.7, 'female': 77.3},
    {'name': 'Romania', 'male': 71.4, 'female': 78.8},
    {'name': 'Brazil', 'male': 71.4, 'female': 78.7},
    {'name': 'Lebanon', 'male': 73.5, 'female': 76.5},
    {'name': 'Thailand', 'male': 71.9, 'female': 78.0},
    {'name': 'Sri Lanka', 'male': 71.6, 'female': 78.3},
    {'name': 'Armenia', 'male': 71.6, 'female': 77.7},
    {'name': 'Nicaragua', 'male': 71.5, 'female': 77.9},
    {'name': 'Colombia', 'male': 71.2, 'female': 78.4},
    {'name': 'Kuwait', 'male': 73.7, 'female': 76.0},
    {'name': 'Honduras', 'male': 72.3, 'female': 77.0},
    {'name': 'Mauritius', 'male': 71.4, 'female': 77.8},
    {'name': 'Latvia', 'male': 69.6, 'female': 79.2},
    {'name': 'Saudi Arabia', 'male': 73.2, 'female': 76.0},
    {'name': 'Bulgaria', 'male': 71.1, 'female': 78.0},
    {'name': 'Georgia', 'male': 70.3, 'female': 78.3},
    {'name': 'Morocco', 'male': 73.3, 'female': 75.4},
    {'name': 'Jordan', 'male': 72.5, 'female': 75.9},
    {'name': 'Venezuela', 'male': 70.0, 'female': 78.5},
    {'name': 'Paraguay', 'male': 72.2, 'female': 76.0},
    {'name': 'Samoa', 'male': 70.9, 'female': 77.5},
    {'name': 'Dominican Republic', 'male': 70.9, 'female': 77.1},
    {'name': 'Grenada', 'male': 71.2, 'female': 76.1},
    {'name': 'Lithuania', 'male': 68.1, 'female': 79.1},
    {'name': 'Tonga', 'male': 70.6, 'female': 76.4},
    {'name': 'El Salvador', 'male': 68.8, 'female': 77.9},
    {'name': 'Cape Verde', 'male': 71.3, 'female': 75.0},
    {'name': 'Saint Vincent and the Grenadines', 'male': 71.3, 'female': 75.2},
    {'name': 'Seychelles', 'male': 69.1, 'female': 78.0},
    {'name': 'Libya', 'male': 70.1, 'female': 75.6},
    {'name': 'Azerbaijan', 'male': 69.6, 'female': 75.8},
    {'name': 'Belarus', 'male': 66.5, 'female': 78.0},
    {'name': 'Moldova', 'male': 67.9, 'female': 76.2},
    {'name': 'Vanuatu', 'male': 70.1, 'female': 74.0},
    {'name': 'Guatemala', 'male': 68.5, 'female': 75.2},
    {'name': 'Bangladesh', 'male': 70.6, 'female': 73.1},
    {'name': 'Suriname', 'male': 68.6, 'female': 74.7},
    {'name': 'Ukraine', 'male': 66.3, 'female': 76.1},
    {'name': 'Trinidad and Tobago', 'male': 67.9, 'female': 74.8},
    {'name': 'Kyrgyzstan', 'male': 67.2, 'female': 75.1},
    {'name': 'Egypt', 'male': 68.8, 'female': 73.2},
    {'name': 'Bolivia', 'male': 68.2, 'female': 73.3},
    {'name': 'North Korea', 'male': 67.0, 'female': 74.0},
    {'name': 'Russia', 'male': 64.7, 'female': 76.3},
    {'name': 'Kazakhstan', 'male': 65.7, 'female': 74.7},
    {'name': 'Belize', 'male': 67.5, 'female': 73.1},
    {'name': 'Fiji', 'male': 67.0, 'female': 73.1},
    {'name': 'Bhutan', 'male': 69.5, 'female': 70.1},
    {'name': 'Tajikistan', 'male': 66.6, 'female': 73.6},
    {'name': 'Micronesia', 'male': 68.1, 'female': 70.6},
    {'name': 'Uzbekistan', 'male': 66.1, 'female': 72.7},
    {'name': 'Solomon Islands', 'male': 67.9, 'female': 70.8},
    {'name': 'Nepal', 'male': 67.7, 'female': 70.8},
    {'name': 'Indonesia', 'male': 67.1, 'female': 71.2},
    {'name': 'Iraq', 'male': 66.2, 'female': 71.8},
    {'name': 'Mongolia', 'male': 64.7, 'female': 73.2},
    {'name': 'Cambodia', 'male': 66.6, 'female': 70.7},
    {'name': 'Philippines', 'male': 65.3, 'female': 72.0},
    {'name': 'India', 'male': 66.9, 'female': 69.9},
    {'name': 'Timor-Leste', 'male': 66.6, 'female': 70.1},
    {'name': 'Sao Tome and Principe', 'male': 65.6, 'female': 69.4},
    {'name': 'Senegal', 'male': 64.6, 'female': 68.6},
    {'name': 'Myanmar', 'male': 64.6, 'female': 68.5},
    {'name': 'Pakistan', 'male': 65.5, 'female': 67.5},
    {'name': 'Kiribati', 'male': 63.7, 'female': 68.8},
    {'name': 'Turkmenistan', 'male': 62.2, 'female': 70.5},
    {'name': 'Guyana', 'male': 63.9, 'female': 68.5},
    {'name': 'Rwanda', 'male': 60.9, 'female': 71.1},
    {'name': 'Gabon', 'male': 64.7, 'female': 67.2},
    {'name': 'Namibia', 'male': 63.1, 'female': 68.3},
    {'name': 'Yemen', 'male': 64.3, 'female': 67.2},
    {'name': 'Laos', 'male': 64.1, 'female': 67.2},
    {'name': 'Botswana', 'male': 63.3, 'female': 68.1},
    {'name': 'Madagascar', 'male': 63.9, 'female': 67.0},
    {'name': 'Ethiopia', 'male': 62.8, 'female': 66.8},
    {'name': 'Congo', 'male': 63.2, 'female': 66.3},
    {'name': 'Eritrea', 'male': 62.4, 'female': 67.0},
    {'name': 'Syria', 'male': 59.9, 'female': 69.9},
    {'name': 'Sudan', 'male': 62.4, 'female': 65.9},
    {'name': 'Comoros', 'male': 61.9, 'female': 65.2},
    {'name': 'Djibouti', 'male': 61.8, 'female': 65.3},
    {'name': 'Haiti', 'male': 61.5, 'female': 65.5},
    {'name': 'Kenya', 'male': 61.1, 'female': 65.8},
    {'name': 'Mauritania', 'male': 61.6, 'female': 64.6},
    {'name': 'Papua New Guinea', 'male': 60.6, 'female': 65.4},
    {'name': 'South Africa', 'male': 59.3, 'female': 66.2},
    {'name': 'Ghana', 'male': 61.0, 'female': 63.9},
    {'name': 'Uganda', 'male': 60.3, 'female': 64.3},
    {'name': 'Niger', 'male': 60.9, 'female': 62.8},
    {'name': 'Tanzania', 'male': 59.9, 'female': 63.8},
    {'name': 'Zambia', 'male': 59.0, 'female': 64.7},
    {'name': 'Liberia', 'male': 59.8, 'female': 62.9},
    {'name': 'Gambia', 'male': 59.8, 'female': 62.5},
    {'name': 'Zimbabwe', 'male': 59.0, 'female': 62.3},
    {'name': 'Afghanistan', 'male': 59.3, 'female': 61.9},
    {'name': 'Benin', 'male': 58.8, 'female': 61.1},
    {'name': 'Burkina Faso', 'male': 59.1, 'female': 60.5},
    {'name': 'Togo', 'male': 58.6, 'female': 61.1},
    {'name': 'DR Congo', 'male': 58.3, 'female': 61.5},
    {'name': 'Burundi', 'male': 57.7, 'female': 61.6},
    {'name': 'Guinea', 'male': 58.2, 'female': 59.8},
    {'name': 'Guinea-Bissau', 'male': 57.2, 'female': 60.5},
    {'name': 'Eswatini (Swaziland)', 'male': 56.6, 'female': 61.1},
    {'name': 'Malawi', 'male': 56.7, 'female': 59.9},
    {'name': 'Mali', 'male': 58.2, 'female': 58.3},
    {'name': 'Equatorial Guinea', 'male': 56.6, 'female': 60.0},
    {'name': 'Mozambique', 'male': 55.7, 'female': 59.4},
    {'name': 'South Sudan', 'male': 56.1, 'female': 58.6},
    {'name': 'Cameroon', 'male': 55.9, 'female': 58.6},
    {'name': 'Somalia', 'male': 53.5, 'female': 56.6},
    {'name': 'Nigeria', 'male': 53.4, 'female': 55.6},
    {'name': 'Lesotho', 'male': 51.7, 'female': 55.4},
    {'name': "Cote d'Ivoire", 'male': 52.3, 'female': 54.4},
    {'name': 'Chad', 'male': 51.7, 'female': 54.5},
    {'name': 'Central African Republic', 'male': 50.9, 'female': 54.1},
    {'name': 'Angola', 'male': 50.9, 'female': 54.0},
    {'name': 'Sierra Leone', 'male': 49.3, 'female': 50.8},
];

var countryNames = countries.map(function(x) {return x['name']});
countryNames.sort();

/* ========================================================================
 * App state
 * ======================================================================== */

var name;
var gender;
var monthOfBirth;
var yearOfBirth;
var country;
var inputIsValid = true;

/* ========================================================================
 * Parse query params
 * ======================================================================== */

var query = window.location.search.substring(1);
var pairs = query.split('&');
for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    if (key === 'name') {
        name = value;
        name = name.replace(/\+/g, ' ');
    }
    if (key === 'gender') {
        gender = value;
    }
    if (key === 'monthOfBirth') {
        monthOfBirth = value;
    }
    if (key === 'yearOfBirth') {
        yearOfBirth = value;
    }
    if (key === 'country') {
        country = value;
        country = country.replace(/\+/g, ' ');
    }
}

/* ========================================================================
 * Validate
 * ======================================================================== */

var countriesFound = countries.filter(function(x) {return x['name'] === country});
if (countriesFound.length === 0) {
    country = undefined;
    inputIsValid = false;
}
if (gender !== 'male' && gender !== 'female') {
    gender = undefined;
    inputIsValid = false;
}
monthOfBirth = parseInt(monthOfBirth);
if (isNaN(monthOfBirth) || monthOfBirth < 1 || monthOfBirth > 12) {
    monthOfBirth = undefined;
    inputIsValid = false;
}
yearOfBirth = parseInt(yearOfBirth);
if (isNaN(yearOfBirth) || yearOfBirth < 1000) {
    yearOfBirth = undefined;
    inputIsValid = false;
}


if (inputIsValid) {

    /* ========================================================================
     * Calculate
     * ======================================================================== */

    var lifeExpectancy = countriesFound[0][gender];

    var yearOfDeath = yearOfBirth + parseInt(lifeExpectancy);
    var monthOfDeath = monthOfBirth + Math.round((lifeExpectancy - parseInt(lifeExpectancy)) * 12);
    if (monthOfDeath > 12) {
        yearOfDeath += 1;
        monthOfDeath = monthOfDeath % 12;
    }

    var halfLifeExpectancy = lifeExpectancy / 2;
    var yearOfHalfMark = yearOfBirth + parseInt(halfLifeExpectancy);
    var monthOfHalfMark = monthOfBirth + Math.round((halfLifeExpectancy - parseInt(halfLifeExpectancy)) * 12);
    if (monthOfHalfMark > 12) {
        yearOfHalfMark += 1;
        monthOfHalfMark = monthOfHalfMark % 12;
    }

    var now = new Date();
    var yearNow = now.getFullYear();
    var monthNow = now.getMonth() + 1;

    var previousMonth = new Date();
    previousMonth.setDate(0);
    var yearPreviousMonth = previousMonth.getFullYear();
    var monthPreviousMonth = previousMonth.getMonth() + 1;

    /* ========================================================================
     * Render
     * ======================================================================== */

    document.querySelector('h1').innerHTML = name + "'s time left";

    var html = '';
    var cellClass = '';
    for (var year=yearOfBirth, age=0; year <= yearOfDeath; year++, age++) {
        html += '<tr>';
        html += '<td>' + year + '</td>';
        html += '<td>' + age + '</td>';
        for (var month=1; month <= 12; month++) {
            cellContent = '';
            if (year === yearOfBirth && month === monthOfBirth) {
                cellClass = 'filled';
                cellContent = '<i class="fas fa-baby"></i>';
            }
            if (year === yearOfHalfMark) {
                cellContent = '-';
            }
            if (year === yearNow && month === monthNow) {
                cellContent = '<i class="far fa-clock"></i>';
            }
            if (year === yearOfDeath && month === monthOfDeath) {
                cellContent = '<i class="fas fa-skull"></i>';
            }
            html += '<td class="' + cellClass + '">' + cellContent + '</td>';
            if (year === yearPreviousMonth && month === monthPreviousMonth) {
                cellClass = '';
            }
        }
        html += '</tr>';
    }
    document.querySelector('tbody').innerHTML = html;
}

/* ========================================================================
 * Vue.js app
 * ======================================================================== */

var app = new Vue({
    el: '#app',
    data: {
        name: name,
        gender: gender,
        monthOfBirth: monthOfBirth,
        yearOfBirth: yearOfBirth,
        country: country,
        countryNames: countryNames,
        inputIsValid: inputIsValid,
    },
});
