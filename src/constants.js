let BASE_URL;

if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:2854'
} else {
  BASE_URL = 'https://nameless-atoll-61776.herokuapp.com'
} // if else

module.exports = {
  PRESCRIPTIONS_URL: BASE_URL + '/prescriptions',
  DOCTOR_LOGIN_URL: BASE_URL + '/login/doctors',
  PHARMACIST_LOGIN_URL: BASE_URL + '/login/pharmacists',
  PRESCRIPTION_HISTORY_URL: BASE_URL + '/prescription-history'
}
