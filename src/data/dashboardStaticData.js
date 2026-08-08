// Stats cards

import { CheckCircle2, ClipboardList, Bike, Users } from 'lucide-react'

export const statsCardTemplates = [
  {
    key: 'clientes',
    title: 'Clientes',
    iconBg: '#eef2ff',
    iconColor: '#4f7cff',
    iconKey: 'users'
  },
  {
    key: 'motocicletas',
    title: 'Motocicletas',
    iconBg: '#fffbeb',
    iconColor: '#f59e0b',
    iconKey: 'motorcycle'
  },
  {
    key: 'ordenes',
    title: 'Órdenes',
    iconBg: '#fff0f0',
    iconColor: '#e8414a',
    iconKey: 'ordenes',
    total: '7'
  },
  {
    key: 'ordenesCompletadas',
    title: 'Completadas',
    iconBg: '#ecfdf5',
    iconColor: '#10b981',
    iconKey: 'ordenesCompletadas'
  }
]

export const statIcons = {
  clientes: Users,
  motocicletas: Bike,
  ordenes: ClipboardList,
  ordenesCompletadas: CheckCircle2
}

export const statSubtitleByKey = {
  clientes: 'Total registrados',
  motocicletas: 'Total registradas',
  ordenes: 'Órdenes en curso',
  ordenesCompletadas: 'Órdenes terminadas'
}

// Chart

export const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export const monthlyData = [15, 23, 19, 25, 35, 23, 25, 32, 29, 36, 41, 41]

export const dashboardChartConfig = {
  height: 340,
  margin: { top: 8, right: 12, bottom: 8, left: -10 },
  yTicks: [0, 10, 20, 30, 40, 50]
}

export const dashboardYearOptions = ['Este año']
