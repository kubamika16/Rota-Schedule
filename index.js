// MON: 1-2
// TUE: 4-5
// WED: 8-9
// THU: 12-13
// FRI: 16-17
// SAT: 20-21
// SUN: 24-25

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// Packages
const XLSX = require('xlsx')

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// Functions and variables
const daysArray = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

// GETTING TO A XLLS FILE:
// read the xlsx file
const workbook = XLSX.readFile('./rota.xlsx')
// get the first sheet
const sheetName = workbook.SheetNames[0]
const sheet = workbook.Sheets[sheetName]
// convert the sheet to a json object
const json = XLSX.utils.sheet_to_json(sheet)
console.log(json)

// Taking data from object about certain person
const JSONobj = json.find(
  (arg) =>
    arg['Weekly Activity Schedule for Reading Broad St'] ===
    'Natalia\nJedrzejczyk',
)
console.log(JSONobj)

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// MANIPULATING FIRST OBJECT

// Returning a string that is saved in every empty key value
const value = JSONobj['__EMPTY']
const valueNumber = (number) => JSONobj[`__EMPTY_${number}`]
console.log(valueNumber(3))

// This code is using a for-in loop to iterate through the keys of the object JSONobj. For each key, it checks if the value associated with that key is equal to the string "Core Hou". If it is, it assigns the value to a variable called value. Finally, it logs the value to the console.
let workType = ''
for (const key in JSONobj) {
  if (JSONobj[key] === 'Core Hou') {
    workType = JSONobj[key]
  }
}
console.log(workType)

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// WORK ON ending object
// Object that contains name of the person and days of the week person is working
const person = {
  name: JSONobj['Weekly Activity Schedule for Reading Broad St'],
  daysOfTheWeek: {
    monday: {
      type: {
        [value]: `${valueNumber(1)} - ${valueNumber(2)}`,
      },
    },
    tuesday: {
      type: {
        [workType]: `${valueNumber(4)} - ${valueNumber(5)}`,
      },
    },
    wednesday: {
      type: {
        [valueNumber(7)]: `${valueNumber(8)} - ${valueNumber(9)}`,
      },
    },
    thursday: {
      type: {
        [valueNumber(11)]: `${valueNumber(12)} - ${valueNumber(13)}`,
      },
    },
    friday: {
      type: {
        [valueNumber(15)]: `${valueNumber(16)} - ${valueNumber(17)}`,
      },
    },
    saturday: {
      type: {
        [valueNumber(19)]: `${valueNumber(20)} - ${valueNumber(21)}`,
      },
    },
    sunday: {
      type: {
        [valueNumber(23)]: `${valueNumber(24)} - ${valueNumber(25)}`,
      },
    },
  },
}

for (let i = 0; i < daysArray.length; i++) {
  if (Object.keys(person.daysOfTheWeek[daysArray[i]].type)[0] === 'undefined')
    person.daysOfTheWeek[daysArray[i]].type = 'Day off'
}

// Je??li klucz, oraz warto???? zawiera '\n' to znaczy ??e powinno by?? wi??cej warto??ci w obiekcie

// ZROBIC dla kazdej warto??ci, nie tylko dla poniedzia??ku.

const multiValue = function (dayOfTheWeek) {
  if (Object.keys(person.daysOfTheWeek[dayOfTheWeek].type)[0].includes('\n')) {
    const keys = Object.keys(person.daysOfTheWeek[dayOfTheWeek].type)[0].split(
      '\n',
    )
    const values = Object.values(
      person.daysOfTheWeek[dayOfTheWeek].type,
    )[0].split('\n')
    const valuesEdit = [
      `${values[0]}-${values[1]}`,
      values[2],
      `${values[3]} - ${values[4]}`,
    ]
    console.log(valuesEdit)
    console.log(keys)
    console.log(values)

    // Wyczyszczenie obiektu 'type'
    person.daysOfTheWeek[dayOfTheWeek].type = {}

    // Tyle ile jest warto??ci tyle powinno zosta?? utworzonych obiekt??w
    for (i = 0; i < keys.length; i++) {
      console.log(i)
      console.log(keys[0])
      person.daysOfTheWeek[dayOfTheWeek].type[keys[i]] = valuesEdit[i]
    }
  }
}

daysArray.forEach(function (item, index, array) {
  console.log(item)
  multiValue(item)
})

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// RESULTS
console.log(person)

//Przekonwertowa??em tabel?? z pdf na excel na tej stronie:
//https://pdftables.com/upload/view/5b0gccyj19k9lkat0jhxiau71/rota.pdf
//Pobra??em ten plik i zapisa??em go jako rota.xlsx
//U??y??em go w funkcji powy??ej

// Sprawdzi?? kt??re dane si?? nie zgadzaj?? i spr??bowa?? co?? wykombinowa??
