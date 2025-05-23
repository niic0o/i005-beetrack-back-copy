// lib/dashboard/dashboard.dto.ts

import { Product } from "@prisma/client";
/**
 * Este DTO expone la estructura de datos que entran y salen sin conocer los esquemas de la base de datos.
 * Estos esquemas pueden variar en el tiempo o exponer vulnerabilidades, la intención es proteger la capa de datos.
 * @function DashboardCompareData permite comparar datos procesados en dos rangos de misma amplitud
 * @function AggregatedReport permite conocer la sumatoria de datos procesados en x rangos de fecha
 * @function DashboardParams define la estructura de datos que espera recibir por el metodo http GET req.params
 * @function topProducts permite obtener los productos mas vendidos en un rango de fecha
 * @function DashboardTopData permite obtener los datos procesados de los productos mas vendidos en un rango de fecha
 * @type {ViewType} permite definir el tipo de vista que se va a renderizar
 */
export type ViewType = "daily" | "range" | "compare" | "top" | "now";

export interface DashboardParams {
  storeId: string;
  view: ViewType;
  date?: Date;
  fromDate?: Date;
  toDate?: Date;
}

export interface AggregatedReport {
  totalSales: number;
  totalCost: number;
  totalProfit: number;
  totalOrders: number;
  totalProductsSold: number;
  byPaymentMethod: {
    cash: number;
    card: number;
    digital: number;
  };
}

export interface DashboardCompareData {
  current: AggregatedReport;
  previous: AggregatedReport;
}

export interface DashboardTopDTO {
  storeID: string;
  range: "daily" | "monthly" | "yearly";
}

/*
Top Product se extiende de la tabla Product, agregando variables como resultado
de operaciones matematicas. Al hacer las consultas en dashboard.service.ts, si
quiero generar nuevas consultas debo añadir la variable aquí.
Ej: totalCost: number;
*/
export interface TopProduct extends Product {
  totalSold: number;
  totalRevenue: number;
}

export type DashboardTopData = {
  topProducts: TopProduct[];
};

export type DashboardData =
  | AggregatedReport
  | DashboardCompareData
  | DashboardTopData
  | null;
