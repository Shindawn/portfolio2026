# LGU District Water Billing & Utility Management System

**Client:** Municipality of Bagamanoc (Local Government Unit, Philippines)  
**Role:** Lead Systems Architect & Full-Stack Developer  
**Stack:** Next.js 16 (App Router), TypeScript, PostgreSQL, Prisma ORM, Mobile Field Sync  
**Status:** Live Production  

---

## Overview

The LGU District Water System is a municipal utility billing platform engineered for the Municipality of Bagamanoc. It replaced manual paper-based reading and ledger processes with an automated system covering consumer lifecycle management, offline Android meter sync, tiered volumetric billing, and cashier audit reconciliation.

---

## Key Problems Solved

1. **Slow Billing Cycles:** Meter readers recorded readings on paper logs, leading to transcription errors and multi-week billing delays.
2. **Revenue Leakage:** Lack of centralized ledger tracking made it difficult to monitor delinquent accounts, apply accurate penalty rules, or track collections.
3. **Audit Discrepancies:** Manual receipt issuance created discrepancies during cash reconciliation for Commission on Audit (COA) reviews.
4. **Lack of Citizen Access:** Consumers had to physically visit the municipal hall just to check balances or verify billing statements.

---

## System Architecture & Modules

### 1. Customer & Account Management
- Application-to-meter-activation lifecycle tracking.
- Hierarchical account structure organized by Barangay, Purok, and Reading Route.
- Automated delinquency flagging and disconnection dispatch.

### 2. Mobile Meter Reading & Batch Sync
- Offline-capable Android batch synchronization for rural routes with spotty connectivity.
- Pre-billing anomaly detection (flagging zero consumption, high-consumption spikes, and dial rollbacks).
- Live admin telemetry for route completion and upload monitoring.

### 3. Stepped Tariff & Billing Engine
- Fixed-point `Decimal(14, 2)` calculations to prevent IEEE-754 floating-point drift.
- Multi-tier progressive rate calculation (minimum charge base + stepped volumetric tiers).
- Automated due date rules, grace periods, and late surcharges.

### 4. Cashiering & Audit Trail
- Official Receipt (OR) series validation and real-time payment posting.
- FIFO ledger allocation across arrears, penalties, and current consumption.
- One-click daily Cashier Accountability Register balancing physical drawers against issued receipt series.
- Immutable audit logging tracking all record mutations.

### 5. Citizen Billing Inquiry
- Public self-service portal for balance and statement checks.
- Rate-limited search endpoints to protect against scraping and brute-force queries.

---

## Results

- **Billing Turnaround:** Reduced from 2–3 weeks of manual processing to instantaneous batch calculation.
- **Accuracy:** Zero rounding drift with fixed-point decimal arithmetic.
- **Reconciliation:** Cashier reconciliation reports generated instantly vs. hours of manual balancing.
- **Field Operations:** Real-time route telemetry and sync across municipal reading zones.
