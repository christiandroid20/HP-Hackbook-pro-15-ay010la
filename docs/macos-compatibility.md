---
title: "Compatibilidad con macOS"
description: "Versiones reportadas, estado de las pruebas y validaciones pendientes."
---

# Compatibilidad de macOS

La documentación histórica menciona Monterey a Ventura. También se han reportado pruebas posteriores hasta Tahoe 26, pero aún no hay evidencias en este repositorio para certificar cada versión, servicio o EFI.

| Elemento | Estado | Pendiente |
|---|---|---|
| Arranque OpenCore | Reportado en el proyecto | Versión exacta y evidencia reproducible |
| Monterey–Ventura | Compatibilidad indicada en la nota original | Matriz de pruebas por versión |
| Versiones posteriores | Reportadas por la autora | Capturas, fecha y funciones verificadas |
| Intel HD Graphics 520 | GPU integrada del equipo | Aceleración y salida de vídeo por versión |
| Suspensión | Sin validación documentada aquí | Pruebas repetidas de reposo y reanudación |

Por versión registra build de macOS, OpenCore y kexts, SMBIOS (sin valores seriales), arranque, gráficos, audio, HDMI, Wi-Fi, Bluetooth, trackpad, USB, batería y suspensión. Mantén copia de seguridad y una ruta de recuperación comprobada.
