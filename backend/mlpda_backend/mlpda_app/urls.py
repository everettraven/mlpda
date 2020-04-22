from django.contrib import admin
from django.urls import path
from django.conf.urls import url

from rest_framework.authtoken import views
import mlpda_app.views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    
]

#Set our custom api urls
urlpatterns += [
    url(r'^auth/', mlpda_app.views.CustomAuthView.as_view()),
    url(r'^predict/', mlpda_app.views.MyUploadView.as_view())
]