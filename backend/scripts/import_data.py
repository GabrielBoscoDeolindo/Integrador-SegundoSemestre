import os
import django
import pandas as pd


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from app.models import Sensor, Ambiente

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

if __name__ == "__main__":
    importar_sensores()
