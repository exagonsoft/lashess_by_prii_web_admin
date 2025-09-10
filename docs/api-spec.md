# Lashess By Prii – Admin/API Spec (Draft)

Source of truth pending review of the mobile app repo. This spec proposes resource-oriented endpoints that the Admin and App can share. All JSON, UTC ISO8601 times.

Base URL: /api/v1

Auth
- POST /auth/login: { email, password } -> { token }
- POST /auth/logout
- GET /auth/me -> { id, email, role }

Services
- GET /services -> Service[]
- POST /services -> Service
- GET /services/:id -> Service
- PUT /services/:id -> Service
- DELETE /services/:id -> { ok }

Service
```
{
  id: string,
  name: string,
  price: number,
  durationMin: number,
  active: boolean
}
```

Bookings
- GET /bookings?from=ISO&to=ISO&status=pending|confirmed|done|cancelled -> Booking[]
- POST /bookings -> Booking
- GET /bookings/:id -> Booking
- PUT /bookings/:id -> Booking
- DELETE /bookings/:id -> { ok }

Booking
```
{
  id: string,
  clientId: string,
  serviceId: string,
  staffId?: string,
  startsAt: string, // ISO
  endsAt: string,   // ISO
  status: 'pending'|'confirmed'|'done'|'cancelled',
  notes?: string,
  priceCents?: number,
}
```

Clients
- GET /clients?q= -> Client[]
- POST /clients -> Client
- GET /clients/:id -> Client
- PUT /clients/:id -> Client
- DELETE /clients/:id -> { ok }

Client
```
{
  id: string,
  name: string,
  phone?: string,
  email?: string,
  instagram?: string,
  createdAt: string
}
```

Staff
- GET /staff -> Staff[]
- POST /staff -> Staff
- GET /staff/:id -> Staff
- PUT /staff/:id -> Staff
- DELETE /staff/:id -> { ok }

Staff
```
{
  id: string,
  name: string,
  role: 'owner'|'artist'|'assistant',
  active: boolean
}
```

Time Slots (optional, for availability)
- GET /availability?from=ISO&to=ISO&staffId= -> Slot[]
```
{ start: string, end: string, staffId?: string }
```

Payments (optional)
- POST /payments/intent -> { clientSecret }
- POST /payments/webhook (server-to-server)

Notifications (optional)
- POST /notifications/booking-confirmed -> { ok }

Notes
- Finalize after analyzing lashess_by_prii_app API calls.
- If the app uses Firebase, Admin can read/write Firestore; If server endpoints are preferred, map these to DB operations.

