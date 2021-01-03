const getPassporst = (data) => {
  let passports = [];
  let passport = "";
  data.forEach((d) => {
    if (d === "") {
      passports.push(passport);
      passport = "";
    } else {
      if (passport) {
        passport += ` ${d}`;
      } else {
        passport = d;
      }
    }
  });
  passports.push(passport);

  return passports;
}

module.exports.getPassporst = getPassporst;