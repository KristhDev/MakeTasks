# MakeTasks

![MakeTasks logo](https://res.cloudinary.com/dzs8lf9lc/image/upload/v1647967003/maketasks/maketasks-logo_gf2vmf.png)

**MakeTasks** es una pequeña aplicación movil que te permite crear tareas, una agenda para tu día a día y que estén vinculadas a tu cuenta de usuario. Usa las técnologias React Native y Firebase. Este pequeño proyecto se hizo para la clase de Modelación y Simulación de Sistemas de la Universidad del Norte de Nicaragua. El fin de este es tener una mejor gestión de nuestras tareas del día a día acompañado de una interfaz amigable y sencilla. Queriamos hacer algo sencillo y práctico. 

&nbsp;


Apartir de este punto se daran una serie de instrucciones para probar el proyecto con tus propias configuraciones. Si solo quieres probar la aplicación, puedes descargarla en el siguiente link: [Descargar aquí](https://www.mediafire.com/file/o25eag7hfbolhs5/maketasks.apk/file). 

&nbsp;


## Instrucciones de uso

&nbsp;


### 1) Entorno de desarrollo de React Native
Antes de comenzar debes asegurarte de tener configurado en tu computadora el entorno de desarrollo de React Native, por lo que te dejo los pasos de la documentación oficial: [Click para ir](https://reactnative.dev/docs/environment-setup)

&nbsp;


### 2) Renombrar proyecto
Como segundo paso hay que renombrar el identificador de la app. para ello ve a la carpeta ```android/app/src/main/java/com```. Dentro de com encontraras una carpeta llamada ```kristhdev```, esta carpeta la vas a renombrar por el nombre que tu quieras, preferiblemente tu nombre de usuario. 

&nbsp;


Despues de eso busca el archivo ```AndroidManifest.xml``` dentro de ```android/app/src/main```, lo abres y cambia el atributo ```package```, cambia la parte que dice ```kristhdev``` por el nombre que lo cambiaste anteriormente, por ejemplo si lo renombraste por ```andredev``` quedaria así:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.andredev.maketasks"> // <-- Ahí es donde haras el cambio

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />

    <application
      android:name=".MainApplication"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:roundIcon="@mipmap/ic_launcher_round"
      android:allowBackup="false"
      android:theme="@style/AppTheme">
      <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
        android:launchMode="singleTask"
        android:windowSoftInputMode="adjustPan">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
      </activity>
    </application>
</manifest>
```

&nbsp;


Por último vas buscar los archivos ```MainActivity.java``` y ```MainApplication.java``` que se encuentran en ```android/app/src/main/java/con/<Nombre de la carpeta que renombraste>/maketasks```, abres los dos archivos y vas a cambiar la definición del ```package```, es la primera linea de cada archivo, nuevamente, si la renombraste como andredev quedaria así:

```java
package com.andredev.maketasks;
```

&nbsp;


### 3) Crear proyecto de Firebase
Lo siguiente es crear un proyecto de Firebase, te dejo el link oficial: [Click para ir](https://firebase.google.com). Una vez que hayas creado el proyecto var a ir a la configuración del proyecto, al bajar un poco encontraras un boton que dice **Agregar una app**. Luego le das ckick al boton con el icono de android y como nombre de paquete var a poner lo que renombraste anteriormenete ```com.<Nombre que le pusiste>.maketasks```, siguiendo con el ejemplo si lo renombraste como andredev seria ```com.andredev.maketasks``` y le das al boton de siguiente.

&nbsp;


Te dara la opción de descargar el archivo ```google-services.json```, este archivo lo vas a pegar en ```android/app```, después solo le das a siguiente y siguiente, no hay nada que hacer, ya todo esta configurado en el proyecto.

&nbsp;


Lo siguiente es agregar un ```metodo de autenticación``` en tu proyecto de firebase, debes habilitar el ```método por correo```, también crea una base de datos en la pestaña de ```RealTime Database```, una vez creada agrega las reglas en la pestaña de ```rules```, las reglas que vas a agregar son las de autenticación, solo usuarios logeados podran leer e insertar en la base de datos y solo el dueño de los recursos podra leerlos, editarlos y borrarlos. Las otras reglas a agregar son para definir un esquema de campos que tendra cada tarea. Por último ve a la pestaña de Messaging y agrega una notificación programada que avise cada día de las tareas.

&nbsp;


### 4) Subida de imagenes a Cloudinary
Está aplicación usa el servicio de cloudinary para subir las imagenes, te comparto el link oficial: [Click para ir](https://cloudinary.com). Crea una cuenta, automaticamente vas a estar en el dashboard, ve a la configuración y crea un ```upload preset público```. Guarda el nombre de ese preset y también el ```Cloud Name``` que se encuentra en el dashboard.

&nbsp;


### 5) Variables de entorno
En la raíz de la aplicación vas a encontrar el archivo ```example.env```, ese archivo contiene el nombre de las variables de entorno que nesesita la aplicación, crea un nuevo archivo en la raíz de la aplicación que se llame ```.env```, copia las variables de ```example.env``` y pegalas ```.env```, ahora cambia los valores. (sin espacios)

```env
ASYNCSTORAGE_ID_TOKEN= Es la clave con la que vas a guardar el idToken en la cache, puedes poner lo que quieras.
ASYNCSTORAGE_USER= Es la clave con la que vas a guardar al usuario autenticado en la cache, es a tu discreción.
CLOUDINARY_CLOUD_NAME= Valor del Cloud Name que se encuentra en el dashboard de Cloudinary.
CLOUDINARY_UPLOAD_PRESET= Nombre del preset que creaste en la configuración de Cloudinary.
FIREBASE_API_KEY= Clave de Firebase, la encuentras en tu google-services.json, toma el valor de current_key.
```

&nbsp;


### 6) Instalación
Ahora solo queda instalar las dependencias del proyecto, abre una terminal, navega a la carpeta del proyecto y ejecuta el siguiente comando:
```
npm install
```

&nbsp;


Cuando termine la instalación solo queda levantar la app con el siguiente comando:
```
npx react-native run-android
```

Y listo ya puedes probar la aplicación

&nbsp;


## License

MIT