/* Код для валидации формы */ 

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form__container');
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
    
    // Блокировка цифр в поле имени
    document.getElementById('name').addEventListener('input', function(e) {
        this.value = this.value.replace(/[0-9]/g, '');
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
            // Отправка формы
            console.log('Форма валидна, можно отправлять');
            form.reset();
            alert('Форма успешно отправлена!');
        } else {
            const firstError = form.querySelector('.error');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    
    // Функция валидации поля
    function validateField(field) {
        let formControl = field.closest('.form__control');
        let errorMessage = formControl.querySelector('.error__message');
        
        // Сброс состояния
        formControl.classList.remove('error', 'success');
        
        // Проверка на пустое обязательное поле
        if (field.required && !field.value.trim()) {
            setError(formControl, errorMessage.textContent);
            return false;
        }
        
        // Специфические проверки для каждого поля
        switch(field.id) {
            case 'name':
                if (/\d/.test(field.value)) {
                    setError(formControl, 'Имя не должно содержать цифр');
                    return false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailRegex.test(field.value)) {
                    setError(formControl, 'Введите корректный email (например: user@example.com)');
                    return false;
                }
                break;
                
            case 'phone':
                const phoneRegex = /^\+?\d{0,3}[\s\-]?\d{3}[\s\-]?\d{3}[\s\-]?\d{2,4}$/;
                if (field.value && !phoneRegex.test(field.value)) {
                    setError(formControl, 'Введите номер в формате: 8008008080 или +7 800 800-80-80');
                    return false;
                }
                break;
                
            case 'subject':
                if (field.value) {
                    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
                    if (!urlRegex.test(field.value)) {
                        setError(formControl, 'Введите корректный URL сайта (например: example.com)');
                        return false;
                    }
                }
                break;
        }
        
        // Если все проверки пройдены
        setSuccess(formControl);
        return true;
    }
    
    function setError(element, message) {
        const errorMessage = element.querySelector('.error__message');
        if (errorMessage) errorMessage.textContent = message;
        element.classList.add('error');
    }
    
    function setSuccess(element) {
        element.classList.add('success');
    }
});