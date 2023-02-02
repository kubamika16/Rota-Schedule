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
    arg['Weekly Activity Schedule for Reading Broad St'] === 'Alina Fartade',
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

// Jeśli klucz, oraz wartość zawiera '\n' to znaczy że powinno być więcej wartości w obiekcie
// Jeśli wyraz (string) zawiera więcej niż 3 wyrazy
if (Object.keys(person.daysOfTheWeek.monday.type)[0].includes('\n')) {
  console.log(Object.keys(person.daysOfTheWeek.monday.type)[0])
  const key = Object.keys(person.daysOfTheWeek.monday.type)[0].replaceAll(
    '\n',
    '\\n',
  )
  console.log(key.replaceAll('\n', '\\n'))
  const keys = Object.keys(person.daysOfTheWeek.monday.type)[0].split('\n')
  console.log(keys)
  // console.log(person.daysOfTheWeek.type['Meeting\\nCore Hou\\nDeep Cle'])
  const values = person.daysOfTheWeek.monday.type[key]
  console.log('Meeting\nCore Hou\nDeep Cle'.replaceAll('\n', '\\n') === key)
  console.log(values)
}

const stringi = 'ABC  abc'
console.log(stringi)
if (stringi.includes('\n')) {
  console.log(stringi)
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// RESULTS
console.log(person)

//Przekonwertowałem tabelę z pdf na excel na tej stronie:
//https://pdftables.com/upload/view/5b0gccyj19k9lkat0jhxiau71/rota.pdf
//Pobrałem ten plik i zapisałem go jako rota.xlsx
//Użyłem go w funkcji powyżej

// Sprawdzić które dane się nie zgadzają i spróbować coś wykombinować
