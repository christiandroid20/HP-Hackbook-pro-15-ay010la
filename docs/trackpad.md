# Trackpad

Se reportó que el trackpad recibió ajustes con ayuda externa, pero aún no se ha añadido la configuración exacta ni una matriz de pruebas. No se deben inventar kexts ni parámetros sin inspeccionar la EFI real.

- [ ] Confirmar el bus del trackpad (I2C, SMBus o PS/2 según el hardware real).
- [ ] Probar movimiento del puntero y clic físico.
- [ ] Probar clic secundario y desplazamiento con dos dedos.
- [ ] Registrar gestos adicionales solo si el hardware los admite.
- [ ] Probar después de suspensión y reanudación.
- [ ] Repetir después de reinicio y apagado completo.

Registra macOS, OpenCore, kexts y cambios. Cambia una variable a la vez y conserva una EFI de recuperación.
