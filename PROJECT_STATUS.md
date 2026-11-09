# CRONOGEL — Estado del proyecto

**Fecha:** 9 de noviembre de 2026
**Repositorio:** Macoyab/cronogel
**Rama:** security/google-signin-p0
**Último commit de código:** 59d0091

## Objetivo
Convertir Cronogel en un producto colaborativo profesional, utilizando Firestore como única fuente de verdad para eventos e hitos.

## Estado confirmado
- Arquitectura cloud-only implementada.
- Eliminado el almacenamiento local del calendario.
- Preferencias del bot de Telegram permanecen en LocalStorage.
- Autenticación Google y roles owner, editor y viewer implementados.
- Indicadores independientes de carga inicial de eventos e hitos.
- Exportación JSON protegida por sesión, autorización y carga completa.
- Errores de sincronización invalidan la exportación.
- La identidad Firebase se conserva ante errores de autorización.
- Reglas Firestore aprobadas sin cambios.

## Validaciones
- git diff --check: correcto.
- node --check: correcto.
- Checkpoint de cambios: verificado.
- Pruebas funcionales reales: pendientes.

## Pendiente
1. Auditar el diff completo del commit 59d0091.
2. Probar Google Sign-In en MODO CASA.
3. Verificar roles y permisos.
4. Probar sincronización multidispositivo.
5. Probar exportación JSON.
6. Diseñar importación JSON segura con vista previa, validación, detección de duplicados y confirmación.

## Próxima sesión
1. Identificar MODO CASA o MODO TRABAJO.
2. Comprobar rama, commit y estado de Git.
3. Sincronizar con GitHub antes de editar.
4. Auditar los cambios publicados.
5. Continuar con pruebas funcionales.

## Reglas de trabajo
- GitHub es la fuente central de continuidad.
- Trabajar en security/google-signin-p0.
- No modificar main ni desplegar sin autorización.
- Sincronizar antes de cambiar de entorno.
- Al finalizar cada jornada: validar, documentar, commit, push y verificar.
- Presupuesto del proyecto: 0 €.
