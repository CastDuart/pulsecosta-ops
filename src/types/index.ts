export interface AuthUser {
  id: number;
  email: string;
  name: string;
  initials: string;
  roles: string[];
  role: string;
  org_id: number;
}

export interface Cliente {
  id: number;
  org_id: number;
  nombre: string;
  contacto?: string;
  vat_number?: string;
  tipo_cliente: 'b2b' | 'b2c';
  pais: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  codigo_postal?: string;
  ciudad?: string;
  notas?: string;
  activo: boolean;
  crm_account_id?: number;
  crm_account_name?: string;
  created_at: string;
}

export type TipoIva = 'normal' | 'intracomunitario' | 'exento';
export type EstadoFactura = 'draft' | 'sent' | 'collected' | 'overdue' | 'cancelled';
export type TipoFactura = 'normal' | 'recurring';
export type IntervaloRecurrencia = 'monthly' | 'quarterly' | null;

export interface FacturaLinea {
  id?: number;
  factura_id?: number;
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  importe: number;
  orden?: number;
}

export interface Factura {
  id: number;
  org_id: number;
  numero: string;
  cliente_id: number;
  cliente_nombre?: string;
  vat_number?: string;
  pais?: string;
  tipo_cliente?: string;
  cliente_email?: string;
  fecha_emision: string;
  fecha_vencimiento?: string;
  metodo_pago: string;
  tipo_iva: TipoIva;
  iva_rate: number;
  subtotal: number;
  iva_importe: number;
  total: number;
  tipo: TipoFactura;
  intervalo_recurrencia?: IntervaloRecurrencia;
  estado: EstadoFactura;
  notas?: string;
  created_at: string;
  lineas?: FacturaLinea[];
}

export type TipoMovimiento = 'income' | 'expense';

export interface CajaMovimiento {
  id: number;
  org_id: number;
  tipo: TipoMovimiento;
  concepto: string;
  importe: number;
  tipo_iva: TipoIva;
  iva_rate: number;
  iva_importe: number;
  fecha: string;
  categoria?: string;
  cliente_id?: number;
  cliente_nombre?: string;
  factura_id?: number;
  recurrente: boolean;
  intervalo?: string;
  notas?: string;
  created_at: string;
}

export interface Jornada {
  id: number;
  user_id: number;
  user_name?: string;
  user_email?: string;
  org_id: number;
  fecha: string;
  entrada: string;
  salida?: string;
  total_minutos?: number;
  lat_entrada?: number;
  lng_entrada?: number;
  direccion_entrada?: string;
  lat_salida?: number;
  lng_salida?: number;
  direccion_salida?: string;
  tipo?: string;
  notas?: string;
}

export interface Worker {
  id: number;
  user_id: number;
  org_id: number;
  department?: string;
  role?: string;
  name?: string;
  email?: string;
}

export interface Visita {
  id: number;
  org_id: number;
  venue: string;
  ciudad?: string;
  direccion?: string;
  contacto?: string;
  telefono?: string;
  email?: string;
  vat_number?: string;
  fecha: string;
  plan?: string;
  estado: 'pending' | 'follow_up' | 'closed' | 'lost';
  prioridad: 'low' | 'medium' | 'high';
  propuesta_enviada: boolean;
  fecha_seguimiento?: string;
  proxima_accion?: string;
  notas?: string;
  cliente_id?: number;
  cliente_nombre?: string;
  factura_id?: number;
  created_at: string;
}

export type TimeFilter = 'all' | 'this_month' | 'last_month' | 'this_year';
