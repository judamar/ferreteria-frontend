# Ferretería Construmanta - Frontend

Este proyecto frontend del Sistema de Gestión de Ferretería Construmanta está desarrollado con [React.js](https://reactjs.org/) y utiliza [Vite](https://vitejs.dev/) como bundler.

## Requisitos previos

Asegúrate de tener **Node.js** instalado en tu sistema antes de comenzar.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/judamar/FerreteriaConstrumantaP-frontend.git FerreteriaConstrumanta-Frontend
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd FerreteriaConstrumanta-Frontend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

## Configuración

Crea un archivo `.env` en el directorio raíz del proyecto con la siguiente configuración:

```env
VITE_BACKEND_URL= URL de la API backend
VITE_FERRE_PHONE_NUM= Numero de whatsapp para contacto cliente-negocio
VITE_FERRE_NIT= NIT del negocio
VITE_FERRE_DIR= Direccion del negocio
VITE_FERRE_CIUDAD= Ciudad donde esta ubicado el negocio
VITE_FERRE_TEL= Telefono que aparecera en las facturas
VITE_FERRE_EMAIL= Correo del negocio
```

## Uso

Inicia el servidor en modo de desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5173` por defecto.

## Compilación para producción

Para compilar el proyecto para producción, ejecuta:

```bash
vite build
```

Este comando generará una carpeta `dist` con los archivos listos para ser desplegados en un servidor web.
