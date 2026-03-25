# NavbatUz — Complete Step-by-Step Build Guide

> Based on the Final Implementation Plan. Every step from empty folder to production-ready healthcare app.
>
> **Repository:** https://github.com/00017159/NavbatUz.git
>
> **Rule:** After completing each step, commit and push to the repository.

---

## Sprint 1 — Planning & Architecture (Week 1)

### Step 1.1: Clone Repository & Initialize Project

```bash
git clone https://github.com/00017159/NavbatUz.git
cd NavbatUz
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".expo/" >> .gitignore
```

```bash
git add .
git commit -m "Step 1.1: Initialize project with .gitignore"
git push origin main
```

### Step 1.2: Create Expo React Native Project

```bash
npx create-expo-app@latest ./ --template blank-typescript
```

```bash
git add .
git commit -m "Step 1.2: Initialize Expo React Native project with TypeScript"
git push origin main
```

### Step 1.3: Set Up Project Folder Structure

Create the following directory structure inside the project:

```
src/
├── components/
│   ├── common/           # Reusable: Button, Card, Avatar, Badge, Input
│   ├── home/             # GreetingHeader, UpcomingCard, SpecialtiesRow
│   ├── search/           # DoctorCard, SpecialtyChips, SearchHeader
│   ├── booking/          # CalendarPicker, TimeSlots, VisitTypeSelector
│   └── profile/          # ProfileHeader, HealthStats, QuickLinks
├── screens/
│   ├── auth/             # LoginScreen, RegisterScreen, OTPScreen
│   ├── tabs/             # HomeScreen, SearchScreen, AppointmentsScreen, ProfileScreen
│   ├── doctor/           # DoctorDetailScreen
│   └── booking/          # BookAppointmentScreen, ConfirmationScreen
├── navigation/
│   ├── RootNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── TabNavigator.tsx
│   └── types.ts
├── services/
│   ├── api.ts            # Axios instance with interceptors
│   ├── authService.ts
│   ├── doctorService.ts
│   ├── appointmentService.ts
│   ├── patientService.ts
│   └── notificationService.ts
├── store/
│   ├── authStore.ts
│   ├── appointmentStore.ts
│   └── searchStore.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useDoctors.ts
│   └── useAppointments.ts
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   └── spacing.ts
├── utils/
│   ├── formatters.ts
│   ├── validators.ts
│   └── constants.ts
├── types/
│   ├── user.ts
│   ├── doctor.ts
│   ├── appointment.ts
│   └── api.ts
└── assets/
    ├── images/
    ├── icons/
    └── fonts/
```

```bash
git add .
git commit -m "Step 1.3: Set up project folder structure"
git push origin main
```

### Step 1.4: Install Frontend Dependencies

```bash
# Navigation
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context

# UI Components
npx expo install react-native-paper react-native-vector-icons react-native-svg

# State & Data
npm install zustand @tanstack/react-query axios

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Calendar
npm install react-native-calendars

# Secure Storage
npx expo install expo-secure-store

# Push Notifications (FCM — for push only, NOT for OTP)
npm install firebase

# Async Storage
npx expo install @react-native-async-storage/async-storage
```

```bash
git add .
git commit -m "Step 1.4: Install frontend dependencies"
git push origin main
```

### Step 1.5: Define Design System

Create `src/theme/colors.ts`:
```typescript
export const colors = {
  primary: '#1A5CFF',
  primaryDark: '#0D3FB8',
  primaryLight: '#E8EEFF',
  accent: '#FF6B35',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
};
```

Create `src/theme/typography.ts`:
```typescript
export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  button: { fontSize: 16, fontWeight: '600' as const, lineHeight: 20 },
};
```

Create `src/theme/spacing.ts`:
```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  borderRadius: { sm: 8, md: 12, lg: 16, full: 999 },
};
```

```bash
git add .
git commit -m "Step 1.5: Define design system (colors, typography, spacing)"
git push origin main
```

### Step 1.6: Verify Frontend Setup

```bash
npx expo start
```

> **Checkpoint:** App launches in Expo Go with a blank screen. No errors in terminal.

---

## Sprint 2 — Core Setup & Authentication (Weeks 2–3)

### Step 2.1: Initialize NestJS Backend

```bash
mkdir navbatuz-api
cd navbatuz-api
npx @nestjs/cli new ./ --package-manager npm --skip-git
```

```bash
cd ..
git add .
git commit -m "Step 2.1: Initialize NestJS backend project"
git push origin main
```

### Step 2.2: Install Backend Dependencies

```bash
cd navbatuz-api

# Prisma & Database
npm install prisma @prisma/client
npx prisma init

# Authentication
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/bcrypt @types/passport-jwt

# Validation
npm install class-validator class-transformer

# Config
npm install @nestjs/config

# Rate Limiting (Security)
npm install @nestjs/throttler

# Template Engine
npm install @nestjs/platform-express hbs
npm install -D @types/hbs

# File Upload
npm install @nestjs/platform-express multer
npm install -D @types/multer

# PDF / Excel Export
npm install pdfkit exceljs
npm install -D @types/pdfkit

# Swagger Docs
npm install @nestjs/swagger swagger-ui-express

# Telegram Bot (for OTP verification)
npm install node-telegram-bot-api
npm install -D @types/node-telegram-bot-api
```

```bash
cd ..
git add .
git commit -m "Step 2.2: Install backend dependencies including Telegram bot"
git push origin main
```

### Step 2.3: Configure PostgreSQL & Prisma Schema

Update `navbatuz-api/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ── Enums ──

enum Role {
  PATIENT
  DOCTOR
  ADMIN
}

enum Specialty {
  CARDIOLOGY
  NEUROLOGY
  ORTHOPEDIC
  OPHTHALMOLOGY
  GENERAL
  DERMATOLOGY
  PEDIATRICS
  PSYCHIATRY
}

// Note: All appointments are In-Person only (no video call feature)

enum AppointmentStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

// ── Models ──

model User {
  id             String    @id @default(uuid())
  fullName       String
  email          String    @unique
  phone          String    @unique
  passwordHash   String
  role           Role      @default(PATIENT)
  bloodType      String?
  weight         Float?
  heartRate      Int?
  avatarUrl      String?
  isActive       Boolean   @default(true)
  telegramChatId String?   @unique  // Linked Telegram account for OTP
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  appointments   Appointment[]
  reviews        Review[]
  medicalRecords MedicalRecord[]
  notifications  Notification[]
}

model Doctor {
  id             String     @id @default(uuid())
  fullName       String
  email          String     @unique
  phone          String     @unique
  passwordHash   String
  specialty      Specialty
  experience     Int
  rating         Float      @default(0)
  reviewCount    Int        @default(0)
  pricePerVisit  Float
  clinicName     String
  clinicAddress  String
  avatarUrl      String?
  isAvailable    Boolean    @default(true)
  bio            String?
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt

  appointments   Appointment[]
  reviews        Review[]
  timeSlots      TimeSlot[]
}

model OtpVerification {
  id        String   @id @default(uuid())
  phone     String
  code      String
  expiresAt DateTime
  verified  Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([phone])
}

model Appointment {
  id          String              @id @default(uuid())
  patientId   String
  doctorId    String
  date        DateTime
  time        String
  reason      String?
  status      AppointmentStatus   @default(PENDING)
  notes       String?
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt

  patient     User    @relation(fields: [patientId], references: [id])
  doctor      Doctor  @relation(fields: [doctorId], references: [id])

  @@index([patientId])
  @@index([doctorId])
  @@index([date])
}

model TimeSlot {
  id        String   @id @default(uuid())
  doctorId  String
  dayOfWeek Int        // 0=Sun, 1=Mon ... 6=Sat
  startTime String     // "09:00"
  endTime   String     // "09:30"
  isBooked  Boolean  @default(false)

  doctor    Doctor   @relation(fields: [doctorId], references: [id])
  @@index([doctorId])
}

model Review {
  id        String   @id @default(uuid())
  patientId String
  doctorId  String
  rating    Float
  comment   String
  createdAt DateTime @default(now())

  patient   User   @relation(fields: [patientId], references: [id])
  doctor    Doctor @relation(fields: [doctorId], references: [id])

  @@index([doctorId])
}

model MedicalRecord {
  id        String   @id @default(uuid())
  patientId String
  title     String
  fileUrl   String
  type      String     // "lab_result", "prescription", "report"
  createdAt DateTime @default(now())

  patient   User @relation(fields: [patientId], references: [id])
  @@index([patientId])
}

model Notification {
  id        String   @id @default(uuid())
  userId    String
  title     String
  body      String
  type      String     // "appointment", "reminder", "system"
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())

  user      User @relation(fields: [userId], references: [id])
  @@index([userId])
}
```

```bash
git add .
git commit -m "Step 2.3: Configure Prisma schema with all models including OTP"
git push origin main
```

### Step 2.4: Run Database Migration

```bash
cd navbatuz-api

# Set DATABASE_URL in .env
# DATABASE_URL="postgresql://user:password@localhost:5432/navbatuz"

npx prisma migrate dev --name init
npx prisma generate
```

```bash
cd ..
git add .
git commit -m "Step 2.4: Run initial database migration"
git push origin main
```

### Step 2.5: Create NestJS Modules

Generate the following modules:

```bash
cd navbatuz-api

nest generate module auth
nest generate module users
nest generate module doctors
nest generate module appointments
nest generate module reviews
nest generate module records
nest generate module notifications
nest generate module reports
nest generate module telegram

# Generate controllers & services for each
nest generate controller auth
nest generate service auth
nest generate controller users
nest generate service users
nest generate controller doctors
nest generate service doctors
nest generate controller appointments
nest generate service appointments
nest generate controller reviews
nest generate service reviews
nest generate controller records
nest generate service records
nest generate controller notifications
nest generate service notifications
nest generate controller reports
nest generate service reports
nest generate service telegram
```

```bash
cd ..
git add .
git commit -m "Step 2.5: Generate all NestJS modules, controllers, and services"
git push origin main
```

### Step 2.6: Implement Telegram OTP Verification Service

> **OTP verification is handled via the "Verification Codes" Telegram bot** instead of Firebase Auth. The flow:
>
> 1. User enters phone number on the app
> 2. Backend generates a 6-digit OTP code and stores it in the `OtpVerification` table
> 3. Backend sends the OTP code to the user via the **Verification Codes Telegram Bot**
> 4. User receives the code in Telegram, enters it in the app
> 5. Backend verifies the code and completes registration/login

**Backend implementation** (`src/telegram/telegram.service.ts`):

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new TelegramBot(token, { polling: false });
  }

  // Send OTP code via Telegram Verification Codes bot
  async sendVerificationCode(chatId: string, code: string): Promise<void> {
    const message = `🔐 Your NavbatUz verification code: *${code}*\n\nThis code expires in 5 minutes. Do not share it.`;
    await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  }
}
```

**OTP endpoints in Auth module:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/otp/send` | POST | Generate 6-digit code, store in DB (5 min TTL), send via Telegram bot |
| `/auth/otp/verify` | POST | Verify code against DB, mark as verified, return JWT tokens |
| `/auth/telegram/link` | POST | Link user's Telegram chat ID to their account |

**Environment variables** (`.env`):
```
TELEGRAM_BOT_TOKEN=your_verification_codes_bot_token
```

**Frontend OTP flow** (`src/screens/auth/OTPScreen.tsx`):
1. Show 6-digit input with number keyboard
2. Display message: "We sent a verification code to your Telegram"
3. Countdown timer (5 minutes)
4. "Resend Code" button (disabled during cooldown)
5. On successful verification → navigate to authenticated tabs

```bash
git add .
git commit -m "Step 2.6: Implement Telegram OTP verification service"
git push origin main
```

### Step 2.7: Implement Authentication Module

Build `/auth` with the following:

1. **Register endpoint** (`POST /auth/register`)
   - Validate input with class-validator (fullName, email, phone, password)
   - Hash password with bcrypt
   - Create user in DB via Prisma
   - Trigger OTP send via Telegram bot
   - Return `{ message: "OTP sent to Telegram", userId }`

2. **Login endpoint** (`POST /auth/login`)
   - Find user by email/phone
   - Compare password hash
   - Trigger OTP send via Telegram bot for 2FA
   - Return `{ message: "OTP sent to Telegram" }`

3. **Verify OTP endpoint** (`POST /auth/otp/verify`)
   - Verify OTP code from `OtpVerification` table
   - Check expiry (5 min window)
   - Return JWT access + refresh tokens on success

4. **Refresh token endpoint** (`POST /auth/refresh`)
   - Verify refresh token
   - Issue new access token

5. **JWT Strategy** (Passport)
   - Extract JWT from Authorization header
   - Validate and attach user to request

6. **Guards**
   - `JwtAuthGuard` — Protect all authenticated routes
   - `RolesGuard` — Restrict by role (PATIENT, DOCTOR, ADMIN)

```bash
git add .
git commit -m "Step 2.7: Implement authentication with JWT and Telegram OTP"
git push origin main
```

### Step 2.8: Implement Rate Limiting (Security)

In `app.module.ts`, add throttler:

```typescript
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,    // 1 minute
      limit: 20,     // 20 requests per minute
    }]),
    // ... other modules
  ],
})
```

Apply stricter limits on auth routes:
- Login: 5 attempts per minute
- OTP send: 3 attempts per minute
- OTP verify: 5 attempts per minute

```bash
git add .
git commit -m "Step 2.8: Implement rate limiting for security"
git push origin main
```

### Step 2.9: Build Authentication Screens on Frontend

Create auth screens:
- `LoginScreen` — Phone/email + password, triggers Telegram OTP on submit
- `RegisterScreen` — Full form with validation (name, email, phone, password)
- `OTPScreen` — 6-digit code entry with message "Check your Telegram for the verification code", timer, resend button
- `TelegramLinkScreen` — Instructions to link Telegram account (start the Verification Codes bot, share phone number)

```bash
git add .
git commit -m "Step 2.9: Build authentication screens with Telegram OTP UI"
git push origin main
```

### Step 2.10: Create Auth State Management

In `src/store/authStore.ts` using Zustand:

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isOtpPending: boolean;
  login: (credentials) => Promise<void>;
  register: (data) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  logout: () => void;
}
```

Store JWT in `expo-secure-store`. Auto-login on app restart if token is valid.

```bash
git add .
git commit -m "Step 2.10: Create Zustand auth state management"
git push origin main
```

### Step 2.11: Set Up Protected Navigation

```
RootNavigator
├── AuthNavigator (unauthenticated)
│   ├── LoginScreen
│   ├── RegisterScreen
│   ├── OTPScreen
│   └── TelegramLinkScreen
└── TabNavigator (authenticated)
    ├── HomeScreen
    ├── SearchScreen
    ├── AppointmentsScreen
    └── ProfileScreen
```

```bash
git add .
git commit -m "Step 2.11: Set up root navigation with auth flow"
git push origin main
```

> **Checkpoint:** User can register, login, receive OTP via Telegram Verification Codes bot, verify, and see the authenticated tab navigator. JWT is stored securely. Rate limiting blocks brute force.

---

## Sprint 3 — Search & Booking (Weeks 3–4)

### Step 3.1: Implement Doctors API

Build `/doctors` endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/doctors` | GET | List with filters: `?specialty=CARDIOLOGY&minRating=4&maxPrice=100&search=John&page=1&limit=10` |
| `/doctors/:id` | GET | Full profile + reviews + available time slots |
| `/doctors/specialties` | GET | List all specialties |
| `/doctors/:id/slots` | GET | Available slots for a specific date |

Key implementation details:
- Full-text search on `fullName` and `clinicName`
- Filter by specialty, rating range, price range
- Sort by rating, price, experience
- Cursor-based or offset pagination

```bash
git add .
git commit -m "Step 3.1: Implement doctors API with search and filtering"
git push origin main
```

### Step 3.2: Implement Appointments API

Build `/appointments` endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/appointments` | POST | Book (atomic transaction: check slot → create appointment → mark slot booked) |
| `/appointments/my` | GET | List patient's appointments (upcoming / past) |
| `/appointments/:id` | GET | Single appointment detail |
| `/appointments/:id` | PATCH | Reschedule (new date/time) or cancel |
| `/appointments/:id/confirm` | POST | Doctor confirms appointment |

Key implementation details:
- **ACID transaction** for booking: wrap in Prisma `$transaction`
- Double-booking prevention via database-level unique constraints
- Appointment status state machine: `PENDING → CONFIRMED → COMPLETED / CANCELLED`

```bash
git add .
git commit -m "Step 3.2: Implement appointments API with ACID transactions"
git push origin main
```

### Step 3.3: Build Home Screen UI

Implement components for `HomeScreen`:

1. `GreetingHeader` — Time-based greeting ("Good Morning ☀️") + user name + notification bell badge
2. `SearchBar` — Rounded input, navigates to SearchScreen on tap
3. `UpcomingAppointmentCard` — Blue gradient card with doctor info, date, time, "Reschedule" and "Join" buttons
4. `SpecialtiesRow` — Horizontal FlatList with circular icons for each specialty
5. `SpecialOfferBanner` — Promotional card with CTA button
6. `TopDoctorsList` — Vertical FlatList of `DoctorCard` components

Fetch data using React Query:
```typescript
const { data: upcoming } = useQuery(['upcoming'], appointmentService.getUpcoming);
const { data: topDoctors } = useQuery(['topDoctors'], doctorService.getTopRated);
```

```bash
git add .
git commit -m "Step 3.3: Build Home Screen UI components"
git push origin main
```

### Step 3.4: Build Doctor Search Screen UI

1. `SearchHeader` — Input with magnifying glass icon + back button
2. `SpecialtyFilterChips` — Horizontal scrollable chips (All, Cardiologist, Neurologist...)
3. `DoctorCard` — Avatar (initials fallback), name, specialty, rating stars, experience, clinic, price, "Book Now" button
4. Results count label ("4 doctors found near you")
5. Infinite scroll pagination with `FlatList` + `onEndReached`

```bash
git add .
git commit -m "Step 3.4: Build Doctor Search Screen with filter chips"
git push origin main
```

### Step 3.5: Build Book Appointment Screen UI

1. `DoctorInfoHeader` — Avatar, name, specialty, rating, clinic
3. `CalendarPicker` — `react-native-calendars` Calendar component, disabled past dates, mark available dates
4. `TimeSlotGrid` — Sections: "MORNING" / "AFTERNOON", grid of time pills, highlight selected
5. `ReasonInput` — TextInput with placeholder "Describe your symptoms..."
6. `BookingSummary` — Summary card: doctor, date, time, price
7. `ConfirmButton` — Full-width green button "✓ Confirm Appointment"

Flow:
```
Pick date (fetches available slots) → Pick time slot → Enter reason → Review summary → Confirm
```

```bash
git add .
git commit -m "Step 3.5: Build Book Appointment Screen with calendar and time slots"
git push origin main
```

### Step 3.6: Connect Frontend to Backend

1. Configure Axios instance (`src/services/api.ts`) with baseURL and JWT interceptor
2. Implement service functions:
   - `doctorService.search(filters)` — calls `GET /doctors`
   - `doctorService.getById(id)` — calls `GET /doctors/:id`
   - `doctorService.getSlots(id, date)` — calls `GET /doctors/:id/slots`
   - `appointmentService.book(data)` — calls `POST /appointments`
   - `appointmentService.getMyAppointments()` — calls `GET /appointments/my`
3. Wrap in React Query hooks in `src/hooks/`

```bash
git add .
git commit -m "Step 3.6: Connect frontend API services to backend"
git push origin main
```

> **Checkpoint:** User can search doctors, filter by specialty, view doctor details, select date/time, and book an appointment. Booking is transactional and prevents double-booking.

---

## Sprint 4 — Dashboard, Notifications & Profile (Weeks 5–6)

### Step 4.1: Build Patient Profile Screen UI

1. `ProfileHeader` — Avatar, full name, email, Patient ID badge
2. `HealthStatsRow` — Three cards: Blood Type (A+), Heart Rate (72 bpm), Weight (74 kg)
3. `UpcomingAppointmentsList` — Next 2-3 appointments with doctor info and date
4. `ReviewsList` — Reviews the patient has written
5. `QuickLinks` — Tappable cards: Medical Records, Health Vitals, Insurance Info

```bash
git add .
git commit -m "Step 4.1: Build Patient Profile Screen UI"
git push origin main
```

### Step 4.2: Implement Profile API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/profile` | GET | Get current user profile |
| `/profile` | PATCH | Update profile (name, avatar, health stats) |
| `/profile/avatar` | POST | Upload avatar image (multipart) |
| `/profile/health-stats` | PUT | Update blood type, weight, heart rate |

```bash
git add .
git commit -m "Step 4.2: Implement profile API endpoints"
git push origin main
```

### Step 4.3: Build Appointments Tab Screen

- Two tabs: **Upcoming** / **Past**
- Each appointment card shows: doctor name, specialty, date, time, status badge
- Swipe actions: Cancel (red), Reschedule (blue)
- Pull-to-refresh

```bash
git add .
git commit -m "Step 4.3: Build Appointments Tab Screen with upcoming/past tabs"
git push origin main
```

### Step 4.4: Implement Notifications System

Backend:
1. Create `NotificationService` — creates notifications on:
   - Appointment booked → patient + doctor
   - Appointment confirmed → patient
   - Appointment cancelled → both parties
   - Reminder: 1 hour before appointment
2. Integrate Firebase Cloud Messaging (FCM) for push notifications
3. **Also send critical notifications via Telegram bot** as a fallback channel
4. `GET /notifications` — paginated list
5. `PATCH /notifications/:id/read` — mark as read
6. `PATCH /notifications/read-all` — mark all as read

Frontend:
1. Notification bell icon with unread count badge on HomeScreen
2. Notification list screen
3. Register FCM token on login, send to backend

```bash
git add .
git commit -m "Step 4.4: Implement notifications with FCM and Telegram fallback"
git push origin main
```

### Step 4.5: Build Admin Dashboard (Optional Web Panel)

If implemented, include:
- Total patients, doctors, appointments (KPI cards)
- Appointments chart (daily/weekly/monthly trend)
- Revenue summary
- Recent activity feed
- User management table (activate/deactivate accounts)

```bash
git add .
git commit -m "Step 4.5: Build admin dashboard layout and KPI cards"
git push origin main
```

### Step 4.6: Implement CRUD Operations for All Entities

Ensure full Create, Read, Update, Delete for:
- Users (admin manages)
- Doctors (admin manages)
- Appointments (patients create, patients/doctors/admins update)
- Reviews (patients create, patients/admins delete)
- Medical Records (patients upload, patients/doctors view)

With proper role-based guards:
- `PATIENT` — own data only
- `DOCTOR` — own appointments + assigned patients
- `ADMIN` — all data

```bash
git add .
git commit -m "Step 4.6: Implement full CRUD with role-based access control"
git push origin main
```

> **Checkpoint:** Profile displays health stats. Notifications are sent on booking events. Push notifications work on device. CRUD operations work for all entities with role-based access control.

---

## Sprint 5 — Advanced Features: AI, Reporting & Settings (Weeks 6–7)

### Step 5.1: Implement AI Symptom Assistant

1. Create backend endpoint: `POST /ai/symptom-check`
   - Accepts: `{ symptoms: string[] }`
   - Returns: `{ possibleConditions: [], recommendedSpecialty: string, suggestedDoctors: Doctor[] }`
2. Use OpenAI API or a rule-based mapping engine
3. Frontend: Chat-like UI where user selects symptoms → gets recommendations → taps to see suggested doctors

```bash
git add .
git commit -m "Step 5.1: Implement AI symptom assistant with doctor recommendations"
git push origin main
```

### Step 5.2: Implement Smart Doctor Recommendations

1. Algorithm based on:
   - Patient's past bookings (preferred specialty)
   - Doctor rating and availability
   - Location proximity (if location permission granted)
   - Price range preference
2. Display as "Recommended for You" section on Home Screen

```bash
git add .
git commit -m "Step 5.2: Add smart doctor recommendation algorithm"
git push origin main
```

### Step 5.3: Implement Reporting Module

Backend:
1. `GET /reports/appointments?from=&to=&format=pdf` — Appointment report
2. `GET /reports/patients?format=excel` — Patient summary
3. `GET /reports/doctors?format=pdf` — Doctor activity report

Use template engine (Handlebars) for PDF layouts:
```
templates/
├── appointment-report.hbs
├── patient-summary.hbs
└── doctor-report.hbs
```

Generate with `pdfkit` for PDF and `exceljs` for Excel.

```bash
git add .
git commit -m "Step 5.3: Implement reporting with PDF and Excel export"
git push origin main
```

### Step 5.4: Implement Analytics Endpoints

1. `GET /analytics/appointments` — Appointment trends (daily, weekly, monthly counts)
2. `GET /analytics/specialties` — Most booked specialties
3. `GET /analytics/doctors/top` — Top-rated doctors
4. Support drill-down filters: date range, specialty, status

```bash
git add .
git commit -m "Step 5.4: Implement analytics endpoints with drill-down filters"
git push origin main
```

### Step 5.5: Build Settings Screen

1. **Account Settings** — Edit name, email, phone, password
2. **Notification Preferences** — Toggle: appointment reminders, promotional, system alerts
3. **Telegram Account** — Link/unlink Telegram for OTP verification
4. **Language** — Switch language (Uzbek / Russian / English)
5. **Theme** — Light / Dark mode toggle
6. **Privacy** — Data export, account deletion request
7. **About** — App version, terms of service, privacy policy links

```bash
git add .
git commit -m "Step 5.5: Build Settings Screen with Telegram linking"
git push origin main
```

### Step 5.6: Implement Internationalization (i18n)

```bash
npm install i18next react-i18next expo-localization
```

Create translation files:
```
src/locales/
├── en.json
├── uz.json
└── ru.json
```

```bash
git add .
git commit -m "Step 5.6: Add internationalization (Uzbek, Russian, English)"
git push origin main
```

> **Checkpoint:** AI symptom checker returns doctor recommendations. PDF/Excel reports generate correctly. Analytics endpoints return trend data. Settings screen allows language switch, Telegram linking, and notification preferences.

---

## Sprint 6 — Testing, Security & Deployment (Weeks 8–9)

### Step 6.1: Write Unit Tests

Frontend (Jest + React Native Testing Library):
```bash
npm install -D jest @testing-library/react-native @testing-library/jest-native
```

Test files:
```
__tests__/
├── components/
│   ├── DoctorCard.test.tsx
│   ├── AppointmentCard.test.tsx
│   └── SearchBar.test.tsx
├── hooks/
│   ├── useAuth.test.ts
│   └── useDoctors.test.ts
├── store/
│   ├── authStore.test.ts
│   └── appointmentStore.test.ts
└── utils/
    ├── formatters.test.ts
    └── validators.test.ts
```

Backend (Jest + Supertest):
```
test/
├── auth.e2e-spec.ts
├── doctors.e2e-spec.ts
├── appointments.e2e-spec.ts
└── reports.e2e-spec.ts
```

```bash
git add .
git commit -m "Step 6.1: Write unit tests for frontend and backend"
git push origin main
```

### Step 6.2: Write Integration Tests

Test complete flows:
- Register → Receive Telegram OTP → Verify → Login → Search → Book → Confirm → Review
- Rate limiting blocks excessive login and OTP attempts
- Role guards prevent unauthorized access
- Transaction rollback on booking failure

```bash
git add .
git commit -m "Step 6.2: Write integration tests for complete user flows"
git push origin main
```

### Step 6.3: Write End-to-End Tests

Using Detox or Maestro:
```yaml
# maestro/booking-flow.yaml
- launchApp
- tapOn: "Search"
- tapOn: "Cardiologist"
- tapOn: "Book Now"
- tapOn: "25"           # calendar date
- tapOn: "10:30 AM"     # time slot
- inputText:
    id: "reason-input"
    text: "Chest pain"
- tapOn: "Confirm Appointment"
- assertVisible: "Appointment Confirmed"
```

```bash
git add .
git commit -m "Step 6.3: Write E2E tests with Maestro for critical flows"
git push origin main
```

### Step 6.4: Implement Security Hardening

1. **Request logging** — Log all API requests with timestamp, IP, user, endpoint
2. **Anomaly detection** — Flag unusual patterns (rapid requests, multiple failed logins)
3. **IP throttling** — Block IPs with excessive failed attempts
4. **Input sanitization** — Prevent XSS and SQL injection
5. **CORS configuration** — Whitelist allowed origins
6. **Helmet** — Set secure HTTP headers

```bash
cd navbatuz-api
npm install helmet
```

```bash
cd ..
git add .
git commit -m "Step 6.4: Implement security hardening (helmet, CORS, logging)"
git push origin main
```

### Step 6.5: Set Up CI/CD Pipeline

Create `.github/workflows/ci.yml`:

```yaml
name: NavbatUz CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: navbatuz_test
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports: ["5432:5432"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: cd navbatuz-api && npm ci
      - run: cd navbatuz-api && npx prisma migrate deploy
      - run: cd navbatuz-api && npm run lint
      - run: cd navbatuz-api && npm test
      - run: cd navbatuz-api && npm run test:e2e

  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm test

  build-mobile:
    needs: [backend-test, frontend-test]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: npm ci
      - run: eas build --platform all --profile production --non-interactive
```

```bash
git add .
git commit -m "Step 6.5: Set up CI/CD pipeline with GitHub Actions"
git push origin main
```

### Step 6.6: Deploy Backend to Cloud

1. **Provision server** (AWS EC2 or DigitalOcean Droplet)
2. Install Node.js 20, PostgreSQL 15, Nginx, PM2
3. Clone repo, install dependencies, run migrations
4. Configure Nginx as reverse proxy:
   ```nginx
   server {
       listen 443 ssl;
       server_name api.navbatuz.uz;

       ssl_certificate /etc/letsencrypt/live/api.navbatuz.uz/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/api.navbatuz.uz/privkey.pem;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```
5. Start with PM2: `pm2 start dist/main.js --name navbatuz-api`
6. SSL via Let's Encrypt: `certbot --nginx -d api.navbatuz.uz`
7. Set `TELEGRAM_BOT_TOKEN` in production environment variables

```bash
git add .
git commit -m "Step 6.6: Add deployment configuration files"
git push origin main
```

### Step 6.7: Deploy Mobile App

```bash
# Configure EAS
eas build:configure

# Build production APK/IPA
eas build --platform android --profile production
eas build --platform ios --profile production

# Submit to stores
eas submit --platform android
eas submit --platform ios
```

App Store requirements:
- App icon (1024×1024)
- Screenshots (6.5", 5.5" for iOS; phone + tablet for Android)
- Description in Uzbek + English
- Privacy policy URL
- Data safety form (Google Play)

```bash
git add .
git commit -m "Step 6.7: Configure EAS build profiles for production"
git push origin main
```

### Step 6.8: Set Up Monitoring

1. **Sentry** — Crash & error tracking
   ```bash
   npx expo install sentry-expo
   ```
2. **Firebase Analytics** — User behavior, screen views, events
3. **PM2 monitoring** — Backend process health
4. **Uptime monitoring** — External health check on API endpoint

```bash
git add .
git commit -m "Step 6.8: Set up Sentry monitoring and Firebase Analytics"
git push origin main
```

> **Checkpoint:** All tests pass. CI/CD pipeline runs on push. Backend deployed with SSL. Mobile app builds generated. Monitoring dashboards active.

---

## Post-Launch Checklist

- [ ] Seed database with sample doctors for demo
- [ ] User acceptance testing with real users
- [ ] Performance profiling (Flipper for RN, clinic.js for Node)
- [ ] Load testing backend (k6 or Artillery)
- [ ] Set up database backups (daily automated)
- [ ] Documentation: API docs via Swagger, README for both repos
- [ ] Gather feedback and plan Sprint 7 improvements

```bash
git add .
git commit -m "Post-launch: Add seed data and documentation"
git push origin main
```

---

## Summary Timeline

| Sprint | Focus | Duration | Commits |
|--------|-------|----------|---------|
| Sprint 1 | Planning, project setup, design system | Week 1 | 5 commits |
| Sprint 2 | Authentication, Telegram OTP, backend core, security | Weeks 2–3 | 11 commits |
| Sprint 3 | Doctor search, booking flow, ACID transactions | Weeks 3–4 | 6 commits |
| Sprint 4 | Dashboard, notifications, profile, CRUD | Weeks 5–6 | 6 commits |
| Sprint 5 | AI features, reporting, analytics, settings | Weeks 6–7 | 6 commits |
| Sprint 6 | Testing, CI/CD, deployment, monitoring | Weeks 8–9 | 8 commits |

**Total estimated time: ~9 weeks to production-ready app.**
**Total commits: ~42+ structured commits with clear history.**
