# xlsCsvJsonTaskBySanket


(1).By this url u will get all book list with details in xlsx format

http://localhost:5000/get-book-list


(2).Seacrh for book and get data in csv/json format'

List of book name = 
'A TIME FOR MERCY',
  'READY PLAYER TWO',
  'DEADLY CROSS',
  'THE RETURN',
  'THE VANISHING HALF',
  'WHERE THE CRAWDADS SING',
  'DAYLIGHT',
  'THE SENTINEL',
  'THE AWAKENING',
  'THE LAW OF INNOCENCE',
  'IF IT BLEEDS',
  'FORTUNE AND GLORY',
  'THE MIDNIGHT LIBRARY'


By query string
http://localhost:5000/get-book-detail?book={bookname}

Sample => http://localhost:3000/get-book-detail?book=DAYLIGHT

By params
http://localhost:5000/get-book-detail/{bookname}

Sample => http://localhost:3000/get-book-detail/DAYLIGHT
