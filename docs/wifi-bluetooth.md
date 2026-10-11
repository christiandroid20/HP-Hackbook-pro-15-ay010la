---
title: "Wi-Fi y Bluetooth"
description: "Diagnóstico de la Intel Wireless 3160 y registro de resultados por sistema."
---

# Wi-Fi y Bluetooth

Se ha probado una tarjeta Intel Wireless 3160 procedente de un equipo Lenovo. Se reportó Wi-Fi funcional en Linux/macOS y en Recuperación de macOS, mientras que Windows presenta un problema de inicio o inicialización. La causa no está confirmada; no debe atribuirse automáticamente a una lista blanca de BIOS.

## Diagnóstico
1. Confirma el identificador PCI y registra sistema operativo y controlador.
2. Comprueba Wi-Fi y Bluetooth por separado; pueden enumerarse como interfaces distintas.
3. En Windows, revisa Administrador de dispositivos, código de error, versión del controlador y eventos de inicio.
4. Comprueba BIOS/UEFI y conexiones físicas antes de modificar la tarjeta.
5. Evita puentear contactos o aplicar cinta a pines sin un esquema fiable.

Para completar la sección, anota versiones, kexts, resultados por función y el mensaje exacto de Windows. No incluyas identificadores privados.
