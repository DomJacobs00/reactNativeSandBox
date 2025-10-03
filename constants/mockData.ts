import { Invoice, LabourItem } from "@/interfaces/main";

export const mockEmployee = {
    title: 'MR',
    name: 'John',
    lastName: 'Doe',
    mobile: '07162616362',
    address: '123 test ln',
    postcode: 'M11M'
}

export const mockInvoice:Invoice = {
  id:22,
  date: '23/09/2025',
  employee:mockEmployee,
  labourItems : [
    {id:1, taxFree:false, date:'23/09/2025', siteLocation:'Test Location', description: 'Test Description', qty:'1', rate:'112', amount:112 },
    {id:2, taxFree:true, date:'23/09/2025', siteLocation:'Food', description: '', qty:'4', rate:'10', amount:40 }
  ],
  subtotal: 152,
  lessCis: 22.40,
  totalDue: 126.60
}
export const mockLabourItem:LabourItem = {
  id:1, 
  taxFree:false, 
  date:'23/09/2025', 
  siteLocation:'Test Location', 
  description: 'Test Description', 
  qty:'1', 
  rate:'112', 
  amount:112 
}
export const invoices: Invoice[] = [
  {
    id: 1,
    date: '20/12/2024',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '16/12/2024', siteLocation: 'A3E Garage',           description: 'Inspection and Testing', qty: '8', rate: '22.50', amount: 180.00 },
      { id: 2, date: '17/12/2024', siteLocation: 'Courtyard Marriot',     description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 3, date: '18/12/2024', siteLocation: 'Client Site - Alpha',   description: 'Maintenance & Repairs',  qty: '8', rate: '28.13', amount: 225.04 },
      { id: 4, date: '19/12/2024', siteLocation: 'Client Site - Beta',    description: 'Installations',          qty: '8', rate: '30.00', amount: 240.00 },
      { id: 5, date: '20/12/2024', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',            qty: '8', rate: '27.50', amount: 220.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '3', rate: '10.00', amount: 30.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 882.03
  },
  {
    id: 2,
    date: '27/12/2024',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '23/12/2024', siteLocation: 'Courtyard Marriot',     description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 2, date: '24/12/2024', siteLocation: 'Client Site - Alpha',   description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 3, date: '25/12/2024', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 4, date: '26/12/2024', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 5, date: '27/12/2024', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '4', rate: '10.00', amount: 40.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 892.03
  },
  {
    id: 3,
    date: '03/01/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '30/12/2024', siteLocation: 'Client Site - Alpha',   description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 2, date: '31/12/2024', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 3, date: '01/01/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 4, date: '02/01/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 5, date: '03/01/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '3', rate: '10.00', amount: 30.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 882.03
  },
  {
    id: 4,
    date: '10/01/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '06/01/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 2, date: '07/01/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 3, date: '08/01/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 4, date: '09/01/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 5, date: '10/01/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '4', rate: '10.00', amount: 40.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 892.03
  },
  {
    id: 5,
    date: '17/01/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '13/01/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 2, date: '14/01/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 3, date: '15/01/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 4, date: '16/01/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 5, date: '17/01/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '3', rate: '10.00', amount: 30.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 882.03
  },
  {
    id: 6,
    date: '24/01/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '20/01/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 2, date: '21/01/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 3, date: '22/01/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 4, date: '23/01/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 5, date: '24/01/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '4', rate: '10.00', amount: 40.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 892.03
  },
  {
    id: 7,
    date: '31/01/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '27/01/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 2, date: '28/01/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 3, date: '29/01/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 4, date: '30/01/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 5, date: '31/01/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '3', rate: '10.00', amount: 30.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 882.03
  },
  {
    id: 8,
    date: '07/02/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '03/02/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 2, date: '04/02/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 3, date: '05/02/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 4, date: '06/02/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 5, date: '07/02/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '4', rate: '10.00', amount: 40.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 892.03
  },
  {
    id: 9,
    date: '14/02/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '10/02/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 2, date: '11/02/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 3, date: '12/02/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 4, date: '13/02/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 5, date: '14/02/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '3', rate: '10.00', amount: 30.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 882.03
  },
  {
    id: 10,
    date: '21/02/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '17/02/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 2, date: '18/02/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 3, date: '19/02/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 4, date: '20/02/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 5, date: '21/02/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '4', rate: '10.00', amount: 40.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 892.03
  },
  {
    id: 11,
    date: '28/02/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '24/02/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 2, date: '25/02/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 3, date: '26/02/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 4, date: '27/02/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 5, date: '28/02/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '3', rate: '10.00', amount: 30.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 882.03
  },
  {
    id: 12,
    date: '07/03/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '03/03/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 2, date: '04/03/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 3, date: '05/03/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 4, date: '06/03/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 5, date: '07/03/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '4', rate: '10.00', amount: 40.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 892.03
  },
  {
    id: 13,
    date: '14/03/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '10/03/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 2, date: '11/03/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 3, date: '12/03/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 4, date: '13/03/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 5, date: '14/03/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '3', rate: '10.00', amount: 30.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 882.03
  },
  {
    id: 14,
    date: '21/03/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '17/03/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 2, date: '18/03/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 3, date: '19/03/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 4, date: '20/03/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 5, date: '21/03/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '4', rate: '10.00', amount: 40.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 892.03
  },
  {
    id: 15,
    date: '28/03/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '24/03/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 2, date: '25/03/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 3, date: '26/03/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 4, date: '27/03/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 5, date: '28/03/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '3', rate: '10.00', amount: 30.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 882.03
  },
  {
    id: 16,
    date: '04/04/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '31/03/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 2, date: '01/04/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 3, date: '02/04/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 4, date: '03/04/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 5, date: '04/04/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '4', rate: '10.00', amount: 40.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 892.03
  },
  {
    id: 17,
    date: '11/04/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '07/04/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 2, date: '08/04/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 3, date: '09/04/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 4, date: '10/04/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 5, date: '11/04/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '3', rate: '10.00', amount: 30.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 882.03
  },
  {
    id: 18,
    date: '18/04/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '14/04/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 2, date: '15/04/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 3, date: '16/04/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 4, date: '17/04/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 5, date: '18/04/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '4', rate: '10.00', amount: 40.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 892.03
  },
  {
    id: 19,
    date: '25/04/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '21/04/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 2, date: '22/04/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 3, date: '23/04/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 4, date: '24/04/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 5, date: '25/04/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '3', rate: '10.00', amount: 30.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 882.03
  },
  {
    id: 20,
    date: '02/05/2025',
    employee: mockEmployee,
    labourItems: [
      { id: 1, date: '28/04/2025', siteLocation: 'Client Site - Gamma',   description: 'Diagnostics',           qty: '8', rate: '27.50', amount: 220.00 },
      { id: 2, date: '29/04/2025', siteLocation: 'Warehouse Unit 5',      description: 'Inspection and Testing',qty: '8', rate: '22.50', amount: 180.00 },
      { id: 3, date: '30/04/2025', siteLocation: 'A3E Garage',            description: 'External lighting',     qty: '8', rate: '25.00', amount: 200.00 },
      { id: 4, date: '01/05/2025', siteLocation: 'Courtyard Marriot',     description: 'Maintenance & Repairs', qty: '8', rate: '28.13', amount: 225.04 },
      { id: 5, date: '02/05/2025', siteLocation: 'Client Site - Beta',    description: 'Installations',         qty: '8', rate: '30.00', amount: 240.00 },
      { id: 6, taxFree: true, siteLocation: 'Food Allowance (Tax free)', qty: '4', rate: '10.00', amount: 40.00 },
    ],
    subtotal: 1065.04,
    lessCis: 213.01,
    totalDue: 892.03
  }
];

