import {
  ModuleRegistry,
  AllCommunityModule,
  type ColDef,
  type GridOptions,
} from 'ag-grid-community'
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  AllEnterpriseModule,
} from 'ag-grid-enterprise'
import { LicenseManager } from 'ag-grid-enterprise'

export function setupAgGrid() {
  ModuleRegistry.registerModules([
    AllCommunityModule,
    AllEnterpriseModule,
    ContextMenuModule,
    ColumnsToolPanelModule,
    ColumnMenuModule,
  ])
  LicenseManager.setLicenseKey(import.meta.env.VITE_AG_GRID_LICENSE_KEY)
}

export function createColumnDefs(columns: Partial<ColDef>[]): ColDef[] {
  return columns.map((col) => ({
    resizable: true,
    sortable: true,
    filter: true,
    flex: 1,
    ...col,
  }))
}

export function getDefaultGridOptions(): Partial<GridOptions> {
  return {
    pagination: true,
    paginationPageSize: 10,
    domLayout: 'normal',
    // rowSelection: {
    //   mode: 'multiRow',
    // },
    autoSizeStrategy: {
      type: 'fitGridWidth',
    },
    defaultColDef: {
      flex: 1,
      minWidth: 200,
      resizable: true,
    },
    suppressMovableColumns: false,
    suppressHorizontalScroll: false,
    animateRows: true,
    suppressServerSideFullWidthLoadingRow: true,
    scrollbarWidth: 10,
  }
}

