export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface DoctorSearchFilters {
  specialty?: string;
  search?: string;
  minRating?: number;
  maxPrice?: number;
  sortBy?: 'rating' | 'price' | 'experience';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
