import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'en' | 'es';

const T = {
  en: {
    nav: {
      dashboard: 'Dashboard', clients: 'Clients', visits: 'Visits CRM',
      invoices: 'Invoices', cash: 'Cash', timelog: 'Time Log', logout: 'Logout',
    },
    common: {
      save: 'Save', cancel: 'Cancel', export: 'Export', loading: 'Loading...',
      edit: 'Edit', delete: 'Delete', close: 'Close', search: 'Search',
      noRecords: 'No records yet', actions: 'Actions', notes: 'Notes',
      date: 'Date', status: 'Status', total: 'Total', all: 'All',
    },
    dashboard: {
      title: 'Dashboard', collected: 'Collected (incl. VAT)', outstanding: 'Outstanding',
      cashBalance: 'Cash Balance', forecast: '30-Day Forecast',
      vatReport: 'VAT Report', outputVat: 'Output VAT (collected)',
      inputVat: 'Input VAT (expenses)', netVat: 'Net VAT payable',
      recentCash: 'Recent Cash Movements', noMovements: 'No movements yet',
      latestInvoices: 'Latest Invoices', noInvoices: 'No invoices yet',
      overdueInvoices: 'Overdue Invoices', daysOverdue: 'd overdue',
      allTime: 'All time', thisMonth: 'This month', lastMonth: 'Last month', thisYear: 'This year',
      resetData: 'Reset Test Data',
      resetConfirm: 'This will DELETE ALL data (clients, invoices, cash, visits, time logs) and reset invoice numbering to zero.\n\nThis action cannot be undone. Are you sure?',
      resetSuccess: 'All test data cleared successfully.',
    },
    clients: {
      title: 'Clients', newClient: 'New Client', editClient: 'Edit Client',
      name: 'Company name', contact: 'Contact person', email: 'Email',
      phone: 'Phone', country: 'Country', city: 'City', address: 'Address',
      vatNumber: 'VAT Number', type: 'Type', plan: 'Plan', mrr: 'MRR (€/mo)',
      noClients: 'No clients yet',
    },
    visits: {
      title: 'Visits CRM', newVisit: 'New Visit', editVisit: 'Edit Visit',
      venue: 'Venue / Company', city: 'City', contactPerson: 'Contact person',
      followUpDate: 'Follow-up date', nextAction: 'Next action',
      proposalSent: 'Proposal sent', convertToClient: 'Convert to Client',
      converting: 'Converting...', noVisits: 'No visits found',
      prospect: '— Prospect (new) —', existingClient: 'Existing client (optional)',
    },
    invoices: {
      title: 'Invoices', newInvoice: 'New Invoice', editInvoice: 'Edit Invoice',
      number: 'Number', client: 'Client', issued: 'Issued', due: 'Due',
      subtotal: 'Subtotal', vat: 'VAT', download: 'Download PDF',
      markSent: 'Mark Sent', markCollected: 'Mark Collected', cancel: 'Cancel Invoice',
      addLine: 'Add line', description: 'Description', qty: 'Qty', unitPrice: 'Unit price',
      vatType: 'VAT Type', vatRate: 'VAT Rate (%)', paymentTerms: 'Payment terms',
      noInvoices: 'No invoices yet', linesTitle: 'Invoice Lines',
    },
    cash: {
      title: 'Cash', newIncome: '+ Income', newExpense: '- Expense',
      concept: 'Concept', category: 'Category', amount: 'Amount (€)',
      recurring: 'Recurring', cashBalance: 'Cash Balance', totalIncome: 'Total Income',
      totalExpenses: 'Total Expenses', noMovements: 'No movements yet',
      addIncome: '+ Add Income', addExpense: '- Add Expense',
      linkInvoice: 'Link to invoice (optional)',
    },
    timelog: {
      title: 'Time Log', clockIn: 'Clock In', clockOut: 'Clock Out',
      clockingIn: 'Clocking in...', clockingOut: 'Clocking out...',
      activeShift: 'Active shift since', noShift: 'No active shift',
      thisMonth: 'This month', shifts: 'shifts', worker: 'Worker',
      location: 'Location', duration: 'Duration', locationUnavailable: 'Location unavailable — will clock without GPS',
    },
    status: {
      draft: 'Draft', sent: 'Sent', collected: 'Collected',
      overdue: 'Overdue', cancelled: 'Cancelled',
      pending: 'Pending', follow_up: 'Follow-up', closed: 'Closed', lost: 'Lost',
    },
  },
  es: {
    nav: {
      dashboard: 'Dashboard', clients: 'Clientes', visits: 'Visitas CRM',
      invoices: 'Facturas', cash: 'Caja', timelog: 'Control Horario', logout: 'Salir',
    },
    common: {
      save: 'Guardar', cancel: 'Cancelar', export: 'Exportar', loading: 'Cargando...',
      edit: 'Editar', delete: 'Eliminar', close: 'Cerrar', search: 'Buscar',
      noRecords: 'Sin registros', actions: 'Acciones', notes: 'Notas',
      date: 'Fecha', status: 'Estado', total: 'Total', all: 'Todos',
    },
    dashboard: {
      title: 'Panel', collected: 'Cobrado (IVA incl.)', outstanding: 'Pendiente',
      cashBalance: 'Saldo en Caja', forecast: 'Previsión 30 días',
      vatReport: 'Informe IVA', outputVat: 'IVA repercutido (cobrado)',
      inputVat: 'IVA soportado (gastos)', netVat: 'IVA neto a pagar',
      recentCash: 'Últimos movimientos de caja', noMovements: 'Sin movimientos',
      latestInvoices: 'Últimas facturas', noInvoices: 'Sin facturas aún',
      overdueInvoices: 'Facturas vencidas', daysOverdue: 'd de retraso',
      allTime: 'Todo', thisMonth: 'Este mes', lastMonth: 'Mes anterior', thisYear: 'Este año',
      resetData: 'Resetear Datos de Prueba',
      resetConfirm: 'Esto ELIMINARÁ TODOS los datos (clientes, facturas, caja, visitas, fichajes) y reiniciará la numeración de facturas a cero.\n\nEsta acción no se puede deshacer. ¿Estás seguro?',
      resetSuccess: 'Todos los datos de prueba eliminados correctamente.',
    },
    clients: {
      title: 'Clientes', newClient: 'Nuevo Cliente', editClient: 'Editar Cliente',
      name: 'Nombre empresa', contact: 'Persona de contacto', email: 'Email',
      phone: 'Teléfono', country: 'País', city: 'Ciudad', address: 'Dirección',
      vatNumber: 'NIF/CIF', type: 'Tipo', plan: 'Plan', mrr: 'MRR (€/mes)',
      noClients: 'Sin clientes aún',
    },
    visits: {
      title: 'Visitas CRM', newVisit: 'Nueva Visita', editVisit: 'Editar Visita',
      venue: 'Local / Empresa', city: 'Ciudad', contactPerson: 'Persona de contacto',
      followUpDate: 'Fecha seguimiento', nextAction: 'Próxima acción',
      proposalSent: 'Propuesta enviada', convertToClient: 'Convertir a Cliente',
      converting: 'Convirtiendo...', noVisits: 'No se encontraron visitas',
      prospect: '— Prospecto (nuevo) —', existingClient: 'Cliente existente (opcional)',
    },
    invoices: {
      title: 'Facturas', newInvoice: 'Nueva Factura', editInvoice: 'Editar Factura',
      number: 'Número', client: 'Cliente', issued: 'Emitida', due: 'Vencimiento',
      subtotal: 'Subtotal', vat: 'IVA', download: 'Descargar PDF',
      markSent: 'Marcar Enviada', markCollected: 'Marcar Cobrada', cancel: 'Cancelar Factura',
      addLine: 'Añadir línea', description: 'Descripción', qty: 'Cant.', unitPrice: 'Precio unit.',
      vatType: 'Tipo IVA', vatRate: 'Tipo IVA (%)', paymentTerms: 'Condiciones de pago',
      noInvoices: 'Sin facturas aún', linesTitle: 'Líneas de factura',
    },
    cash: {
      title: 'Caja', newIncome: '+ Ingreso', newExpense: '- Gasto',
      concept: 'Concepto', category: 'Categoría', amount: 'Importe (€)',
      recurring: 'Recurrente', cashBalance: 'Saldo en Caja', totalIncome: 'Total Ingresos',
      totalExpenses: 'Total Gastos', noMovements: 'Sin movimientos aún',
      addIncome: '+ Añadir Ingreso', addExpense: '- Añadir Gasto',
      linkInvoice: 'Vincular a factura (opcional)',
    },
    timelog: {
      title: 'Control Horario', clockIn: 'Entrada', clockOut: 'Salida',
      clockingIn: 'Fichando entrada...', clockingOut: 'Fichando salida...',
      activeShift: 'Turno activo desde', noShift: 'Sin turno activo',
      thisMonth: 'Este mes', shifts: 'turnos', worker: 'Trabajador',
      location: 'Ubicación', duration: 'Duración', locationUnavailable: 'Ubicación no disponible — se fichará sin GPS',
    },
    status: {
      draft: 'Borrador', sent: 'Enviada', collected: 'Cobrada',
      overdue: 'Vencida', cancelled: 'Cancelada',
      pending: 'Pendiente', follow_up: 'Seguimiento', closed: 'Cerrada', lost: 'Perdida',
    },
  },
};

type Translations = typeof T.en;
const I18nCtx = createContext<{ lang: Lang; t: Translations; setLang: (l: Lang) => void }>({
  lang: 'en', t: T.en, setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const stored = (localStorage.getItem('ops_lang') as Lang) || 'en';
  const [lang, setLangState] = useState<Lang>(stored);

  function setLang(l: Lang) {
    localStorage.setItem('ops_lang', l);
    setLangState(l);
  }

  return (
    <I18nCtx.Provider value={{ lang, t: T[lang], setLang }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useT() {
  return useContext(I18nCtx);
}
