from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
#parseroidaan tuleva data
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from GameResult.models import Results
from GameResult.serializer import ResultSerializer
# Create your views here.

@csrf_exempt
def ResultApi(request,id=0):
    #Haku Results taulusta ja tuloksen konvertointi + palautus jsonina
    if request.method == 'GET':
        results = Results.objects.all()
        results_serializer = ResultSerializer(results,many=True)
        return JsonResponse(results_serializer.data,safe=False)
    #Tallennus
    elif request.method == 'POST':
        results_data = JSONParser().parse(request)
        results_serializer=ResultSerializer(data=results_data)
        if results_serializer.is_valid():
            results_serializer.save()
            return JsonResponse('Added succesfully')
        return JsonResponse('Failed to add',safe=False)
    #update eli muokkaustoiminto koska pöivitys tapahtuu id:n perusteella annetaan ResulId parametrina
    elif request.method == 'PUT':
        results_data = JSONParser().parse(request)
        results = Results.objects.get(ResultId=results_data['ResultId'])
        results_serializer = ResultSerializer(results,data=results_data)
        if results_serializer.is_valid():
            results_serializer.save()
            return JsonResponse('Updated succesfully',safe=False)
        return JsonResponse('Failed to update')
    elif request.method=='DELETE':
        results = Results.objects.get(ResultId=id)
        results.delete()
        return JsonResponse('Deleted succesfully',safe=False)
