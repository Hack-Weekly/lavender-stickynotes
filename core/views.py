from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import Http404

class SetupCompleteView(TemplateView):
    template_name="setup.html"

