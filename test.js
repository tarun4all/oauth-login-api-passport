
const Company = require('./models/Client_users');

const q = Company.query();
    q.where('name', 'in', ['Tarun']);
    q.eager('company(onlyName)').page(0, 5)
      .then((data) => {
        console.log(data.results);
      })
      .catch(err => console.log(err));


