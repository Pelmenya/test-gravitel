# test-gravitel
# [Сайт на Heroku](https://test-gravitel.herokuapp.com/)

Тестовое задание для фронтенд-разработчика Gravitel

## Необходимо реализовать простое веб-приложение на React (желательно TypeScript, но можно и JavaScript) состоящее всего из двух страниц.
- Логин ( /login)
- Дашборд (диаграммы с текущей статистикой /dashboard)
- Кнопка «войти/выйти»

Страница /dashboard недоступна для тех, кто не залогинился.
### Бэкэнд
- Приложение использует простой «бэк» на Apollo + GraphQL расположенный на heroku. 
- Свой бэкэнд делать не нужно.
- Для проверки доступности бэкэнда, можете перейти по адресу: https://gravitel-graphql-backend.herokuapp.com/graphql.
- В системе заведены 2 пользователя: UserOne / pass и UserTwo / pass.
### Логин
- Форма для входа включает в себя 2 поля: логин + пароль.
- После успешного логина пользователь попадает на страницу /dashboard
- Полученный при логине токен должен быть запомнен в локальном хранилище, чтобы при последующем входе в приложение не было необходимости в повторной авторизации.
### Дашборд
- На странице дашборда выводятся 3 круговых диаграммы для сценариев, диалогов и списков.
- Каждая диаграмма разделена на 3 сектора: активные, неактивные и завершенные.
- Поведение диаграммы:
  * В отсутствие ховера внутри диаграммы написано значение Всего.
  * При ховере на секторе внутри круга пишется соответствующее число и выделяется соответствующее значение в легенде.
  * Аналогично, при ховере на легенде подсвечивается соответствующий сектор диаграммы и внутри круга пишется его значение.
-При ховере на Всего подсвечивается вся диаграмма.
### Логаут
При нажатии на логаут текущий токен удаляется из локального хранилища, а пользователь редиректится на /login.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

