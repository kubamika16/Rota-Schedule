const XLSX = require('xlsx')

// read the xlsx file
const workbook = XLSX.readFile('./rota.xlsx')

// get the first sheet
const sheetName = workbook.SheetNames[0]
const sheet = workbook.Sheets[sheetName]

// convert the sheet to a json object
const json = XLSX.utils.sheet_to_json(sheet)
// console.log(json)

//Wyciągnięcie z 'json' danych które zaczynają się od 'Jakub Mika'
const JSONobj = json.find(
  (arg) =>
    arg['Weekly Activity Schedule for Reading Broad St'] === 'Jakub Mika',
)
console.log(JSONobj)

const value = JSONobj['__EMPTY']

// First, check if there is exact number. If is, then return result

const valueNumber = (number) => JSONobj[`__EMPTY_${number}`]

console.log(valueNumber(7))
console.log(valueNumber(7) ? valueNumber(5) : 'Off')

// person.daysOfTheWeek.monday.type[value] = true
// console.log(person)

// When someone has a day off, there is no such thing as a valueNumber. If that's the case, the whole message should be 'day off', not 'undefined: day off'
const test = {
  type: {
    [valueNumber(11)]: valueNumber(12)
      ? `${valueNumber(12)} - ${valueNumber(13)}`
      : 'Day off',
  },
}

if (test.type.key === undefined) {
  test.type = 'Day off'
}
console.log(test)

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
        [valueNumber(3)]: valueNumber(4)
          ? `${valueNumber(4)} - ${valueNumber(5)}`
          : 'Day off',
      },
    },
    wednesday: {
      type: {
        [valueNumber(7)]: valueNumber(8)
          ? `${valueNumber(8)} - ${valueNumber(9)}`
          : 'Day off',
      },
    },
    thursday: {
      type: {
        [valueNumber(11)]: valueNumber(12)
          ? `${valueNumber(12)} - ${valueNumber(13)}`
          : 'Day off',
      },
    },
    friday: {
      type: {
        [valueNumber(15)]: valueNumber(16)
          ? `${valueNumber(16)} - ${valueNumber(17)}`
          : 'Day off',
      },
    },
    saturday: {
      type: {
        [valueNumber(19)]: valueNumber(20)
          ? `${valueNumber(20)} - ${valueNumber(21)}`
          : 'Day off',
      },
    },
    sunday: {
      type: {
        [valueNumber(23)]: valueNumber(24)
          ? `${valueNumber(24)} - ${valueNumber(25)}`
          : 'Day off',
      },
    },
  },
}

// Iteration of every day of the week. If numbers 3, 7, 11, 15, 19, 23 are equal to 'undefined', we have to iterate and change the object
// Tworzę tablicę z dniami tygodnia
const daysArray = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]
// Przechodzę przez kazde dni tygodnia monday - sunday
// Jeśli monday (0).type.key === undefined
// monday(0).type = 'Day off'
if (person.daysOfTheWeek[daysArray[2]].type.key === undefined)
  person.daysOfTheWeek[daysArray[2]].type = 'Day off'

// if (person.daysOfTheWeek.wednesday.type.key === undefined)
//   person.daysOfTheWeek.wednesday.type = 'Day off'

// MON: 1-2
// TUE: 4-5
// WED: 8-9
// THU: 12-13
// FRI: 16-17
// SAT: 20-21
// SUN: 24-25

console.log(person)

//SUPER! Na tych danych mogę stworzyć obiekty!!!!!!

//Przekonwertowałem tabelę z pdf na excel na tej stronie:
//https://pdftables.com/upload/view/5b0gccyj19k9lkat0jhxiau71/rota.pdf
//Pobrałem ten plik i zapisałem go jako rota.xlsx
//Użyłem go w funkcji powyżej
// Jestem na linijce 101
