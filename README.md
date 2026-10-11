# HP HackBook Pro 15-ay010la

Documentación del proyecto Hackintosh para la **HP Pavilion 15-ay010la**.

> Proyecto personal de aprendizaje. La compatibilidad depende de la versión de macOS, OpenCore y el hardware instalado.

## Hardware documentado

- **Equipo:** HP Pavilion 15-ay010la
- **Procesador:** Intel Core i7-6500U (Skylake)
- **Gráficos:** Intel HD Graphics 520
- **Memoria RAM actual:** 16 GB DDR4-2133
- **Almacenamiento actual:** SSD SATA Kingston de 480 GB
- **macOS:** el proyecto comenzó con Monterey; se han reportado pruebas y actualizaciones posteriores. Consulta `docs/macos-compatibility.md` y registra allí las versiones verificadas.

## Estructura

- `docs/` — hardware, estado original, compatibilidad y solución de problemas.
- `EFI/README.md` — instrucciones para incorporar y revisar la EFI real del equipo.
- `screenshots/README.md` — capturas y evidencias.
- `changelog/CHANGELOG.md` — historial de cambios.
- `assets/` — recursos de la página del proyecto.

## Seguridad y privacidad de la EFI

No se incluye una EFI genérica presentada como lista para arrancar. Antes de publicar la EFI real, elimina o sustituye los identificadores únicos (Serial, MLB, ROM y UUID) en la copia pública y conserva una copia privada segura. No cambies archivos de arranque sin comprobar la estructura real y mantener una copia de recuperación.

## Aviso

Este repositorio documenta un proyecto independiente; no está afiliado a HP ni Apple. La instalación de macOS en hardware no Apple puede estar sujeta a restricciones de licencia. Realiza cambios bajo tu responsabilidad y mantén copias de seguridad.
