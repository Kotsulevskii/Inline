/* Код для отображения карточек */

document.addEventListener('DOMContentLoaded', function() {
  // Данные для карточек
  let products = [
    { id: 1, name: 'Taxes & Efficiency', category: 'Business', image: './Media/Business.png' },
    { id: 2, name: 'Investment banking',  category: 'Banking', image: './Media/Investment.jpg' },
    { id: 3, name: 'Audit & Evaluation', category: 'Audit', image: './Media/Evaluation.png' },
    { id: 4, name: 'Taxes & Efficiency', category: 'Business', image: './Media/Efficiency.png' },
    { id: 5, name: 'Audit & Evaluation', category: 'Audit', image: './Media/Audit.jpg' },
    { id: 6, name: 'Financial Plan', category: 'Finance', image: './Media/Finance.jpg' },
  ];

  
  let productsGrid = document.querySelector('.products__grid');
  let swiperWrapper = document.getElementById('swiperWrapper');
  let filterButtons = document.querySelectorAll('.filter__btn');
  let swiper = null;

  // Инициализация Swiper
  function initSwiper() {
    if (window.innerWidth <= 800) {
      if (!swiper) {
        swiper = new Swiper('.swiper-container', {
          slidesPerView: 1,
          spaceBetween: 20,
          breakpoints: {
            650: {
              slidesPerView: 2,
            }
          }
        });
      }
    } else if (swiper) {
      swiper.destroy();
      swiper = null;
    }
  }

  // Рендеринг карточек
  function renderProducts(category = 'all') {
    let filteredProducts = category === 'all' 
      ? products 
      : products.filter(product => product.category === category);

    // Очищаем контейнеры
    productsGrid.innerHTML = '';
    swiperWrapper.innerHTML = '';

    // Рендерим карточки для сетки
    filteredProducts.forEach(product => {
      let productCard = createProductCard(product);
      productsGrid.appendChild(productCard);
    });

    // Рендерим карточки для слайдера
    filteredProducts.forEach(product => {
      let slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.appendChild(createProductCard(product));
      swiperWrapper.appendChild(slide);
    });

    // Переинициализируем Swiper после обновления слайдов
    if (swiper) {
      swiper.update();
    }
  }

  // Создание карточки товара
  function createProductCard(product) {
    let card = document.createElement('div');
    card.className = 'product__card';
    card.dataset.category = product.category;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      
      <div class="product__card--overlay">
        <button class="product__card__button">+</button>
        <div class="product__card__text">
          <h3>${product.name}</h3>
          <p>${product.category}</p>
        </div>
      </div>
    `;

    return card;
  }

  // Обработчики событий для фильтров
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderProducts(button.dataset.category);
    });
  });

  // Обработчик изменения размера окна
  window.addEventListener('resize', () => {
    initSwiper();
  });

  // Инициализация
  initSwiper();
  renderProducts();
});