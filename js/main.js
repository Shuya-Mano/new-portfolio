"use strict";$(function(){$(window).on("load",function(){$(".fv__contents-heading").addClass("on-slide"),$(".delay-span").addClass("delay-span-on")}),$(window).on("scroll",function(){$(".slide-trigger").each(function(){var i=$(this).offset().top-$(window).height()/1.5;$(window).scrollTop()>i?$(this).find(".slide").addClass("active"):$(this).find(".slide").removeClass("active")})}),$(".hamburger").click(function(){$(".hamburger-span").toggleClass("is_open"),$(".header").addClass("active"),$(".header__nav").fadeToggle(),$("body").toggleClass("hidden")}),$(".header__nav .header__link").click(function(){matchMedia("(max-width:729px)").matches&&($(".header__nav").fadeOut(),$(".hamburger-span").removeClass("is_open"),$("body").removeClass("hidden"))}),$(".header__ul-li").click(function(){var i=$(this).children(".header__link").attr("href");location.href=i}),$(".recruit-job-btn__btn").click(function(){var i=$(".recruit-job-btn__btn").index(this);$(".recruit-job-btn__btn").removeClass("action"),$(this).addClass("action"),$(".recruit-job-inner").fadeOut("800").eq(i).fadeIn("800")}),$('a[href^="#"]').click(function(){var i=$(this).attr("href"),i=$("#"==i||""==i?"html":i).offset().top;return $("html, body").animate({scrollTop:i},1200,"swing"),!1}),$(window).scroll(function(){$(window).scrollTop()>$(window).height()?$(".header").addClass("fix"):$(".header").removeClass("fix")}),$(window).scroll(function(){$(".works-introduction__ul-li").each(function(i){var e=$(this).offset().top-$(window).height()/1.5;$(window).scrollTop()>e&&$(function(){$(".works-introduction__ul-li").each(function(i){$(this).delay(300*i).queue(function(){$(this).addClass("active")})})})})})});