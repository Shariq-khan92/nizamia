
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MainOrdersDashboard } from './components/MainOrdersDashboard';
import { PlanningDashboard } from './components/PlanningDashboard';
import { CostingDashboard } from './components/CostingDashboard';
import { SamplingDashboard } from './components/SamplingDashboard';
import { PurchasingDashboard } from './components/PurchasingDashboard';
import { SettingsDashboard } from './components/SettingsDashboard';
import { BuyersDashboard } from './components/BuyersDashboard';
import { SuppliersDashboard } from './components/SuppliersDashboard';
import { BOMManagerDashboard } from './components/BOMManagerDashboard';
import { AIAssistant } from './components/AIAssistant';
import { NewOrderModal } from './components/NewOrderModal';
import { OrderSummaryView } from './components/OrderSummaryView';
import { ProductionFlowDashboard } from './components/ProductionFlowDashboard';
import { IntegratedFinanceDashboard } from './components/IntegratedFinanceDashboard';
import { ExportLogisticsController } from './components/ExportLogisticsController';
import {
  ResourcesDashboard,
  ConsumptionCalculatorModal,
  CBMCalculatorModal,
  ThreadConsumptionModal,
  FabricGSMModal,
  PantoneConverterModal
} from './components/ResourcesDashboard';
import { CatalogueMaker } from './components/CatalogueMaker';
import { CostingSheetGenerator } from './components/CostingSheetGenerator';
import { EventsDashboard } from './components/EventsDashboard';
import { TopBar } from './components/TopBar';
import { Login } from './components/Login';
import { Tab, Buyer, Supplier, Order, NewOrderState, SystemUser, JobBatch, ExportInvoice, MasterBOMItem, DevelopmentSample, CalendarEvent, CompanyDetails, IssuedPurchaseOrder, MonthlyTarget, FittingData, Parcel, BOMPreset, IssuedWorkOrder, BuyingAgency } from './types';
import { api } from './services/api';

const mapUserToSystemUser = (data: any): SystemUser => ({
  id: data?._id || data?.id || 'local-user',
  name: data?.name || 'User',
  username: data?.username || '',
  role: data?.role || 'User',
  lastActive: new Date().toISOString(),
});

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);

  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [agencies, setAgencies] = useState<BuyingAgency[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch all data on load
  useEffect(() => {
    if (isAuthenticated) {
      api.getOrders().then(setOrders).catch(console.error);
      api.getUsers().then((u: any[]) => setUsers(u.map(mapUserToSystemUser))).catch(console.error);
      api.getSuppliers().then(setSuppliers).catch(console.error);
      api.getBuyers().then(setBuyers).catch(console.error);
      api.getAgencies().then(setAgencies).catch(console.error);
      api.getMasterBOMItems().then(setMasterBOMItems).catch(console.error);
      api.getBOMPresets().then(setBomPresets).catch(console.error);
    }
  }, [isAuthenticated]);

  // Fetch static settings/configuration data from API
  useEffect(() => {
    api.getMonthlyTargets().then(setMonthlyTargets).catch(console.error);

    api.getSalesTerms()
      .then((terms: any[]) => {
        const defaultTerms = terms.find((t) => t.isDefault);
        if (defaultTerms) {
          setCompanyDetails((prev) => ({ ...prev, salesTerms: defaultTerms.content || '' }));
        }
      })
      .catch(console.error);

    api.getPOTerms()
      .then((terms: any[]) => {
        const defaultTerms = terms.find((t) => t.isDefault);
        if (defaultTerms) {
          setCompanyDetails((prev) => ({ ...prev, poTerms: defaultTerms.content || '' }));
        }
      })
      .catch(console.error);

    api.getSettings()
      .then((settings: any) => {
        if (!settings) return;
        if (typeof settings.taxRate === 'number') setTaxRate(settings.taxRate);
        if (typeof settings.cottonRate === 'number') setCottonRate(settings.cottonRate);
        if (settings.currencyRates) {
          try {
            const parsed = JSON.parse(settings.currencyRates);
            setCurrencyRates({
              USD: parsed.USD || 0,
              EUR: parsed.EUR || 0,
              GBP: parsed.GBP || 0,
              lastUpdated: settings.updatedAt || new Date().toISOString(),
            });
          } catch (e) {
            console.error('Failed to parse currency rates', e);
          }
        }
      })
      .catch(console.error);

    api.getLocations()
      .then((locations: any[]) => {
        setEnabledCities(locations.map((l) => l.name));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUsers([mapUserToSystemUser(parsed)]);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to parse stored user', err);
      }
    }
  }, []);
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [jobs, setJobs] = useState<JobBatch[]>([]);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [masterBOMItems, setMasterBOMItems] = useState<MasterBOMItem[]>([]);
  const [bomPresets, setBomPresets] = useState<BOMPreset[]>([]);
  const [developmentSamples, setDevelopmentSamples] = useState<DevelopmentSample[]>([]);
  const [issuedPOs, setIssuedPOs] = useState<IssuedPurchaseOrder[]>([]);
  const [issuedWorkOrders, setIssuedWorkOrders] = useState<IssuedWorkOrder[]>([]);
  const [monthlyTargets, setMonthlyTargets] = useState<MonthlyTarget[]>([]);
  const [parcels, setParcels] = useState<Parcel[]>([]);

  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    name: 'Nizamia',
    address: 'Plot# RCC14, Shed Nr 02, Estate Avenue Road, SITE Area, Karachi 75700, Pakistan',
    phone: '+92 21 32564717',
    website: 'www.nizamia.com',
    logoUrl: null,
    salesTerms: '',
    poTerms: ''
  });

  const [customEvents, setCustomEvents] = useState<CalendarEvent[]>([]);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const [exportInvoices, setExportInvoices] = useState<ExportInvoice[]>([]);

  const [currencyRates, setCurrencyRates] = useState({
    USD: 0,
    EUR: 0,
    GBP: 0,
    lastUpdated: ''
  });
  const [cottonRate, setCottonRate] = useState<number>(0);
  const [enabledCities, setEnabledCities] = useState<string[]>([]);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [editingOrderData, setEditingOrderData] = useState<NewOrderState | null>(null);
  const [summaryData, setSummaryData] = useState<NewOrderState | null>(null);

  const [activeJobForConsole, setActiveJobForConsole] = useState<JobBatch | null>(null);

  const mapOrderToDeepState = (order: Order): NewOrderState => {
    let fittingData: FittingData[] = [];
    if (Array.isArray(order.fitting)) {
      fittingData = order.fitting;
    } else if (order.fitting) {
      fittingData = [{ ...(order.fitting as any), id: 'legacy-fit' }];
    }

    return {
      generalInfo: {
        formData: {
          jobNumber: order.orderID || '',
          buyerName: order.buyer || '',
          merchandiserName: order.merchandiserName || '',
          factoryRef: order.factoryRef || '',
          styleNumber: order.styleNo || '',
          productID: order.id || '',
          poNumber: order.poNumber || '',
          poDate: order.poDate || '',
          shipDate: order.deliveryDate || '',
          plannedDate: order.plannedDate || '',
          shipMode: order.shipMode || 'Sea',
          description: order.styleDescription || '',
          incoterms: order.incoterms || '',
        },
        styleImage: order.imageUrl || null,
        colors: order.colors || [],
        sizeGroups: order.sizeGroups || []
      },
      fitting: fittingData,
      sampling: order.samplingDetails || [],
      embellishments: order.embellishments || [],
      washing: order.washing || {},
      finishing: order.finishing || {
        finalInspectionStatus: 'Pending',
        packingList: []
      },
      criticalPath: order.criticalPath || {
        capacity: {
          totalOrderQty: order.quantity,
          fabricLeadTime: 0,
          trimsLeadTime: 0,
          cuttingOutput: 0,
          sewingLines: 0,
          sewingOutputPerLine: 0,
          finishingOutput: 0,
        },
        schedule: []
      },
      bom: order.bom || [],
      bomStatus: order.bomStatus || 'Draft',
      planningNotes: order.planningNotes || '',
      skippedStages: order.skippedStages || []
    };
  };

  const handleCreateOrder = () => {
    setEditingOrderData(null);
    setIsOrderModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrderData(mapOrderToDeepState(order));
    setIsOrderModalOpen(true);
  };

  const handleViewSummary = (order: Order) => {
    setSummaryData(mapOrderToDeepState(order));
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  const currentUser = users[0] || mapUserToSystemUser(null);

  const handleSaveOrder = async (newOrderState: NewOrderState, shouldClose: boolean = true) => {
    // Determine if it is a new order or update based on if we have a match in current list
    const existingOrder = orders.find(o => o.orderID === newOrderState.generalInfo.formData.jobNumber);
    const isNew = !existingOrder;

    let calculatedTotalQty = 0;
    let calculatedTotalAmt = 0;
    newOrderState.generalInfo.sizeGroups.forEach(group => {
      let groupQty = 0;
      Object.values(group.breakdown).forEach(colorRow => {
        Object.values(colorRow).forEach(qtyStr => {
          groupQty += (parseInt(qtyStr) || 0);
        });
      });
      calculatedTotalQty += groupQty;
      calculatedTotalAmt += groupQty * (parseFloat(group.unitPrice) || 0);
    });

    const finalPrice = calculatedTotalQty > 0 ? (calculatedTotalAmt / calculatedTotalQty) : 0;

    const orderPayload: Partial<Order> = {
      orderID: newOrderState.generalInfo.formData.jobNumber,
      poNumber: newOrderState.generalInfo.formData.poNumber,
      poDate: newOrderState.generalInfo.formData.poDate,
      styleNo: newOrderState.generalInfo.formData.styleNumber,
      buyer: newOrderState.generalInfo.formData.buyerName,
      merchandiserName: newOrderState.generalInfo.formData.merchandiserName,
      quantity: calculatedTotalQty,
      deliveryDate: newOrderState.generalInfo.formData.shipDate,
      plannedDate: newOrderState.generalInfo.formData.plannedDate,
      status: existingOrder?.status || 'Active',
      amount: calculatedTotalAmt,
      price: finalPrice,
      factoryRef: newOrderState.generalInfo.formData.factoryRef,
      styleName: newOrderState.generalInfo.formData.styleNumber,
      styleDescription: newOrderState.generalInfo.formData.description,
      fabricName: newOrderState.bom.find(i => i.processGroup === 'Fabric')?.componentName || 'TBD',
      fabricDescription: '',
      incoterms: newOrderState.generalInfo.formData.incoterms,
      shipMode: newOrderState.generalInfo.formData.shipMode,
      imageUrl: newOrderState.generalInfo.styleImage || undefined,
      colors: newOrderState.generalInfo.colors,
      sizeGroups: newOrderState.generalInfo.sizeGroups,
      bom: newOrderState.bom,
      samplingDetails: newOrderState.sampling,
      criticalPath: {
        ...newOrderState.criticalPath,
        capacity: {
          ...newOrderState.criticalPath.capacity,
          totalOrderQty: calculatedTotalQty
        }
      },
      washing: newOrderState.washing,
      finishing: newOrderState.finishing,
      fitting: newOrderState.fitting,
      embellishments: newOrderState.embellishments,
      bomStatus: newOrderState.bomStatus || 'Draft',
      planningNotes: newOrderState.planningNotes,
      skippedStages: newOrderState.skippedStages,
      createdBy: existingOrder?.createdBy || currentUser.name
    };

    try {
      let savedOrder: Order;
      if (isNew) {
        savedOrder = await api.createOrder(orderPayload);
        setOrders([savedOrder, ...orders]);
      } else {
        if (existingOrder && existingOrder.id) {
          savedOrder = await api.updateOrder(existingOrder.id, orderPayload);
          setOrders(orders.map(o => o.id === savedOrder.id ? savedOrder : o));
        }
      }

      if (shouldClose) {
        setIsOrderModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to save order:", error);
      alert("Failed to save order. Please check console.");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    const orderToDelete = orders.find(o => o.orderID === orderId);
    if (orderToDelete && orderToDelete.id) {
      try {
        await api.deleteOrder(orderToDelete.id);
        setOrders(orders.filter(o => o.orderID !== orderId));
        setIsOrderModalOpen(false);
      } catch (error) {
        console.error("Failed to delete order", error);
        alert("Failed to delete order");
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const handleOpenTool = (toolId: string) => {
    if (toolId === 'parcel-dispatch') {
      setActiveTab(Tab.PLANNING);
      return;
    }
    setActiveTool(toolId);
  };

  if (!isAuthenticated) {
    return <Login onLogin={(user) => {
      setUsers([mapUserToSystemUser(user)]);
      setIsAuthenticated(true);
    }} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case Tab.DASHBOARD:
        return <Dashboard
          orders={orders}
          jobs={jobs}
          monthlyTargets={monthlyTargets}
          developmentSamples={developmentSamples}
          onNavigate={setActiveTab}
          onCreateOrder={handleCreateOrder}
          onNewCosting={() => setActiveTool('costing-generator')}
          onNewDevSample={() => setActiveTab(Tab.SAMPLING)}
          currentUser={currentUser}
          onOpenEvents={() => setIsEventsModalOpen(true)}
          onLogout={handleLogout}
        />;
      case Tab.ORDERS:
        return <MainOrdersDashboard
          orders={orders}
          jobs={jobs}
          buyers={buyers}
          companyDetails={companyDetails}
          onUpdateJobs={setJobs}
          onUpdateOrder={handleUpdateOrder}
          onCreateOrder={handleCreateOrder}
          onRowClick={(id) => {
            const order = orders.find(o => o.orderID === id);
            if (order) handleViewSummary(order);
          }}
          onBulkImport={(data) => {
            setOrders([...data.orders, ...orders]);
            setExportInvoices([...data.invoices, ...exportInvoices]);
          }}
        />;
      case Tab.PLANNING:
        return <PlanningDashboard
          jobs={jobs}
          onNavigate={setActiveTab}
          onUpdateJobs={setJobs}
          onManageJobPlans={(job) => setActiveJobForConsole(job)}
          developmentSamples={developmentSamples}
          onAddDevSample={(s) => setDevelopmentSamples(prev => [...prev, s])}
          onUpdateDevSample={(s) => setDevelopmentSamples(prev => prev.map(ds => ds.id === s.id ? s : ds))}
          parcels={parcels}
          onUpdateParcels={setParcels}
          availableBuyers={buyers}
          companyDetails={companyDetails}
          issuedWorkOrders={issuedWorkOrders}
          onUpdateWorkOrders={setIssuedWorkOrders}
        />;
      case Tab.COSTING:
        return <CostingDashboard />;
      case Tab.SAMPLING:
        return <SamplingDashboard
          jobs={jobs}
          onUpdateJob={(updatedJob) => setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j))}
          developmentSamples={developmentSamples}
          onAddDevSample={(s) => setDevelopmentSamples(prev => [...prev, s])}
          onUpdateDevSample={(s) => setDevelopmentSamples(prev => prev.map(ds => ds.id === s.id ? s : ds))}
          parcels={parcels}
          availableBuyers={buyers}
          companyDetails={companyDetails}
        />;
      case Tab.PURCHASING:
        return <PurchasingDashboard
          orders={orders}
          jobs={jobs}
          onUpdateJobs={setJobs}
          taxRate={taxRate}
          companyDetails={companyDetails}
          issuedPOs={issuedPOs}
          onUpdateIssuedPOs={setIssuedPOs}
        />;
      case Tab.PRODUCTION:
        return <ProductionFlowDashboard jobs={jobs} onUpdateJob={(j) => setJobs(prev => prev.map(job => job.id === j.id ? j : job))} />;
      case Tab.BUYERS:
        return <BuyersDashboard buyers={buyers} onAddBuyer={async (b) => {
          try {
            const saved = await api.createBuyer(b);
            setBuyers([...buyers, saved]);
          } catch (err) {
            console.error('Failed to create buyer:', err);
            setBuyers([...buyers, b]); // Fallback to local state
          }
        }} onDeleteBuyer={async (id) => {
          try {
            await api.deleteBuyer(id);
            setBuyers(buyers.filter(b => b.id !== id));
          } catch (err) {
            console.error('Failed to delete buyer:', err);
            setBuyers(buyers.filter(b => b.id !== id)); // Still remove from local state
          }
        }} agencies={agencies} onAddAgency={async (a) => {
          try {
            const saved = await api.createAgency(a);
            setAgencies([...agencies, saved]);
          } catch (err) {
            console.error('Failed to create agency:', err);
            setAgencies([...agencies, a]); // Fallback to local state
          }
        }} onDeleteAgency={async (id) => {
          try {
            await api.deleteAgency(id);
            setAgencies(agencies.filter(a => a.id !== id));
          } catch (err) {
            console.error('Failed to delete agency:', err);
            setAgencies(agencies.filter(a => a.id !== id)); // Still remove from local state
          }
        }} />;
      case Tab.SUPPLIERS:
        return <SuppliersDashboard suppliers={suppliers} onAddSupplier={async (s) => {
          try {
            const saved = await api.createSupplier(s);
            setSuppliers([...suppliers, saved]);
          } catch (err) {
            console.error('Failed to create supplier:', err);
            setSuppliers([...suppliers, s]); // Fallback to local state
          }
        }} onDeleteSupplier={async (id) => {
          try {
            await api.deleteSupplier(id);
            setSuppliers(suppliers.filter(s => s.id !== id));
          } catch (err) {
            console.error('Failed to delete supplier:', err);
            setSuppliers(suppliers.filter(s => s.id !== id)); // Still remove from local state
          }
        }} />;
      case Tab.BOM:
        return <BOMManagerDashboard
          masterItems={masterBOMItems}
          setMasterItems={setMasterBOMItems}
          onAddItem={async (item) => {
            const saved = await api.createMasterBOMItem(item);
            return saved;
          }}
          onUpdateItem={async (id, item) => {
            const updated = await api.updateMasterBOMItem(id, item);
            return updated;
          }}
          onDeleteItem={async (id) => {
            await api.deleteMasterBOMItem(id);
          }}
          bomPresets={bomPresets}
          setBomPresets={setBomPresets}
          onAddPreset={async (preset) => {
            const saved = await api.createBOMPreset(preset);
            return saved;
          }}
          onUpdatePreset={async (id, preset) => {
            const updated = await api.updateBOMPreset(id, preset);
            return updated;
          }}
          onDeletePreset={async (id) => {
            await api.deleteBOMPreset(id);
          }}
          buyers={buyers}
          suppliers={suppliers}
        />;
      case Tab.FINANCE:
        return <IntegratedFinanceDashboard currencyRates={currencyRates} exportInvoicesData={exportInvoices} />;
      case Tab.SHIPPING:
        return <ExportLogisticsController jobs={jobs} onUpdateJob={(j) => setJobs(prev => prev.map(job => job.id === j.id ? j : job))} />;
      case Tab.RESOURCES:
        return <ResourcesDashboard onOpenTool={handleToolClick} />;
      case Tab.SETTINGS:
        return <SettingsDashboard
          taxRate={taxRate}
          onUpdateTaxRate={setTaxRate}
          currencyRates={currencyRates}
          onUpdateCurrencyRates={setCurrencyRates}
          cottonRate={cottonRate}
          onUpdateCottonRate={setCottonRate}
          enabledCities={enabledCities}
          onUpdateEnabledCities={setEnabledCities}
          companyDetails={companyDetails}
          onUpdateCompanyDetails={setCompanyDetails}
          monthlyTargets={monthlyTargets}
          onUpdateMonthlyTargets={setMonthlyTargets}
        />;
      default:
        return <div className="p-8 text-gray-500">Section under construction.</div>;
    }
  };

  const handleToolClick = (toolId: string) => {
    if (toolId === 'parcel-dispatch') {
      setActiveTab(Tab.PLANNING);
      return;
    }
    setActiveTool(toolId);
  };

  return (
    <div className="flex h-screen bg-[#F7F7F5] font-sans text-[#37352F] overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSummaryData(null);
        }}
        onOpenEvents={() => setIsEventsModalOpen(true)}
        onOpenTool={handleOpenTool}
        onLogout={handleLogout}
        companyLogo={companyDetails.logoUrl}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <TopBar
          currencyRates={currencyRates}
          cottonRate={cottonRate}
          enabledCities={enabledCities}
          onOpenAI={() => setIsAIOpen(true)}
        />

        <main className="flex-1 overflow-auto p-6 relative">
          {summaryData ? (
            <OrderSummaryView
              orderData={summaryData}
              onClose={() => setSummaryData(null)}
              onEdit={() => {
                setEditingOrderData(summaryData);
                setSummaryData(null);
                setIsOrderModalOpen(true);
              }}
            />
          ) : (
            renderContent()
          )}
        </main>
      </div>

      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

      {isOrderModalOpen && (
        <NewOrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          onSave={handleSaveOrder}
          onDelete={handleDeleteOrder}
          initialData={editingOrderData}
          availableBuyers={buyers}
          availableSuppliers={suppliers}
          masterBOMItems={masterBOMItems}
          bomPresets={bomPresets}
          currentUser={currentUser}
        />
      )}

      {activeJobForConsole && (
        <div className="fixed inset-0 z-[150] flex items-col bg-white overflow-hidden animate-in slide-in-from-right-4 duration-300">
          <MainOrdersDashboard
            orders={orders}
            jobs={jobs}
            buyers={buyers}
            companyDetails={companyDetails}
            onUpdateJobs={setJobs}
            onCreateOrder={handleCreateOrder}
            onRowClick={(id) => { }}
            onBulkImport={() => { }}
          />
          <button
            onClick={() => setActiveJobForConsole(null)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-indigo-600 text-white rounded-full shadow-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all"
          >
            <ArrowLeft size={16} /> Return to Planning
          </button>
        </div>
      )}

      {isEventsModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
            <EventsDashboard
              orders={orders}
              jobs={jobs}
              customEvents={customEvents}
              onUpdateCustomEvents={setCustomEvents}
              onClose={() => setIsEventsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {activeTool === 'costing-generator' && (
        <div className="fixed inset-0 z-[150] bg-white flex flex-col">
          <CostingSheetGenerator onBack={() => setActiveTool(null)} />
        </div>
      )}

      {activeTool === 'catalogue-maker' && (
        <CatalogueMaker onClose={() => setActiveTool(null)} />
      )}

      {activeTool === 'fabric-consumption' && <ConsumptionCalculatorModal onClose={() => setActiveTool(null)} />}
      {/* Fix: Use correct state setter setActiveTool instead of undefined variable setActiveCalculator */}
      {activeTool === 'cbm' && <CBMCalculatorModal onClose={() => setActiveTool(null)} />}
      {activeTool === 'sewing-thread' && <ThreadConsumptionModal onClose={() => setActiveTool(null)} />}
      {activeTool === 'gsm' && <FabricGSMModal onClose={() => setActiveTool(null)} />}
      {activeTool === 'pantone-converter' && <PantoneConverterModal onClose={() => setActiveTool(null)} />}

    </div>
  );
};
