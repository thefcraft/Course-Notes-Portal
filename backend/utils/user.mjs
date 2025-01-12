class Email {
    constructor(email) {
      this.email = email;
    }
  
    get username() {
      return this.email.split('@')[0];
    }
  
    get domain() {
      return this.email.split('@')[1];
    }
}

// Function to extract roll numbers
const extractRollNumbers = (data) => {
  return data.map(user => {
    // Regex to match roll numbers in the format ####XX##
    const match = user.match(/\d{4}[a-z]{2}\d{2}/i); // Match pattern for roll number
    return match ? match[0] : null; // Return the roll number or null if not found
  }).filter(Boolean); // Remove null values
};

export class UtilsUser {
    constructor(email) {
      this.email = new Email(email);
      const username = this.email.username;
      this.rollno = extractRollNumbers([username])[0];
      // const pos = username.lastIndexOf('_');
      // this.name = username.slice(0, pos);
      // this.rollno = username.slice(pos + 1);  // Everything after the last underscore
    }

    get isValid(){
        return this.email.domain === 'iitp.ac.in'
    }
  
    get branch() {
      return this.rollno.slice(4, 6).toUpperCase(); // 2302mc05 => branch = MC
    }
  
    get semester() {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1; // Months are 0-indexed in JS, so add 1
      const year = currentDate.getFullYear() % 100; // Get last two digits of the current year
      const yearIn = parseInt(this.rollno.slice(0, 2), 10);
  
      return (year - yearIn) * 2 + (month > 6 ? 1 : 0); // If month > 6, next semester
    }
}