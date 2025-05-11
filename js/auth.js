// auth.js - Funcionalidad para login y register
document.addEventListener('DOMContentLoaded', function() {
    // Selector de tipo de usuario
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    if (userTypeBtns.length > 0) {
        userTypeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                userTypeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const radio = this.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
            });
        });
    }
    
    // Validación de contraseña
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strengthBar = document.getElementById('password-strength-bar');
            const strengthText = document.getElementById('password-strength-text');
            
            if (strengthBar && strengthText) {
                const password = this.value;
                let strength = 0;
                
                // Longitud mínima
                if (password.length >= 8) strength += 1;
                
                // Contiene números
                if (/\d/.test(password)) strength += 1;
                
                // Contiene mayúsculas
                if (/[A-Z]/.test(password)) strength += 1;
                
                // Contiene caracteres especiales
                if (/[^A-Za-z0-9]/.test(password)) strength += 1;
                
                // Actualizar barra y texto
                if (password.length === 0) {
                    strengthBar.style.width = '0%';
                    strengthText.textContent = '';
                } else if (strength <= 1) {
                    strengthBar.style.width = '25%';
                    strengthBar.className = 'password-strength-bar password-strength-weak';
                    strengthText.textContent = 'Seguridad: débil';
                } else if (strength === 2) {
                    strengthBar.style.width = '50%';
                    strengthBar.className = 'password-strength-bar password-strength-medium';
                    strengthText.textContent = 'Seguridad: media';
                } else if (strength === 3) {
                    strengthBar.style.width = '75%';
                    strengthBar.className = 'password-strength-bar password-strength-medium';
                    strengthText.textContent = 'Seguridad: buena';
                } else {
                    strengthBar.style.width = '100%';
                    strengthBar.className = 'password-strength-bar password-strength-strong';
                    strengthText.textContent = 'Seguridad: fuerte';
                }
            }
        });
    }
    
    // Validación de formulario
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            let isValid = true;
            const inputs = this.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            // Validar coincidencia de contraseñas
            const password = this.querySelector('#password');
            const confirmPassword = this.querySelector('#confirm-password');
            
            if (password && confirmPassword) {
                if (password.value !== confirmPassword.value) {
                    confirmPassword.classList.add('is-invalid');
                    isValid = false;
                } else {
                    confirmPassword.classList.remove('is-invalid');
                }
            }
            
            // Validar términos y condiciones
            const terms = this.querySelector('#terms');
            if (terms && !terms.checked) {
                terms.classList.add('is-invalid');
                isValid = false;
            } else if (terms) {
                terms.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Simular envío del formulario
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
                    
                    // Simular retraso de red
                    setTimeout(() => {
                        // Redirigir según el tipo de usuario
                        const userType = this.querySelector('input[name="user-type"]:checked');
                        if (userType && userType.value === 'admin') {
                            window.location.href = 'admin/inicio.html';
                        } else {
                            window.location.href = 'usuario/inicio.html';
                        }
                    }, 1500);
                }
            }
        });
    });
    
    // Mostrar/ocultar contraseña
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
});