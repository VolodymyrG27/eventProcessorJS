/* First Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

/*second Задания на урок:
1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"
5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

//First
const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
      poster = document.querySelector('.promo__bg'),
      ganre = poster.querySelector('.promo__genre'),
      movieList = document.querySelector('.promo__interactive-list'),
      btn = document.querySelector('.promo__interactive .add button'),
      title = document.querySelector('.promo__interactive-title');

const deleteAdv = (arr) => {
    arr.forEach(item => {
        item.remove();
    });
};

//HOME WORK - додати аргументи
const makeChanges = () => {
    //ganre.innerHTML = 'Драма';
    ganre.textContent = 'Драма';
    poster.style.backgroundImage = 'url("img/bg.jpg")';
};

const sortArr = (arr) => {
    arr.sort();
}

/*Second*/

//1.Отримуэмо форму, інпут, чекбокс і кнопку
const addForm = document.querySelector('form.add'),
      addInput = document.querySelector('.adding__input'),
      checkbox = document.querySelector('[type="checkbox"');


//2.Надаємо оброботку собитія для форми щоб відстежити відправку форми

addForm.addEventListener('submit', (e) => {
    // 3.Відміняємо стандартну поведінку браузера 
    e.preventDefault();

    //4.Перевіряємо що користувач ввів в input і чи поставив chceckbox галочку
    let newFilm = addInput.value;
    const favorite = checkbox.checked;

    //10.Щоб коли пустий імпут не добавляло нам пусту строку
    if (newFilm) {

        //11 Якщо в інпуті більше як 21 символ добавляємо 3 крапочки
        if (newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`
        }
        //13 Якщо чексбокс тру то красимо в червоний колір улюблений фільм
        if (favorite) {
            console.log('red');
        }

        //5.Поміщаємо новий фільм в міні базу даних яка знаходиться в js object
        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);
        //7.Створюємо по новому список фільмів
        createNewFilmElement (movieDB.movies, movieList);
    }

    //9.Очищуємо форму після додавання
    //addForm.reset();
    e.target.reset();
});

// 6.Використовуємо щоб створити новий фільм з старого функціоналу і поміщаємо в функцію
// 7.Добавляємо аргументи для кращої функціональності функції і робимо її унікальною

function createNewFilmElement (films, parent) {
    parent.innerHTML = "";
    sortArr(films);

    films.forEach((film, i) => {
        parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film}
            <div class="delete"></div>
        </li>
        `;
    });

    //12. Удаляємо фільм з списку
    document.querySelectorAll('.delete').forEach( (btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);

            //Щоб індекс фільма правельно відображався використовую РЕКУРСІЮ(Це коли функція сама себе визиває всередені неї)
            //Робимо так щоб елементи заново перестроювались
            createNewFilmElement (films, parent);
        });
    });
};

//8.Визиваємо функцію createNewFilmElement так як нам потрібно, щоб movies.list був створений 
createNewFilmElement (movieDB.movies, movieList);

deleteAdv(adv);
makeChanges();
