# CRONOGEL — Estado del proyecto

**Fecha:** 17 de noviembre de 2026
**Repositorio:** Macoyab/cronogel
**Rama:** security/google-signin-p0
**Último commit sincronizado antes de los cambios actuales:** 4e9894a

## 1. Objetivo y arquitectura

- Aplicación colaborativa y multidispositivo.
- Firestore es la fuente única de verdad para eventos e hitos.
- Arquitectura cloud-only; sin almacenamiento local del calendario.
- Preferencias de Telegram permanecen en LocalStorage.
- Roles: owner, editor y viewer.
- Desarrollo desde MODO CASA y MODO TRABAJO.
- GitHub es la fuente única de verdad para iniciar cada jornada.
- Presupuesto: 0 €.
- No modificar main ni desplegar sin autorización explícita.

## 2. Autenticación e identidad del propietario

- Acceso mediante correo y contraseña: probado.
- Verificación obligatoria del correo: probada.
- Bloqueo de cuentas no verificadas: probado.
- Recuperación de contraseña mediante Gmail: probada.
- Cierre de sesión desde la barra superior: probado.
- Google y Email/Password vinculados a la identidad original del propietario.
- Vinculación realizada mediante linkWithCredential().
- UID original conservado.
- Acceso del propietario mediante correo y contraseña: probado el 16/11/2026.
- Calendario, eventos e hitos cargados correctamente tras el acceso.
- El botón «Configurar acceso» desaparece cuando Password ya está vinculado.
- Prueba del acceso alternativo mediante Google pendiente en MODO CASA.
- MFA real del propietario sigue pendiente. No implementar MFA casera.

## 3. Roles y autorización

- Owner: lectura y escritura.
- Editor: lectura y escritura de eventos e hitos.
- Viewer: lectura, sin permisos de escritura.
- Las reglas Firestore comprueban autenticación, correo verificado y membresía activa.
- Solo owner puede listar y gestionar miembros.
- Editor y viewer pueden consultar únicamente su propio perfil.

## 4. Reglas Firestore y pruebas automatizadas

- Reglas actuales recuperadas desde Firebase Console.
- Copia local creada en firestore.rules.
- Configuración firebase.json creada y asociada a firestore.rules.
- Emulador Firestore configurado en puerto 8080.
- Firebase CLI utilizada temporalmente mediante npx.
- Dependencias de desarrollo:
  - @firebase/rules-unit-testing
  - firebase
- Script npm disponible: npm run test:rules.
- Pruebas automatizadas ejecutadas correctamente en Firestore Emulator.
- Resultado: 9 pruebas superadas, 0 fallidas.

### Cobertura comprobada

1. Owner: lectura y CRUD completo de eventos e hitos.
2. Editor: lectura y CRUD completo de eventos e hitos.
3. Viewer: lectura permitida y creación, modificación y eliminación denegadas.
4. Owner: listado y gestión de miembros.
5. Editor: gestión de miembros denegada y consulta limitada a su perfil.
6. Viewer: gestión de miembros denegada y consulta limitada a su perfil.
7. Usuario con correo no verificado: acceso denegado.
8. Miembro inactivo: acceso denegado.
9. Usuario sin membresía: acceso denegado.

**IMPORTANTE:** las reglas están versionadas localmente, pero todavía NO se han publicado en Firebase. Las pruebas se han ejecutado contra el emulador, no contra producción.

## 5. Incidencia de permisos pendiente

- El 16/11/2026 apareció un error permission-denied en el listener de eventos.
- En aquella sesión también se observó un problema durante el flujo de acceso con Google.
- Posteriormente, el acceso mediante correo y contraseña funcionó y cargó los datos.
- No se ha identificado todavía la causa definitiva del error de Firestore.
- No modificar ni relajar las reglas de producción sin diagnóstico.

## 6. Configuración y archivos del proyecto

- firestore.rules: reglas de seguridad.
- firebase.json: configuración de Firebase y emulador.
- firestore/tests/firestore.rules.test.mjs: pruebas automatizadas.
- package.json y package-lock.json: dependencias y ejecución reproducible.
- .gitignore: excluye dependencias, logs y archivos auxiliares.
- node_modules/ no debe subirse al repositorio.
- Backups y archivos auxiliares existentes deben conservarse sin incorporarlos al commit.

## 7. Pendientes priorizados

### P0 — Seguridad y estabilidad
1. Revisar el error permission-denied de Firestore.
2. Revisar gestión de listeners y estados de sesión.
3. Comprobar que el cierre de sesión limpia correctamente los datos y estados.
4. Revisar las reglas antes de cualquier publicación en producción.
5. Mantener las pruebas automatizadas y ampliar su cobertura cuando sea necesario.

### P1 — Identidad y acceso
6. Probar Google como método alternativo desde MODO CASA.
7. Revisar opciones de MFA real y gratuita para owner.
8. Validar recuperación de sesión y cambio de usuario.

### P1 — Producto
9. Verificar sincronización multidispositivo.
10. Verificar exportación de datos.
11. Diseñar importación JSON segura con vista previa, validación y detección de duplicados.

## 8. BUILD METHOD

- Identificar el contexto de desarrollo antes de comenzar.
- MODO CASA: equipo personal, Warp y herramientas locales.
- MODO TRABAJO: equipo corporativo restringido, GitHub Codespaces y Firebase Console.
- Distinguir entorno de desarrollo y entorno de ejecución del producto.
- GitHub es la fuente única de verdad.
- Inicio de jornada: fetch, comprobar rama y sincronizar con GitHub.
- Cierre: validar, documentar, commit, push y verificar sincronización.
- No hacer commit hasta completar las pruebas esenciales.
- No modificar main ni desplegar sin autorización expresa.
- Trabajar con rigor proporcional al riesgo y evitar auditorías repetitivas.

## 9. Próxima sesión

**Entorno previsto: MODO TRABAJO.**

1. Finalizar revisión de la gestión de sesiones y listeners.
2. Investigar el error permission-denied.
3. Revisar la limpieza de datos al cerrar sesión.
4. Validar la configuración y las pruebas automatizadas.
5. Cerrar documentación, commit y push en security/google-signin-p0.

Las pruebas de Google OAuth quedan reservadas para MODO CASA.
