#serialisointi tekee tiedon renderöinnin helpommaksi
from rest_framework import serializers
from GameResult.models import Results

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Results
        fields=('ResultId','ResultTime','Result')