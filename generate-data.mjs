import * as fs from 'fs';
import { faker } from '@faker-js/faker';

const productUnits = ['Each', 'Dozen', 'Case', 'Pack', 'Box', 'Pair', 'Set'];

function createRandomCustomer(id) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const userName = faker.internet
    .userName({ firstName, lastName })
    .toLowerCase();

  return {
    id: id,
    username: userName,
    firstname: firstName,
    lastname: lastName.replace("'", "''"),
    phone: faker.string.numeric(10),
    email: userName + '@example.com',
    address: faker.location.streetAddress().replace("'", "''"),
    city: faker.location.city().replace("'", "''"),
    state: faker.location.state({ abbreviated: true }),
    zip: faker.location.zipCode('#####'),
  };
}

function createRandomCompany(id) {
  const companyName = faker.company.name().replace("'", "''").substring(0, 29);
  const companyNameNoSpecialCharacters = companyName.replace(/[^A-Z0-9]/gi, '');
  const companyCode =
    companyNameNoSpecialCharacters.substring(0, 4).toUpperCase() +
    '-' +
    companyNameNoSpecialCharacters.substring(4, 6).toUpperCase();

  return {
    id: id,
    code: companyCode,
    name: companyName,
    address: faker.location.streetAddress().replace("'", "''"),
    city: faker.location.city().replace("'", "''"),
    state: faker.location.state({ abbreviated: true }),
    zip: faker.location.zipCode('#####'),
    phone: faker.string.numeric(10),
    email: 'support@' + companyCode + '.com',
  };
}

function createRandomProduct(id) {
  return {
    id: id,
    partnbr: faker.commerce.isbn(),
    name: faker.commerce.productName(),
    price: faker.commerce.price({ min: 5, max: 100 }),
    unit: faker.helpers.arrayElement(productUnits),
    // photopath: faker.image.urlLoremFlickr({
    //   category: 'product',
    //   width: 100,
    //   height: 200,
    // }),
    companyid: faker.helpers.rangeToNumber({ min: 1, max: 50 }),
  };
}

function writeFile(content) {
  //Write file
  let fileName = 'db.json';
  fs.writeFile(fileName, content, function (err, data) {
    if (err) console.log(err);
    console.log(`Successfully wrote script file to: ${fileName}`);
  });
}

let db = {
  customers: [],
  companies: [],
  products: [],
};

//Users

let counter = 1;
while (counter <= 50) {
  const customer = createRandomCustomer(counter);
  db.customers.push(customer);
  counter++;
}

//Companies

counter = 1;
while (counter <= 50) {
  const company = createRandomCompany(counter);
  db.companies.push(company);
  counter++;
}

counter = 1;
while (counter <= 50) {
  const product = createRandomProduct(counter);
  db.products.push(product);
  counter++;
}

const content = JSON.stringify(db, null, 2);

writeFile(content);
