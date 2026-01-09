# Documentación de Diseño

## 1. Descripción general
La aplicación consiste en un sistema de blog con publicaciones, comentarios y categorías.

## 2. Arquitectura
El sistema se divide en dos partes:
- Frontend: Angular
- Backend: Django Rest Framework

La comunicación se realiza mediante una API REST.

## 3. Backend
Se utilizó Django junto con Django Rest Framework.
Para simplificar el proyecto, la lógica se concentró en un único módulo `blog`, que incluye:
- Models
- Serializers
- Views
- URLs

Dado el alcance reducido del proyecto, esta decisión permitió mantener el código simple y legible.

## 4. Frontend
El frontend fue desarrollado con Angular utilizando standalone components.
Se implementaron componentes separados para:
- Listado de posts
- Detalle / edición
- Comentarios
- Categorías

La comunicación con el backend se centralizó en un servicio (`BlogService`).

## 5. Manejo de configuración
Se utilizaron archivos de environment para manejar las URLs del backend según el entorno:
- Desarrollo
- Producción

## 6. Deploy
- Backend desplegado en Render
- Frontend desplegado en Vercel

## 7. Decisiones relevantes
- Separación de responsabilidades
- Uso de componentes reutilizables
- Simplicidad por sobre sobreingeniería

## 8. Mejoras futuras
- Autenticación de usuarios
- Roles y permisos
- Paginación
- Tests automatizados
