// =====================================
// FORMATEAR FECHA
// =====================================

export function formatearFecha(

  fecha

) {

  return new Date(fecha)
    .toLocaleDateString(
      'es-BO'
    );

}