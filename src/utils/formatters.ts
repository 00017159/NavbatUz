/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format a date to show only month and day
 */
export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format time string (e.g., "14:30" -> "2:30 PM")
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Get time-based greeting
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning ☀️';
  if (hour < 17) return 'Good Afternoon 🌤️';
  return 'Good Evening 🌙';
};

/**
 * Format price with currency
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(0)}`;
};

/**
 * Get initials from full name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Format rating to one decimal place
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

/**
 * Format experience years
 */
export const formatExperience = (years: number): string => {
  return `${years} yr${years !== 1 ? 's' : ''} exp`;
};
