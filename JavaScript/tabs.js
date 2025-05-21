document.addEventListener('DOMContentLoaded', function() {
      // Данные о товарах
      const products = [
        { id: 1, name: 'Смартфон', price: 29990, category: 'electronics', image: 'https://via.placeholder.com/300x200?text=Смартфон' },
        { id: 2, name: 'Ноутбук', price: 54990, category: 'electronics', image: 'https://via.placeholder.com/300x200?text=Ноутбук' },
        { id: 3, name: 'Наушники', price: 7990, category: 'electronics', image: 'https://via.placeholder.com/300x200?text=Наушники' },
        { id: 4, name: 'Футболка', price: 1990, category: 'clothing', image: 'https://via.placeholder.com/300x200?text=Футболка' },
        { id: 5, name: 'Джинсы', price: 3990, category: 'clothing', image: 'https://via.placeholder.com/300x200?text=Джинсы' },
        { id: 6, name: 'Кофемашина', price: 24990, category: 'home', image: 'https://via.placeholder.com/300x200?text=Кофемашина' },
        { id: 7, name: 'Пылесос', price: 8990, category: 'home', image: 'https://via.placeholder.com/300x200?text=Пылесос' },
        { id: 8, name: 'Телевизор', price: 42990, category: 'electronics', image: 'https://via.placeholder.com/300x200?text=Телевизор' },
        { id: 9, name: 'Куртка', price: 5990, category: 'clothing', image: 'https://via.placeholder.com/300x200?text=Куртка' }
      ];

      // Элементы DOM
      const productsGrid = document.querySelector('.products__grid');
      const swiperWrapper = document.getElementById('swiperWrapper');
      const filterButtons = document.querySelectorAll('.filter__btn');
      let swiper = null;

      // Инициализация Swiper
      function initSwiper() {
        if (window.innerWidth <= 800) {
          if (!swiper) {
            swiper = new Swiper('.swiper-container', {
              slidesPerView: 1,
              spaceBetween: 20,
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              breakpoints: {
                480: {
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
        const filteredProducts = category === 'all' 
          ? products 
          : products.filter(product => product.category === category);

        // Очищаем контейнеры
        productsGrid.innerHTML = '';
        swiperWrapper.innerHTML = '';

        // Рендерим карточки для сетки
        filteredProducts.forEach(product => {
          const productCard = createProductCard(product);
          productsGrid.appendChild(productCard);
        });

        // Рендерим карточки для слайдера
        filteredProducts.forEach(product => {
          const slide = document.createElement('div');
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
        const card = document.createElement('div');
        card.className = 'product__card';
        card.dataset.category = product.category;

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="info">
            <h3>${product.name}</h3>
            <p>Категория: ${product.category}</p>
            <div class="price">${product.price.toLocaleString()} ₽</div>
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