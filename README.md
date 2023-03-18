Proyecto para la Asignatura Desarrollo de Aplicaciones Web Entorno Cliente, 
donde tenemos unos servicios con Laravel 9 y los consumimos con el framework de Angular. 

-PASOS PORA INSTALAR EL JWT Y LA LLAVE DE LA APLICACION Y EL COMPOSER

***EN EL BACKEND

1- Instalar composer:
composer install

2-generar KEY:
php artisan key:generate


3-Instalar el JWT
composer require php-open-source-saver/jwt-auth


4-Generar LLave secreta de JWT:
php artisan jwt:secret

***EN EL FRONTEND

1- npm install