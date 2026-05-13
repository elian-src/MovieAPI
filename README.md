# 🎬 MovieAPI

## Descripción

MovieAPI es una aplicación web que permite consultar películas y gestionarlas en una lista personalizada, funcionando como un bloc de notas cinematográfico. Los usuarios pueden buscar películas y guardarlas junto con su propio rating y notas personales.

El sistema cuenta con un **frontend** (interfaz de usuario) y un **backend** construido con **Node.js**, que se comunican mediante una API REST. La base de datos utilizada es **MySQL**, gestionada a través de **Aiven**, y la aplicación está desplegada en **Render**.

---

## Tecnologías utilizadas

- **Frontend:** HTML, CSS, Bootstrap
- **Backend:** Node.js, Express
- **Base de datos:** MySQL (Aiven)
- **Despliegue:** Render
- **Control de versiones:** Git + GitHub

---

## Clonar el repositorio

```bash
git clone https://github.com/elian-src/MovieAPI.git
cd MovieAPI
```

---

## Ejecutar el proyecto en local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DB_HOST=tu-host-aiven
DB_PORT=3306
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=nombre-base-de-datos
PORT=3000
```

> ⚠️ Nunca subas el archivo `.env` al repositorio. Ya está incluido en el `.gitignore`.

### 3. Iniciar el servidor

```bash
node server.js
```

### 4. Abrir en el navegador

```
http://localhost:3000
```

---

## Enlace de la aplicación desplegada

🔗 [Ver aplicación en Render](https://movieapi-nunq.onrender.com)
