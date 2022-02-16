"use strict";

var $audio1 = $("#new-portfolio").get(0);
$(function () {
  $(".loading , .loading__texts").ready(function () {
    var id = setTimeout(function () {
      clearTimeout(id);
    });
  });

  $("#bgm-on").click(function () {
    $(".modal").fadeOut();
    $(".loading").show();
    $audio1.play();

    $(".loading__texts")
      .find(".loading__wipe")
      .each(function (index) {
        setTimeout(() => {
          $(this).addClass("active");
        }, 1200 * index);
      });

    $(".loading__texts")
      .find(".loading__text")
      .each(function (index) {
        setTimeout(() => {
          $(this).addClass("active");
        }, 1200 * index);
      });

    setTimeout(() => {
      $(".loading").fadeOut();
      $("body").removeClass("hidden");
    }, 7500);
    $audio1.currentTime = 7.65;
  });

  $("#bgm-off").click(function(){
    $(".modal").fadeOut();
    $(".loading").hide();
    $("body").removeClass("hidden");
    $(".volume-on").attr("src", "./image/volume-off.png").removeClass("open");
  });

  $("#vegas").vegas({
    slides: [
      { src: "./image/about1.jpg" },
      { src: "./image/about2.jpg" },
      { src: "./image/about3.jpg" },
    ],
    timer: !1,
    delay: 3000,
    transitionDuration: 4e3,
    transition: "fade2",
  });

  $(".volume-on").click(function () {
    if ($(".volume-on").hasClass("open") == false) {
      $(this).attr("src", "./image/volume-on.png").addClass("open");
      $audio1.play();
      $audio1.currentTime = 0;
    } else {
      $(this).attr("src", "./image/volume-off.png").removeClass("open");
      $audio1.pause();
      $audio1.currentTime = 0;
    }
  });

  $(".hamburger").click(function () {
    $(".hamburger-span").toggleClass("is_open");
    $(".header").addClass("active");
    $(".header__nav").fadeToggle();
    $("body").toggleClass("hidden");
  });

  $(".header__nav,.header__link").click(function () {
    matchMedia("(max-width:599px)").matches &&
      ($(".header__nav").fadeOut(),
      $(".hamburger-span").removeClass("is_open"),
      $("body").removeClass("hidden"));
  });

  $(".header__ul-li").click(function () {
    window.location = $(this).find("a").attr("href");
  });

  $(".about__btn").click(function () {
    var i = $(".about__btn").index(this);
    var about__wrapper = $(".about__wrapper");
    if (about__wrapper.i == 0) {
      about__wrapper.removeClass("action");
      about__wrapper.eq(i + 1).addClass("action");
    } else {
      about__wrapper.removeClass("action");
      about__wrapper.eq(i - 1).addClass("action");
    }
  });

  $(window).on("scroll", function () {
    // slide-triggerそれぞれを取得する
    $(".fade-trigger").each(function () {
      // .slide-triggerの位置を取得
      let trigger_point = $(this).offset().top - $(window).height() / 1.5;
      // 画面のスクロール量が.slide-triggerの位置を超えたら
      if ($(window).scrollTop() > trigger_point) {
        // .slide-triggerの中から.slideを探してactiveクラスを付ける
        $(this)
          .find(".study__ul-li")
          .each(function (index) {
            $(this)
              .delay(index * 300)
              .queue(function () {
                $(this).addClass("active");
              });
          });
      }
    });
  });

  $(window).on("scroll", function () {
    // slide-triggerそれぞれを取得する
    $(".slide-trigger").each(function () {
      // .slide-triggerの位置を取得
      let trigger_point = $(this).offset().top - $(window).height() / 1.5;
      // 画面のスクロール量が.slide-triggerの位置を超えたら
      if ($(window).scrollTop() > trigger_point) {
        // .slide-triggerの中から.slideを探してactiveクラスを付ける
        $(this)
          .find(".thought__text")
          .each(function (index) {
            $(this)
              .delay(index * 800)
              .queue(function () {
                $(this).addClass("active");
              });
          });
      }
    });
  });

  $('a[href^="#"]').on("click", function () {
    var speed = 600;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});
