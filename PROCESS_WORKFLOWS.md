# Nizamia Apparel - Complete Operational Workflow (A-Z)

This guide provides a step-by-step walkthrough of the entire system, from initial setup to order fulfillment.

---

## Phase 1: Prerequisites (Master Data)
Before creating any orders, ensure your core data is ready.

1.  **Create Buyers & Suppliers**: 
    - Navigate to **Maintenance/Setup**.
    - Add your **Buyers** (Customer details).
    - Add **Suppliers** (Venders for Fabric, Trims, etc.).
2.  **Master BOM Setup**: 
    - Define common items in the **Master BOM** to allow quick selection in the Order Modal via the "Brand Library".

---

## Phase 2: Commercial Order Entry
The "New Order" modal is a 9-step guided workflow. Below is the granular "What, How, When" for each stage.

### Managing Orders (The Dashboard)
- **Purchase Orders Tab**: The default view. Shows all active orders.
- **Search & Filter**: Use the toolbar to find styles by Job Number or Style No.
- **Duplicate**: Select an order checkbox and click "Duplicate" to template a new order from an existing one.

### Detailed Tab Guide

| Tab | What to do? | How to do it? | Key Action Button |
| :--- | :--- | :--- | :--- |
| **1. General Info** | Define the PO basics, Buyer, Style No, and size breakdown. | select Buyer, enter Style Image, and define **Size Groups**. | Click **Continue** |
| **2. BOM** | List all materials (Fabric, Lining, Trims, Thread). | select items from **Brand Library** or type manually. Set consumption per size/color. | **Release BOM for Costing** |
| **3. Sampling** | Plan development samples (Proto, Fit, PP). | Click **Add Sample**, select type, and click **Generate Plan & Pull Data** (from BOM). | **Print Check Sheet** |
| **4. Fitting** | Manage tech packs and measurement specs. | Click **Add Spec Sheet**, enter details, and upload PDF/Excel spec files. | **Assign to Size Range** |
| **5. Washing** | Define the laundry recipe for the garment. | Select a **Color** on the left, upload a reference image, and type the recipe notes. | Toggle **Buyer Approval** |
| **6. Embellishment** | Manage Prints, Embroidery, or Appliques. | Click **Add**, upload Artwork ID/Image, and click **Configure Dims** to set size-specific dimensions. | Toggle **Lab Test Required** |
| **7. Finishing** | Create Packing Models and Carton instructions. | Use the **Allocation Wizard** to assign order quantities to specific packing instructions. | **Add Packing Model** |
| **8. Finalize** | Perform a final review of all data. | Scroll through the summary view to ensure no "Skipped" stages have missing critical data. | **Confirm & Release PO** |

> [!TIP]
> **Empty Color Selection?** If you (or the user) see no options in the **Variant / Color** select on the Sampling tab, it means no colors were defined in the **General Info** tab. Simply click **Previous** to go back to the first tab, add your colors, and then return to Sampling.

> [!TIP]
> **Skipping Stages**: If a stage (like Washing) is not applicable, use the **Skip this stage** button in the footer. This ensures the technical reports look professional by omitting empty sections.

---

## Phase 3: Production Job Definition
Once a PO is released, it must be grouped into a "Job" for the factory floor.

1.  **Navigate to Production Jobs**: Click the "Production Jobs" tab on the main dashboard.
2.  **Create New Job**: Link one or more POs to a single Job ID (e.g., grouping different colors of the same style).
3.  **Define Production Job**: Set the target factory, line allocation, and production start/end dates.
4.  **Finalize Job**: Once confirmed, click **Finalize Job**. This locks the job and creates the **Planning Console**.

---

## Phase 4: Operational Planning (The Console)
The **Planning Console** is the "Heart" of the operations. It contains 10 plan modules that must be executed in sequence:

1.  **Fabric Plan**: Calculate total fabric requirement + wastage. Issue to Sourcing.
2.  **Trims Plan**: Aggregate buttons, zips, labels.
3.  **Lab Test Plan**: Track wash/shrinkage/rejection testing.
4.  **Cutting Plan**: Issue "Cutting Orders" based on the size breakdown.
5.  **Embellishment Plan**: Schedule printing/embroidery batches.
6.  **Process Route**: Define the factory floor path (Cutting -> Printing -> Stitching).
7.  **Stitching Plan**: Line allocation and Daily Output targets.
8.  **Washing Plan**: Laundry batch scheduling.
9.  **Finishing Plan**: Thread trimming, ironing, and final inspect scheduling.
10. **Sampling Plan**: Track the status of active development samples.

---

## Phase 5: Sourcing & Execution
1.  **Purchasing**: 
    - Issued plans flow into the **Purchasing Dashboard**.
    - Click **New Supplier PO** to generate official purchase orders to vendors.
2.  **Production Logging**: 
    - Operators log daily output (Pcs) against each plan stage.
    - View live **KPIs** (Red/Green) on the main dashboard to see if production is on track.

---

## Phase 6: Closure & Shipping
1.  **Export & Logistics**: 
    - Once packing is done (Finishing stage), create **Parcels**.
    - Use the **Send Parcel** quick action from the dashboard to track shipments.
2.  **Close PO**: Mark the order as "Shipped" to move it to historical records.

---

## Known Limitations & Placeholders
- **New Dev Sample**: Currently a placeholder button. For development samples, please use the **Sampling Tab** within a Standard Order for better tracking against a Style Number.
- **New Costing**: Opens the Costing Sheet Generator. Use this to aggregate BOM data and add overheads for customer pricing.
