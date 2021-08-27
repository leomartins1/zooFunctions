const { employees, hours, prices, species } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((specie) => id.includes(specie.id)));
}

function getAnimalsOlderThan(animal, age) {
  const animalCheck = species.find((specie) => specie.name === animal);
  return animalCheck.residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return !!employees.find(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(specieName) {
  if (!specieName) {
    return species.reduce((accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.residents.length;
      return accumulator;
    }, {});
  }
  return species.find((specie) => specie.name === specieName).residents.length;
}

function calculateEntry({ Adult = 0, Child = 0, Senior = 0 } = {}) {
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const schedule = {};
  Object.keys(hours).forEach((day) => {
    schedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    if (day === 'Monday') schedule[day] = 'CLOSED';
  });
  if (dayName) return { [dayName]: schedule[dayName] };
  return schedule;
}

// https://github.com/tryber/sd-013-b-project-zoo-functions/blob/arthur-palomo-zoo-functions-project/src/zoo.js / segui a logica de colocar cada passo da função em uma const.
function getOldestFromFirstSpecies(id) {
  const employeeById = employees.find((employee) => employee.id === id);
  const firtSpecie = species.find((animal) => animal.id === employeeById.responsibleFor[0]);
  const oldestAnimal = firtSpecie.residents.sort((animal1, animal2) => animal2.age - animal1.age);
  return Object.values(oldestAnimal[0]);
}

function increasePrices(percentage) {
  prices.Child = Math.ceil(prices.Child * (percentage + 100)) / 100;
  prices.Adult = Math.ceil(prices.Adult * (percentage + 100)) / 100;
  prices.Senior = Math.ceil(prices.Senior * (percentage + 100)) / 100;
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
