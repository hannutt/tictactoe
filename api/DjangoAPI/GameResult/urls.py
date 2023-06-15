from django.conf.urls import url
from GameResult import views
#nämä ovar verkkoresursseja, result on resurssin nimi ja views.resutapi sen yhteydessä
#käytettävä api metodi.
urlpatterns=[
    #http://127.0.0.1:8000/result
    url(r'^result$',views.ResultApi),
    url(r'^result/([0-9]+)$',views.ResultApi)
]