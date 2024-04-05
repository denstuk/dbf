export type DBValue = string | number | boolean | null;

export enum DBSetter {
    SQL = 'SQL',
    UUID = 'UUID',
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    NULL = 'NULL',
    PERSON_FIRST_NAME = 'PERSON_FIRST_NAME',
    PERSON_LAST_NAME = 'PERSON_LAST_NAME',
    PERSON_GENDER = 'PERSON_GENDER',
    PERSON_JOB_TITLE = 'PERSON_JOB_TITLE',
    PERSON_JOB_AREA = 'PERSON_JOB_AREA',
    PERSON_SEX = 'PERSON_SEX',
    PHONE_NUMBER = 'PHONE_NUMBER',
    INTERNET_EMAIL = 'INTERNET_EMAIL',
    INTERNET_IP = 'INTERNET_IP',
    INTERNET_MAC = 'INTERNET_MAC',
    DATE_PAST = 'DATE_PAST',
    DATE_FUTURE = 'DATE_FUTURE',
    LOCATION_CITY = 'LOCATION_CITY',
    LOCATION_COUNTRY = 'LOCATION_COUNTRY',
    LOCATION_LATITUDE = 'LOCATION_LATITUDE',
    LOCATION_LONGITUDE = 'LOCATION_LONGITUDE',
    VEHICLE_MODEL = 'VEHICLE_MODEL',
    VEHICLE_TYPE = 'VEHICLE_TYPE',
    COMPANY_NAME = 'COMPANY_NAME',
}

export type DBCommonAttributeSchema = {
    readonly name: string;
    readonly sql: string;
};

export type DBSimpleAttributeSchema = DBCommonAttributeSchema & {
    readonly setter:
        DBSetter.SQL |
        DBSetter.UUID |
        DBSetter.PERSON_FIRST_NAME |
        DBSetter.PERSON_LAST_NAME |
        DBSetter.PERSON_GENDER |
        DBSetter.PERSON_JOB_TITLE |
        DBSetter.PERSON_JOB_AREA |
        DBSetter.PERSON_SEX |
        DBSetter.PHONE_NUMBER |
        DBSetter.INTERNET_EMAIL |
        DBSetter.INTERNET_IP |
        DBSetter.INTERNET_MAC |
        DBSetter.DATE_PAST |
        DBSetter.DATE_FUTURE |
        DBSetter.LOCATION_CITY |
        DBSetter.LOCATION_COUNTRY |
        DBSetter.LOCATION_LATITUDE |
        DBSetter.LOCATION_LONGITUDE |
        DBSetter.VEHICLE_MODEL |
        DBSetter.VEHICLE_TYPE |
        DBSetter.COMPANY_NAME
};

export type DBTextAttributeSchema = DBCommonAttributeSchema & {
    readonly setter: DBSetter.TEXT;
    readonly min: number;
    readonly max: number;
};

export type DBNumberAttributeSchema = DBCommonAttributeSchema & {
    readonly setter: DBSetter.NUMBER;
    readonly type: 'integer' | 'float';
    readonly min?: number;
    readonly max?: number;
    /**
     * Default: true
     */
    readonly repeatable?: boolean;
};

export type DBAttributeSchema = DBSimpleAttributeSchema | DBTextAttributeSchema | DBNumberAttributeSchema;


export type DBTableSchema = {
    readonly name: string;
    readonly attributes: DBAttributeSchema[];
    readonly constraints?: string[];
    /**
     * Number of rows to generate
     */
    readonly amount: number;
};

export type DBSchema = DBTableSchema[];
