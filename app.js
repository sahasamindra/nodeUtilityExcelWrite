const reader = require('xlsx');
const fs = require('fs');

// const file = reader.readFile('./test.xlsx');
const file = reader.readFile('./Registered Base_24-Oct21.xlsx');

let xl_data = []
let json_data = []
let found_data = []

// console.log("Working");

readExcelFile();
readJsonFile();

setTimeout(() => compareVMSISDN(), 5000);
setTimeout(() => writeExcelFile(), 90000);


function compareVMSISDN(){
    console.log("Comparison started");

    xl_data.map(data => {
        json_data.forEach((res) => {
           if(data == res.vmsisdn)
           found_data.push({vmsisdn: res.vmsisdn, msisdn: res.msisdn});
        //    found_data.push(res.msisdn);
        //   console.log(res.msisdn);
         })
    })

    console.log(found_data);
}

// ==================================================================

function readExcelFile(){
    console.log("Excel working");

// reading xlsx
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      xl_data.push(res.msisdn);
    // console.log(res.msisdn);
   })
}

// Printing xl_data
// console.log(xl_data);
}

// ==================================================================

function readJsonFile(){
    console.log("Json working");

// reading json
// let rawdata = fs.readFileSync('test.json');
let rawdata = fs.readFileSync('msisdn_handler_data.json');
let test = JSON.parse(rawdata);
// console.log(test);

// for(let i = 0; i < test.length; i++){
//     console.log(test[i]);
// }

test.forEach((res) => {
    json_data.push(res);
  // console.log(res.msisdn);
 })

//  console.log(json_data);
}
// ==================================================================


function writeExcelFile(){
    console.log("Writing started");
//writing xlsx
// Sample data set
let vmsisdn = [{
    Student:'Nikhil',
    Age:22,
    Branch:'ISE',
    Marks: 70
},
{
    Name:'Amitha',
    Age:21,
    Branch:'EC',
    Marks:80
}]
  
// const ws = reader.utils.json_to_sheet(vmsisdn)
const ws = reader.utils.json_to_sheet(found_data)
  
reader.utils.book_append_sheet(file,ws,"Sheet2")
  
// Writing to our file
// reader.writeFile(file,'./test.xlsx')
reader.writeFile(file,'./Registered Base_24-Oct21.xlsx')
}

