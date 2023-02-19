import uvicorn
from fastapi import FastAPI
import psycopg2
from datetime import datetime, timedelta

from config import app_settings


app = FastAPI(title=app_settings.PROJECT_NAME, debug=app_settings.DEBUG)

db = psycopg2.connect(
    database=app_settings.POSTGRES_DB,
    user=app_settings.POSTGRES_USER,
    password=app_settings.POSTGRES_PASSWORD,
    host=app_settings.POSTGRES_SERVER,
    port=app_settings.POSTGRES_PORT
)
cur = db.cursor()


def parse_equipment_naming(data: list):
    naming = {}

    for item in data:
        if item[0] not in naming:
            naming[item[0]] = {'name': item[1]}
        if item[2] not in naming[item[0]]:
            naming[item[0]][item[2]] = {'name': item[3]}
        naming[item[0]][item[2]][item[4]] = {'name': item[5]}
    return naming


def get_equipment_naming():
    query = """
    select
        e.key as equipment_key,
        e.name as equipment_name,
        cp.key as check_point_key,
        cp.name as check_point_name,
        p.key as param_key,
        p.name as param_name
    from kafka_keys as kk
       left join equipments e on kk.id_equipment = e.id
       left join check_points cp on kk.id_check_point = cp.id
       left join params p on kk.id_param = p.id
    """
    cur.execute(query)
    res = cur.fetchall()
    return parse_equipment_naming(res)


def parse_value(data: list):
    values = []
    value = {}
    for item in data:
        if 'datetime' not in value:
            value['datetime'] = item[0]
        elif value['datetime'] != item[0]:
            values.append(value)
            value = {'datetime': item[0]}
        value[item[1]] = item[2]
    values.append(value)
    return values


def get_current_values():
    query = """
    select ed.datetime, e.key, ed.data
    from equipments_data as ed
    left join equipments as e on ed.id_equipment = e.id
    where ed.datetime = (select max(datetime) from equipments_data);
    """
    cur.execute(query)
    res = cur.fetchall()
    return parse_value(res)


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


@app.get("/current_data")
async def get_params():
    res = {
        'naming': get_equipment_naming(),
        'values': get_current_values(),
        'settings': get_current_settings()
    }
    return res


def get_period_values(start_datetime, end_datetime):
    query = f"""
    select ed.datetime, e.key, ed.data
    from equipments_data as ed
    left join equipments as e on ed.id_equipment = e.id
    where ed.datetime >= '{start_datetime}' and ed.datetime <= '{end_datetime}';
    """
    cur.execute(query)
    res = cur.fetchall()
    return parse_value(res)


@app.get("/period_data")
async def get_params(start_period: datetime = None, end_period: datetime = None):
    if start_period:
        start_datetime = start_period
    else:
        start_datetime = datetime.now() - timedelta(days=1)

    if end_period:
        end_datetime = end_period
    else:
        end_datetime = datetime.now()

    res = {
        'naming': get_equipment_naming(),
        'values': get_period_values(start_datetime, end_datetime)
    }
    print(res)
    return res


if __name__ == '__main__':
    uvicorn.run(
        "app:app",
        host='0.0.0.0',
        port=8000,
        reload=True
    )
