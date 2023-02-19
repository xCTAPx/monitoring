from kafka import KafkaConsumer
import psycopg2
from config import app_settings
import json

db = psycopg2.connect(
    database=app_settings.POSTGRES_DB,
    user=app_settings.POSTGRES_USER,
    password=app_settings.POSTGRES_PASSWORD,
    host=app_settings.POSTGRES_SERVER,
    port=app_settings.POSTGRES_PORT
)

cur = db.cursor()

consumer = KafkaConsumer(
    app_settings.KAFKA_TOPIK,
    bootstrap_servers=app_settings.KAFKA_HOST,
    security_protocol="SASL_SSL",
    sasl_mechanism="SCRAM-SHA-512",
    sasl_plain_username=app_settings.KAFKA_USER,
    sasl_plain_password=app_settings.KAFKA_PASSWORD,
    ssl_cafile="CA.pem",
    group_id='SolyankaIT',
    enable_auto_commit=False,
    auto_offset_reset='earliest'
)


def get_values(data, keys):
    if not data:
        return None
    res = {}
    exclude_key = ('id', 'name')
    for key, val in keys.items():
        point_data = {}
        for key_point, val_point in val.items():
            if key_point in exclude_key:
                continue
            point_data[key_point] = {}
            for key_param, val_param in val_point.items():
                if key_param in exclude_key:
                    continue
                param = data.get(val_param['key_value'], None)
                if param:
                    point_data[key_point][key_param] = param
        res[key] = {
            'id': val['id'],
            'datetime': data['moment'],
            'data': point_data
        }
    return res


def get_settings(data, keys):
    if not data:
        return None
    res = {}
    exclude_key = ('id',)
    for key, val in keys.items():
        for key_point, val_point in val.items():
            if key_point in exclude_key:
                continue
            for key_param, val_param in val_point.items():
                if key_param in exclude_key:
                    continue
                for key_settings, val_settings in val_param.items():
                    if key_settings in exclude_key:
                        continue
                    param = data.get(val_settings, None)
                    if param:
                        if key not in res:
                            res[key] = {'id': val['id']}
                        if key_point not in res[key]:
                            res[key][key_point] = {'id': val_point['id']}
                        if key_param not in res[key][key_point]:
                            res[key][key_point][key_param] = {'id': val_param['id']}
                        res[key][key_point][key_param][key_settings.replace('key_', '')] = param
    return res


def parse_equipment_param(data: list):
    values = {}
    settings = {}
    naming = {}

    for item in data:
        if item[2] not in values:
            values[item[2]] = {'id': item[0]}
            naming[item[2]] = {'name': item[1]}
            if item[10] or item[11] or item[12] or item[13]:
                settings[item[2]] = {'id': item[0]}
        if item[5] not in values[item[2]]:
            values[item[2]][item[5]] = {'id': item[3]}
            naming[item[2]][item[5]] = {'name': item[4]}
            if item[10] or item[11] or item[12] or item[13]:
                settings[item[2]][item[5]] = {'id': item[3]}
        values[item[2]][item[5]][item[8]] = {'id': item[6], 'key_value': item[9]}
        naming[item[2]][item[5]][item[8]] = {'name': item[7]}
        if item[10] or item[11] or item[12] or item[13]:
            settings[item[2]][item[5]][item[8]] = {'id': item[6]}
        if item[10]:
            settings[item[2]][item[5]][item[8]]['key_alarm_max'] = item[10]
        if item[11]:
            settings[item[2]][item[5]][item[8]]['key_alarm_min'] = item[11]
        if item[12]:
            settings[item[2]][item[5]][item[8]]['key_warning_max'] = item[12]
        if item[13]:
            settings[item[2]][item[5]][item[8]]['key_warning_min'] = item[13]
    return values, settings, naming


def get_key_equipment_param():
    query = """
    select
        e.id as id_equipment,
        e.name as equipment_name,
        e.key as equipment_key,
        cp.id as id_check_point,
        cp.name as check_point_name,
        cp.key as check_point_key,
        p.id as id_param,
        p.name as param_name,
        p.key as param_key,
        kk.key_value,
        kk.key_alarm_max,
        kk.key_alarm_min,
        kk.key_warning_max,
        kk.key_warning_min
    from kafka_keys as kk
       left join equipments e on kk.id_equipment = e.id
       left join check_points cp on kk.id_check_point = cp.id
       left join params p on kk.id_param = p.id
    """
    cur.execute(query)
    res = cur.fetchall()
    return parse_equipment_param(res)


def parse_current_settings(data):
    res = {}
    if data:
        for item in data:
            if item[3] not in res:
                res[item[3]] = {'id': item[0]}
            if item[4] not in res[item[3]]:
                res[item[3]][item[4]] = {'id': item[1]}
            res[item[3]][item[4]][item[5]] = {'id': item[2]}
            if item[6]:
                res[item[3]][item[4]][item[5]]['alarm_max'] = item[6]
            if item[7]:
                res[item[3]][item[4]][item[5]]['alarm_min'] = item[7]
            if item[8]:
                res[item[3]][item[4]][item[5]]['warning_max'] = item[8]
            if item[9]:
                res[item[3]][item[4]][item[5]]['warning_min'] = item[9]
    return res


def get_current_settings():
    query = """
    select
        es.id_equipment,
        es.id_check_point,
        es.id_param,
        e.key as equipment_key,
        cp.key as check_point_key,
        p.key as param_key,
        es.alarm_max,
        es.alarm_min,
        es.warning_max,
        es.warning_min,
        es.datetime_begin
    from equipments_setting as es
       left join equipments e on es.id_equipment = e.id
       left join check_points cp on es.id_check_point = cp.id
       left join params p on es.id_param = p.id
    where es.datetime_end IS NULL;
    """
    cur.execute(query)
    res = cur.fetchall()
    return parse_current_settings(res)


def insert_param(value):
    query = "INSERT INTO equipments_data (id_equipment, datetime, data) VALUES "
    for key, val in value.items():
        data = json.dumps(val['data'])
        query += f"({val['id']}, '{val['datetime']}', '{data}'),"
    query = query[:-1] + ';'
    cur.execute(query)
    db.commit()


def insert_settings(value):
    query_insert = f"""
    insert into equipments_setting (id_equipment, id_check_point, id_param, alarm_max, alarm_min, warning_max, warning_min, datetime_begin)
    values
    """
    for item in value:
        query_update = f"""
        update equipments_setting
        set datetime_end = '{data['moment']}'
        where id_equipment = {item['id_equipment']}
          and id_check_point = {item['id_check_point']}
          and id_param = {item['id_param']}
          and datetime_end is null;
            """
        cur.execute(query_update)
        query_insert += f"({item['id_equipment']}, {item['id_check_point']}, {item['id_param']}, {item.get('alarm_max', 'Null')}, {item.get('alarm_min', 'Null')}, {item.get('warning_max', 'Null')}, {item.get('warning_min', 'Null')}, '{data['moment']}'),"
    query_insert = query_insert[:-1] + ';'
    cur.execute(query_insert)
    db.commit()


def check_settings():
    global new_settings
    global current_settings

    different_setting = []

    exclude_key = ('id',)
    is_not_settings = False
    if not current_settings:
        current_settings = new_settings.copy()
        is_not_settings = True
    for key, val in new_settings.items():
        if key not in current_settings:
            current_settings[key] = {'id': new_settings[key]['id']}
        for key_point, val_point in val.items():
            if key_point in exclude_key:
                continue
            if key_point not in current_settings[key]:
                current_settings[key][key_point] = {'id': new_settings[key][key_point]['id']}
            for key_param, val_param in val_point.items():
                if key_param in exclude_key:
                    continue
                if key_param not in current_settings[key][key_point]:
                    current_settings[key][key_point][key_param] = {'id': new_settings[key][key_point][key_param]['id']}
                is_different = new_settings[key][key_point][key_param] != current_settings[key][key_point][key_param]
                if is_different or is_not_settings:
                    if is_different:
                        current_settings[key][key_point][key_param] = new_settings[key][key_point][key_param]
                    rec = {
                        'id_equipment': new_settings[key]['id'],
                        'id_check_point': new_settings[key][key_point]['id'],
                        'id_param': new_settings[key][key_point][key_param]['id']
                    }
                    for key_settings, val_settings in val_param.items():
                        if key_settings in exclude_key:
                            continue
                        rec[key_settings] = val_settings
                    different_setting.append(rec)
    if different_setting:
        insert_settings(different_setting)


if __name__ == '__main__':
    values_keys, settings_keys, naming = get_key_equipment_param()
    current_settings = get_current_settings()
    for msg in consumer:
        data = json.loads(msg.value.decode('utf-8'))
        new_settings = get_settings(data, settings_keys)
        check_settings()
        values = get_values(data, values_keys)
        insert_param(values)

