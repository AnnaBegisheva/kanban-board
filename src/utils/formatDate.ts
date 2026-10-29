export const formatDate = (dateString?: string): string => {
  if (!dateString) {
    return 'Дата отсутствует';
  }

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return date.toLocaleDateString('ru-RU', options);
};
