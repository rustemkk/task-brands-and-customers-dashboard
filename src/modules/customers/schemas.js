import { schema } from 'normalizr';


const customerSchema = new schema.Entity('customers');

export const customersSchema = [customerSchema];
