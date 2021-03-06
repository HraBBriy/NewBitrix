$(document).ready(function(){
    $.ajax({
        url: "/blocks"
    }).then(function(data) {
        for (var i = 0; i < data.counter; i++) {
            $('.plugin').append('' +
                '<div class="plugin__block plugin-block">\n' +
                '                       <div class="plugin-block__image-cont">\n' +
                '                           <img class="plugin-block__image" src="">\n' +
                '                       </div>\n' +
                '                       <div class="plugin-block__content">\n' +
                '                            <div class="plugin-block__name"></div>\n' +
                '                            <div class="plugin-block__describe">\n' +
                '                            </div>\n' +
                '                            <div class="plugin-block__button-container">\n' +
                '                                <button class="plugin-block__button button">Установить</button>\n' +
                '                            </div>\n' +
                '                       </div>\n' +
                '                    </div>' +
                '');

            var block = $('.plugin-block');
            $(block[i]).attr('data-id', i);
            var title = $('.plugin-block__name');
            $(title[i]).append(data.blockModels[i].name);
            var description = $('.plugin-block__describe');
            $(description[i]).append(data.blockModels[i].description);
            var image = $('.plugin-block__image');
            $(image[i]).attr('src',data.blockModels[i].image);
        }

        $('.plugin-block').click(function () {
                $(this).addClass('clicked');
                $('.plugin-block__button-container',this).slideDown(200);
                $('.plugin-block__button',this).click(function(){
                var current = $(this).parent().parent().parent();
                $(current).removeClass('clicked').addClass('hide');
                $('.plugin-block__image-cont',current).append('<div class="install"><div class="process"><div class="process__bounce"></div></div><div class="done"></div><div class="name"></div></div>');
                $('.install',current).fadeIn(500).addClass('flex');
                var name = $('.plugin-block__name',current).html();
                $('.name',current).append(name);

                    var id = $(current).attr('data-id');
                    console.log(id);
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: "/api/search",
                        data: JSON.stringify(id),
                        dataType: 'text',
                        cache: false,
                        success: function (data) {
                            setTimeout(function() {
                                $('.install .process').fadeOut(0);
                                $('.done').fadeIn(500);
                                $('.name').delay(300).fadeIn(500);
                                console.log('send');
                            },2000);
                        },
                        error: function () {
                            console.log('no send');
                        }
                    });
                });
        });
    });

    $('.app').height($('.app').parent().parent().innerHeight() );

    $('.aside__button_all').click(function(){
        $('.fv-modal').fadeIn(300).css('display','flex');
        $('.modal__close').click(function(){
            $('.fv-modal').fadeOut(100);
        });
    });

    $('.aside__button_select').click(function(){
        $('.header').addClass('plugin-select');
        $('.plugins').fadeIn(300);
        $('.plugins-button').fadeIn(50);
        $('.main,.app-content__bg-img').fadeOut(400);
        $('.plugins-button').click(function(){
            $('.plugins').fadeOut(200);
            $('.main,.app-content__bg-img').delay(200).fadeIn(500);
            $('.header').removeClass('plugin-select');
            $(this).fadeOut(150);
        });
    });
});