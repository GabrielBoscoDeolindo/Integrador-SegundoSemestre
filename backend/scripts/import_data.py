import os
import django
import pandas as pd
import sys


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
django.setup()

from app.models import Sensor, Ambiente, Historico

def importar_ambientes():
    df = pd.read_excel("data/ambientes.xlsx")
    for _, row in df.iterrows():
        Ambiente.objects.create(
            sig=row["sig"],
            descricao=row["descricao"],
            ni=row["ni"],
            responsavel=row["responsavel"]
        )

def importar_sensores():
    df = pd.read_excel("data/sensores_mesclados.xlsx")
    for _, row in df.iterrows():
        Sensor.objects.create(
            sensor=row["sensor"],
            mac_address=row["mac_address"],
            unidade_med=row["unidade_medida"],
            valor=row["valor"],
            latitude=row["latitude"],
            longitude=row["longitude"],
            status= True if row["status"] == "ativo" else False,
            timestamp=row["timestamp"],
        )

def importar_historico():
    df = pd.read_excel("data/historico.xlsx")  
    for _, row in df.iterrows():
        
        sensor_instance = Sensor.objects.get(id=row["sensor_id"])  
        ambiente_instance = Ambiente.objects.get(sig=row["ambiente_sig"])  

        Historico.objects.create(
            sensor=sensor_instance,
            ambiente=ambiente_instance,
            timestamp=row["timestamp"],
            valor=row["valor"]
        )

if __name__ == "__main__":
    importar_historico()
