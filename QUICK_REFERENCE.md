# QUICK REFERENCE CARD - STATIC DATA MIGRATION

## 📋 WHAT'S STATIC (TO REMOVE)

```
App.tsx:
  ❌ INITIAL_USERS
  ❌ INITIAL_MONTHLY_TARGETS
  ❌ DEFAULT_SALES_TERMS
  ❌ DEFAULT_PO_TERMS
  ❌ enabledCities: ['London', 'New York', 'Dubai']

SettingsDashboard.tsx:
  ❌ INITIAL_USERS
  ❌ AVAILABLE_CITIES: [9 cities]

ResourcesDashboard.tsx:
  ❌ THREAD_OPERATIONS: [23 operations]
  ❌ MACHINE_FACTORS: [7 machines]
  ❌ GARMENT_TEMPLATES: [4 templates]

ProductionFlowDashboard.tsx:
  ❌ productionLines: ['Line 1', 'Line 2', 'Line 3']

FinishingTab.tsx:
  ❌ INITIAL_INSTRUCTION

ProcessPlanGenerator.tsx:
  ❌ DEFAULT_STEPS
```

## ✅ WHAT'S STATIC (KEEP AS IS)

```
constants.ts:
  ✅ LOGO_URL - Frontend UI only
  ✅ NAV_ITEMS - Frontend UI only
  ✅ PRODUCTION_TOOLS - Frontend UI only
  ✅ formatAppDate - Utility function
  ✅ parseCSVDate - Utility function
```

---

## 🗄️ NEW DATABASE TABLES

| Table | Rows | Purpose |
|-------|------|---------|
| CompanySettings | 1 | Tax rate, cotton rate, currency |
| SalesTerms | 1+ | Contract terms templates |
| POTerms | 1+ | Purchase order templates |
| Location | 9 | Export destinations |
| ThreadOperation | 23 | Sewing operations by category |
| MachineFactor | 7 | Thread consumption factors |
| GarmentTemplate | 4 | Jeans, Jacket, Shirt, Hoodie |
| GarmentTemplateStep | 30 | Steps for each template |
| ProductionLine | 3 | Line 1, 2, 3 |
| MonthlyTarget | 12 | Sales/volume targets per month |
| PackingInstruction | 1 | Default packing instructions |
| ProcessStep | 8 | Production process steps |

**Total: 12 tables, 200+ records**

---

## 🔌 NEW API ENDPOINTS

```
GET /api/settings/settings           → CompanySettings
GET /api/settings/locations          → Location[]
GET /api/settings/sales-terms        → SalesTerms[]
GET /api/settings/po-terms          → POTerms[]
GET /api/settings/thread-operations → ThreadOperation[]
GET /api/settings/machine-factors   → MachineFactor[]
GET /api/settings/garment-templates → GarmentTemplate[] (with steps)
GET /api/settings/production-lines  → ProductionLine[]
GET /api/settings/monthly-targets   → MonthlyTarget[]
GET /api/settings/packing-instructions → PackingInstruction[]
GET /api/settings/process-steps     → ProcessStep[]
```

---

## 📝 PRISMA MODELS

```prisma
model CompanySettings { ... }
model SalesTerms { ... }
model POTerms { ... }
model MonthlyTarget { ... }
model Location { ... }
model ThreadOperation { ... }
model MachineFactor { ... }
model GarmentTemplate { ... }
model GarmentTemplateStep { ... }
model ProductionLine { ... }
model PackingInstruction { ... }
model ProcessStep { ... }
```

---

## ⚡ QUICK START COMMANDS

```bash
# 1. Update schema
cp PRISMA_SCHEMA_ADDITIONS.prisma -> server/prisma/schema.prisma

# 2. Create migration
cd server
npx prisma migrate dev --name add_static_data_tables

# 3. Seed database
psql -U postgres -h localhost -d nizamia_db -f ../seed-static-data.sql

# 4. Verify
SELECT COUNT(*) FROM "Location";
SELECT COUNT(*) FROM "MachineFactor";
```

---

## 🎯 IMPLEMENTATION ORDER

1. ✅ Add models to schema.prisma
2. ✅ Run Prisma migration
3. ✅ Execute SQL seed file
4. ✅ Create settings controller
5. ✅ Create settings routes
6. ✅ Update API service
7. ✅ Update App.tsx (fetch data)
8. ✅ Update ResourcesDashboard
9. ✅ Update SettingsDashboard
10. ✅ Remove static data definitions

---

## 📊 DATA SUMMARY

**Sales Terms**: 1 default (long terms text)
**PO Terms**: 1 default (short terms text)
**Locations**: 9 export destinations
**Monthly Targets**: 12 months (2026)
**Thread Operations**: 23 operations (7 Tops, 11 Bottoms, 5 Universal)
**Machine Factors**: 7 types (Lockstitch:2.5, Overlock:3.5, etc)
**Garment Templates**: 4 types (Jeans, Jacket, Shirt, Hoodie)
**Template Steps**: 30 total (10 per Jeans, 7 Jacket, 7 Shirt, 6 Hoodie)
**Production Lines**: 3 lines (Line 1, 2, 3)
**Company Settings**: Tax 18%, Cotton ₨150, Currencies USD/EUR/GBP
**Packing Instructions**: 1 default
**Process Steps**: 8 steps (Inspection → Cutting → Dyeing → Embellishment → Stitching → Finishing → QC → Packing)

---

## 🔍 VERIFICATION QUERIES

```sql
-- Check all tables created
\dt

-- Count records in each table
SELECT COUNT(*) FROM "Location";
SELECT COUNT(*) FROM "MachineFactor";
SELECT COUNT(*) FROM "GarmentTemplate";
SELECT COUNT(*) FROM "GarmentTemplateStep";
SELECT COUNT(*) FROM "ProductionLine";
SELECT COUNT(*) FROM "MonthlyTarget";
SELECT COUNT(*) FROM "ThreadOperation";
SELECT COUNT(*) FROM "ProcessStep";

-- View specific data
SELECT * FROM "Location" ORDER BY name;
SELECT * FROM "MachineFactor" ORDER BY "machineType";
SELECT gt.name, COUNT(gts.id) as steps 
FROM "GarmentTemplate" gt 
LEFT JOIN "GarmentTemplateStep" gts ON gt.id = gts."templateId"
GROUP BY gt.id;
```

---

## 🐛 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Schema validation error | Check Prisma syntax in additions file |
| Migration fails | Ensure database is running and empty |
| SQL import fails | Verify PostgreSQL and correct DB name |
| API 404 error | Check routes registered in index.js |
| No data in frontend | Verify API calls in useEffect hooks |
| Data not persisting | Check database connection string |

---

## 📚 DOCUMENTATION FILES

- `STATIC_DATA_ANALYSIS.md` - Detailed analysis (6KB)
- `IMPLEMENTATION_CHECKLIST.md` - Step-by-step guide (12KB)
- `README_DYNAMIC_MIGRATION.md` - Executive summary (8KB)
- `PRISMA_SCHEMA_ADDITIONS.prisma` - Database schema (4KB)
- `seed-static-data.sql` - SQL queries (11KB)
- `QUICK_REFERENCE.md` - This file

**Total: ~45KB of documentation**

---

## ✨ SUCCESS INDICATORS

After implementation, you should see:

✅ All API endpoints responding
✅ Zero hardcoded data in components
✅ Settings fetched from database
✅ Components rendering with real data
✅ Production lines from DB: Line 1, Line 2, Line 3
✅ Locations from DB: London, New York, Dubai, etc
✅ Garment templates: Jeans, Jacket, Shirt, Hoodie
✅ 12 monthly targets loaded
✅ No console errors
✅ Full project stability

---

## 🎓 KEY CONCEPTS

**Static Data** = Hardcoded in JavaScript/TypeScript
**Dynamic Data** = Stored in database and fetched via API
**Configuration** = Settings that rarely change (becomes static in DB)
**Business Data** = Records created/modified by users (Orders, Buyers, Suppliers)

This project had configuration data as hardcoded → Converting to dynamic

---

## 💡 TIPS

- Start with schema updates (easiest)
- Test each API endpoint individually
- Update one component at a time
- Keep old code commented until verified
- Test thoroughly before removing old static data
- Save git commits at each step
- Document any custom changes

---

## 🚀 TIMELINE ESTIMATE

| Phase | Time | Tasks |
|-------|------|-------|
| Planning | 10 min | Read docs, understand changes |
| Database | 20 min | Schema + migration + seeding |
| Backend | 45 min | Controllers, routes, service |
| Frontend | 30 min | Components, hooks, API calls |
| Testing | 15 min | Verification, debugging |
| Cleanup | 15 min | Remove static data |
| **TOTAL** | **135 min** | **~2.25 hours** |

---

## 📞 GETTING HELP

Refer to specific files:
- Schema questions → `PRISMA_SCHEMA_ADDITIONS.prisma`
- Implementation steps → `IMPLEMENTATION_CHECKLIST.md`
- SQL issues → `seed-static-data.sql`
- Overall picture → `README_DYNAMIC_MIGRATION.md`
- Detailed analysis → `STATIC_DATA_ANALYSIS.md`

---

## ✅ FINAL CHECKLIST

Before starting implementation:
- [ ] Read IMPLEMENTATION_CHECKLIST.md
- [ ] Backup your database
- [ ] Have PostgreSQL access ready
- [ ] Test environment available
- [ ] Git repository clean
- [ ] Node/npm dependencies installed

After implementation:
- [ ] All API endpoints tested
- [ ] Frontend components working
- [ ] No console errors
- [ ] Data persisting correctly
- [ ] Old static data removed
- [ ] Code committed to git
- [ ] Documentation updated

---

**Status**: Ready for Implementation ✅
**Complexity**: Medium (2-3 hours)
**Risk Level**: Low (backward compatible, no data loss)
**Dependencies**: PostgreSQL, Prisma, Express, React

Generated: January 22, 2026
Version: 1.0
