
let size = 6
let memberscan = true
let bookborrowscan = false
let bookbackscan = false
let rfid = '';
let membernumber = 0
let booknumber = 0
let bookborrow_count = 1
let member_booklist = 1
let member_price = 0

function Create2DArray(rows, cols) {
  var arr = [];
  for (var i = 0; i < rows; i++) {
      arr[i] = [];
      for (var j = 0; j < cols; j++) {
          arr[i][j] = 0;
      }
  }
  return arr;
}

let member_book = Create2DArray(size, size);

// BOOK 
let bookin_popup = document.getElementById("bookin_popup")
let bookrfid = new Array(size)
let bookcode = new Array(size)
let bookname = new Array(size)
let bookprice = new Array(size)
let booklist_count = 1

function bookin(){
    memberscan = false
    let bookincode = ""
    let bookinname = ""
    let bookinprice = ""
    bookin_popup.style.visibility = 'visible'
    document.getElementById('bookin_popup_bookcode').value = ''
    document.getElementById('bookin_popup_bookcode').innerText = ''
    document.getElementById('bookin_popup_bookname').value = ''
    document.getElementById('bookin_popup_bookname').innerText = ''
    document.getElementById('bookin_popup_bookprice').value = ''
    document.getElementById('bookin_popup_bookprice').innerText = ''
  }
function bookin_x() {
  bookin_popup.style.visibility = 'hidden'
  memberscan = true
}
function bookin_off(){
    bookin_popup.style.visibility = 'hidden'
    bookrfid[booklist_count] = rfid
    bookincode = document.getElementById('bookin_popup_bookcode').value
    bookinname = document.getElementById('bookin_popup_bookname').value
    bookinprice = document.getElementById('bookin_popup_bookprice').value
    bookcode[booklist_count] = bookincode
    bookname[booklist_count] = bookinname
    bookprice[booklist_count] = bookinprice
    console.log('Mã sách: ',bookcode[booklist_count],'Tên sách: ',bookname[booklist_count],' RFID: ',bookrfid[booklist_count],'\n')
    booklist_count++
    memberscan = true
  }
// BOOK 

// MEMBER 
let memberrfid = new Array(size)
let membername = new Array(size)
let memberage = new Array(size)
let membersex = new Array(size)
let member_count = 1
let memberadd_popup = document.getElementById("memberadd_popup")

function memberadd(){
    memberscan = false
    let memberinname = ""
    let memberinage = ""
    let memberinsex = ""
    memberadd_popup.style.visibility = 'visible'
    document.getElementById('memberadd_popup_name').value = ''
    document.getElementById('member_name').innerText = ''
    document.getElementById('memberadd_popup_age').value = ''
    document.getElementById('member_age').innerText = ''
    document.getElementById('memberadd_popup_sex').value = ''
    document.getElementById('member_sex').innerText = ''
  }
function memberadd_x() {
    memberadd_popup.style.visibility = 'hidden'
    memberscan = true
  }
function memberadd_off(){
    memberadd_popup.style.visibility = 'hidden'
    memberrfid[member_count] = rfid
    memberinname = document.getElementById('memberadd_popup_name').value
    memberinage = document.getElementById('memberadd_popup_age').value
    memberinsex = document.getElementById('memberadd_popup_sex').value
    membername[member_count] = memberinname
    memberage[member_count] = memberinage
    membersex[member_count] = memberinsex
    document.getElementById('member_name').innerText = membername[member_count]
    document.getElementById('member_age').innerText = memberage[member_count]
    document.getElementById('member_sex').innerText = membersex[member_count]
    console.log('Tên thành viên: ',membername[member_count],' RFID: ',memberrfid[member_count],'\n')
    member_count++
    memberscan = true
  }
// MEMBER 

// BORROW
function bookborrow(){
  memberscan = false
  rfid =''
  bookborrowscan = true
}
// BORROW

// BACK
function bookback(){
  memberscan = false
  rfid =''
  bookbackscan = true
}
// BACK

setInterval(function() {
  // MEMBERSCAN
  if (memberscan == true && rfid !== '') {
    for (let i=1; i <= memberrfid.length; i++) {
      if (rfid == memberrfid[i]) {
        membernumber = i
      }
    }
    // console.log('Số: ',membernumber,' Tên: ',membername[membernumber],' Tuổi: ',memberage[membernumber], ' Giới tính: ',membersex)
    document.getElementById('member_name').innerText = membername[membernumber]
    document.getElementById('member_age').innerText = memberage[membernumber]
    document.getElementById('member_sex').innerText = membersex[membernumber]
    clearlist()
    showlist(membernumber)
  }
  // MEMBERSCAN

  // BOOKBORROW
  if (bookborrowscan == true && rfid !== '') {
    for (let j=1; j <= bookrfid.length; j++) {
      if (rfid == bookrfid[j]) {
        booknumber = j
      }
    }
    console.log('Số: ',booknumber,'Mã sách: ',bookcode[booknumber],' Tên sách: ',bookname[booknumber])
    member_book[membernumber][booknumber] = booknumber
    booknumber = 0
    bookborrowscan = false
    memberscan = true
    clearlist()
    showlist(membernumber)
  }
  // BOOKBORROW

  // BOOKBACK
  if (bookbackscan == true && rfid !== '') {
    for (let k=1; k <= bookrfid.length; k++) {
      if (rfid == bookrfid[k]) {
        booknumber = k
      }
    }
    console.log('Số: ',booknumber,'Mã sách: ',bookcode[booknumber],' Tên sách: ',bookname[booknumber])
    member_book[membernumber][booknumber] = 0
    booknumber = 0
    bookbackscan = false
    memberscan = true
    clearlist()
    showlist(membernumber)
  }
  // BOOKBACK
}, 1000)
function clearlist() {
  member_booklist = 1
  member_price = 0
  for (let m = 1; m < size; m++) {
    document.getElementById('book'+m+'_code').innerText = ''
    document.getElementById('book'+m+'_name').innerText = ''
    document.getElementById('book'+m+'_price').innerText = ''
  }
}
function showlist(membernumber) {
  for (let l = 1; l < size; l++) {
    if (member_book[membernumber][l] !== 0) {
      document.getElementById('book'+member_booklist+'_code').innerText = bookcode[member_book[membernumber][l]]
      document.getElementById('book'+member_booklist+'_name').innerText = bookname[member_book[membernumber][l]]
      document.getElementById('book'+member_booklist+'_price').innerText = bookprice[member_book[membernumber][l]] + '.000đ'
      member_booklist++
      member_price = member_price + Str2Int(bookprice[member_book[membernumber][l]])
      document.getElementById('book'+member_booklist+'_price').innerText = member_price + '.000đ'
    }
  }
}

function Str2Int(str) {
  return parseInt(str, 10);
}


// RFID (test)
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey) {
    const key = event.key;
    switch(key) {
        case '1':
            rfid = 'AAA';
            break;
        case '2':
            rfid = 'BBB';
            break;
        case '3':
            rfid = 'CCC';
            break;
        case '4':
            rfid = 'DDD';
            break;
        case '5':
            rfid = 'EEE';
            break;
        case '6':
            rfid = 'FFF';
            break;
        case '7':
            rfid = 'GGG';
            break;
        case '8':
            rfid = 'HHH';
            break;
        case '9':
            rfid = 'III';
            break;
        case '0':
            rfid = 'JJJ';
            break;
        default:
            return;
    }
    console.log('RFID:', rfid);}
});
// RFID (test)