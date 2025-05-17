from django.db import models


# Create your models here.
SENSOR_CHOICES = [
    ("umidade", "umidade"),
    ("temperatura", "temperatura"),
    ("luminosidade", "luminosidade"),
    ("contador", "contador")
]

class Sensor(models.Model):
    sensor = models.CharField(max_length=50, choices=SENSOR_CHOICES)  
    mac_address = models.CharField(max_length=20)
    unidade_med = models.CharField(max_length=20)
    valor = models.FloatField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.BooleanField()
    timestamp = models.DateTimeField()

    class Meta:
        verbose_name_plural = "Sensores"

    def __str__(self):
        return self.sensor

class Ambiente(models.Model):
    sig = models.IntegerField(unique=True)
    descricao = models.CharField(max_length=150)
    ni = models.CharField(max_length=20)
    responsavel = models.CharField(max_length=150)

    def __str__(self):
        return str(self.sig)

class Historico(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name="sensores")
    ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE, related_name="ambientes")
    valor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name="valores")
    timestamp = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name="timestamps")

    class Meta:
        verbose_name_plural = "Historico"
    
    def __str__(self):
        return str(self.sensor)

