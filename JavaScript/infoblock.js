/* Код для валидации формы */ 

document.addEventListener('DOMContentLoaded', function() {
    let form = document.querySelector('.form__container');
    let inputs = form.querySelectorAll('input, textarea, select');
    
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
            let formData = new FormData(form);
            let data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            console.log('Form data:', data);
            
            // Очищаем форму после отправки
            form.reset();
            
            // Сбрасываем стили валидации
            inputs.forEach(input => {
                let formControl = input.closest('.form__control');
                formControl.classList.remove('success');
            });
            
            // Показываем сообщение об успешной отправке
            alert('Thank you! Your message has been sent. We will contact you shortly.');
        } else {
            // Прокрутка к первой ошибке
            let firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Функция валидации поля
    function validateField(field) {
        let formControl = field.closest('.form__control');
        let errorMessage = formControl.querySelector('.error__message');
        
        
        if (field.required && !field.value.trim()) {
            setError(formControl);
            return false;
        }
        
       
        if (field.type === 'email' && field.value) {
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                setError(formControl);
                return false;
            }
        }
        
        if (field.type === 'tel' && field.value && !field.checkValidity()) {
            setError(formControl);
            return false;
        }
        
        // Если все проверки пройдены
        setSuccess(formControl);
        return true;
    }
    
    function setError(element) {
        element.classList.remove('success');
        element.classList.add('error');
    }
    
    function setSuccess(element) {
        element.classList.remove('error');
        element.classList.add('success');
    }
});
