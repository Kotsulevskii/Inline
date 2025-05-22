 
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Валидация при вводе
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Валидация при отправке формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Получаем данные формы
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            console.log('Данные формы:', data);
            
            // Очищаем форму после отправки
            form.reset();
            
            // Сбрасываем стили валидации
            inputs.forEach(input => {
                const formControl = input.closest('.form-control');
                formControl.classList.remove('success');
            });
            
            // Показываем сообщение об успешной отправке
            alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
        } else {
            // Прокрутка к первой ошибке
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Функция валидации поля
    function validateField(field) {
        const formControl = field.closest('.form-control');
        const errorMessage = formControl.querySelector('.error-message');
        
        // Проверка на обязательное поле
        if (field.required && !field.value.trim()) {
            setError(formControl, errorMessage.textContent || 'Это поле обязательно для заполнения');
            return false;
        }
        
        // Специальные проверки для разных типов полей
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                setError(formControl, 'Пожалуйста, введите корректный email');
                return false;
            }
        }
        
        if (field.type === 'tel' && field.value && !field.checkValidity()) {
            setError(formControl, 'Пожалуйста, введите корректный номер телефона');
            return false;
        }
        
        // Если все проверки пройдены
        setSuccess(formControl);
        return true;
    }
    
    function setError(element, message) {
        const errorMessage = element.querySelector('.error-message');
        errorMessage.textContent = message;
        element.classList.remove('success');
        element.classList.add('error');
    }
    
    function setSuccess(element) {
        element.classList.remove('error');
        element.classList.add('success');
    }
});
