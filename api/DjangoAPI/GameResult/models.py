from django.db import models

# Create your models here.
#tällä luodaan tietokannan taulu ja kentät
class Results(models.Model):
    ResultId = models.AutoField(primary_key=True)
    ResultTime = models.CharField(max_length=50)
    Result = models.CharField(max_length=50)
