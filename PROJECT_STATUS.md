# CRONOGEL — Estado del proyecto

**Fecha:** 11 de noviembre de 2026
**Repositorio:** Macoyab/cronogel
**Rama:** security/google-signin-p0
**Último commit de código:** 49019f8

## Objetivo y arquitectura

- Aplicación colaborativa y multidispositivo.
- Firestore es la fuente única de verdad para eventos e hitos.
- Arquitectura cloud-only; sin almacenamiento local del calendario.
- Preferencias de Telegram permanecen en LocalStorage.
- Roles: owner, editor y viewer.
- Desarrollo desde MODO CASA y MODO TRABAJO.
- Ejecución independiente del entorno desde el que se desarrolla.
- Presupuesto: 0 €.
- No modificar main ni desplegar sin autorización.

## Autenticación y permisos

- Acceso mediante correo y contraseña: probado.
- Verificación obligatoria del correo: probada.
- Bloqueo de cuentas no verificadas: probado.
- Recuperación de contraseña mediante Gmail: probada.
- Cierre de sesión desde la barra superior: probado.
- Viewer: lectura y ocultación de controles de escritura comprobadas.
- Editor: creación, modificación y eliminación de eventos e hitos comprobadas.
- Las reglas Firestore protegen las operaciones de escritura. Falta probar deliberadamente una escritura directa denegada para viewer.

## Identidad del propietario

- La cuenta owner actual utiliza exclusivamente Google.
- Email/Password y Google están habilitados en Firebase, pero el owner todavía no tiene vinculado el proveedor password.
- Google OAuth no funciona en el navegador corporativo; sí desde el móvil.
- La vinculación queda aplazada para MODO CASA.
- Objetivo: conservar el UID y el documento members/{uid}.
- No crear una cuenta owner duplicada ni modificar la membresía a ciegas.
- Primero vincular Email/Password a la identidad existente y comprobar UID, rol y acceso.
- Retirar Google Sign-In solo después de validar el acceso del owner por contraseña.
- MFA obligatoria del owner sigue pendiente. No está resuelta y no se implementará una MFA casera.

## Código y Git

- Commit 49019f8: feat: add email authentication and verification.
- Push realizado a origin/security/google-signin-p0.
- Cambios de autenticación guardados en index.html.
- No se ha hecho merge a main ni despliegue.
- Se detectaron cinco archivos auxiliares sin seguimiento. No borrarlos ni incorporarlos accidentalmente:
  - cronogel-checkpoint.patch
  - index.html.before-auth-readiness.20261109-130128.bak
  - index.html.before-cloud-only.20261109-125437.bak
  - index.html.before-listener-error-fix.20261109-130229.bak
  - index.html.pre-storage-controller.backup

## Pendientes

1. Vincular Email/Password al owner existente desde MODO CASA, conservando UID y membresía.
2. Probar acceso owner exclusivamente con correo y contraseña.
3. Retirar Google Sign-In solo tras validar la migración.
4. Resolver MFA real para owner compatible con presupuesto cero.
5. Probar escritura directa denegada para viewer.
6. Verificar sincronización multidispositivo y exportación tras los cambios.
7. Diseñar importación JSON segura con vista previa, validación y detección de duplicados.

## Próxima sesión

**Entorno previsto: MODO CASA.**

1. Comprobar rama, estado de Git y sincronización.
2. Confirmar que están presentes los commits de código y documentación.
3. Preparar la vinculación de la identidad owner existente.
4. Verificar UID, membresía y rol después de vincular.
5. Probar el acceso mediante contraseña antes de retirar Google.

## BUILD METHOD aplicado

- Identificar el contexto de desarrollo y adaptar herramientas y procedimientos.
- Distinguir el entorno de desarrollo del entorno de ejecución del producto.
- GitHub es la fuente central de continuidad.
- Inicio de jornada: comprobar rama, estado y siguiente tarea.
- Rigor proporcional al riesgo; evitar auditorías repetitivas.
- Cierre: validar, documentar, commit, push y verificar sincronización.
