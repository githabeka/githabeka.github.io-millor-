$('.general__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
  });

 
  const slider = $(".slider");
  const progressBar = $('.progress');
  const progressBarLabel = $( '.slider__label' );
  
  
  slider
	.slick({
	  dots: true,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  rows: 2,
	  // infinite: false
	});
  
  
  slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
	  var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
	  
	  progressBar
		.css('background-size', calc + '% 100%')
		.attr('aria-valuenow', calc );
	  
	  progressBarLabel.text( calc + '% completed' );
	});
  
  slider.on('afterChange', function(event, slick, currentSlide) {
	console.log(slick.$slides.length,slick.$slides.length-1,currentSlide);
	// Last slide
	if (slick.$slides.length-1 == currentSlide) {
	  setTimeout(function(){
		  $('html, body').animate({
			scrollTop: $(".bottom-section").offset().top
		}, 500);
	  }, 1000);
	}
  })
  
  slider.on('wheel', (function(e) {
	e.preventDefault();
  
	if (e.originalEvent.deltaY < 0) {
	  $(this).slick('slickNext');
	} else {
	  $(this).slick('slicokPrev');
	}
  }));  
//Получаем все "select" по селектору
const selects = document.querySelectorAll('.select')
//переборка по полученным "select"
for(let i = 0; i < selects.length; i++){
	const select = selects[i]
	//получаем все "option" внутри "select"
	const options = select.querySelectorAll('option')
	
	//создаем кастомный "select"
	const cSelect = document.createElement('div')
	const cSelectList = document.createElement('div')
	const cSelectCurrent = document.createElement('div')

	// select.setAttribute('tabindex', '1')
	//задем классы и атрибуты кастомному "select"
	cSelect.className = 'custom-select'
	cSelectList.className = 'custom-select__list'
	cSelectCurrent.className = 'custom-select__current'
	
	//по умолчанию у button будет type="submit", поэтому меням на type="button" чтобы избежать отправку формы при клие на кастомный "select"
	// cSelectCurrent.setAttribute('type', 'button')

	//создаем вложенность созданных элементов
	cSelect.append(cSelectCurrent, cSelectList)

	//добавляем кастоный "select" сразу после оргинального "select"
	select.after(cSelect)
	
	//получаем список и значения "option" из "select", затем создаём кастомный "option" для кастоного "select"
	const createCustomDom = function(x, y){
		let selectItems = ''
		for(var i = 0; i < options.length; i++){
			selectItems += '<div type="button" class="custom-select__item" data-value="'+options[i].value+'">'+options[i].text+'</div>'
		}
		cSelectList.innerHTML = selectItems
		x(),y();
	}
	
	//открываем-закрываем выпадающий список по клику
	const toggleClass = () => {cSelect.classList.toggle('custom-select--show')}
	
	//присваиваем текстовое первое значение "option" в кастомном "select"
	const currentTextValue = () => cSelectCurrent.textContent = cSelectList.children[0].textContent
	
	//получаем и задаем значения text/value 
	const currentValue = () => {
		const items = cSelectList.children
		for(var el = 0; el < items.length; el++){
			let selectValue = items[el].getAttribute('data-value')
			let selectText = items[el].textContent
			items[el].addEventListener('click', () => {
				console.log(items[el])
				cSelect.classList.remove('custom-select--show')
				cSelectCurrent.textContent = selectText
				select.value = selectValue
			})
		}
	}

	const desctopFn = () => {
		cSelectCurrent.addEventListener('click', toggleClass)		
	}
	
	const mobileFn = () => {
		for(let j = 0; j < selects.length; j++){
			let mobileSelect = selects[j]
			mobileSelect.addEventListener('change', ()=> {
				mobileSelect.nextElementSibling.querySelector('.custom-select__current').textContent = mobileSelect.value
			})
		}
	}

	createCustomDom(currentTextValue, currentValue)

	
	//закрываем выпадающий список по клику вне области кастомного селекта
	document.addEventListener('mouseup', (e) =>{
    if (!cSelect.contains(e.target))	cSelect.classList.remove('custom-select--show')
	})
	
	detectmob(mobileFn, desctopFn)
	
	function detectmob(x,y) { 
		if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
			x();
		}
		else {
			y();
		 }
	 }
}

$(document).ready(function(){
	$('.insta__slider').slick({
		slidesToShow: 3,
	});
});