import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BaseNodes = {
  __typename?: 'BaseNodes';
  depth: Scalars['Int'];
  operationId: Scalars['Float'];
  quantity: Scalars['Int'];
  relDepth: Scalars['Int'];
};

export type Calendar = PostgresClass & {
  __typename?: 'Calendar';
  calendarBucket: CalendarBucket;
  createdAt: Scalars['String'];
  endDate: Scalars['Float'];
  endTime: Scalars['Float'];
  id: Scalars['Int'];
  priority: Scalars['Int'];
  startDate: Scalars['Float'];
  startTime: Scalars['Float'];
  updatedAt: Scalars['String'];
  value: Scalars['Int'];
  weekday: Array<Scalars['String']>;
};

export type CalendarBucket = PostgresClass & {
  __typename?: 'CalendarBucket';
  calendars: Array<Calendar>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  resource: Array<Resource>;
  updatedAt: Scalars['String'];
};

export type CalendarBucketCreateResponse = {
  __typename?: 'CalendarBucketCreateResponse';
  data?: Maybe<CalendarBucket>;
  errors?: Maybe<Array<FieldError>>;
};

export type CalendarBucketInput = {
  calendarsId?: InputMaybe<Array<Scalars['Int']>>;
  name: Scalars['String'];
};

export type CalendarBucketsResponse = {
  __typename?: 'CalendarBucketsResponse';
  data: Array<CalendarBucket>;
  total: Scalars['Int'];
};

export type CalendarCreateResponse = {
  __typename?: 'CalendarCreateResponse';
  data?: Maybe<Calendar>;
  errors?: Maybe<Array<FieldError>>;
};

export type CalendarInput = {
  endDate: Scalars['Float'];
  endTime: Scalars['Float'];
  priority: Scalars['Int'];
  startDate: Scalars['Float'];
  startTime: Scalars['Float'];
  value: Scalars['Int'];
  weekday: Array<Scalars['Boolean']>;
};

export type CalendarsResponse = {
  __typename?: 'CalendarsResponse';
  data: Array<Calendar>;
  total: Scalars['Int'];
};

export type Customer = PostgresClass & {
  __typename?: 'Customer';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  order: Array<Order>;
  updatedAt: Scalars['String'];
};

export type CustomerCreateResponse = {
  __typename?: 'CustomerCreateResponse';
  data?: Maybe<Customer>;
  errors?: Maybe<Array<FieldError>>;
};

export type CustomerInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CustomersResponse = {
  __typename?: 'CustomersResponse';
  data: Array<Customer>;
  total: Scalars['Int'];
};

export type Demand = PostgresClass & {
  __typename?: 'Demand';
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  distributionOrders?: Maybe<Array<DistributionOrder>>;
  id: Scalars['Int'];
  item: Item;
  location: Location;
  name: Scalars['String'];
  order?: Maybe<Order>;
  purchases?: Maybe<Array<Purchase>>;
  quantity: Scalars['Int'];
  updatedAt: Scalars['String'];
  works?: Maybe<Array<Work>>;
};

export type DemandsResponse = {
  __typename?: 'DemandsResponse';
  data: Array<Demand>;
  total: Scalars['Int'];
};

export type Distribution = PostgresClass & {
  __typename?: 'Distribution';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  item: Item;
  leadTime: Scalars['Int'];
  location: Location;
  origin: Location;
  priority: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type DistributionCreateResponse = {
  __typename?: 'DistributionCreateResponse';
  data?: Maybe<Distribution>;
  errors?: Maybe<Array<FieldError>>;
};

export type DistributionInput = {
  itemId: Scalars['Int'];
  leadTime: Scalars['Int'];
  locationId: Scalars['Int'];
  originId: Scalars['Int'];
  priority: Scalars['Int'];
};

export type DistributionOrder = PostgresClass & {
  __typename?: 'DistributionOrder';
  createdAt: Scalars['String'];
  demand?: Maybe<Demand>;
  destination: Location;
  id: Scalars['Int'];
  item: Item;
  name: Scalars['String'];
  origin: Location;
  parentId?: Maybe<Scalars['Int']>;
  parentType?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  receiptDate: Scalars['Float'];
  shippingDate: Scalars['Float'];
  status: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type DistributionOrderCreateResponse = {
  __typename?: 'DistributionOrderCreateResponse';
  data?: Maybe<DistributionOrder>;
  errors?: Maybe<Array<FieldError>>;
};

export type DistributionOrderInput = {
  demandId?: InputMaybe<Scalars['Int']>;
  destinationId: Scalars['Int'];
  itemId: Scalars['Int'];
  name: Scalars['String'];
  originId: Scalars['Int'];
  quantity: Scalars['Int'];
  receiptDate: Scalars['Float'];
  shippingDate: Scalars['Float'];
  status: Scalars['String'];
};

export type DistributionOrdersResponse = {
  __typename?: 'DistributionOrdersResponse';
  data: Array<DistributionOrder>;
  total: Scalars['Int'];
};

export type DistributionsResponse = {
  __typename?: 'DistributionsResponse';
  data: Array<Distribution>;
  total: Scalars['Int'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Inventory = PostgresClass & {
  __typename?: 'Inventory';
  Minimum: Scalars['Int'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  item: Item;
  location: Location;
  onHand: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type InventoryCreateResponse = {
  __typename?: 'InventoryCreateResponse';
  data?: Maybe<Inventory>;
  errors?: Maybe<Array<FieldError>>;
};

export type InventoryInput = {
  Minimum: Scalars['Int'];
  itemId: Scalars['Int'];
  locationId: Scalars['Int'];
  onHand: Scalars['Int'];
};

export type InventoryOrder = PostgresClass & {
  __typename?: 'InventoryOrder';
  createdAt: Scalars['String'];
  demand?: Maybe<Demand>;
  id: Scalars['Int'];
  item: Item;
  location: Location;
  numPutInInventory: Scalars['Int'];
  numTakeFromInventory: Scalars['Int'];
  parentId?: Maybe<Scalars['Int']>;
  parentType?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type InventoryOrdersResponse = {
  __typename?: 'InventoryOrdersResponse';
  data: Array<InventoryOrder>;
  total: Scalars['Int'];
};

export type InventorysResponse = {
  __typename?: 'InventorysResponse';
  data: Array<Inventory>;
  total: Scalars['Int'];
};

export type Item = PostgresClass & {
  __typename?: 'Item';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ItemCreateResponse = {
  __typename?: 'ItemCreateResponse';
  data?: Maybe<Item>;
  errors?: Maybe<Array<FieldError>>;
};

export type ItemInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type ItemSupplier = PostgresClass & {
  __typename?: 'ItemSupplier';
  cost: Scalars['Int'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  item: Item;
  leadTime: Scalars['Int'];
  location: Location;
  priority: Scalars['Int'];
  supplier: Supplier;
  updatedAt: Scalars['String'];
};

export type ItemSupplierCreateResponse = {
  __typename?: 'ItemSupplierCreateResponse';
  data?: Maybe<ItemSupplier>;
  errors?: Maybe<Array<FieldError>>;
};

export type ItemSupplierInput = {
  cost: Scalars['Int'];
  itemId: Scalars['Int'];
  leadTime: Scalars['Int'];
  locationId: Scalars['Int'];
  priority: Scalars['Int'];
  supplierId: Scalars['Int'];
};

export type ItemSuppliersResponse = {
  __typename?: 'ItemSuppliersResponse';
  data: Array<ItemSupplier>;
  total: Scalars['Int'];
};

export type ItemsResponse = {
  __typename?: 'ItemsResponse';
  data: Array<Item>;
  total: Scalars['Int'];
};

export type Location = PostgresClass & {
  __typename?: 'Location';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type LocationCreateResponse = {
  __typename?: 'LocationCreateResponse';
  data?: Maybe<Location>;
  errors?: Maybe<Array<FieldError>>;
};

export type LocationInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type LocationsResponse = {
  __typename?: 'LocationsResponse';
  data: Array<Location>;
  total: Scalars['Int'];
};

export type Matrix = PostgresClass & {
  __typename?: 'Matrix';
  Duration: Scalars['Int'];
  cost: Scalars['Int'];
  createdAt: Scalars['String'];
  from: Operation;
  id: Scalars['Int'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  resource: Resource;
  to: Operation;
  updatedAt: Scalars['String'];
};

export type MatrixCreateResponse = {
  __typename?: 'MatrixCreateResponse';
  data?: Maybe<Matrix>;
  errors?: Maybe<Array<FieldError>>;
};

export type MatrixInput = {
  Duration: Scalars['Int'];
  cost: Scalars['Int'];
  fromId: Scalars['Int'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  resourceId: Scalars['Int'];
  toId: Scalars['Int'];
};

export type MatrixsResponse = {
  __typename?: 'MatrixsResponse';
  data: Array<Matrix>;
  total: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  catchNode: Array<AllNodes>;
  createCalendar: CalendarCreateResponse;
  createCalendarAndBucket: CalendarBucketCreateResponse;
  createCalendarBucket: CalendarBucketCreateResponse;
  createCustomer: CustomerCreateResponse;
  createDistribution: DistributionCreateResponse;
  createDistributionOrder: DistributionOrderCreateResponse;
  createInventory: InventoryCreateResponse;
  createItem: ItemCreateResponse;
  createItemSupplier: ItemSupplierCreateResponse;
  createLocation: LocationCreateResponse;
  createMatrix: MatrixCreateResponse;
  createOperation: OperationCreateResponse;
  createOperationMaterial: OperationMaterialCreateResponse;
  createOperationResource: OperationResourceCreateResponse;
  createOrder: OrderCreateResponse;
  createPurchase: PurchaseCreateResponse;
  createResource: ResourceCreateResponse;
  createSkill: SkillCreateResponse;
  createSupplier: SupplierCreateResponse;
  createTimetable: TimeTable;
  createUser: UserCreateResponse;
  createWork: WorkCreateResponse;
  deleteTimeTable: Scalars['Boolean'];
  deletecalendarBuckets: Scalars['Int'];
  deletecalendars: Scalars['Int'];
  deletecustomers: Scalars['Int'];
  deletedemands: Scalars['Int'];
  deletedistributionOrders: Scalars['Int'];
  deletedistributions: Scalars['Int'];
  deleteinventoryOrders: Scalars['Int'];
  deleteinventorys: Scalars['Int'];
  deleteitemSuppliers: Scalars['Int'];
  deleteitems: Scalars['Int'];
  deletelocations: Scalars['Int'];
  deletematrixs: Scalars['Int'];
  deleteoperationMaterials: Scalars['Int'];
  deleteoperationResources: Scalars['Int'];
  deleteoperations: Scalars['Int'];
  deleteorders: Scalars['Int'];
  deletepurchases: Scalars['Int'];
  deleteresources: Scalars['Int'];
  deletesaless: Scalars['Int'];
  deleteskills: Scalars['Int'];
  deletesuppliers: Scalars['Int'];
  deletetempMissions: Scalars['Int'];
  deleteusers: Scalars['Int'];
  deleteworks: Scalars['Int'];
  exec: Scalars['String'];
  login: UserCreateResponse;
  run: Scalars['String'];
  updateCalendar: CalendarCreateResponse;
  updateCalendarBucket: CalendarBucketCreateResponse;
  updateCustomer: CustomerCreateResponse;
  updateDistribution: DistributionCreateResponse;
  updateDistributionOrder: DistributionOrderCreateResponse;
  updateInventory: InventoryCreateResponse;
  updateItem: ItemCreateResponse;
  updateItemSupplier: ItemSupplierCreateResponse;
  updateLocation: LocationCreateResponse;
  updateMatrix: MatrixCreateResponse;
  updateOperation: OperationCreateResponse;
  updateOperationMaterial: OperationMaterialCreateResponse;
  updateOperationResource: OperationResourceCreateResponse;
  updateOrder: OrderCreateResponse;
  updatePurchase: PurchaseCreateResponse;
  updateResource: ResourceCreateResponse;
  updateSkill: SkillCreateResponse;
  updateSupplier: SupplierCreateResponse;
  updateTimeTable?: Maybe<TimeTable>;
  updateUser: UserCreateResponse;
  updateWork: WorkCreateResponse;
};


export type MutationCatchNodeArgs = {
  itemName: Scalars['String'];
  locationName: Scalars['String'];
  operationName: Scalars['String'];
};


export type MutationCreateCalendarArgs = {
  data: CalendarInput;
};


export type MutationCreateCalendarAndBucketArgs = {
  calendarDatas: Array<CalendarInput>;
  data: CalendarBucketInput;
};


export type MutationCreateCalendarBucketArgs = {
  data: CalendarBucketInput;
};


export type MutationCreateCustomerArgs = {
  data: CustomerInput;
};


export type MutationCreateDistributionArgs = {
  data: DistributionInput;
};


export type MutationCreateDistributionOrderArgs = {
  data: DistributionOrderInput;
};


export type MutationCreateInventoryArgs = {
  data: InventoryInput;
};


export type MutationCreateItemArgs = {
  data: ItemInput;
};


export type MutationCreateItemSupplierArgs = {
  data: ItemSupplierInput;
};


export type MutationCreateLocationArgs = {
  data: LocationInput;
};


export type MutationCreateMatrixArgs = {
  data: MatrixInput;
};


export type MutationCreateOperationArgs = {
  data: OperationInput;
};


export type MutationCreateOperationMaterialArgs = {
  data: OperationMaterialInput;
};


export type MutationCreateOperationResourceArgs = {
  data: OperationResourceInput;
};


export type MutationCreateOrderArgs = {
  data: OrderInput;
};


export type MutationCreatePurchaseArgs = {
  data: PurchaseInput;
};


export type MutationCreateResourceArgs = {
  data: ResourceInput;
};


export type MutationCreateSkillArgs = {
  data: SkillInput;
};


export type MutationCreateSupplierArgs = {
  data: SupplierInput;
};


export type MutationCreateTimetableArgs = {
  data: TimeTableInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationCreateWorkArgs = {
  data: WorkInput;
};


export type MutationDeleteTimeTableArgs = {
  id: Scalars['Float'];
};


export type MutationDeletecalendarBucketsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletecalendarsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletecustomersArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletedemandsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletedistributionOrdersArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletedistributionsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteinventoryOrdersArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteinventorysArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteitemSuppliersArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteitemsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletelocationsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletematrixsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteoperationMaterialsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteoperationResourcesArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteoperationsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteordersArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletepurchasesArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteresourcesArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletesalessArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteskillsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletesuppliersArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeletetempMissionsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteusersArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteworksArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationExecArgs = {
  itemName: Scalars['String'];
  locationName: Scalars['String'];
  quantity: Scalars['Int'];
};


export type MutationLoginArgs = {
  data: UserInput;
};


export type MutationUpdateCalendarArgs = {
  data: CalendarInput;
  id: Scalars['Float'];
};


export type MutationUpdateCalendarBucketArgs = {
  data: CalendarBucketInput;
  id: Scalars['Float'];
};


export type MutationUpdateCustomerArgs = {
  data: CustomerInput;
  id: Scalars['Float'];
};


export type MutationUpdateDistributionArgs = {
  data: DistributionInput;
  id: Scalars['Float'];
};


export type MutationUpdateDistributionOrderArgs = {
  data: DistributionOrderInput;
  id: Scalars['Float'];
};


export type MutationUpdateInventoryArgs = {
  data: InventoryInput;
  id: Scalars['Float'];
};


export type MutationUpdateItemArgs = {
  data: ItemInput;
  id: Scalars['Float'];
};


export type MutationUpdateItemSupplierArgs = {
  data: ItemSupplierInput;
  id: Scalars['Float'];
};


export type MutationUpdateLocationArgs = {
  data: LocationInput;
  id: Scalars['Float'];
};


export type MutationUpdateMatrixArgs = {
  data: MatrixInput;
  id: Scalars['Float'];
};


export type MutationUpdateOperationArgs = {
  data: OperationInput;
  id: Scalars['Float'];
};


export type MutationUpdateOperationMaterialArgs = {
  data: OperationMaterialInput;
  id: Scalars['Float'];
};


export type MutationUpdateOperationResourceArgs = {
  data: OperationResourceInput;
  id: Scalars['Float'];
};


export type MutationUpdateOrderArgs = {
  data: OrderInput;
  id: Scalars['Float'];
};


export type MutationUpdatePurchaseArgs = {
  data: PurchaseInput;
  id: Scalars['Float'];
};


export type MutationUpdateResourceArgs = {
  data: ResourceInput;
  id: Scalars['Float'];
};


export type MutationUpdateSkillArgs = {
  data: SkillInput;
  id: Scalars['Float'];
};


export type MutationUpdateSupplierArgs = {
  data: SupplierInput;
  id: Scalars['Float'];
};


export type MutationUpdateTimeTableArgs = {
  data: TimeTableUpdateInput;
  id: Scalars['Float'];
};


export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['Float'];
};


export type MutationUpdateWorkArgs = {
  data: WorkInput;
  id: Scalars['Float'];
};

export type Nodes = {
  __typename?: 'Nodes';
  buffers?: Maybe<Array<Array<Scalars['String']>>>;
  depth: Scalars['Int'];
  duration: Scalars['Int'];
  durationPerUnit: Scalars['Int'];
  location: Scalars['String'];
  operation?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  relDepth: Scalars['Int'];
  resources?: Maybe<Array<Array<Scalars['String']>>>;
  type: Scalars['String'];
};

export type NodesResponse = {
  __typename?: 'NodesResponse';
  data?: Maybe<Array<Nodes>>;
  errors?: Maybe<Array<FieldError>>;
};

export type Operation = PostgresClass & {
  __typename?: 'Operation';
  Works?: Maybe<Array<Work>>;
  createdAt: Scalars['String'];
  duration: Scalars['Int'];
  durationPerUnit: Scalars['Int'];
  id: Scalars['Int'];
  location: Location;
  name: Scalars['String'];
  operationMaterials?: Maybe<Array<OperationMaterial>>;
  operationResources?: Maybe<Array<OperationResource>>;
  owner?: Maybe<Operation>;
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type OperationCreateResponse = {
  __typename?: 'OperationCreateResponse';
  data?: Maybe<Operation>;
  errors?: Maybe<Array<FieldError>>;
};

export type OperationInput = {
  duration: Scalars['Int'];
  durationPerUnit: Scalars['Int'];
  locationId: Scalars['Int'];
  name: Scalars['String'];
  ownerId?: InputMaybe<Scalars['Int']>;
  type: Scalars['String'];
};

export type OperationMaterial = PostgresClass & {
  __typename?: 'OperationMaterial';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  item: Item;
  operation: Operation;
  priority: Scalars['Int'];
  quantity: Scalars['Int'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type OperationMaterialCreateResponse = {
  __typename?: 'OperationMaterialCreateResponse';
  data?: Maybe<OperationMaterial>;
  errors?: Maybe<Array<FieldError>>;
};

export type OperationMaterialInput = {
  itemId: Scalars['Int'];
  operationId: Scalars['Int'];
  priority: Scalars['Int'];
  quantity: Scalars['Int'];
  type: Scalars['String'];
};

export type OperationMaterialsResponse = {
  __typename?: 'OperationMaterialsResponse';
  data: Array<OperationMaterial>;
  total: Scalars['Int'];
};

export type OperationResource = PostgresClass & {
  __typename?: 'OperationResource';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  operation: Operation;
  quantity: Scalars['Int'];
  resource: Resource;
  skill?: Maybe<Skill>;
  updatedAt: Scalars['String'];
};

export type OperationResourceCreateResponse = {
  __typename?: 'OperationResourceCreateResponse';
  data?: Maybe<OperationResource>;
  errors?: Maybe<Array<FieldError>>;
};

export type OperationResourceInput = {
  operationId: Scalars['Int'];
  quantity: Scalars['Int'];
  resourceId: Scalars['Int'];
  skillId?: InputMaybe<Scalars['Float']>;
};

export type OperationResourcesResponse = {
  __typename?: 'OperationResourcesResponse';
  data: Array<OperationResource>;
  total: Scalars['Int'];
};

export type OperationsResponse = {
  __typename?: 'OperationsResponse';
  data: Array<Operation>;
  total: Scalars['Int'];
};

export type Order = PostgresClass & {
  __typename?: 'Order';
  createdAt: Scalars['String'];
  customer: Customer;
  demand?: Maybe<Demand>;
  dueDate: Scalars['Float'];
  id: Scalars['Int'];
  item: Item;
  location: Location;
  name: Scalars['String'];
  priority: Scalars['Int'];
  quantity: Scalars['Int'];
  status: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type OrderCreateResponse = {
  __typename?: 'OrderCreateResponse';
  data?: Maybe<Order>;
  errors?: Maybe<Array<FieldError>>;
};

export type OrderInput = {
  customerId: Scalars['Int'];
  dueDate: Scalars['Float'];
  itemId: Scalars['Int'];
  locationId: Scalars['Int'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  quantity: Scalars['Int'];
  status?: Scalars['String'];
};

export type OrdersResponse = {
  __typename?: 'OrdersResponse';
  data: Array<Order>;
  total: Scalars['Int'];
};

export type PostgresClass = {
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type Purchase = PostgresClass & {
  __typename?: 'Purchase';
  createdAt: Scalars['String'];
  demand?: Maybe<Demand>;
  id: Scalars['Int'];
  item: Item;
  location: Location;
  name: Scalars['String'];
  orderingDate: Scalars['Float'];
  parentId: Scalars['Int'];
  parentType: Scalars['String'];
  quantity: Scalars['Int'];
  receiptDate: Scalars['Float'];
  status: Scalars['String'];
  supplier: Supplier;
  updatedAt: Scalars['String'];
};

export type PurchaseCreateResponse = {
  __typename?: 'PurchaseCreateResponse';
  data?: Maybe<Purchase>;
  errors?: Maybe<Array<FieldError>>;
};

export type PurchaseInput = {
  demandId?: InputMaybe<Scalars['Int']>;
  itemId: Scalars['Int'];
  locationId: Scalars['Int'];
  name: Scalars['String'];
  orderingDate: Scalars['DateTime'];
  parentId?: InputMaybe<Scalars['Int']>;
  parentType?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Int'];
  receiptDate: Scalars['DateTime'];
  status: Scalars['String'];
  supplierId: Scalars['Int'];
};

export type PurchasesResponse = {
  __typename?: 'PurchasesResponse';
  data: Array<Purchase>;
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  OperationIds: Array<BaseNodes>;
  calendar?: Maybe<Calendar>;
  calendarBucket?: Maybe<CalendarBucket>;
  calendarBuckets?: Maybe<CalendarBucketsResponse>;
  calendars?: Maybe<CalendarsResponse>;
  catchNodeFromItem: Scalars['String'];
  catchNodeFromOperation: Scalars['String'];
  catchNodeFromResource: Scalars['String'];
  customer?: Maybe<Customer>;
  customers?: Maybe<CustomersResponse>;
  demand?: Maybe<Demand>;
  demands?: Maybe<DemandsResponse>;
  distribution?: Maybe<Distribution>;
  distributionOrder?: Maybe<DistributionOrder>;
  distributionOrders?: Maybe<DistributionOrdersResponse>;
  distributions?: Maybe<DistributionsResponse>;
  findWorkByRes: Array<Work>;
  getNodes: NodesResponse;
  getNodesByResource: NodesResponse;
  getOperationId: Array<Array<FindNodes>>;
  getWorksByOperation: Array<Work>;
  inventory?: Maybe<Inventory>;
  inventoryOrder?: Maybe<InventoryOrder>;
  inventoryOrders?: Maybe<InventoryOrdersResponse>;
  inventorys?: Maybe<InventorysResponse>;
  item?: Maybe<Item>;
  itemSupplier?: Maybe<ItemSupplier>;
  itemSuppliers?: Maybe<ItemSuppliersResponse>;
  items?: Maybe<ItemsResponse>;
  location?: Maybe<Location>;
  locations?: Maybe<LocationsResponse>;
  matrix?: Maybe<Matrix>;
  matrixs?: Maybe<MatrixsResponse>;
  me: UserCreateResponse;
  operation?: Maybe<Operation>;
  operationMaterial?: Maybe<OperationMaterial>;
  operationMaterials?: Maybe<OperationMaterialsResponse>;
  operationResource?: Maybe<OperationResource>;
  operationResources?: Maybe<OperationResourcesResponse>;
  operations?: Maybe<OperationsResponse>;
  order?: Maybe<Order>;
  orders?: Maybe<OrdersResponse>;
  ping: Scalars['String'];
  purchase?: Maybe<Purchase>;
  purchases?: Maybe<PurchasesResponse>;
  resource?: Maybe<Resource>;
  resources?: Maybe<ResourcesResponse>;
  sales?: Maybe<Sales>;
  saless?: Maybe<SalessResponse>;
  skill?: Maybe<Skill>;
  skills?: Maybe<SkillsResponse>;
  supplier?: Maybe<Supplier>;
  suppliers?: Maybe<SuppliersResponse>;
  tempMission?: Maybe<TempMission>;
  tempMissions?: Maybe<TempMissionsResponse>;
  timeTable?: Maybe<TimeTable>;
  timeTables?: Maybe<Array<TimeTable>>;
  user?: Maybe<User>;
  users?: Maybe<UsersResponse>;
  work?: Maybe<Work>;
  works?: Maybe<WorksResponse>;
};


export type QueryOperationIdsArgs = {
  itemId: Scalars['Float'];
};


export type QueryCalendarArgs = {
  id: Scalars['Float'];
};


export type QueryCalendarBucketArgs = {
  id: Scalars['Float'];
};


export type QueryCalendarBucketsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryCalendarsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryCatchNodeFromItemArgs = {
  itemName: Scalars['String'];
};


export type QueryCatchNodeFromOperationArgs = {
  operationName: Scalars['String'];
};


export type QueryCatchNodeFromResourceArgs = {
  resourceName: Scalars['String'];
};


export type QueryCustomerArgs = {
  id: Scalars['Float'];
};


export type QueryCustomersArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryDemandArgs = {
  id: Scalars['Float'];
};


export type QueryDemandsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryDistributionArgs = {
  id: Scalars['Float'];
};


export type QueryDistributionOrderArgs = {
  id: Scalars['Float'];
};


export type QueryDistributionOrdersArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryDistributionsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryFindWorkByResArgs = {
  resourceId: Scalars['Float'];
};


export type QueryGetNodesArgs = {
  itemName?: InputMaybe<Scalars['String']>;
  operationName?: InputMaybe<Scalars['String']>;
};


export type QueryGetNodesByResourceArgs = {
  resourceName: Scalars['String'];
};


export type QueryGetOperationIdArgs = {
  itemId: Scalars['Float'];
};


export type QueryGetWorksByOperationArgs = {
  operationId: Scalars['Float'];
};


export type QueryInventoryArgs = {
  id: Scalars['Float'];
};


export type QueryInventoryOrderArgs = {
  id: Scalars['Float'];
};


export type QueryInventoryOrdersArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryInventorysArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryItemArgs = {
  id: Scalars['Float'];
};


export type QueryItemSupplierArgs = {
  id: Scalars['Float'];
};


export type QueryItemSuppliersArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryItemsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryLocationArgs = {
  id: Scalars['Float'];
};


export type QueryLocationsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryMatrixArgs = {
  id: Scalars['Float'];
};


export type QueryMatrixsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryOperationArgs = {
  id: Scalars['Float'];
};


export type QueryOperationMaterialArgs = {
  id: Scalars['Float'];
};


export type QueryOperationMaterialsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryOperationResourceArgs = {
  id: Scalars['Float'];
};


export type QueryOperationResourcesArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryOperationsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryOrderArgs = {
  id: Scalars['Float'];
};


export type QueryOrdersArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryPurchaseArgs = {
  id: Scalars['Float'];
};


export type QueryPurchasesArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryResourceArgs = {
  id: Scalars['Float'];
};


export type QueryResourcesArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QuerySalesArgs = {
  id: Scalars['Float'];
};


export type QuerySalessArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QuerySkillArgs = {
  id: Scalars['Float'];
};


export type QuerySkillsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QuerySupplierArgs = {
  id: Scalars['Float'];
};


export type QuerySuppliersArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryTempMissionArgs = {
  id: Scalars['Float'];
};


export type QueryTempMissionsArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryTimeTableArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryUsersArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryWorkArgs = {
  id: Scalars['Float'];
};


export type QueryWorksArgs = {
  conditions?: InputMaybe<Array<ConditionType>>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type Resource = PostgresClass & {
  __typename?: 'Resource';
  calendar: Calendar;
  calendarBucket?: Maybe<CalendarBucket>;
  children?: Maybe<Array<Resource>>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  location?: Maybe<Location>;
  maximum: Scalars['Int'];
  name: Scalars['String'];
  owner?: Maybe<Resource>;
  skills?: Maybe<Array<Skill>>;
  updatedAt: Scalars['String'];
  works: Array<Work>;
};

export type ResourceCreateResponse = {
  __typename?: 'ResourceCreateResponse';
  data?: Maybe<Resource>;
  errors?: Maybe<Array<FieldError>>;
};

export type ResourceInput = {
  calendarBucketId: Scalars['Int'];
  locationId: Scalars['Int'];
  maximum: Scalars['Int'];
  name: Scalars['String'];
  ownerId?: InputMaybe<Scalars['Int']>;
};

export type ResourcesResponse = {
  __typename?: 'ResourcesResponse';
  data: Array<Resource>;
  total: Scalars['Int'];
};

export type Sales = PostgresClass & {
  __typename?: 'Sales';
  createdAt: Scalars['String'];
  customer: Customer;
  due: Scalars['String'];
  id: Scalars['Int'];
  item: Item;
  location: Location;
  name: Scalars['String'];
  priority: Scalars['Int'];
  quantity: Scalars['Int'];
  status: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SalessResponse = {
  __typename?: 'SalessResponse';
  data: Array<Sales>;
  total: Scalars['Int'];
};

export type Skill = PostgresClass & {
  __typename?: 'Skill';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  resources?: Maybe<Array<Resource>>;
  updatedAt: Scalars['String'];
};

export type SkillCreateResponse = {
  __typename?: 'SkillCreateResponse';
  data?: Maybe<Skill>;
  errors?: Maybe<Array<FieldError>>;
};

export type SkillInput = {
  name: Scalars['String'];
};

export type SkillsResponse = {
  __typename?: 'SkillsResponse';
  data: Array<Skill>;
  total: Scalars['Int'];
};

export type Supplier = PostgresClass & {
  __typename?: 'Supplier';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SupplierCreateResponse = {
  __typename?: 'SupplierCreateResponse';
  data?: Maybe<Supplier>;
  errors?: Maybe<Array<FieldError>>;
};

export type SupplierInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type SuppliersResponse = {
  __typename?: 'SuppliersResponse';
  data: Array<Supplier>;
  total: Scalars['Int'];
};

export type TempMission = PostgresClass & {
  __typename?: 'TempMission';
  createdAt: Scalars['String'];
  demand?: Maybe<Demand>;
  endDate: Scalars['Float'];
  id: Scalars['Int'];
  operation: Operation;
  parentId?: Maybe<Scalars['Int']>;
  parentType?: Maybe<Scalars['String']>;
  startDate: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type TempMissionsResponse = {
  __typename?: 'TempMissionsResponse';
  data: Array<TempMission>;
  total: Scalars['Int'];
};

export type TimeTable = PostgresClass & {
  __typename?: 'TimeTable';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  operation: Operation;
  order: Order;
  updatedAt: Scalars['String'];
  work: Work;
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type User = PostgresClass & {
  __typename?: 'User';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserCreateResponse = {
  __typename?: 'UserCreateResponse';
  data?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
  token?: Maybe<Token>;
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  data: Array<User>;
  total: Scalars['Int'];
};

export type Work = PostgresClass & {
  __typename?: 'Work';
  batch?: Maybe<Scalars['Int']>;
  completedQuantity: Scalars['Int'];
  createdAt: Scalars['String'];
  demand?: Maybe<Demand>;
  endDate: Scalars['Float'];
  id: Scalars['Int'];
  name: Scalars['String'];
  operation: Operation;
  owner?: Maybe<Work>;
  parentId?: Maybe<Scalars['Int']>;
  parentType?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  resource: Resource;
  startDate: Scalars['Float'];
  status: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type WorkCreateResponse = {
  __typename?: 'WorkCreateResponse';
  data?: Maybe<Work>;
  errors?: Maybe<Array<FieldError>>;
};

export type WorkInput = {
  completedQuantity: Scalars['Int'];
  demandId?: InputMaybe<Scalars['Int']>;
  endDate?: Scalars['DateTime'];
  name: Scalars['String'];
  operationId: Scalars['Int'];
  ownerId?: InputMaybe<Scalars['Int']>;
  quantity: Scalars['Int'];
  resource: Scalars['Int'];
  startDate?: Scalars['DateTime'];
  status?: Scalars['String'];
};

export type WorksResponse = {
  __typename?: 'WorksResponse';
  data: Array<Work>;
  total: Scalars['Int'];
};

export type AllNodes = {
  __typename?: 'allNodes';
  buffers: Array<Array<Scalars['String']>>;
  depth: Scalars['Int'];
  duration: Scalars['Int'];
  durationPerUnit?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  item: Item;
  kind: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
  operation: Scalars['String'];
  priority: Scalars['Int'];
  resources?: Maybe<Array<Wuhu>>;
};

export type ConditionType = {
  conditionName: Scalars['String'];
  conditionValue: Scalars['String'];
};

export type FindNodes = {
  __typename?: 'findNodes';
  id: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type TimeTableInput = {
  operation: Scalars['Float'];
  order: Scalars['Float'];
  work: Scalars['Float'];
};

export type TimeTableUpdateInput = {
  endTime: Scalars['Float'];
  operation?: InputMaybe<Scalars['Float']>;
  order?: InputMaybe<Scalars['Float']>;
  startTime: Scalars['Float'];
  work?: InputMaybe<Scalars['Float']>;
};

export type Wuhu = {
  __typename?: 'wuhu';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateCalendarMutationVariables = Exact<{
  data: CalendarInput;
}>;


export type CreateCalendarMutation = { __typename?: 'Mutation', createCalendar: { __typename?: 'CalendarCreateResponse', data?: { __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, value: number, priority: number, weekday: Array<string>, startDate: number, endDate: number, calendarBucket: { __typename?: 'CalendarBucket', createdAt: string, id: number, name: string, updatedAt: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateCalendarAndBucketMutationVariables = Exact<{
  calendarDatas: Array<CalendarInput> | CalendarInput;
  data: CalendarBucketInput;
}>;


export type CreateCalendarAndBucketMutation = { __typename?: 'Mutation', createCalendarAndBucket: { __typename?: 'CalendarBucketCreateResponse', data?: { __typename?: 'CalendarBucket', id: number, createdAt: string, updatedAt: string, name: string, calendars: Array<{ __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, startDate: number, endDate: number, value: number, priority: number, weekday: Array<string> }>, resource: Array<{ __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }> } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateCustomerMutationVariables = Exact<{
  data: CustomerInput;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer: { __typename?: 'CustomerCreateResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, data?: { __typename?: 'Customer', id: number, createdAt: string, updatedAt: string, name: string, description: string, order: Array<{ __typename?: 'Order', id: number, name: string, createdAt: string, updatedAt: string, priority: number, quantity: number, dueDate: number, status: string }> } | null } };

export type CreateDistributionMutationVariables = Exact<{
  data: DistributionInput;
}>;


export type CreateDistributionMutation = { __typename?: 'Mutation', createDistribution: { __typename?: 'DistributionCreateResponse', data?: { __typename?: 'Distribution', id: number, createdAt: string, updatedAt: string, leadTime: number, priority: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, origin: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null } };

export type CreateDistributionOrderMutationVariables = Exact<{
  data: DistributionOrderInput;
}>;


export type CreateDistributionOrderMutation = { __typename?: 'Mutation', createDistributionOrder: { __typename?: 'DistributionOrderCreateResponse', data?: { __typename?: 'DistributionOrder', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, shippingDate: number, receiptDate: number, status: string, destination: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null, origin: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateInventoryMutationVariables = Exact<{
  data: InventoryInput;
}>;


export type CreateInventoryMutation = { __typename?: 'Mutation', createInventory: { __typename?: 'InventoryCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Inventory', id: number, createdAt: string, updatedAt: string, onHand: number, Minimum: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null } };

export type CreateItemMutationVariables = Exact<{
  data: ItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'ItemCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Item', id: number, createdAt: string, name: string, updatedAt: string, description: string } | null } };

export type CreateItemSupplierMutationVariables = Exact<{
  data: ItemSupplierInput;
}>;


export type CreateItemSupplierMutation = { __typename?: 'Mutation', createItemSupplier: { __typename?: 'ItemSupplierCreateResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, data?: { __typename?: 'ItemSupplier', id: number, createdAt: string, updatedAt: string, leadTime: number, cost: number, priority: number, supplier: { __typename?: 'Supplier', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null } };

export type CreateLocationMutationVariables = Exact<{
  data: LocationInput;
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation: { __typename?: 'LocationCreateResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, data?: { __typename?: 'Location', id: number, name: string, createdAt: string, updatedAt: string, description: string } | null } };

export type CreateMatrixMutationVariables = Exact<{
  data: MatrixInput;
}>;


export type CreateMatrixMutation = { __typename?: 'Mutation', createMatrix: { __typename?: 'MatrixCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Matrix', id: number, createdAt: string, updatedAt: string, name: string, priority: number, Duration: number, cost: number, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }, to: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, from: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number } } | null } };

export type CreateOperationMutationVariables = Exact<{
  data: OperationInput;
}>;


export type CreateOperationMutation = { __typename?: 'Mutation', createOperation: { __typename?: 'OperationCreateResponse', data?: { __typename?: 'Operation', createdAt: string, duration: number, durationPerUnit: number, id: number, name: string, updatedAt: string, type: string, location: { __typename?: 'Location', id: number }, owner?: { __typename?: 'Operation', id: number, name: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateOperationMaterialMutationVariables = Exact<{
  data: OperationMaterialInput;
}>;


export type CreateOperationMaterialMutation = { __typename?: 'Mutation', createOperationMaterial: { __typename?: 'OperationMaterialCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'OperationMaterial', id: number, createdAt: string, updatedAt: string, type: string, quantity: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number } } | null } };

export type CreateOperationResourceMutationVariables = Exact<{
  data: OperationResourceInput;
}>;


export type CreateOperationResourceMutation = { __typename?: 'Mutation', createOperationResource: { __typename?: 'OperationResourceCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'OperationResource', id: number, createdAt: string, updatedAt: string, quantity: number, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number } } | null } };

export type CreateOrderMutationVariables = Exact<{
  data: OrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrderCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Order', id: number, name: string, priority: number, quantity: number, dueDate: number, status: string, createdAt: string, updatedAt: string, item: { __typename?: 'Item', id: number, name: string, createdAt: string, updatedAt: string, description: string }, location: { __typename?: 'Location', id: number, name: string, description: string, updatedAt: string, createdAt: string }, customer: { __typename?: 'Customer', createdAt: string, description: string, id: number, name: string, updatedAt: string } } | null } };

export type CreatePurchaseMutationVariables = Exact<{
  data: PurchaseInput;
}>;


export type CreatePurchaseMutation = { __typename?: 'Mutation', createPurchase: { __typename?: 'PurchaseCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Purchase', id: number, createdAt: string, updatedAt: string, name: string, status: string, quantity: number, orderingDate: number, receiptDate: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, supplier: { __typename?: 'Supplier', id: number, createdAt: string, updatedAt: string, name: string, description: string }, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null } | null } };

export type CreateResourceMutationVariables = Exact<{
  data: ResourceInput;
}>;


export type CreateResourceMutation = { __typename?: 'Mutation', createResource: { __typename?: 'ResourceCreateResponse', data?: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number, location?: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } | null, owner?: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number, calendar: { __typename?: 'Calendar', id: number, startTime: number, endTime: number, value: number, priority: number, weekday: Array<string> } } | null, calendarBucket?: { __typename?: 'CalendarBucket', id: number, createdAt: string, updatedAt: string, name: string } | null, skills?: Array<{ __typename?: 'Skill', id: number, createdAt: string, updatedAt: string, name: string }> | null, children?: Array<{ __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }> | null, works: Array<{ __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, parentId?: number | null, parentType?: string | null, batch?: number | null, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null, operation: { __typename?: 'Operation', id: number }, resource: { __typename?: 'Resource', id: number }, owner?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, parentId?: number | null, parentType?: string | null, batch?: number | null } | null }>, calendar: { __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, startDate: number, endDate: number, value: number, priority: number, weekday: Array<string> } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateSkillMutationVariables = Exact<{
  data: SkillInput;
}>;


export type CreateSkillMutation = { __typename?: 'Mutation', createSkill: { __typename?: 'SkillCreateResponse', data?: { __typename?: 'Skill', id: number, createdAt: string, updatedAt: string, name: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateSupplierMutationVariables = Exact<{
  data: SupplierInput;
}>;


export type CreateSupplierMutation = { __typename?: 'Mutation', createSupplier: { __typename?: 'SupplierCreateResponse', data?: { __typename?: 'Supplier', createdAt: string, description: string, id: number, name: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateWorkMutationVariables = Exact<{
  data: WorkInput;
}>;


export type CreateWorkMutation = { __typename?: 'Mutation', createWork: { __typename?: 'WorkCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, parentId?: number | null, parentType?: string | null, batch?: number | null, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string }, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null, owner?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string } | null, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number } } | null } };

export type DeletecalendarsMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeletecalendarsMutation = { __typename?: 'Mutation', deletecalendars: number };

export type DeletecalendarBucketsMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeletecalendarBucketsMutation = { __typename?: 'Mutation', deletecalendarBuckets: number };

export type DeletecustomersMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeletecustomersMutation = { __typename?: 'Mutation', deletecustomers: number };

export type DeletedistributionsMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeletedistributionsMutation = { __typename?: 'Mutation', deletedistributions: number };

export type DeletedistributionOrdersMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeletedistributionOrdersMutation = { __typename?: 'Mutation', deletedistributionOrders: number };

export type DeleteinventorysMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteinventorysMutation = { __typename?: 'Mutation', deleteinventorys: number };

export type DeleteitemSuppliersMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteitemSuppliersMutation = { __typename?: 'Mutation', deleteitemSuppliers: number };

export type DeleteitemsMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteitemsMutation = { __typename?: 'Mutation', deleteitems: number };

export type DeletematrixsMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeletematrixsMutation = { __typename?: 'Mutation', deletematrixs: number };

export type DeleteoperationMaterialsMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteoperationMaterialsMutation = { __typename?: 'Mutation', deleteoperationMaterials: number };

export type DeleteordersMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteordersMutation = { __typename?: 'Mutation', deleteorders: number };

export type DeletepurchasesMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeletepurchasesMutation = { __typename?: 'Mutation', deletepurchases: number };

export type DeleteresourcesMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteresourcesMutation = { __typename?: 'Mutation', deleteresources: number };

export type DeleteskillsMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteskillsMutation = { __typename?: 'Mutation', deleteskills: number };

export type DeleteworksMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteworksMutation = { __typename?: 'Mutation', deleteworks: number };

export type DeletelocationsMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeletelocationsMutation = { __typename?: 'Mutation', deletelocations: number };

export type DeleteoperationResourcesMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteoperationResourcesMutation = { __typename?: 'Mutation', deleteoperationResources: number };

export type DeleteoperationsMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteoperationsMutation = { __typename?: 'Mutation', deleteoperations: number };

export type DeletesuppliersMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeletesuppliersMutation = { __typename?: 'Mutation', deletesuppliers: number };

export type ExecMutationVariables = Exact<{
  locationName: Scalars['String'];
  quantity: Scalars['Int'];
  itemName: Scalars['String'];
}>;


export type ExecMutation = { __typename?: 'Mutation', exec: string };

export type LoginMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserCreateResponse', data?: { __typename?: 'User', createdAt: string, id: number, updatedAt: string, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, token?: { __typename?: 'Token', token: string } | null } };

export type UpdateWorkMutationVariables = Exact<{
  data: WorkInput;
  updateWorkId: Scalars['Float'];
}>;


export type UpdateWorkMutation = { __typename?: 'Mutation', updateWork: { __typename?: 'WorkCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, parentId?: number | null, parentType?: string | null, batch?: number | null, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, owner?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string } | null, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number } } | null } };

export type UpdateCalendarMutationVariables = Exact<{
  data: CalendarInput;
  updateCalendarId: Scalars['Float'];
}>;


export type UpdateCalendarMutation = { __typename?: 'Mutation', updateCalendar: { __typename?: 'CalendarCreateResponse', data?: { __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, value: number, priority: number, weekday: Array<string>, endDate: number, startDate: number, calendarBucket: { __typename?: 'CalendarBucket', createdAt: string, id: number, name: string, updatedAt: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateCalendarBucketMutationVariables = Exact<{
  data: CalendarBucketInput;
  updateCalendarBucketId: Scalars['Float'];
}>;


export type UpdateCalendarBucketMutation = { __typename?: 'Mutation', updateCalendarBucket: { __typename?: 'CalendarBucketCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'CalendarBucket', id: number, createdAt: string, updatedAt: string, name: string, calendars: Array<{ __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, startDate: number, endDate: number, value: number, priority: number, weekday: Array<string> }>, resource: Array<{ __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }> } | null } };

export type UpdateCustomerMutationVariables = Exact<{
  data: CustomerInput;
  updateCustomerId: Scalars['Float'];
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', updateCustomer: { __typename?: 'CustomerCreateResponse', data?: { __typename?: 'Customer', id: number, name: string, description: string, createdAt: string, updatedAt: string, order: Array<{ __typename?: 'Order', id: number, name: string, createdAt: string, updatedAt: string, priority: number, quantity: number, dueDate: number, status: string }> } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateDistributionMutationVariables = Exact<{
  data: DistributionInput;
  updateDistributionId: Scalars['Float'];
}>;


export type UpdateDistributionMutation = { __typename?: 'Mutation', updateDistribution: { __typename?: 'DistributionCreateResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, data?: { __typename?: 'Distribution', id: number, createdAt: string, updatedAt: string, leadTime: number, priority: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, origin: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null } };

export type UpdateDistributionOrderMutationVariables = Exact<{
  data: DistributionOrderInput;
  updateDistributionOrderId: Scalars['Float'];
}>;


export type UpdateDistributionOrderMutation = { __typename?: 'Mutation', updateDistributionOrder: { __typename?: 'DistributionOrderCreateResponse', data?: { __typename?: 'DistributionOrder', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, shippingDate: number, receiptDate: number, status: string, destination: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, origin: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateInventoryMutationVariables = Exact<{
  data: InventoryInput;
  updateInventoryId: Scalars['Float'];
}>;


export type UpdateInventoryMutation = { __typename?: 'Mutation', updateInventory: { __typename?: 'InventoryCreateResponse', data?: { __typename?: 'Inventory', id: number, createdAt: string, updatedAt: string, onHand: number, Minimum: number, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null, errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null } };

export type UpdateItemMutationVariables = Exact<{
  data: ItemInput;
  updateItemId: Scalars['Float'];
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'ItemCreateResponse', data?: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateItemSupplierMutationVariables = Exact<{
  data: ItemSupplierInput;
  updateItemSupplierId: Scalars['Float'];
}>;


export type UpdateItemSupplierMutation = { __typename?: 'Mutation', updateItemSupplier: { __typename?: 'ItemSupplierCreateResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, data?: { __typename?: 'ItemSupplier', id: number, createdAt: string, updatedAt: string, leadTime: number, cost: number, priority: number, supplier: { __typename?: 'Supplier', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null } };

export type UpdateLocationMutationVariables = Exact<{
  data: LocationInput;
  updateLocationId: Scalars['Float'];
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation: { __typename?: 'LocationCreateResponse', data?: { __typename?: 'Location', id: number, name: string, description: string, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateMatrixMutationVariables = Exact<{
  data: MatrixInput;
  updateMatrixId: Scalars['Float'];
}>;


export type UpdateMatrixMutation = { __typename?: 'Mutation', updateMatrix: { __typename?: 'MatrixCreateResponse', data?: { __typename?: 'Matrix', id: number, createdAt: string, updatedAt: string, name: string, priority: number, Duration: number, cost: number, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }, to: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, from: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number } } | null } };

export type UpdateOperationMutationVariables = Exact<{
  data: OperationInput;
  updateOperationId: Scalars['Float'];
}>;


export type UpdateOperationMutation = { __typename?: 'Mutation', updateOperation: { __typename?: 'OperationCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, owner?: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number } | null, operationMaterials?: Array<{ __typename?: 'OperationMaterial', id: number, createdAt: string, updatedAt: string, type: string, priority: number, quantity: number }> | null, operationResources?: Array<{ __typename?: 'OperationResource', id: number, createdAt: string, updatedAt: string, quantity: number }> | null } | null } };

export type UpdateOperationMaterialMutationVariables = Exact<{
  data: OperationMaterialInput;
  updateOperationMaterialId: Scalars['Float'];
}>;


export type UpdateOperationMaterialMutation = { __typename?: 'Mutation', updateOperationMaterial: { __typename?: 'OperationMaterialCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'OperationMaterial', id: number, createdAt: string, updatedAt: string, type: string, quantity: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number } } | null } };

export type UpdateOperationResourceMutationVariables = Exact<{
  data: OperationResourceInput;
  updateOperationResourceId: Scalars['Float'];
}>;


export type UpdateOperationResourceMutation = { __typename?: 'Mutation', updateOperationResource: { __typename?: 'OperationResourceCreateResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, data?: { __typename?: 'OperationResource', id: number, createdAt: string, updatedAt: string, quantity: number, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number } } | null } };

export type UpdateOrderMutationVariables = Exact<{
  data: OrderInput;
  updateOrderId: Scalars['Float'];
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder: { __typename?: 'OrderCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Order', id: number, name: string, createdAt: string, updatedAt: string, priority: number, quantity: number, dueDate: number, status: string, item: { __typename?: 'Item', name: string, id: number, createdAt: string, updatedAt: string, description: string }, location: { __typename?: 'Location', name: string, id: number, createdAt: string, updatedAt: string, description: string }, customer: { __typename?: 'Customer', name: string, id: number, createdAt: string, updatedAt: string, description: string } } | null } };

export type UpdatePurchaseMutationVariables = Exact<{
  data: PurchaseInput;
  updatePurchaseId: Scalars['Float'];
}>;


export type UpdatePurchaseMutation = { __typename?: 'Mutation', updatePurchase: { __typename?: 'PurchaseCreateResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, data?: { __typename?: 'Purchase', id: number, createdAt: string, updatedAt: string, name: string, status: string, quantity: number, orderingDate: number, receiptDate: number, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, supplier: { __typename?: 'Supplier', id: number, createdAt: string, updatedAt: string, name: string, description: string }, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null } | null } };

export type UpdateResourceMutationVariables = Exact<{
  data: ResourceInput;
  updateResourceId: Scalars['Float'];
}>;


export type UpdateResourceMutation = { __typename?: 'Mutation', updateResource: { __typename?: 'ResourceCreateResponse', data?: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number, location?: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, description: string, name: string } | null, calendarBucket?: { __typename?: 'CalendarBucket', id: number, createdAt: string, updatedAt: string, name: string } | null, owner?: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number, calendar: { __typename?: 'Calendar', id: number, startTime: number, endTime: number, value: number, priority: number, weekday: Array<string> } } | null, skills?: Array<{ __typename?: 'Skill', id: number, createdAt: string, updatedAt: string, name: string }> | null, children?: Array<{ __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }> | null, works: Array<{ __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, parentId?: number | null, parentType?: string | null, batch?: number | null, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null, operation: { __typename?: 'Operation', id: number }, resource: { __typename?: 'Resource', id: number }, owner?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, parentId?: number | null, parentType?: string | null, batch?: number | null } | null }>, calendar: { __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, startDate: number, endDate: number, value: number, priority: number, weekday: Array<string> } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateSkillMutationVariables = Exact<{
  data: SkillInput;
  updateSkillId: Scalars['Float'];
}>;


export type UpdateSkillMutation = { __typename?: 'Mutation', updateSkill: { __typename?: 'SkillCreateResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Skill', id: number, createdAt: string, updatedAt: string, name: string } | null } };

export type UpdateSupplierMutationVariables = Exact<{
  data: SupplierInput;
  updateSupplierId: Scalars['Float'];
}>;


export type UpdateSupplierMutation = { __typename?: 'Mutation', updateSupplier: { __typename?: 'SupplierCreateResponse', data?: { __typename?: 'Supplier', createdAt: string, description: string, id: number, name: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateTimeTableMutationVariables = Exact<{
  updateTimeTableId: Scalars['Float'];
  data: TimeTableUpdateInput;
}>;


export type UpdateTimeTableMutation = { __typename?: 'Mutation', updateTimeTable?: { __typename?: 'TimeTable', id: number, createdAt: string, updatedAt: string, work: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string }, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, order: { __typename?: 'Order', id: number, createdAt: string, updatedAt: string, name: string, priority: number, quantity: number, dueDate: number, status: string } } | null };

export type ItemsQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type ItemsQuery = { __typename?: 'Query', items?: { __typename?: 'ItemsResponse', total: number, data: Array<{ __typename?: 'Item', description: string, name: string, updatedAt: string, createdAt: string, id: number }> } | null };

export type CalendarQueryVariables = Exact<{
  calendarId: Scalars['Float'];
}>;


export type CalendarQuery = { __typename?: 'Query', calendar?: { __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, endDate: number, startDate: number, value: number, priority: number, weekday: Array<string>, calendarBucket: { __typename?: 'CalendarBucket', createdAt: string, id: number, name: string, updatedAt: string } } | null };

export type CalendarBucketsQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type CalendarBucketsQuery = { __typename?: 'Query', calendarBuckets?: { __typename?: 'CalendarBucketsResponse', total: number, data: Array<{ __typename?: 'CalendarBucket', id: number, createdAt: string, updatedAt: string, name: string, calendars: Array<{ __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, startDate: number, endDate: number, value: number, priority: number, weekday: Array<string> }>, resource: Array<{ __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }> }> } | null };

export type CalendarBucketQueryVariables = Exact<{
  calendarBucketId: Scalars['Float'];
}>;


export type CalendarBucketQuery = { __typename?: 'Query', calendarBucket?: { __typename?: 'CalendarBucket', id: number, createdAt: string, updatedAt: string, name: string, calendars: Array<{ __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, startDate: number, endDate: number, value: number, priority: number, weekday: Array<string> }>, resource: Array<{ __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }> } | null };

export type CalendarsQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type CalendarsQuery = { __typename?: 'Query', calendars?: { __typename?: 'CalendarsResponse', total: number, data: Array<{ __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, startDate: number, endDate: number, value: number, priority: number, weekday: Array<string>, calendarBucket: { __typename?: 'CalendarBucket', id: number, createdAt: string, updatedAt: string, name: string } }> } | null };

export type CatchNodeFromItemQueryVariables = Exact<{
  itemName: Scalars['String'];
}>;


export type CatchNodeFromItemQuery = { __typename?: 'Query', catchNodeFromItem: string };

export type CatchNodeFromOperationQueryVariables = Exact<{
  operationName: Scalars['String'];
}>;


export type CatchNodeFromOperationQuery = { __typename?: 'Query', catchNodeFromOperation: string };

export type CatchNodeFromResourceQueryVariables = Exact<{
  resourceName: Scalars['String'];
}>;


export type CatchNodeFromResourceQuery = { __typename?: 'Query', catchNodeFromResource: string };

export type CustomerQueryVariables = Exact<{
  customerId: Scalars['Float'];
}>;


export type CustomerQuery = { __typename?: 'Query', customer?: { __typename?: 'Customer', id: number, createdAt: string, updatedAt: string, name: string, description: string, order: Array<{ __typename?: 'Order', id: number, name: string, createdAt: string, updatedAt: string, priority: number, quantity: number, dueDate: number, status: string }> } | null };

export type CustomersQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type CustomersQuery = { __typename?: 'Query', customers?: { __typename?: 'CustomersResponse', total: number, data: Array<{ __typename?: 'Customer', id: number, createdAt: string, updatedAt: string, name: string, description: string, order: Array<{ __typename?: 'Order', id: number, name: string, createdAt: string, updatedAt: string, priority: number, quantity: number, dueDate: number, status: string }> }> } | null };

export type DemandsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
}>;


export type DemandsQuery = { __typename?: 'Query', demands?: { __typename?: 'DemandsResponse', total: number, data: Array<{ __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number }> } | null };

export type DistributionQueryVariables = Exact<{
  distributionId: Scalars['Float'];
}>;


export type DistributionQuery = { __typename?: 'Query', distribution?: { __typename?: 'Distribution', id: number, createdAt: string, updatedAt: string, priority: number, leadTime: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, origin: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null };

export type DistributionOrderQueryVariables = Exact<{
  distributionOrderId: Scalars['Float'];
}>;


export type DistributionOrderQuery = { __typename?: 'Query', distributionOrder?: { __typename?: 'DistributionOrder', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, shippingDate: number, receiptDate: number, status: string, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, origin: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, destination: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null } | null };

export type DistributionOrdersQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type DistributionOrdersQuery = { __typename?: 'Query', distributionOrders?: { __typename?: 'DistributionOrdersResponse', total: number, data: Array<{ __typename?: 'DistributionOrder', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, shippingDate: number, receiptDate: number, status: string, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, destination: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, origin: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null }> } | null };

export type DistributionsQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type DistributionsQuery = { __typename?: 'Query', distributions?: { __typename?: 'DistributionsResponse', total: number, data: Array<{ __typename?: 'Distribution', id: number, createdAt: string, updatedAt: string, priority: number, leadTime: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, origin: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } }> } | null };

export type FindWorkByResQueryVariables = Exact<{
  resourceId: Scalars['Float'];
}>;


export type FindWorkByResQuery = { __typename?: 'Query', findWorkByRes: Array<{ __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }, owner?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string } | null }> };

export type GetNodesQueryVariables = Exact<{
  itemName?: InputMaybe<Scalars['String']>;
  operationName?: InputMaybe<Scalars['String']>;
}>;


export type GetNodesQuery = { __typename?: 'Query', getNodes: { __typename?: 'NodesResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: Array<{ __typename?: 'Nodes', depth: number, operation?: string | null, buffers?: Array<Array<string>> | null, resources?: Array<Array<string>> | null, type: string, relDepth: number, location: string, duration: number, durationPerUnit: number, quantity: number }> | null } };

export type GetNodesByResourceQueryVariables = Exact<{
  resourceName: Scalars['String'];
}>;


export type GetNodesByResourceQuery = { __typename?: 'Query', getNodesByResource: { __typename?: 'NodesResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: Array<{ __typename?: 'Nodes', depth: number, operation?: string | null, buffers?: Array<Array<string>> | null, type: string, location: string, relDepth: number, duration: number, quantity: number, durationPerUnit: number, resources?: Array<Array<string>> | null }> | null } };

export type GetWorksByOperationQueryVariables = Exact<{
  operationId: Scalars['Float'];
}>;


export type GetWorksByOperationQuery = { __typename?: 'Query', getWorksByOperation: Array<{ __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, owner?: { __typename?: 'Work', name: string } | null, operation: { __typename?: 'Operation', id: number, name: string } }> };

export type InventoryQueryVariables = Exact<{
  inventoryId: Scalars['Float'];
}>;


export type InventoryQuery = { __typename?: 'Query', inventory?: { __typename?: 'Inventory', id: number, createdAt: string, updatedAt: string, onHand: number, Minimum: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, updatedAt: string, createdAt: string, description: string, name: string } } | null };

export type InventorysQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type InventorysQuery = { __typename?: 'Query', inventorys?: { __typename?: 'InventorysResponse', total: number, data: Array<{ __typename?: 'Inventory', id: number, createdAt: string, updatedAt: string, onHand: number, Minimum: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, description: string, name: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } }> } | null };

export type ItemQueryVariables = Exact<{
  itemId: Scalars['Float'];
}>;


export type ItemQuery = { __typename?: 'Query', item?: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string } | null };

export type ItemSupplierQueryVariables = Exact<{
  itemSupplierId: Scalars['Float'];
}>;


export type ItemSupplierQuery = { __typename?: 'Query', itemSupplier?: { __typename?: 'ItemSupplier', id: number, createdAt: string, updatedAt: string, leadTime: number, cost: number, priority: number, supplier: { __typename?: 'Supplier', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null };

export type ItemSuppliersQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type ItemSuppliersQuery = { __typename?: 'Query', itemSuppliers?: { __typename?: 'ItemSuppliersResponse', total: number, data: Array<{ __typename?: 'ItemSupplier', id: number, createdAt: string, updatedAt: string, leadTime: number, priority: number, cost: number, supplier: { __typename?: 'Supplier', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string } }> } | null };

export type LocationQueryVariables = Exact<{
  locationId: Scalars['Float'];
}>;


export type LocationQuery = { __typename?: 'Query', location?: { __typename?: 'Location', id: number, name: string, description: string, createdAt: string, updatedAt: string } | null };

export type LocationsQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type LocationsQuery = { __typename?: 'Query', locations?: { __typename?: 'LocationsResponse', total: number, data: Array<{ __typename?: 'Location', id: number, name: string, description: string, updatedAt: string, createdAt: string }> } | null };

export type MatrixQueryVariables = Exact<{
  matrixId: Scalars['Float'];
}>;


export type MatrixQuery = { __typename?: 'Query', matrix?: { __typename?: 'Matrix', id: number, createdAt: string, updatedAt: string, name: string, priority: number, Duration: number, cost: number, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }, from: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, to: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number } } | null };

export type MatrixsQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type MatrixsQuery = { __typename?: 'Query', matrixs?: { __typename?: 'MatrixsResponse', total: number, data: Array<{ __typename?: 'Matrix', id: number, createdAt: string, updatedAt: string, name: string, priority: number, Duration: number, cost: number, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }, to: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, from: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number } }> } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserCreateResponse', data?: { __typename?: 'User', createdAt: string, id: number, updatedAt: string, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, token?: { __typename?: 'Token', token: string } | null } };

export type OperationQueryVariables = Exact<{
  operationId: Scalars['Float'];
}>;


export type OperationQuery = { __typename?: 'Query', operation?: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, owner?: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number } | null, operationMaterials?: Array<{ __typename?: 'OperationMaterial', id: number, createdAt: string, updatedAt: string, type: string, priority: number, quantity: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string } }> | null, operationResources?: Array<{ __typename?: 'OperationResource', id: number, createdAt: string, updatedAt: string, quantity: number }> | null, Works?: Array<{ __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string }> | null } | null };

export type OperationMaterialQueryVariables = Exact<{
  operationMaterialId: Scalars['Float'];
}>;


export type OperationMaterialQuery = { __typename?: 'Query', operationMaterial?: { __typename?: 'OperationMaterial', id: number, createdAt: string, updatedAt: string, type: string, quantity: number, priority: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number } } | null };

export type OperationMaterialsQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type OperationMaterialsQuery = { __typename?: 'Query', operationMaterials?: { __typename?: 'OperationMaterialsResponse', total: number, data: Array<{ __typename?: 'OperationMaterial', id: number, createdAt: string, updatedAt: string, type: string, quantity: number, priority: number, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number } }> } | null };

export type OperationResourceQueryVariables = Exact<{
  operationResourceId: Scalars['Float'];
}>;


export type OperationResourceQuery = { __typename?: 'Query', operationResource?: { __typename?: 'OperationResource', id: number, createdAt: string, updatedAt: string, quantity: number, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number } } | null };

export type OperationResourcesQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type OperationResourcesQuery = { __typename?: 'Query', operationResources?: { __typename?: 'OperationResourcesResponse', total: number, data: Array<{ __typename?: 'OperationResource', id: number, createdAt: string, updatedAt: string, quantity: number, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number } }> } | null };

export type OperationsQueryVariables = Exact<{
  size?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
}>;


export type OperationsQuery = { __typename?: 'Query', operations?: { __typename?: 'OperationsResponse', total: number, data: Array<{ __typename?: 'Operation', duration: number, durationPerUnit: number, id: number, name: string, type: string, updatedAt: string, location: { __typename?: 'Location', id: number, name: string }, owner?: { __typename?: 'Operation', name: string, id: number } | null, operationResources?: Array<{ __typename?: 'OperationResource', id: number, resource: { __typename?: 'Resource', id: number, name: string, maximum: number } }> | null, operationMaterials?: Array<{ __typename?: 'OperationMaterial', id: number, priority: number, type: string, item: { __typename?: 'Item', id: number, name: string } }> | null }> } | null };

export type OrderQueryVariables = Exact<{
  orderId: Scalars['Float'];
}>;


export type OrderQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id: number, createdAt: string, updatedAt: string, name: string, priority: number, quantity: number, dueDate: number, status: string, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, customer: { __typename?: 'Customer', id: number, createdAt: string, updatedAt: string, name: string, description: string } } | null };

export type OrdersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
}>;


export type OrdersQuery = { __typename?: 'Query', orders?: { __typename?: 'OrdersResponse', total: number, data: Array<{ __typename?: 'Order', id: number, createdAt: string, updatedAt: string, name: string, priority: number, quantity: number, dueDate: number, status: string, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, customer: { __typename?: 'Customer', id: number, createdAt: string, updatedAt: string, name: string, description: string } }> } | null };

export type PurchaseQueryVariables = Exact<{
  purchaseId: Scalars['Float'];
}>;


export type PurchaseQuery = { __typename?: 'Query', purchase?: { __typename?: 'Purchase', id: number, createdAt: string, updatedAt: string, name: string, status: string, quantity: number, orderingDate: number, receiptDate: number, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, supplier: { __typename?: 'Supplier', id: number, createdAt: string, updatedAt: string, name: string, description: string }, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null } | null };

export type PurchasesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
}>;


export type PurchasesQuery = { __typename?: 'Query', purchases?: { __typename?: 'PurchasesResponse', total: number, data: Array<{ __typename?: 'Purchase', id: number, createdAt: string, updatedAt: string, name: string, status: string, quantity: number, orderingDate: number, receiptDate: number, location: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string }, item: { __typename?: 'Item', id: number, createdAt: string, updatedAt: string, name: string, description: string }, supplier: { __typename?: 'Supplier', id: number, createdAt: string, updatedAt: string, name: string, description: string }, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null }> } | null };

export type ResourceQueryVariables = Exact<{
  resourceId: Scalars['Float'];
}>;


export type ResourceQuery = { __typename?: 'Query', resource?: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number, location?: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } | null, owner?: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number, calendar: { __typename?: 'Calendar', id: number, startTime: number, endTime: number, value: number, priority: number, weekday: Array<string> } } | null, calendarBucket?: { __typename?: 'CalendarBucket', id: number, createdAt: string, updatedAt: string, name: string } | null, skills?: Array<{ __typename?: 'Skill', id: number, createdAt: string, updatedAt: string, name: string }> | null, children?: Array<{ __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }> | null, works: Array<{ __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, parentId?: number | null, parentType?: string | null, batch?: number | null, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null, operation: { __typename?: 'Operation', id: number }, resource: { __typename?: 'Resource', id: number }, owner?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, parentId?: number | null, parentType?: string | null, batch?: number | null } | null }>, calendar: { __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, startDate: number, endDate: number, value: number, priority: number, weekday: Array<string> } } | null };

export type ResourcesQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type ResourcesQuery = { __typename?: 'Query', resources?: { __typename?: 'ResourcesResponse', total: number, data: Array<{ __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number, location?: { __typename?: 'Location', id: number, createdAt: string, updatedAt: string, name: string, description: string } | null, owner?: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number, calendar: { __typename?: 'Calendar', id: number, startTime: number, endTime: number, value: number, priority: number, weekday: Array<string> } } | null, calendarBucket?: { __typename?: 'CalendarBucket', id: number, createdAt: string, updatedAt: string, name: string } | null, skills?: Array<{ __typename?: 'Skill', id: number, createdAt: string, updatedAt: string, name: string }> | null, children?: Array<{ __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number }> | null, works: Array<{ __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, batch?: number | null, parentId?: number | null, parentType?: string | null, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null, operation: { __typename?: 'Operation', id: number }, resource: { __typename?: 'Resource', id: number }, owner?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, parentId?: number | null, parentType?: string | null, batch?: number | null } | null }>, calendar: { __typename?: 'Calendar', id: number, createdAt: string, updatedAt: string, startTime: number, endTime: number, startDate: number, endDate: number, value: number, priority: number, weekday: Array<string> } }> } | null };

export type SkillQueryVariables = Exact<{
  skillId: Scalars['Float'];
}>;


export type SkillQuery = { __typename?: 'Query', skill?: { __typename?: 'Skill', id: number, createdAt: string, updatedAt: string, name: string } | null };

export type SkillsQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type SkillsQuery = { __typename?: 'Query', skills?: { __typename?: 'SkillsResponse', total: number, data: Array<{ __typename?: 'Skill', id: number, createdAt: string, updatedAt: string, name: string }> } | null };

export type SupplierQueryVariables = Exact<{
  supplierId: Scalars['Float'];
}>;


export type SupplierQuery = { __typename?: 'Query', supplier?: { __typename?: 'Supplier', id: number, createdAt: string, updatedAt: string, name: string, description: string } | null };

export type SuppliersQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type SuppliersQuery = { __typename?: 'Query', suppliers?: { __typename?: 'SuppliersResponse', total: number, data: Array<{ __typename?: 'Supplier', createdAt: string, description: string, id: number, name: string, updatedAt: string }> } | null };

export type WorkQueryVariables = Exact<{
  workId: Scalars['Float'];
}>;


export type WorkQuery = { __typename?: 'Query', work?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, parentId?: number | null, parentType?: string | null, batch?: number | null, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null, operation: { __typename?: 'Operation', id: number, createdAt: string, updatedAt: string, name: string, type: string, duration: number, durationPerUnit: number }, owner?: { __typename?: 'Work', id: number, createdAt: string, updatedAt: string, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string } | null, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number } } | null };

export type WorksQueryVariables = Exact<{
  conditions?: InputMaybe<Array<ConditionType> | ConditionType>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;


export type WorksQuery = { __typename?: 'Query', works?: { __typename?: 'WorksResponse', total: number, data: Array<{ __typename?: 'Work', id: number, name: string, quantity: number, completedQuantity: number, startDate: number, endDate: number, status: string, createdAt: string, updatedAt: string, parentId?: number | null, parentType?: string | null, batch?: number | null, demand?: { __typename?: 'Demand', id: number, createdAt: string, updatedAt: string, name: string, description?: string | null, quantity: number } | null, operation: { __typename?: 'Operation', id: number, name: string, operationMaterials?: Array<{ __typename?: 'OperationMaterial', id: number, item: { __typename?: 'Item', name: string, id: number } }> | null, operationResources?: Array<{ __typename?: 'OperationResource', id: number, resource: { __typename?: 'Resource', id: number, name: string } }> | null }, owner?: { __typename?: 'Work', id: number, name: string } | null, resource: { __typename?: 'Resource', id: number, createdAt: string, updatedAt: string, name: string, maximum: number } }> } | null };


export const CreateCalendarDocument = gql`
    mutation CreateCalendar($data: CalendarInput!) {
  createCalendar(data: $data) {
    data {
      id
      createdAt
      updatedAt
      startTime
      endTime
      value
      priority
      weekday
      startDate
      endDate
      calendarBucket {
        createdAt
        id
        name
        updatedAt
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateCalendarMutation() {
  return Urql.useMutation<CreateCalendarMutation, CreateCalendarMutationVariables>(CreateCalendarDocument);
};
export const CreateCalendarAndBucketDocument = gql`
    mutation CreateCalendarAndBucket($calendarDatas: [CalendarInput!]!, $data: CalendarBucketInput!) {
  createCalendarAndBucket(calendarDatas: $calendarDatas, data: $data) {
    data {
      id
      createdAt
      updatedAt
      name
      calendars {
        id
        createdAt
        updatedAt
        startTime
        endTime
        startDate
        endDate
        value
        priority
        weekday
      }
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateCalendarAndBucketMutation() {
  return Urql.useMutation<CreateCalendarAndBucketMutation, CreateCalendarAndBucketMutationVariables>(CreateCalendarAndBucketDocument);
};
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($data: CustomerInput!) {
  createCustomer(data: $data) {
    errors {
      message
      field
    }
    data {
      id
      createdAt
      updatedAt
      name
      description
      order {
        id
        name
        createdAt
        updatedAt
        priority
        quantity
        dueDate
        status
      }
    }
  }
}
    `;

export function useCreateCustomerMutation() {
  return Urql.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument);
};
export const CreateDistributionDocument = gql`
    mutation CreateDistribution($data: DistributionInput!) {
  createDistribution(data: $data) {
    data {
      id
      createdAt
      updatedAt
      leadTime
      priority
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      origin {
        id
        createdAt
        updatedAt
        name
        description
      }
    }
  }
}
    `;

export function useCreateDistributionMutation() {
  return Urql.useMutation<CreateDistributionMutation, CreateDistributionMutationVariables>(CreateDistributionDocument);
};
export const CreateDistributionOrderDocument = gql`
    mutation CreateDistributionOrder($data: DistributionOrderInput!) {
  createDistributionOrder(data: $data) {
    data {
      id
      createdAt
      updatedAt
      name
      quantity
      shippingDate
      receiptDate
      status
      destination {
        id
        createdAt
        updatedAt
        name
        description
      }
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      demand {
        id
        createdAt
        updatedAt
        name
        description
        quantity
      }
      origin {
        id
        createdAt
        updatedAt
        name
        description
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateDistributionOrderMutation() {
  return Urql.useMutation<CreateDistributionOrderMutation, CreateDistributionOrderMutationVariables>(CreateDistributionOrderDocument);
};
export const CreateInventoryDocument = gql`
    mutation CreateInventory($data: InventoryInput!) {
  createInventory(data: $data) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      onHand
      Minimum
    }
  }
}
    `;

export function useCreateInventoryMutation() {
  return Urql.useMutation<CreateInventoryMutation, CreateInventoryMutationVariables>(CreateInventoryDocument);
};
export const CreateItemDocument = gql`
    mutation CreateItem($data: ItemInput!) {
  createItem(data: $data) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      name
      updatedAt
      description
    }
  }
}
    `;

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument);
};
export const CreateItemSupplierDocument = gql`
    mutation CreateItemSupplier($data: ItemSupplierInput!) {
  createItemSupplier(data: $data) {
    errors {
      message
      field
    }
    data {
      id
      createdAt
      updatedAt
      leadTime
      cost
      supplier {
        id
        createdAt
        updatedAt
        name
        description
      }
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      priority
    }
  }
}
    `;

export function useCreateItemSupplierMutation() {
  return Urql.useMutation<CreateItemSupplierMutation, CreateItemSupplierMutationVariables>(CreateItemSupplierDocument);
};
export const CreateLocationDocument = gql`
    mutation CreateLocation($data: LocationInput!) {
  createLocation(data: $data) {
    errors {
      message
      field
    }
    data {
      id
      name
      createdAt
      updatedAt
      description
    }
  }
}
    `;

export function useCreateLocationMutation() {
  return Urql.useMutation<CreateLocationMutation, CreateLocationMutationVariables>(CreateLocationDocument);
};
export const CreateMatrixDocument = gql`
    mutation CreateMatrix($data: MatrixInput!) {
  createMatrix(data: $data) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      priority
      Duration
      cost
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
      to {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
      from {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
    }
  }
}
    `;

export function useCreateMatrixMutation() {
  return Urql.useMutation<CreateMatrixMutation, CreateMatrixMutationVariables>(CreateMatrixDocument);
};
export const CreateOperationDocument = gql`
    mutation CreateOperation($data: OperationInput!) {
  createOperation(data: $data) {
    data {
      createdAt
      duration
      durationPerUnit
      id
      name
      updatedAt
      type
      location {
        id
      }
      owner {
        id
        name
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateOperationMutation() {
  return Urql.useMutation<CreateOperationMutation, CreateOperationMutationVariables>(CreateOperationDocument);
};
export const CreateOperationMaterialDocument = gql`
    mutation CreateOperationMaterial($data: OperationMaterialInput!) {
  createOperationMaterial(data: $data) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      type
      quantity
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      operation {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
    }
  }
}
    `;

export function useCreateOperationMaterialMutation() {
  return Urql.useMutation<CreateOperationMaterialMutation, CreateOperationMaterialMutationVariables>(CreateOperationMaterialDocument);
};
export const CreateOperationResourceDocument = gql`
    mutation CreateOperationResource($data: OperationResourceInput!) {
  createOperationResource(data: $data) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      quantity
      operation {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
    }
  }
}
    `;

export function useCreateOperationResourceMutation() {
  return Urql.useMutation<CreateOperationResourceMutation, CreateOperationResourceMutationVariables>(CreateOperationResourceDocument);
};
export const CreateOrderDocument = gql`
    mutation CreateOrder($data: OrderInput!) {
  createOrder(data: $data) {
    errors {
      field
      message
    }
    data {
      id
      name
      priority
      quantity
      dueDate
      status
      createdAt
      updatedAt
      item {
        id
        name
        createdAt
        updatedAt
        description
      }
      location {
        id
        name
        description
        updatedAt
        createdAt
      }
      customer {
        createdAt
        description
        id
        name
        updatedAt
      }
    }
  }
}
    `;

export function useCreateOrderMutation() {
  return Urql.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument);
};
export const CreatePurchaseDocument = gql`
    mutation CreatePurchase($data: PurchaseInput!) {
  createPurchase(data: $data) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      status
      quantity
      orderingDate
      receiptDate
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      supplier {
        id
        createdAt
        updatedAt
        name
        description
      }
      demand {
        id
        createdAt
        updatedAt
        name
        description
        quantity
      }
    }
  }
}
    `;

export function useCreatePurchaseMutation() {
  return Urql.useMutation<CreatePurchaseMutation, CreatePurchaseMutationVariables>(CreatePurchaseDocument);
};
export const CreateResourceDocument = gql`
    mutation CreateResource($data: ResourceInput!) {
  createResource(data: $data) {
    data {
      id
      createdAt
      updatedAt
      name
      maximum
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      owner {
        id
        createdAt
        updatedAt
        name
        maximum
        calendar {
          id
          startTime
          endTime
          value
          priority
          weekday
        }
      }
      calendarBucket {
        id
        createdAt
        updatedAt
        name
      }
      skills {
        id
        createdAt
        updatedAt
        name
      }
      children {
        id
        createdAt
        updatedAt
        name
        maximum
      }
      works {
        id
        createdAt
        updatedAt
        name
        quantity
        completedQuantity
        startDate
        endDate
        status
        demand {
          id
          createdAt
          updatedAt
          name
          description
          quantity
        }
        operation {
          id
        }
        resource {
          id
        }
        parentId
        parentType
        batch
        owner {
          id
          createdAt
          updatedAt
          name
          quantity
          completedQuantity
          startDate
          endDate
          status
          parentId
          parentType
          batch
        }
      }
      calendar {
        id
        createdAt
        updatedAt
        startTime
        endTime
        startDate
        endDate
        value
        priority
        weekday
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateResourceMutation() {
  return Urql.useMutation<CreateResourceMutation, CreateResourceMutationVariables>(CreateResourceDocument);
};
export const CreateSkillDocument = gql`
    mutation CreateSkill($data: SkillInput!) {
  createSkill(data: $data) {
    data {
      id
      createdAt
      updatedAt
      name
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateSkillMutation() {
  return Urql.useMutation<CreateSkillMutation, CreateSkillMutationVariables>(CreateSkillDocument);
};
export const CreateSupplierDocument = gql`
    mutation CreateSupplier($data: SupplierInput!) {
  createSupplier(data: $data) {
    data {
      createdAt
      description
      id
      name
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateSupplierMutation() {
  return Urql.useMutation<CreateSupplierMutation, CreateSupplierMutationVariables>(CreateSupplierDocument);
};
export const CreateWorkDocument = gql`
    mutation CreateWork($data: WorkInput!) {
  createWork(data: $data) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      operation {
        id
        createdAt
        updatedAt
        name
        type
      }
      demand {
        id
        createdAt
        updatedAt
        name
        description
        quantity
      }
      quantity
      completedQuantity
      startDate
      endDate
      owner {
        id
        createdAt
        updatedAt
        name
        quantity
        completedQuantity
        startDate
        endDate
        status
      }
      status
      parentId
      parentType
      batch
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
    }
  }
}
    `;

export function useCreateWorkMutation() {
  return Urql.useMutation<CreateWorkMutation, CreateWorkMutationVariables>(CreateWorkDocument);
};
export const DeletecalendarsDocument = gql`
    mutation Deletecalendars($ids: [Int!]!) {
  deletecalendars(ids: $ids)
}
    `;

export function useDeletecalendarsMutation() {
  return Urql.useMutation<DeletecalendarsMutation, DeletecalendarsMutationVariables>(DeletecalendarsDocument);
};
export const DeletecalendarBucketsDocument = gql`
    mutation DeletecalendarBuckets($ids: [Int!]!) {
  deletecalendarBuckets(ids: $ids)
}
    `;

export function useDeletecalendarBucketsMutation() {
  return Urql.useMutation<DeletecalendarBucketsMutation, DeletecalendarBucketsMutationVariables>(DeletecalendarBucketsDocument);
};
export const DeletecustomersDocument = gql`
    mutation Deletecustomers($ids: [Int!]!) {
  deletecustomers(ids: $ids)
}
    `;

export function useDeletecustomersMutation() {
  return Urql.useMutation<DeletecustomersMutation, DeletecustomersMutationVariables>(DeletecustomersDocument);
};
export const DeletedistributionsDocument = gql`
    mutation Deletedistributions($ids: [Int!]!) {
  deletedistributions(ids: $ids)
}
    `;

export function useDeletedistributionsMutation() {
  return Urql.useMutation<DeletedistributionsMutation, DeletedistributionsMutationVariables>(DeletedistributionsDocument);
};
export const DeletedistributionOrdersDocument = gql`
    mutation DeletedistributionOrders($ids: [Int!]!) {
  deletedistributionOrders(ids: $ids)
}
    `;

export function useDeletedistributionOrdersMutation() {
  return Urql.useMutation<DeletedistributionOrdersMutation, DeletedistributionOrdersMutationVariables>(DeletedistributionOrdersDocument);
};
export const DeleteinventorysDocument = gql`
    mutation Deleteinventorys($ids: [Int!]!) {
  deleteinventorys(ids: $ids)
}
    `;

export function useDeleteinventorysMutation() {
  return Urql.useMutation<DeleteinventorysMutation, DeleteinventorysMutationVariables>(DeleteinventorysDocument);
};
export const DeleteitemSuppliersDocument = gql`
    mutation DeleteitemSuppliers($ids: [Int!]!) {
  deleteitemSuppliers(ids: $ids)
}
    `;

export function useDeleteitemSuppliersMutation() {
  return Urql.useMutation<DeleteitemSuppliersMutation, DeleteitemSuppliersMutationVariables>(DeleteitemSuppliersDocument);
};
export const DeleteitemsDocument = gql`
    mutation Deleteitems($ids: [Int!]!) {
  deleteitems(ids: $ids)
}
    `;

export function useDeleteitemsMutation() {
  return Urql.useMutation<DeleteitemsMutation, DeleteitemsMutationVariables>(DeleteitemsDocument);
};
export const DeletematrixsDocument = gql`
    mutation Deletematrixs($ids: [Int!]!) {
  deletematrixs(ids: $ids)
}
    `;

export function useDeletematrixsMutation() {
  return Urql.useMutation<DeletematrixsMutation, DeletematrixsMutationVariables>(DeletematrixsDocument);
};
export const DeleteoperationMaterialsDocument = gql`
    mutation DeleteoperationMaterials($ids: [Int!]!) {
  deleteoperationMaterials(ids: $ids)
}
    `;

export function useDeleteoperationMaterialsMutation() {
  return Urql.useMutation<DeleteoperationMaterialsMutation, DeleteoperationMaterialsMutationVariables>(DeleteoperationMaterialsDocument);
};
export const DeleteordersDocument = gql`
    mutation Deleteorders($ids: [Int!]!) {
  deleteorders(ids: $ids)
}
    `;

export function useDeleteordersMutation() {
  return Urql.useMutation<DeleteordersMutation, DeleteordersMutationVariables>(DeleteordersDocument);
};
export const DeletepurchasesDocument = gql`
    mutation Deletepurchases($ids: [Int!]!) {
  deletepurchases(ids: $ids)
}
    `;

export function useDeletepurchasesMutation() {
  return Urql.useMutation<DeletepurchasesMutation, DeletepurchasesMutationVariables>(DeletepurchasesDocument);
};
export const DeleteresourcesDocument = gql`
    mutation Deleteresources($ids: [Int!]!) {
  deleteresources(ids: $ids)
}
    `;

export function useDeleteresourcesMutation() {
  return Urql.useMutation<DeleteresourcesMutation, DeleteresourcesMutationVariables>(DeleteresourcesDocument);
};
export const DeleteskillsDocument = gql`
    mutation Deleteskills($ids: [Int!]!) {
  deleteskills(ids: $ids)
}
    `;

export function useDeleteskillsMutation() {
  return Urql.useMutation<DeleteskillsMutation, DeleteskillsMutationVariables>(DeleteskillsDocument);
};
export const DeleteworksDocument = gql`
    mutation Deleteworks($ids: [Int!]!) {
  deleteworks(ids: $ids)
}
    `;

export function useDeleteworksMutation() {
  return Urql.useMutation<DeleteworksMutation, DeleteworksMutationVariables>(DeleteworksDocument);
};
export const DeletelocationsDocument = gql`
    mutation Deletelocations($ids: [Int!]!) {
  deletelocations(ids: $ids)
}
    `;

export function useDeletelocationsMutation() {
  return Urql.useMutation<DeletelocationsMutation, DeletelocationsMutationVariables>(DeletelocationsDocument);
};
export const DeleteoperationResourcesDocument = gql`
    mutation DeleteoperationResources($ids: [Int!]!) {
  deleteoperationResources(ids: $ids)
}
    `;

export function useDeleteoperationResourcesMutation() {
  return Urql.useMutation<DeleteoperationResourcesMutation, DeleteoperationResourcesMutationVariables>(DeleteoperationResourcesDocument);
};
export const DeleteoperationsDocument = gql`
    mutation Deleteoperations($ids: [Int!]!) {
  deleteoperations(ids: $ids)
}
    `;

export function useDeleteoperationsMutation() {
  return Urql.useMutation<DeleteoperationsMutation, DeleteoperationsMutationVariables>(DeleteoperationsDocument);
};
export const DeletesuppliersDocument = gql`
    mutation Deletesuppliers($ids: [Int!]!) {
  deletesuppliers(ids: $ids)
}
    `;

export function useDeletesuppliersMutation() {
  return Urql.useMutation<DeletesuppliersMutation, DeletesuppliersMutationVariables>(DeletesuppliersDocument);
};
export const ExecDocument = gql`
    mutation Exec($locationName: String!, $quantity: Int!, $itemName: String!) {
  exec(locationName: $locationName, quantity: $quantity, itemName: $itemName)
}
    `;

export function useExecMutation() {
  return Urql.useMutation<ExecMutation, ExecMutationVariables>(ExecDocument);
};
export const LoginDocument = gql`
    mutation Login($data: UserInput!) {
  login(data: $data) {
    data {
      createdAt
      id
      updatedAt
      updatedAt
      username
    }
    errors {
      field
      message
    }
    token {
      token
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const UpdateWorkDocument = gql`
    mutation UpdateWork($data: WorkInput!, $updateWorkId: Float!) {
  updateWork(data: $data, id: $updateWorkId) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      quantity
      completedQuantity
      startDate
      endDate
      status
      demand {
        id
        createdAt
        updatedAt
        name
        description
        quantity
      }
      operation {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
      owner {
        id
        createdAt
        updatedAt
        name
        quantity
        completedQuantity
        startDate
        endDate
        status
      }
      parentId
      parentType
      batch
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
    }
  }
}
    `;

export function useUpdateWorkMutation() {
  return Urql.useMutation<UpdateWorkMutation, UpdateWorkMutationVariables>(UpdateWorkDocument);
};
export const UpdateCalendarDocument = gql`
    mutation UpdateCalendar($data: CalendarInput!, $updateCalendarId: Float!) {
  updateCalendar(data: $data, id: $updateCalendarId) {
    data {
      id
      createdAt
      updatedAt
      startTime
      endTime
      value
      priority
      weekday
      endDate
      startDate
      calendarBucket {
        createdAt
        id
        name
        updatedAt
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateCalendarMutation() {
  return Urql.useMutation<UpdateCalendarMutation, UpdateCalendarMutationVariables>(UpdateCalendarDocument);
};
export const UpdateCalendarBucketDocument = gql`
    mutation UpdateCalendarBucket($data: CalendarBucketInput!, $updateCalendarBucketId: Float!) {
  updateCalendarBucket(data: $data, id: $updateCalendarBucketId) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      calendars {
        id
        createdAt
        updatedAt
        startTime
        endTime
        startDate
        endDate
        value
        priority
        weekday
      }
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
    }
  }
}
    `;

export function useUpdateCalendarBucketMutation() {
  return Urql.useMutation<UpdateCalendarBucketMutation, UpdateCalendarBucketMutationVariables>(UpdateCalendarBucketDocument);
};
export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($data: CustomerInput!, $updateCustomerId: Float!) {
  updateCustomer(data: $data, id: $updateCustomerId) {
    data {
      id
      name
      description
      createdAt
      updatedAt
      order {
        id
        name
        createdAt
        updatedAt
        priority
        quantity
        dueDate
        status
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateCustomerMutation() {
  return Urql.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument);
};
export const UpdateDistributionDocument = gql`
    mutation UpdateDistribution($data: DistributionInput!, $updateDistributionId: Float!) {
  updateDistribution(data: $data, id: $updateDistributionId) {
    errors {
      message
      field
    }
    data {
      id
      createdAt
      updatedAt
      leadTime
      priority
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      origin {
        id
        createdAt
        updatedAt
        name
        description
      }
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
    }
  }
}
    `;

export function useUpdateDistributionMutation() {
  return Urql.useMutation<UpdateDistributionMutation, UpdateDistributionMutationVariables>(UpdateDistributionDocument);
};
export const UpdateDistributionOrderDocument = gql`
    mutation UpdateDistributionOrder($data: DistributionOrderInput!, $updateDistributionOrderId: Float!) {
  updateDistributionOrder(data: $data, id: $updateDistributionOrderId) {
    data {
      id
      createdAt
      updatedAt
      name
      quantity
      shippingDate
      receiptDate
      status
      destination {
        id
        createdAt
        updatedAt
        name
        description
      }
      demand {
        id
        createdAt
        updatedAt
        name
        description
        quantity
      }
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      origin {
        id
        createdAt
        updatedAt
        name
        description
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateDistributionOrderMutation() {
  return Urql.useMutation<UpdateDistributionOrderMutation, UpdateDistributionOrderMutationVariables>(UpdateDistributionOrderDocument);
};
export const UpdateInventoryDocument = gql`
    mutation UpdateInventory($data: InventoryInput!, $updateInventoryId: Float!) {
  updateInventory(data: $data, id: $updateInventoryId) {
    data {
      id
      createdAt
      updatedAt
      onHand
      Minimum
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
    }
    errors {
      message
      field
    }
  }
}
    `;

export function useUpdateInventoryMutation() {
  return Urql.useMutation<UpdateInventoryMutation, UpdateInventoryMutationVariables>(UpdateInventoryDocument);
};
export const UpdateItemDocument = gql`
    mutation UpdateItem($data: ItemInput!, $updateItemId: Float!) {
  updateItem(data: $data, id: $updateItemId) {
    data {
      id
      createdAt
      updatedAt
      name
      description
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateItemMutation() {
  return Urql.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument);
};
export const UpdateItemSupplierDocument = gql`
    mutation UpdateItemSupplier($data: ItemSupplierInput!, $updateItemSupplierId: Float!) {
  updateItemSupplier(data: $data, id: $updateItemSupplierId) {
    errors {
      message
      field
    }
    data {
      id
      createdAt
      updatedAt
      leadTime
      cost
      supplier {
        id
        createdAt
        updatedAt
        name
        description
      }
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      priority
    }
  }
}
    `;

export function useUpdateItemSupplierMutation() {
  return Urql.useMutation<UpdateItemSupplierMutation, UpdateItemSupplierMutationVariables>(UpdateItemSupplierDocument);
};
export const UpdateLocationDocument = gql`
    mutation UpdateLocation($data: LocationInput!, $updateLocationId: Float!) {
  updateLocation(data: $data, id: $updateLocationId) {
    data {
      id
      name
      description
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateLocationMutation() {
  return Urql.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument);
};
export const UpdateMatrixDocument = gql`
    mutation UpdateMatrix($data: MatrixInput!, $updateMatrixId: Float!) {
  updateMatrix(data: $data, id: $updateMatrixId) {
    data {
      id
      createdAt
      updatedAt
      name
      priority
      Duration
      cost
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
      to {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
      from {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
    }
  }
}
    `;

export function useUpdateMatrixMutation() {
  return Urql.useMutation<UpdateMatrixMutation, UpdateMatrixMutationVariables>(UpdateMatrixDocument);
};
export const UpdateOperationDocument = gql`
    mutation UpdateOperation($data: OperationInput!, $updateOperationId: Float!) {
  updateOperation(data: $data, id: $updateOperationId) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      type
      duration
      durationPerUnit
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      owner {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
      operationMaterials {
        id
        createdAt
        updatedAt
        type
        priority
        quantity
      }
      operationResources {
        id
        createdAt
        updatedAt
        quantity
      }
    }
  }
}
    `;

export function useUpdateOperationMutation() {
  return Urql.useMutation<UpdateOperationMutation, UpdateOperationMutationVariables>(UpdateOperationDocument);
};
export const UpdateOperationMaterialDocument = gql`
    mutation updateOperationMaterial($data: OperationMaterialInput!, $updateOperationMaterialId: Float!) {
  updateOperationMaterial(data: $data, id: $updateOperationMaterialId) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      type
      quantity
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      operation {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
    }
  }
}
    `;

export function useUpdateOperationMaterialMutation() {
  return Urql.useMutation<UpdateOperationMaterialMutation, UpdateOperationMaterialMutationVariables>(UpdateOperationMaterialDocument);
};
export const UpdateOperationResourceDocument = gql`
    mutation UpdateOperationResource($data: OperationResourceInput!, $updateOperationResourceId: Float!) {
  updateOperationResource(data: $data, id: $updateOperationResourceId) {
    errors {
      message
      field
    }
    data {
      id
      createdAt
      updatedAt
      quantity
      operation {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
    }
  }
}
    `;

export function useUpdateOperationResourceMutation() {
  return Urql.useMutation<UpdateOperationResourceMutation, UpdateOperationResourceMutationVariables>(UpdateOperationResourceDocument);
};
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($data: OrderInput!, $updateOrderId: Float!) {
  updateOrder(data: $data, id: $updateOrderId) {
    errors {
      field
      message
    }
    data {
      id
      name
      createdAt
      updatedAt
      item {
        name
        id
        createdAt
        updatedAt
        description
      }
      priority
      location {
        name
        id
        createdAt
        updatedAt
        description
      }
      customer {
        name
        id
        createdAt
        updatedAt
        description
      }
      quantity
      dueDate
      status
    }
  }
}
    `;

export function useUpdateOrderMutation() {
  return Urql.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument);
};
export const UpdatePurchaseDocument = gql`
    mutation UpdatePurchase($data: PurchaseInput!, $updatePurchaseId: Float!) {
  updatePurchase(data: $data, id: $updatePurchaseId) {
    errors {
      message
      field
    }
    data {
      id
      createdAt
      updatedAt
      name
      status
      quantity
      orderingDate
      receiptDate
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      supplier {
        id
        createdAt
        updatedAt
        name
        description
      }
      demand {
        id
        createdAt
        updatedAt
        name
        description
        quantity
      }
    }
  }
}
    `;

export function useUpdatePurchaseMutation() {
  return Urql.useMutation<UpdatePurchaseMutation, UpdatePurchaseMutationVariables>(UpdatePurchaseDocument);
};
export const UpdateResourceDocument = gql`
    mutation UpdateResource($data: ResourceInput!, $updateResourceId: Float!) {
  updateResource(data: $data, id: $updateResourceId) {
    data {
      id
      createdAt
      updatedAt
      name
      maximum
      location {
        id
        createdAt
        updatedAt
        description
        name
      }
      calendarBucket {
        id
        createdAt
        updatedAt
        name
      }
      owner {
        id
        createdAt
        updatedAt
        name
        maximum
        calendar {
          id
          startTime
          endTime
          value
          priority
          weekday
        }
      }
      skills {
        id
        createdAt
        updatedAt
        name
      }
      children {
        id
        createdAt
        updatedAt
        name
        maximum
      }
      works {
        id
        createdAt
        updatedAt
        name
        quantity
        completedQuantity
        startDate
        endDate
        status
        demand {
          id
          createdAt
          updatedAt
          name
          description
          quantity
        }
        operation {
          id
        }
        resource {
          id
        }
        parentId
        parentType
        batch
        owner {
          id
          createdAt
          updatedAt
          name
          quantity
          completedQuantity
          startDate
          endDate
          status
          parentId
          parentType
          batch
        }
      }
      calendar {
        id
        createdAt
        updatedAt
        startTime
        endTime
        startDate
        endDate
        value
        priority
        weekday
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateResourceMutation() {
  return Urql.useMutation<UpdateResourceMutation, UpdateResourceMutationVariables>(UpdateResourceDocument);
};
export const UpdateSkillDocument = gql`
    mutation UpdateSkill($data: SkillInput!, $updateSkillId: Float!) {
  updateSkill(data: $data, id: $updateSkillId) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
    }
  }
}
    `;

export function useUpdateSkillMutation() {
  return Urql.useMutation<UpdateSkillMutation, UpdateSkillMutationVariables>(UpdateSkillDocument);
};
export const UpdateSupplierDocument = gql`
    mutation UpdateSupplier($data: SupplierInput!, $updateSupplierId: Float!) {
  updateSupplier(data: $data, id: $updateSupplierId) {
    data {
      createdAt
      description
      id
      name
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateSupplierMutation() {
  return Urql.useMutation<UpdateSupplierMutation, UpdateSupplierMutationVariables>(UpdateSupplierDocument);
};
export const UpdateTimeTableDocument = gql`
    mutation UpdateTimeTable($updateTimeTableId: Float!, $data: timeTableUpdateInput!) {
  updateTimeTable(id: $updateTimeTableId, data: $data) {
    id
    createdAt
    updatedAt
    work {
      id
      createdAt
      updatedAt
      name
      quantity
      completedQuantity
      startDate
      endDate
      status
    }
    operation {
      id
      createdAt
      updatedAt
      name
      type
      duration
      durationPerUnit
    }
    order {
      id
      createdAt
      updatedAt
      name
      priority
      quantity
      dueDate
      status
    }
  }
}
    `;

export function useUpdateTimeTableMutation() {
  return Urql.useMutation<UpdateTimeTableMutation, UpdateTimeTableMutationVariables>(UpdateTimeTableDocument);
};
export const ItemsDocument = gql`
    query Items($conditions: [conditionType!], $page: Int, $size: Int) {
  items(conditions: $conditions, page: $page, size: $size) {
    data {
      description
      name
      updatedAt
      createdAt
      id
    }
    total
  }
}
    `;

export function useItemsQuery(options?: Omit<Urql.UseQueryArgs<ItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<ItemsQuery>({ query: ItemsDocument, ...options });
};
export const CalendarDocument = gql`
    query Calendar($calendarId: Float!) {
  calendar(id: $calendarId) {
    id
    createdAt
    updatedAt
    startTime
    endTime
    endDate
    startDate
    value
    priority
    weekday
    calendarBucket {
      createdAt
      id
      name
      updatedAt
    }
  }
}
    `;

export function useCalendarQuery(options: Omit<Urql.UseQueryArgs<CalendarQueryVariables>, 'query'>) {
  return Urql.useQuery<CalendarQuery>({ query: CalendarDocument, ...options });
};
export const CalendarBucketsDocument = gql`
    query CalendarBuckets($conditions: [conditionType!], $page: Int, $size: Int) {
  calendarBuckets(conditions: $conditions, page: $page, size: $size) {
    total
    data {
      id
      createdAt
      updatedAt
      name
      calendars {
        id
        createdAt
        updatedAt
        startTime
        endTime
        startDate
        endDate
        value
        priority
        weekday
      }
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
    }
  }
}
    `;

export function useCalendarBucketsQuery(options?: Omit<Urql.UseQueryArgs<CalendarBucketsQueryVariables>, 'query'>) {
  return Urql.useQuery<CalendarBucketsQuery>({ query: CalendarBucketsDocument, ...options });
};
export const CalendarBucketDocument = gql`
    query CalendarBucket($calendarBucketId: Float!) {
  calendarBucket(id: $calendarBucketId) {
    id
    createdAt
    updatedAt
    name
    calendars {
      id
      createdAt
      updatedAt
      startTime
      endTime
      startDate
      endDate
      value
      priority
      weekday
    }
    resource {
      id
      createdAt
      updatedAt
      name
      maximum
    }
  }
}
    `;

export function useCalendarBucketQuery(options: Omit<Urql.UseQueryArgs<CalendarBucketQueryVariables>, 'query'>) {
  return Urql.useQuery<CalendarBucketQuery>({ query: CalendarBucketDocument, ...options });
};
export const CalendarsDocument = gql`
    query Calendars($conditions: [conditionType!], $page: Int, $size: Int) {
  calendars(conditions: $conditions, page: $page, size: $size) {
    total
    data {
      id
      createdAt
      updatedAt
      startTime
      endTime
      startDate
      endDate
      value
      priority
      weekday
      calendarBucket {
        id
        createdAt
        updatedAt
        name
      }
    }
  }
}
    `;

export function useCalendarsQuery(options?: Omit<Urql.UseQueryArgs<CalendarsQueryVariables>, 'query'>) {
  return Urql.useQuery<CalendarsQuery>({ query: CalendarsDocument, ...options });
};
export const CatchNodeFromItemDocument = gql`
    query CatchNodeFromItem($itemName: String!) {
  catchNodeFromItem(itemName: $itemName)
}
    `;

export function useCatchNodeFromItemQuery(options: Omit<Urql.UseQueryArgs<CatchNodeFromItemQueryVariables>, 'query'>) {
  return Urql.useQuery<CatchNodeFromItemQuery>({ query: CatchNodeFromItemDocument, ...options });
};
export const CatchNodeFromOperationDocument = gql`
    query CatchNodeFromOperation($operationName: String!) {
  catchNodeFromOperation(operationName: $operationName)
}
    `;

export function useCatchNodeFromOperationQuery(options: Omit<Urql.UseQueryArgs<CatchNodeFromOperationQueryVariables>, 'query'>) {
  return Urql.useQuery<CatchNodeFromOperationQuery>({ query: CatchNodeFromOperationDocument, ...options });
};
export const CatchNodeFromResourceDocument = gql`
    query CatchNodeFromResource($resourceName: String!) {
  catchNodeFromResource(resourceName: $resourceName)
}
    `;

export function useCatchNodeFromResourceQuery(options: Omit<Urql.UseQueryArgs<CatchNodeFromResourceQueryVariables>, 'query'>) {
  return Urql.useQuery<CatchNodeFromResourceQuery>({ query: CatchNodeFromResourceDocument, ...options });
};
export const CustomerDocument = gql`
    query Customer($customerId: Float!) {
  customer(id: $customerId) {
    id
    createdAt
    updatedAt
    name
    description
    order {
      id
      name
      createdAt
      updatedAt
      priority
      quantity
      dueDate
      status
    }
  }
}
    `;

export function useCustomerQuery(options: Omit<Urql.UseQueryArgs<CustomerQueryVariables>, 'query'>) {
  return Urql.useQuery<CustomerQuery>({ query: CustomerDocument, ...options });
};
export const CustomersDocument = gql`
    query Customers($conditions: [conditionType!], $page: Int, $size: Int) {
  customers(conditions: $conditions, page: $page, size: $size) {
    data {
      id
      createdAt
      updatedAt
      name
      description
      order {
        id
        name
        createdAt
        updatedAt
        priority
        quantity
        dueDate
        status
      }
    }
    total
  }
}
    `;

export function useCustomersQuery(options?: Omit<Urql.UseQueryArgs<CustomersQueryVariables>, 'query'>) {
  return Urql.useQuery<CustomersQuery>({ query: CustomersDocument, ...options });
};
export const DemandsDocument = gql`
    query Demands($page: Int, $size: Int, $conditions: [conditionType!]) {
  demands(page: $page, size: $size, conditions: $conditions) {
    data {
      id
      createdAt
      updatedAt
      name
      description
      quantity
    }
    total
  }
}
    `;

export function useDemandsQuery(options?: Omit<Urql.UseQueryArgs<DemandsQueryVariables>, 'query'>) {
  return Urql.useQuery<DemandsQuery>({ query: DemandsDocument, ...options });
};
export const DistributionDocument = gql`
    query Distribution($distributionId: Float!) {
  distribution(id: $distributionId) {
    id
    createdAt
    updatedAt
    priority
    item {
      id
      createdAt
      updatedAt
      name
      description
    }
    location {
      id
      createdAt
      updatedAt
      name
      description
    }
    origin {
      id
      createdAt
      updatedAt
      name
      description
    }
    leadTime
  }
}
    `;

export function useDistributionQuery(options: Omit<Urql.UseQueryArgs<DistributionQueryVariables>, 'query'>) {
  return Urql.useQuery<DistributionQuery>({ query: DistributionDocument, ...options });
};
export const DistributionOrderDocument = gql`
    query DistributionOrder($distributionOrderId: Float!) {
  distributionOrder(id: $distributionOrderId) {
    id
    createdAt
    updatedAt
    name
    quantity
    shippingDate
    receiptDate
    status
    item {
      id
      createdAt
      updatedAt
      name
      description
    }
    origin {
      id
      createdAt
      updatedAt
      name
      description
    }
    destination {
      id
      createdAt
      updatedAt
      name
      description
    }
    demand {
      id
      createdAt
      updatedAt
      name
      description
      quantity
    }
  }
}
    `;

export function useDistributionOrderQuery(options: Omit<Urql.UseQueryArgs<DistributionOrderQueryVariables>, 'query'>) {
  return Urql.useQuery<DistributionOrderQuery>({ query: DistributionOrderDocument, ...options });
};
export const DistributionOrdersDocument = gql`
    query DistributionOrders($conditions: [conditionType!], $page: Int, $size: Int) {
  distributionOrders(conditions: $conditions, page: $page, size: $size) {
    data {
      id
      createdAt
      updatedAt
      name
      quantity
      shippingDate
      receiptDate
      status
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      destination {
        id
        createdAt
        updatedAt
        name
        description
      }
      origin {
        id
        createdAt
        updatedAt
        name
        description
      }
      demand {
        id
        createdAt
        updatedAt
        name
        description
        quantity
      }
    }
    total
  }
}
    `;

export function useDistributionOrdersQuery(options?: Omit<Urql.UseQueryArgs<DistributionOrdersQueryVariables>, 'query'>) {
  return Urql.useQuery<DistributionOrdersQuery>({ query: DistributionOrdersDocument, ...options });
};
export const DistributionsDocument = gql`
    query Distributions($conditions: [conditionType!], $page: Int, $size: Int) {
  distributions(conditions: $conditions, page: $page, size: $size) {
    data {
      id
      createdAt
      updatedAt
      priority
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      origin {
        id
        createdAt
        updatedAt
        name
        description
      }
      leadTime
    }
    total
  }
}
    `;

export function useDistributionsQuery(options?: Omit<Urql.UseQueryArgs<DistributionsQueryVariables>, 'query'>) {
  return Urql.useQuery<DistributionsQuery>({ query: DistributionsDocument, ...options });
};
export const FindWorkByResDocument = gql`
    query FindWorkByRes($resourceId: Float!) {
  findWorkByRes(resourceId: $resourceId) {
    id
    createdAt
    updatedAt
    name
    quantity
    completedQuantity
    startDate
    endDate
    status
    operation {
      id
      createdAt
      updatedAt
      name
      type
      duration
      durationPerUnit
    }
    resource {
      id
      createdAt
      updatedAt
      name
      maximum
    }
    owner {
      id
      createdAt
      updatedAt
      name
      quantity
      completedQuantity
      startDate
      endDate
      status
    }
  }
}
    `;

export function useFindWorkByResQuery(options: Omit<Urql.UseQueryArgs<FindWorkByResQueryVariables>, 'query'>) {
  return Urql.useQuery<FindWorkByResQuery>({ query: FindWorkByResDocument, ...options });
};
export const GetNodesDocument = gql`
    query GetNodes($itemName: String, $operationName: String) {
  getNodes(itemName: $itemName, operationName: $operationName) {
    errors {
      field
      message
    }
    data {
      depth
      operation
      buffers
      resources
      type
      relDepth
      location
      duration
      durationPerUnit
      quantity
    }
  }
}
    `;

export function useGetNodesQuery(options?: Omit<Urql.UseQueryArgs<GetNodesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNodesQuery>({ query: GetNodesDocument, ...options });
};
export const GetNodesByResourceDocument = gql`
    query GetNodesByResource($resourceName: String!) {
  getNodesByResource(resourceName: $resourceName) {
    errors {
      field
      message
    }
    data {
      depth
      operation
      buffers
      type
      location
      relDepth
      duration
      quantity
      durationPerUnit
      resources
    }
  }
}
    `;

export function useGetNodesByResourceQuery(options: Omit<Urql.UseQueryArgs<GetNodesByResourceQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNodesByResourceQuery>({ query: GetNodesByResourceDocument, ...options });
};
export const GetWorksByOperationDocument = gql`
    query GetWorksByOperation($operationId: Float!) {
  getWorksByOperation(operationId: $operationId) {
    id
    createdAt
    updatedAt
    name
    quantity
    completedQuantity
    startDate
    endDate
    status
    owner {
      name
    }
    operation {
      id
      name
    }
  }
}
    `;

export function useGetWorksByOperationQuery(options: Omit<Urql.UseQueryArgs<GetWorksByOperationQueryVariables>, 'query'>) {
  return Urql.useQuery<GetWorksByOperationQuery>({ query: GetWorksByOperationDocument, ...options });
};
export const InventoryDocument = gql`
    query Inventory($inventoryId: Float!) {
  inventory(id: $inventoryId) {
    id
    createdAt
    updatedAt
    onHand
    Minimum
    item {
      id
      createdAt
      updatedAt
      name
      description
    }
    location {
      id
      updatedAt
      createdAt
      description
      name
    }
  }
}
    `;

export function useInventoryQuery(options: Omit<Urql.UseQueryArgs<InventoryQueryVariables>, 'query'>) {
  return Urql.useQuery<InventoryQuery>({ query: InventoryDocument, ...options });
};
export const InventorysDocument = gql`
    query Inventorys($conditions: [conditionType!], $page: Int, $size: Int) {
  inventorys(conditions: $conditions, page: $page, size: $size) {
    total
    data {
      id
      createdAt
      updatedAt
      item {
        id
        createdAt
        updatedAt
        description
        name
      }
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      onHand
      Minimum
    }
  }
}
    `;

export function useInventorysQuery(options?: Omit<Urql.UseQueryArgs<InventorysQueryVariables>, 'query'>) {
  return Urql.useQuery<InventorysQuery>({ query: InventorysDocument, ...options });
};
export const ItemDocument = gql`
    query Item($itemId: Float!) {
  item(id: $itemId) {
    id
    createdAt
    updatedAt
    name
    description
  }
}
    `;

export function useItemQuery(options: Omit<Urql.UseQueryArgs<ItemQueryVariables>, 'query'>) {
  return Urql.useQuery<ItemQuery>({ query: ItemDocument, ...options });
};
export const ItemSupplierDocument = gql`
    query ItemSupplier($itemSupplierId: Float!) {
  itemSupplier(id: $itemSupplierId) {
    id
    createdAt
    updatedAt
    leadTime
    cost
    supplier {
      id
      createdAt
      updatedAt
      name
      description
    }
    location {
      id
      createdAt
      updatedAt
      name
      description
    }
    item {
      id
      createdAt
      updatedAt
      name
      description
    }
    priority
  }
}
    `;

export function useItemSupplierQuery(options: Omit<Urql.UseQueryArgs<ItemSupplierQueryVariables>, 'query'>) {
  return Urql.useQuery<ItemSupplierQuery>({ query: ItemSupplierDocument, ...options });
};
export const ItemSuppliersDocument = gql`
    query ItemSuppliers($conditions: [conditionType!], $page: Int, $size: Int) {
  itemSuppliers(conditions: $conditions, page: $page, size: $size) {
    total
    data {
      id
      createdAt
      updatedAt
      leadTime
      priority
      cost
      supplier {
        id
        createdAt
        updatedAt
        name
        description
      }
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
    }
  }
}
    `;

export function useItemSuppliersQuery(options?: Omit<Urql.UseQueryArgs<ItemSuppliersQueryVariables>, 'query'>) {
  return Urql.useQuery<ItemSuppliersQuery>({ query: ItemSuppliersDocument, ...options });
};
export const LocationDocument = gql`
    query Location($locationId: Float!) {
  location(id: $locationId) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;

export function useLocationQuery(options: Omit<Urql.UseQueryArgs<LocationQueryVariables>, 'query'>) {
  return Urql.useQuery<LocationQuery>({ query: LocationDocument, ...options });
};
export const LocationsDocument = gql`
    query locations($conditions: [conditionType!], $page: Int, $size: Int) {
  locations(conditions: $conditions, page: $page, size: $size) {
    data {
      id
      name
      description
      updatedAt
      createdAt
    }
    total
  }
}
    `;

export function useLocationsQuery(options?: Omit<Urql.UseQueryArgs<LocationsQueryVariables>, 'query'>) {
  return Urql.useQuery<LocationsQuery>({ query: LocationsDocument, ...options });
};
export const MatrixDocument = gql`
    query Matrix($matrixId: Float!) {
  matrix(id: $matrixId) {
    id
    createdAt
    updatedAt
    name
    priority
    Duration
    cost
    resource {
      id
      createdAt
      updatedAt
      name
      maximum
    }
    from {
      id
      createdAt
      updatedAt
      name
      type
      duration
      durationPerUnit
    }
    to {
      id
      createdAt
      updatedAt
      name
      type
      duration
      durationPerUnit
    }
  }
}
    `;

export function useMatrixQuery(options: Omit<Urql.UseQueryArgs<MatrixQueryVariables>, 'query'>) {
  return Urql.useQuery<MatrixQuery>({ query: MatrixDocument, ...options });
};
export const MatrixsDocument = gql`
    query Matrixs($conditions: [conditionType!], $page: Int, $size: Int) {
  matrixs(conditions: $conditions, page: $page, size: $size) {
    total
    data {
      id
      createdAt
      updatedAt
      name
      priority
      Duration
      cost
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
      to {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
      from {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
    }
  }
}
    `;

export function useMatrixsQuery(options?: Omit<Urql.UseQueryArgs<MatrixsQueryVariables>, 'query'>) {
  return Urql.useQuery<MatrixsQuery>({ query: MatrixsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    data {
      createdAt
      id
      updatedAt
      username
    }
    errors {
      field
      message
    }
    token {
      token
    }
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const OperationDocument = gql`
    query Operation($operationId: Float!) {
  operation(id: $operationId) {
    id
    createdAt
    updatedAt
    name
    type
    duration
    durationPerUnit
    location {
      id
      createdAt
      updatedAt
      name
      description
    }
    owner {
      id
      createdAt
      updatedAt
      name
      type
      duration
      durationPerUnit
    }
    operationMaterials {
      id
      createdAt
      updatedAt
      type
      priority
      quantity
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
    }
    operationResources {
      id
      createdAt
      updatedAt
      quantity
    }
    Works {
      id
      createdAt
      updatedAt
      name
      quantity
      completedQuantity
      startDate
      endDate
      status
    }
  }
}
    `;

export function useOperationQuery(options: Omit<Urql.UseQueryArgs<OperationQueryVariables>, 'query'>) {
  return Urql.useQuery<OperationQuery>({ query: OperationDocument, ...options });
};
export const OperationMaterialDocument = gql`
    query OperationMaterial($operationMaterialId: Float!) {
  operationMaterial(id: $operationMaterialId) {
    id
    createdAt
    updatedAt
    type
    quantity
    priority
    item {
      id
      createdAt
      updatedAt
      name
      description
    }
    operation {
      id
      createdAt
      updatedAt
      name
      type
      duration
      durationPerUnit
    }
  }
}
    `;

export function useOperationMaterialQuery(options: Omit<Urql.UseQueryArgs<OperationMaterialQueryVariables>, 'query'>) {
  return Urql.useQuery<OperationMaterialQuery>({ query: OperationMaterialDocument, ...options });
};
export const OperationMaterialsDocument = gql`
    query OperationMaterials($conditions: [conditionType!], $page: Int, $size: Int) {
  operationMaterials(conditions: $conditions, page: $page, size: $size) {
    total
    data {
      id
      createdAt
      updatedAt
      type
      quantity
      priority
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      operation {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
    }
  }
}
    `;

export function useOperationMaterialsQuery(options?: Omit<Urql.UseQueryArgs<OperationMaterialsQueryVariables>, 'query'>) {
  return Urql.useQuery<OperationMaterialsQuery>({ query: OperationMaterialsDocument, ...options });
};
export const OperationResourceDocument = gql`
    query OperationResource($operationResourceId: Float!) {
  operationResource(id: $operationResourceId) {
    id
    createdAt
    updatedAt
    quantity
    operation {
      id
      createdAt
      updatedAt
      name
      type
      duration
      durationPerUnit
    }
    resource {
      id
      createdAt
      updatedAt
      name
      maximum
    }
  }
}
    `;

export function useOperationResourceQuery(options: Omit<Urql.UseQueryArgs<OperationResourceQueryVariables>, 'query'>) {
  return Urql.useQuery<OperationResourceQuery>({ query: OperationResourceDocument, ...options });
};
export const OperationResourcesDocument = gql`
    query OperationResources($conditions: [conditionType!], $page: Int, $size: Int) {
  operationResources(conditions: $conditions, page: $page, size: $size) {
    total
    data {
      id
      createdAt
      updatedAt
      quantity
      operation {
        id
        createdAt
        updatedAt
        name
        type
        duration
        durationPerUnit
      }
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
    }
  }
}
    `;

export function useOperationResourcesQuery(options?: Omit<Urql.UseQueryArgs<OperationResourcesQueryVariables>, 'query'>) {
  return Urql.useQuery<OperationResourcesQuery>({ query: OperationResourcesDocument, ...options });
};
export const OperationsDocument = gql`
    query Operations($size: Int, $page: Int, $conditions: [conditionType!]) {
  operations(size: $size, page: $page, conditions: $conditions) {
    data {
      duration
      durationPerUnit
      id
      name
      type
      updatedAt
      location {
        id
        name
      }
      owner {
        name
        id
      }
      operationResources {
        id
        resource {
          id
          name
          maximum
        }
      }
      operationMaterials {
        id
        priority
        item {
          id
          name
        }
        type
      }
    }
    total
  }
}
    `;

export function useOperationsQuery(options?: Omit<Urql.UseQueryArgs<OperationsQueryVariables>, 'query'>) {
  return Urql.useQuery<OperationsQuery>({ query: OperationsDocument, ...options });
};
export const OrderDocument = gql`
    query Order($orderId: Float!) {
  order(id: $orderId) {
    id
    createdAt
    updatedAt
    name
    priority
    item {
      id
      createdAt
      updatedAt
      name
      description
    }
    location {
      id
      createdAt
      updatedAt
      name
      description
    }
    customer {
      id
      createdAt
      updatedAt
      name
      description
    }
    quantity
    dueDate
    status
  }
}
    `;

export function useOrderQuery(options: Omit<Urql.UseQueryArgs<OrderQueryVariables>, 'query'>) {
  return Urql.useQuery<OrderQuery>({ query: OrderDocument, ...options });
};
export const OrdersDocument = gql`
    query Orders($page: Int, $size: Int, $conditions: [conditionType!]) {
  orders(page: $page, size: $size, conditions: $conditions) {
    data {
      id
      createdAt
      updatedAt
      name
      priority
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      customer {
        id
        createdAt
        updatedAt
        name
        description
      }
      quantity
      dueDate
      status
    }
    total
  }
}
    `;

export function useOrdersQuery(options?: Omit<Urql.UseQueryArgs<OrdersQueryVariables>, 'query'>) {
  return Urql.useQuery<OrdersQuery>({ query: OrdersDocument, ...options });
};
export const PurchaseDocument = gql`
    query Purchase($purchaseId: Float!) {
  purchase(id: $purchaseId) {
    id
    createdAt
    updatedAt
    name
    status
    quantity
    orderingDate
    receiptDate
    location {
      id
      createdAt
      updatedAt
      name
      description
    }
    item {
      id
      createdAt
      updatedAt
      name
      description
    }
    supplier {
      id
      createdAt
      updatedAt
      name
      description
    }
    demand {
      id
      createdAt
      updatedAt
      name
      description
      quantity
    }
  }
}
    `;

export function usePurchaseQuery(options: Omit<Urql.UseQueryArgs<PurchaseQueryVariables>, 'query'>) {
  return Urql.useQuery<PurchaseQuery>({ query: PurchaseDocument, ...options });
};
export const PurchasesDocument = gql`
    query Purchases($page: Int, $size: Int, $conditions: [conditionType!]) {
  purchases(page: $page, size: $size, conditions: $conditions) {
    data {
      id
      createdAt
      updatedAt
      name
      status
      quantity
      orderingDate
      receiptDate
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      item {
        id
        createdAt
        updatedAt
        name
        description
      }
      supplier {
        id
        createdAt
        updatedAt
        name
        description
      }
      demand {
        id
        createdAt
        updatedAt
        name
        description
        quantity
      }
    }
    total
  }
}
    `;

export function usePurchasesQuery(options?: Omit<Urql.UseQueryArgs<PurchasesQueryVariables>, 'query'>) {
  return Urql.useQuery<PurchasesQuery>({ query: PurchasesDocument, ...options });
};
export const ResourceDocument = gql`
    query Resource($resourceId: Float!) {
  resource(id: $resourceId) {
    id
    createdAt
    updatedAt
    name
    maximum
    location {
      id
      createdAt
      updatedAt
      name
      description
    }
    owner {
      id
      createdAt
      updatedAt
      name
      maximum
      calendar {
        id
        startTime
        endTime
        value
        priority
        weekday
      }
    }
    calendarBucket {
      id
      createdAt
      updatedAt
      name
    }
    skills {
      id
      createdAt
      updatedAt
      name
    }
    children {
      id
      createdAt
      updatedAt
      name
      maximum
    }
    works {
      id
      createdAt
      updatedAt
      name
      quantity
      completedQuantity
      startDate
      endDate
      status
      demand {
        id
        createdAt
        updatedAt
        name
        description
        quantity
      }
      operation {
        id
      }
      resource {
        id
      }
      parentId
      parentType
      batch
      owner {
        id
        createdAt
        updatedAt
        name
        quantity
        completedQuantity
        startDate
        endDate
        status
        parentId
        parentType
        batch
      }
    }
    calendar {
      id
      createdAt
      updatedAt
      startTime
      endTime
      startDate
      endDate
      value
      priority
      weekday
    }
  }
}
    `;

export function useResourceQuery(options: Omit<Urql.UseQueryArgs<ResourceQueryVariables>, 'query'>) {
  return Urql.useQuery<ResourceQuery>({ query: ResourceDocument, ...options });
};
export const ResourcesDocument = gql`
    query Resources($conditions: [conditionType!], $page: Int, $size: Int) {
  resources(conditions: $conditions, page: $page, size: $size) {
    total
    data {
      id
      createdAt
      updatedAt
      name
      location {
        id
        createdAt
        updatedAt
        name
        description
      }
      maximum
      owner {
        id
        createdAt
        updatedAt
        name
        maximum
        calendar {
          id
          startTime
          endTime
          value
          priority
          weekday
        }
      }
      calendarBucket {
        id
        createdAt
        updatedAt
        name
      }
      skills {
        id
        createdAt
        updatedAt
        name
      }
      children {
        id
        createdAt
        updatedAt
        name
        maximum
      }
      works {
        id
        createdAt
        updatedAt
        name
        quantity
        completedQuantity
        startDate
        endDate
        status
        demand {
          id
          createdAt
          updatedAt
          name
          description
          quantity
        }
        operation {
          id
        }
        resource {
          id
        }
        batch
        parentId
        parentType
        owner {
          id
          createdAt
          updatedAt
          name
          quantity
          completedQuantity
          startDate
          endDate
          status
          parentId
          parentType
          batch
        }
      }
      calendar {
        id
        createdAt
        updatedAt
        startTime
        endTime
        startDate
        endDate
        value
        priority
        weekday
      }
    }
  }
}
    `;

export function useResourcesQuery(options?: Omit<Urql.UseQueryArgs<ResourcesQueryVariables>, 'query'>) {
  return Urql.useQuery<ResourcesQuery>({ query: ResourcesDocument, ...options });
};
export const SkillDocument = gql`
    query Skill($skillId: Float!) {
  skill(id: $skillId) {
    id
    createdAt
    updatedAt
    name
  }
}
    `;

export function useSkillQuery(options: Omit<Urql.UseQueryArgs<SkillQueryVariables>, 'query'>) {
  return Urql.useQuery<SkillQuery>({ query: SkillDocument, ...options });
};
export const SkillsDocument = gql`
    query Skills($conditions: [conditionType!], $page: Int, $size: Int) {
  skills(conditions: $conditions, page: $page, size: $size) {
    data {
      id
      createdAt
      updatedAt
      name
    }
    total
  }
}
    `;

export function useSkillsQuery(options?: Omit<Urql.UseQueryArgs<SkillsQueryVariables>, 'query'>) {
  return Urql.useQuery<SkillsQuery>({ query: SkillsDocument, ...options });
};
export const SupplierDocument = gql`
    query Supplier($supplierId: Float!) {
  supplier(id: $supplierId) {
    id
    createdAt
    updatedAt
    name
    description
  }
}
    `;

export function useSupplierQuery(options: Omit<Urql.UseQueryArgs<SupplierQueryVariables>, 'query'>) {
  return Urql.useQuery<SupplierQuery>({ query: SupplierDocument, ...options });
};
export const SuppliersDocument = gql`
    query Suppliers($conditions: [conditionType!], $page: Int, $size: Int) {
  suppliers(conditions: $conditions, page: $page, size: $size) {
    data {
      createdAt
      description
      id
      name
      updatedAt
    }
    total
  }
}
    `;

export function useSuppliersQuery(options?: Omit<Urql.UseQueryArgs<SuppliersQueryVariables>, 'query'>) {
  return Urql.useQuery<SuppliersQuery>({ query: SuppliersDocument, ...options });
};
export const WorkDocument = gql`
    query Work($workId: Float!) {
  work(id: $workId) {
    id
    createdAt
    updatedAt
    name
    quantity
    completedQuantity
    startDate
    endDate
    status
    demand {
      id
      createdAt
      updatedAt
      name
      description
      quantity
    }
    operation {
      id
      createdAt
      updatedAt
      name
      type
      duration
      durationPerUnit
    }
    owner {
      id
      createdAt
      updatedAt
      name
      quantity
      completedQuantity
      startDate
      endDate
      status
    }
    resource {
      id
      createdAt
      updatedAt
      name
      maximum
    }
    parentId
    parentType
    batch
  }
}
    `;

export function useWorkQuery(options: Omit<Urql.UseQueryArgs<WorkQueryVariables>, 'query'>) {
  return Urql.useQuery<WorkQuery>({ query: WorkDocument, ...options });
};
export const WorksDocument = gql`
    query Works($conditions: [conditionType!], $page: Int, $size: Int) {
  works(conditions: $conditions, page: $page, size: $size) {
    data {
      id
      name
      demand {
        id
        createdAt
        updatedAt
        name
        description
        quantity
      }
      operation {
        id
        name
        operationMaterials {
          id
          item {
            name
            id
          }
        }
        operationResources {
          id
          resource {
            id
            name
          }
        }
      }
      quantity
      completedQuantity
      startDate
      endDate
      status
      owner {
        id
        name
      }
      createdAt
      updatedAt
      resource {
        id
        createdAt
        updatedAt
        name
        maximum
      }
      parentId
      parentType
      batch
    }
    total
  }
}
    `;

export function useWorksQuery(options?: Omit<Urql.UseQueryArgs<WorksQueryVariables>, 'query'>) {
  return Urql.useQuery<WorksQuery>({ query: WorksDocument, ...options });
};