# Guía Definitiva para Desplegar un Proyecto de React (Vite) en GitHub Pages

Este documento es una guía paso a paso que resume el proceso completo que seguimos para desplegar una aplicación de React creada con Vite en GitHub Pages. Incluye los problemas comunes que encontramos y sus soluciones, sirviendo como una referencia detallada para futuros proyectos.

## Objetivo

Publicar una aplicación de React en una URL pública y gratuita con el formato `https://<tu-usuario>.github.io/<tu-repositorio>`.

---

## Fase 1: Creación de la Aplicación de Lista de Tareas

**Prompt Inicial:** "Genera una aplicación de lista de tareas, totalmente responsiva..."

### 1.1. Estructura Inicial y Funcionalidad Básica

- Se crearon los componentes `App.jsx`, `TodoForm.jsx`, `TodoList.jsx`, y `TodoItem.jsx`.
- Se implementó la lógica para añadir, completar y eliminar tareas.

### 1.2. Mejora con Barra de Progreso

- Se añadió una barra de progreso para visualizar el porcentaje de tareas completadas.

### 1.3. Mejora con Modal de Confirmación

- Se reemplazó el `window.confirm` del navegador por un modal personalizado (`ConfirmModal.jsx`) para una mejor experiencia de usuario al eliminar tareas.

---

## Fase 2: Control de Versiones con Git y GitHub

### 2.1. Inicialización de Git y Conexión a GitHub

- Se inicializó un repositorio de Git local (`git init`).
- Se creó un repositorio en GitHub (`react-todo-app`).
- Se conectó el repositorio local al remoto (`git remote add origin ...`).

### 2.2. Solución al Problema de Autenticación

**Problema:** Al intentar subir el código (`git push`), apareció el error `Authentication failed`.

**Solución:**
1.  **Generar un Token de Acceso Personal (PAT)** en GitHub con el permiso `repo`.
2.  **Actualizar la URL remota** para incluir el token:
    ```bash
    git remote set-url origin https://<token>@github.com/polidorl/react-todo-app.git
    ```
3.  **Realizar el push** de nuevo:
    ```bash
    git push -u origin main
    ```
4.  **Restaurar la URL original** por seguridad:
    ```bash
    git remote set-url origin https://github.com/polidorl/react-todo-app.git
    ```

---

## Fase 3: Despliegue en GitHub Pages

### 3.1. Instalar la Dependencia de Despliegue

La herramienta clave para publicar en GitHub Pages es el paquete `gh-pages`.

**Acción:**
- Abrir una terminal en la carpeta raíz del proyecto.
- Ejecutar el siguiente comando para instalarlo como una "dependencia de desarrollo".

```bash
npm install gh-pages --save-dev
```

### 3.2. Configurar el `package.json`

Este es el paso más importante para automatizar el proceso.

**Acción:**
- Abrir el archivo `package.json`.
- Realizar las siguientes modificaciones:

**1. Añadir la "Página Principal" (`homepage`):**
   - Justo al principio del archivo, agregar la URL final.

   ```json
   "homepage": "https://polidorl.github.io/react-todo-app",
   ```

**2. Añadir los Scripts de Despliegue:**
   - En la sección `scripts`, añadir dos nuevos comandos: `predeploy` y `deploy`.

   ```json
   "scripts": {
     // ... otros scripts
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   },
   ```

### 3.3. Ejecutar el Despliegue

Con la configuración lista, el despliegue se realiza con un solo comando.

**Acción:**
- Ejecutar el siguiente comando en la terminal:

```bash
npm run deploy
```

**Resultado:**
- Se crea una nueva rama en el repositorio llamada `gh-pages` que contiene la versión construida y optimizada de la aplicación.

### 3.4. Configurar el Repositorio en GitHub

El último paso es decirle a GitHub que use esta nueva rama para mostrar el sitio web.

**Acción:**
1. Ir al repositorio en GitHub.
2. Ir a la pestaña **`Settings`** (Configuración).
3. En el menú de la izquierda, seleccionar **`Pages`**.
4. En la sección "Build and deployment", configurar la fuente ("Source") de la siguiente manera:
   - **Branch:** Seleccionar la rama **`gh-pages`**.
   - **Folder:** Dejar la opción por defecto, **`/(root)`**.
5. Hacer clic en **`Save`** (Guardar).

---

## ¡Listo! El Flujo de Trabajo Futuro

Gracias a esta configuración, la próxima vez que quieras actualizar tu sitio web, el proceso es mucho más simple:

1. **Haz cambios en tu código.**
2. **(Opcional pero recomendado) Guarda los cambios en GitHub:**
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push origin main
   ```
3. **Publica la nueva versión con un solo comando:**
   ```bash
   npm run deploy
   ```
4. **Espera un par de minutos** y el sitio web se actualizará automáticamente.
