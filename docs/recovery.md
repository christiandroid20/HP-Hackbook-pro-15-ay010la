---
title: "Recuperación y arranque UEFI"
description: "Buenas prácticas de respaldo, arranque OpenCore y privacidad de la EFI."
---

# Recuperación y arranque UEFI

## Antes de tocar OpenCore
1. Conserva una copia íntegra de la EFI que actualmente arranca, en un medio externo y en una ubicación privada.
2. Comprueba que puedes acceder a la partición EFI desde un sistema alternativo o USB de recuperación.
3. Anota el orden de arranque actual de BIOS/UEFI y el método que funciona (por ejemplo, menú F9).
4. Cambia un solo elemento cada vez y prueba antes de borrar la copia anterior.

## Rutas habituales
En una instalación UEFI de OpenCore suelen intervenir EFI/BOOT/BOOTx64.efi como cargador de reserva y EFI/OC/OpenCore.efi como ejecutable principal. No renombres archivos a ciegas ni sustituyas el cargador de reserva sin inspeccionar la estructura real.

Que el firmware arranque automáticamente sin pulsar F9 depende de su configuración y comportamiento. No puede garantizarse sin revisar BIOS/UEFI y probar una copia recuperable.

## Privacidad
- Mantén privada una copia original con sus datos.
- Antes de publicar una EFI, revisa SystemSerialNumber, MLB, ROM, SystemUUID y otros identificadores únicos.
- Sustituye los identificadores en la copia pública por valores de ejemplo no utilizables; no publiques la EFI privada.
- No compartas contraseñas, tokens, números de serie ni volcados con información personal.

Si deja de arrancar, vuelve al medio de recuperación o al respaldo conocido. Registra el error y la última modificación. La EFI real del portátil aún no está incluida: esta guía no es una EFI lista para arrancar.
