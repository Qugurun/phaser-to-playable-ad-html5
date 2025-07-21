[![Page Views Count](https://badges.toozhao.com/badges/01JWPS9QECXKSW4PQN2YTNQB1A/green.svg)](https://badges.toozhao.com/stats/01JWPS9QECXKSW4PQN2YTNQB1A "Get your own page views count badge on badges.toozhao.com")
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Qugurun/phaser-to-playable-ad-html5/blob/main/README.md)
[![ru](https://img.shields.io/badge/lang-ru-green.svg)](https://github.com/Qugurun/phaser-to-playable-ad-html5/blob/main/README.ru.md)


[![https://t.me/phaser_community](https://img.shields.io/badge/Phaser-Community_RU-blue?logo=telegram&logoColor=ffffff)](https://t.me/phaser_community "@phaser_community")
[![https://t.me/playableadschat](https://img.shields.io/badge/Chat-Playable_Ads_RU-blue?logo=telegram&logoColor=ffffff)](https://t.me/playableadschat "@playableadschat")

# Шаблон Phaser + Vite в один HTML5 файл

Это шаблон проекта на **Phaser 4**, использующий **Vite** и **Spine 4.2** для сборки всей игры в один **HTML5** файл. 
### Версии

Шаблон использует:

- [Phaser 4.0.0-rc.4](https://github.com/phaserjs)
- [Vite 6.3.1](https://github.com/vitejs/vite)
- [Spine 4.2.82](https://github.com/EsotericSoftware/spine-runtimes)

## Требования

Для установки зависимостей и запуска скриптов через `npm` требуется [Node.js](https://nodejs.org).

## Доступные команды

| Команда          | Описание                                 |
| ---------------- | ---------------------------------------- |
| `npm install`    | Установить зависимости проекта           |
| `npm run dev`    | Запустить сервер для разработки          |
| `npm run build`  | Создать продакшен-сборку в папке `dist`  |
| `npm run assets` | Запустить сборку всех ассетов в `base64` |

## Написание кода

После клонирования репозитория выполните `npm install` из папки проекта. Затем можно запустить локальный сервер для разработки командой `npm run dev`.

Сервер для разработки по умолчанию запускается на `http://localhost:8080`. Обратитесь к документации **Vite**, если хотите изменить это или добавить поддержку **SSL**.

После запуска сервера вы можете редактировать любые файлы в папке `src`. Vite будет автоматически перекомпилировать ваш код и перезагружать браузер.

Для обновления доступных ассетов через `base64` нужно выполнить `npm run assets`

## Структура шаблона проекта

Мы предоставили стандартную структуру проекта для начала работы:

| Путь                              | Описание                                                                                                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`                      | Базовая HTML-страница для размещения игры.                                                                                                                             |
| `public/assets`                   | Игровые спрайты, аудио и т.д. Доступны напрямую во время выполнения через глобальную функцию `asset()`                                                                 |
| `src/main.js`                     | Инициализация приложения.                                                                                                                                              |
| `src/game`                        | Папка с игровым кодом.                                                                                                                                                 |
| `src/game/main.js`                | Точка входа в игру: настраивает и запускает игру.                                                                                                                      |
| `src/game/scenes`                 | Папка со всеми сценами игры Phaser.                                                                                                                                    |
| `src/SpineBase64Plugin.js`        | Плагин для загрузки Spine из `base64` (`*.json`, `*.atlas`).                                                                                                           |
| `tools`                           | Папка вспомогательных скриптов.                                                                                                                                        |
| `tools/generate-assets-base64.js` | Скрипт для сборки файла `assets-base64.js` содержащий все ассеты в `base64`. Запускается автоматически при `npm run dev`, `npm run build` и отдельно `npm run assets`. |
| `tools/inline-bundle.js`          | Скрипт для объединения `bandle.min.js` c `index.html` в единый файл. Запускается автоматически при `npm run build`                                                     |
| `tools/packer.js`                 | Скрипт для сжатия `index.html`. Запускается автоматически при `npm run build`                                                                                          |
| `tools/pako_inflate.min.js`       | Минифицированный pako встраивается `index.html` для распаковки дынных. Используется в `tools/packer.js`                                                                |

## Встроенные ассеты в Base64

Шаблон реализует автоматическую конвертацию ассетов в формат `base64` при запуске dev-сервера `npm run dev` или  `npm run assets`. Сгенерированные данные сохраняются в файл `src/assets-base64.js`, который импортируется в `src/game/main.js`.

Доступ к ассетам осуществляется через глобальный объект `assets`, который содержит:

1. Полные `base64`-данные через функцию `asset(path)`:
    
```js
const playerSprite = asset("sprite/player.png");
```
    
2. Метаданные через прямое обращение к объекту:
    
```js
const mimeType = assets["sprite/player.png"].mime;  // MIME-тип ресурса
const rawData = assets["sprite/player.png"].data;   // Данные без префикса
```
    

**Пути к ассетам** указываются относительно папки `assets`, исключая её из пути. Например:

- Физический путь: `assets/sprite/player.png`
    
- Ключ в объекте: `'sprite/player.png'`
    

## Загрузка статических ассетов

Для работы со статическими файлами (аудио, видео и другими бинарными данными):

1. Разместите файлы в директории `public/assets`
    
2. Запустите dev-сервер `npm run dev` если он ещё не запущен или `npm run assets` для формирования файла с `base64` данными.
    
3. Используйте в коде:
    

```js
preload() {
  // Загрузка изображения из public/assets
  this.load.image('logo', asset('logo.png'));
  
  // Загрузка из поддиректории public/assets/default
  this.load.image('background', asset('default/bg.png'));
}
```

# Работа с Spine ассетами

## Загрузка Spine-анимаций из Base64

Шаблон предоставляет специализированные методы для загрузки Spine-анимаций в формате `base64`
### Основные методы загрузки:

```js
/**
 * Загружает JSON-данные Spine-анимации
 * @param {string} key - Ключ для доступа к ресурсу
 * @param {string} jsonPath - Путь к JSON-файлу относительно папки assets
 */
this.load.spineJson64('skeleton-data', 'spine/skeleton.json');

/**
 * Загружает атлас Spine-анимации
 * @param {string} key - Ключ для доступа к ресурсу
 * @param {string} atlasPath - Путь к .atlas файлу относительно папки assets
 * @param {boolean} [preMultipliedAlpha=true] - Флаг предумноженного альфа-канала
 */
this.load.spineAtlas64('skeleton-atlas', 'spine/skeleton.atlas', false);
```
## Развертывание в продакшен

После выполнения команды `npm run build` ваш код будет собран в единый `index.html` и сохранён в папке `dist`.

Для развертывания игры вам нужно загрузить всё содержимое папки `dist` на публичный веб-сервер при этом `index.html` можно запустить и без сервера на локальном компьютере.



