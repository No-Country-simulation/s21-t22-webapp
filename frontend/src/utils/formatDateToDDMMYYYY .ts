export const formatDateToDDMMYYYY = (date: Date): string => {
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
