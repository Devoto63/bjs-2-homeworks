class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  fix() {
    this.state = this._state * 1.5;
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    for (let book of this.books) {
      if (book[type] === value) {
        return book;
      }
    }
    return null;
  }

  giveBookByName(bookName) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].name === bookName) {
        return this.books.splice(i, 1)[0];
      }
    }
    return null;
  }
}

const library = new Library("Центральная районная библиотека");

library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library.findBookBy("name", "Властелин колец")); 
console.log(library.findBookBy("releaseDate", 1924).name); 

console.log("Количество книг до выдачи: " + library.books.length); 
library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length); 

console.log("\n=== Тестовый сценарий ===");

const testLibrary = new Library("Тестовая библиотека");

testLibrary.addBook(new NovelBook("Лев Толстой", "Война и мир", 1869, 1225));
testLibrary.addBook(new FantasticBook("Рэй Брэдбери", "451 градус по Фаренгейту", 1953, 256));
testLibrary.addBook(new DetectiveBook("Агата Кристи", "Убийство в Восточном экспрессе", 1934, 256));
testLibrary.addBook(new Magazine("Наука и жизнь", 1961, 80));

console.log(`Книг в библиотеке: ${testLibrary.books.length}`);

let book1919 = testLibrary.findBookBy("releaseDate", 1919);
if (!book1919) {
  console.log("Книга 1919 года не найдена, создаем новую...");
  book1919 = new NovelBook("Эрих Мария Ремарк", "На Западном фронте без перемен", 1919, 320);
  book1919.state = 100;
  testLibrary.addBook(book1919);
  console.log("Книга 1919 года добавлена в библиотеку");
}

const issuedBook = testLibrary.giveBookByName("451 градус по Фаренгейту");
console.log(`Выдана книга: ${issuedBook ? issuedBook.name : "не найдена"}`);
console.log(`Книг осталось в библиотеке: ${testLibrary.books.length}`);

if (issuedBook) {
  console.log(`Состояние книги до повреждения: ${issuedBook.state}`);
  issuedBook.state = 20; 
  console.log(`Состояние книги после повреждения: ${issuedBook.state}`);
  
  issuedBook.fix();
  console.log(`Состояние книги после восстановления: ${issuedBook.state}`);
  
  console.log("Пробуем вернуть книгу в библиотеку...");
  testLibrary.addBook(issuedBook);
  console.log(`Книг в библиотеке после возврата: ${testLibrary.books.length}`);
  
  if (issuedBook.state > 30) {
    console.log("Книга успешно возвращена в библиотеку!");
  } else {
    console.log("Книга не может быть возвращена - состояние слишком плохое");
  }
}

