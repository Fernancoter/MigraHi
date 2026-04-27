// Re-export of the real HTTP-backed AuthService so legacy imports
// (./core/auth/auth.service) keep working without duplicating the mock.
export { AuthService, type LoginResponse, type UserDto } from '../services/auth.service';
