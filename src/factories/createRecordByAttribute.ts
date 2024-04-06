import * as crypto from 'node:crypto';
import { faker } from '@faker-js/faker';
import { DBSetter } from '../common/types';
import type { DBAttributeSchema, DBValue } from '../common/types';

const createValueBySetter = (attribute: DBAttributeSchema): DBValue => {
    if (attribute.setter === DBSetter.UUID) {
        return crypto.randomUUID();
    }
    if (attribute.setter === DBSetter.NUMBER) {
        return attribute.type === 'integer'
            ? faker.number.int({ min: attribute.min, max: attribute.max })
            : faker.number.float({ min: attribute.min, max: attribute.max });
    }
    if (attribute.setter === DBSetter.TEXT) {
        return faker.lorem.words({ min: attribute.min, max: attribute.max });
    }
    if (attribute.setter === DBSetter.PERSON_FIRST_NAME) {
        return faker.person.firstName();
    }
    if (attribute.setter === DBSetter.PERSON_LAST_NAME) {
        return faker.person.lastName();
    }
    if (attribute.setter === DBSetter.PERSON_GENDER) {
        return faker.person.gender();
    }
    if (attribute.setter === DBSetter.PERSON_JOB_AREA) {
        return faker.person.jobArea();
    }
    if (attribute.setter === DBSetter.PERSON_JOB_TITLE) {
        return faker.person.jobTitle();
    }
    if (attribute.setter === DBSetter.PERSON_SEX) {
        return faker.person.sex();
    }
    if (attribute.setter === DBSetter.PHONE_NUMBER) {
        return faker.phone.number();
    }
    if (attribute.setter === DBSetter.INTERNET_EMAIL) {
        return faker.internet.email();
    }
    if (attribute.setter === DBSetter.INTERNET_IP) {
        return faker.internet.ip();
    }
    if (attribute.setter === DBSetter.INTERNET_MAC) {
        return faker.internet.mac();
    }
    if (attribute.setter === DBSetter.LOCATION_CITY) {
        return faker.location.city();
    }
    if (attribute.setter === DBSetter.LOCATION_COUNTRY) {
        return faker.location.country();
    }
    if (attribute.setter === DBSetter.LOCATION_LATITUDE) {
        return faker.location.latitude();
    }
    if (attribute.setter === DBSetter.LOCATION_LONGITUDE) {
        return faker.location.longitude();
    }
    if (attribute.setter === DBSetter.DATE_FUTURE) {
        return faker.date.future().toISOString();
    }
    if (attribute.setter === DBSetter.DATE_PAST) {
        return faker.date.past().toISOString();
    }
    if (attribute.setter === DBSetter.VEHICLE_MODEL) {
        return faker.vehicle.model();
    }
    if (attribute.setter === DBSetter.VEHICLE_TYPE) {
        return faker.vehicle.type();
    }
    if (attribute.setter === DBSetter.COMPANY_NAME) {
        return faker.company.name();
    }

    throw new Error(`Unknown data setter provided: ${attribute.setter}`);
};

export const createRecordByAttributes = (attributes: DBAttributeSchema[]): Record<string, DBValue> => {
    const record = {} as Record<string, DBValue>;

    for (const attribute of attributes) {
        if (attribute.setter !== DBSetter.SQL) {
            record[attribute.name] = createValueBySetter(attribute);
        }
    }

    return record;
};
