ymaps.ready(init);

function init() {
    // Создание карты.
    // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/map-docpage/
    var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчнию: «широта, долгота».
            center: [55.76, 37.64],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 10,
            // Элементы управления
            // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/controls/standard-docpage/
            controls: [

                'zoomControl', // Ползунок масштаба
                'rulerControl', // Линейка
                'routeButtonControl', // Панель маршрутизации
                'trafficControl', // Пробки
                'typeSelector', // Переключатель слоев карты
                'fullscreenControl', // Полноэкранный режим

                // Поисковая строка
                new ymaps.control.SearchControl({
                    options: {
                        // вид - поисковая строка
                        size: 'large',
                        // Включим возможность искать не только топонимы, но и организации.
                        provider: 'yandex#search'
                    }
                })

            ]
        }),

        addressCollection = new ymaps.GeoObjectCollection(null, {});

        //addresses = new Array;
        //$.get('addresses.txt', function(data){
        //    addresses = data.split('\n');
        //});

    //addresses = [
    //        'Москва, 1905 года ул., д.19',
    //        'Москва, ул. Льва Толстого, 16',
    //        'Москва, Ленинский пр-кт 148А',
    //        'Москва, 328 кв-л 148',
    //        'Москва, ул. Радиальная 6-я, 3'
    //    ],

        //objectManager = new ymaps.ObjectManager({
        //    // Чтобы метки начали кластеризоваться, выставляем опцию.
        //    clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
        //    gridSize: 32,
        //    clusterDisableClickZoom: true
        //});

    // var reader = new FileReader();
    // reader.onload = function(event) {
    //     var contents = event.target.result;
    //     console.log("Содержимое файла: " + contents);
    // };
    //
    // reader.onerror = function(event) {
    //     console.error("Файл не может быть прочитан! код " + event.target.error.code);
    // };
    // reader.readAsText('addresses.txt');
    //alert("Data Loaded: ");
    var addresses = [];
    $.ajax({
        url: "addresses.txt"
    }).done(function(data) {
        addresses = data.split('\n');
        //alert("Data Loaded:\n" + addresses);
        //alert(addresses[1]);
        //console.log("Data Loaded1: ");
        //objectManager.add(data);
        // Ищем координаты указанного адреса
        for (var j = 0, k = addresses.length; j < k; j++) {
            //var j = 0;
            var geocoder = ymaps.geocode(addresses[j]);

            // После того, как поиск вернул результат, вызывается callback-функция
            geocoder.then(
                function (res) {

                    // координаты объекта
                    var coordinates = res.geoObjects.get(0).geometry.getCoordinates();

                    // Добавление метки (Placemark) в коллекцию
                    addressCollection.add(new ymaps.Placemark( coordinates, {
                            //hintContent: addresses[j],
                            //hintContent: j,
                            //balloonContent: 'baloon'
                            //balloonContent: addresses[j]
                        }, {
                            'preset': 'islands#blueDotIcon'
                        }
                    ));
                }
            );
        }
        myMap.geoObjects.add(addressCollection);
    });
    //console.log("Data Loaded2: ");
    //alert(addresses[1]);

    // var quotes;
    // $.get("/Users/dmitriy/Projects/QtProjects/XmlAddressParse/build-XmlAddressParse-Desktop_Qt_5_11_0_clang_64bit-Debug/addresses.txt", function(data)) {
    //      //alert("Data Loaded: " + data);
    //      //quotes = data.split('\n');
    //  }
    // $.get("addresses.txt",
    // function(data) {
    //     $('body').append( "Name: " + data.name ) // John
    //         .append( "Time: " + data.time ); //  2pm
    // }, "json");



        //====================================
    // сюда вставлять адреса (скопировать весь файл addresses.txt)

     // var addresses = [
     //    'Москва, Авиационная ул 77',
     //    'Москва, Агропункт мкр 77А',
     //    'Москва, Адмирала Лазарева ул 77',
     //    'Москва, Академическая Б. ул 77',
     //    'Москва, Академическая Б. ул 77А',
     //    'Москва, Алексеевская ул 77',
     //    // 'Москва, Алтуфьевское ш 77',
        // 'Москва, Алтуфьевское ш 77А',
        // 'Москва, Алтуфьевское ш 77Б',
        // 'Москва, Алтуфьевское ш 77Г',
        // 'Москва, Алёшинская Долина ул 77',
        // 'Москва, Анадырский проезд 77',
        // 'Москва, Бакунинская ул 77',
        // 'Москва, Барышевская ул 77',
        // 'Москва, Беловежская ул 77',
        // 'Москва, Бобровка мкр 77А',
        // 'Москва, Бутырская ул 77',
        // 'Москва, Вавилова ул 77',
        // 'Москва, Валуевская 2-я ул 77',
        // 'Москва, Варшавское ш 77',
        // 'Москва, Вернадского пр-кт 77',
        // 'Москва, Волоколамское ш 77',
        // 'Москва, Газопровод п 77',
        // 'Москва, Героя России Соломатина проезд 77',
        // 'Москва, Гурьянова ул 77',
        // 'Москва, Дмитровское ш 77',
        // 'Москва, Дмитровское ш 77А',
        // 'Москва, Дубнинская ул 77',
        // 'Москва, Железнодорожная 2-я ул 77',
        // 'Москва, Железнодорожная ул 77',
        // 'Москва, Западная ул 77',
        // 'Москва, Заречная ул 77',
        // 'Москва, Зеленовка ул 77',
        // 'Москва, Зеленый пр-кт 77',
        // 'Москва, Земляничная ул 77',
        // 'Москва, Земляной Вал ул 77',
        // 'Москва, Ивановское д 77',
        // 'Москва, Измайловский б-р 77',
        // 'Москва, Измайловский пр-кт 77',
        // 'Москва, Ирбис ул 77',
        // 'Москва, Исаково-2 ул 77',
        // 'Москва, Калужское ш 77',
        // 'Москва, Каракашево д 77А',
        // 'Москва, Керамический проезд 77',
        // 'Москва, Киевская ул 77',
        // 'Москва, Киплинга (п Московский) ул 77',
        // 'Москва, Киплинга ул 77',
        // 'Москва, Клёны ул 77',
        // 'Москва, Колхозная ул 77',
        // 'Москва, Коммунарка п 77',
        // 'Москва, Коптевская ул 77',
        // 'Москва, Красковская ул 77',
        // 'Москва, Краснобогатырская ул 77',
        // 'Москва, Краснобогатырская ул 77А',
        // 'Москва, Ленинградский пр-кт 77',
        // 'Москва, Ленинградский пр-кт 77А',
        // 'Москва, Ленинградское ш 77',
        // 'Москва, Ленинградское ш 77А',
        // 'Москва, Ленинградское ш 77Б',
        // 'Москва, Ленинский пр-кт 77',
        // 'Москва, Лесная ул 77',
        // 'Москва, Лесная ул 77А',
        // 'Москва, Лодырка ул 77',
        // 'Москва, Лыковская 1-я ул 77',
        // 'Москва, Майская ул 77',
        // 'Москва, Мира пр-кт 77',
        // 'Москва, Михельсона ул 77',
        // 'Москва, Москва г 77',
        // 'Москва, Московская ул 77',
        // 'Москва, Музыкальный проезд 77',
        // 'Москва, Озерная ул 77в',
        // 'Москва, Первомайская Нижн. ул 77',
        // 'Москва, Первомайская ул 77',
        // 'Москва, Перспективная ул 77',
        // 'Москва, Полевая ул 77',
        // 'Москва, Прибрежный мкр 77',
        // 'Москва, Привольная ул 77',
        // 'Москва, Профсоюзная ул 77',
        // 'Москва, Прудная ул 77',
        // 'Москва, Пушкина ул 77',
        // 'Москва, Радиальная 3-я ул 77',
        // 'Москва, Рябиновая ул 77',
        // 'Москва, Рязанский пр-кт 77',
        // 'Москва, Садовая ул 77',
        // 'Москва, Садовническая наб 77',
        // 'Москва, Садовническая ул 77',
        // 'Москва, Светлая поляна ул 77',
        // 'Москва, Севастопольский пр-кт 77',
        // 'Москва, Секерино-3 ул 77',
        // 'Москва, Сенькино-2 ул 77',
        // 'Москва, Сенькино-3 ул 77',
        // 'Москва, Сиреневая ул 77',
        // 'Москва, Сиреневый б-р 77',
        // 'Москва, Солнечный б-р 77А',
        // 'Москва, Солнечный мкр 77',
        // 'Москва, Спасская ул 77',
        // 'Москва, Староникольская ул 77',
        // 'Москва, Таманская ул 77',
        // 'Москва, Таманская ул 77А',
        // 'Москва, Удальцова ул 77',
        // 'Москва, Фестивальная ул 77',
        // 'Москва, Фиалковая 3-я ул 77',
        // 'Москва, Хорошевского Серебряного Бора 3-я линия 77Б',
        // 'Москва, Центральная ул 77',
        // 'Москва, Центральная ул 77_А',
        // 'Москва, Центральная ул 77_а',
        // 'Москва, Чехова ул 77',
        // 'Москва, Щелковское ш 77',
        // 'Москва, Щелковское ш 77А',
    //     'Москва, Щелковское ш 77Б',
    //     'Москва, Юго-Восточная ул 77',
    //     'Москва, Южнобутовская ул 77',
    //     'Москва, Юности ул 77',
    //     'Москва, Юных Ленинцев ул 77'
    // ];
    //====================================

    // // Ищем координаты указанного адреса
    // for (var j = 0, k = addresses.length; j < k; j++) {
    //     //var j = 0;
    //     var geocoder = ymaps.geocode(addresses[j]);
    //
    //     // После того, как поиск вернул результат, вызывается callback-функция
    //     geocoder.then(
    //         function (res) {
    //
    //             // координаты объекта
    //             var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
    //
    //             // Добавление метки (Placemark) в коллекцию
    //             addressCollection.add(new ymaps.Placemark( coordinates, {
    //                     //hintContent: addresses[j],
    //                     //hintContent: j,
    //                     //balloonContent: 'baloon'
    //                     //balloonContent: addresses[j]
    //                 }, {
    //                     'preset': 'islands#blueDotIcon'
    //                 }
    //             ));
    //         }
    //     );
    // }
    // // for (var q = 0, w = addresses.length; q < w; q++) {
    // //     addressCollection.item(q).properties.set('balloonContent', 'dfgdfg');
    // // }
    // // // Чтобы задать опции одиночным объектам и кластерам,
    // // обратимся к дочерним коллекциям ObjectManager.
    // //objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    // //objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    // //myMap.geoObjects.add(objectManager);
    //
    // myMap.geoObjects.add(addressCollection);

}